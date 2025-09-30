import { useEffect } from 'react'
import { useTaskStore } from './stores/taskStore'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'

function App() {
  const { tasks, addTask, deleteTask, toggleTask, loadTasks } = useTaskStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

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
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </div>
  )
}

export default App