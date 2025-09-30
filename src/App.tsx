import { useEffect, useState, useMemo } from 'react'
import { useTaskStore } from './stores/taskStore'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import { FilterBar, SortOption } from './components/FilterBar'
import { TaskStatus } from './types'

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask, loadTasks } = useTaskStore()
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('createdAt')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    // フィルタリング
    if (filter !== 'all') {
      filtered = filtered.filter((task) => task.status === filter)
    }

    // 検索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // ソート
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === 'updatedAt') {
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      }
      if (sortBy === 'priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      // デフォルトは作成日時（新しい順）
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

    return sorted
  }, [tasks, filter, sortBy, searchQuery])

  const pendingTasks = tasks.filter((task) => task.status === 'pending')
  const completedTasks = tasks.filter((task) => task.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TODOアプリ</h1>
          <p className="text-gray-600">
            {tasks.length > 0 && (
              <>
                全{tasks.length}件 | 完了: {completedTasks.length}件 | 未完了:{' '}
                {pendingTasks.length}件
              </>
            )}
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <TaskInput onAdd={addTask} />
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <TaskList
            tasks={filteredAndSortedTasks}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  )
}

export default App