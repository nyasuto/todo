import { Task } from '../types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string, description?: string) => void
  onDelete: (id: string) => void
}

export const TaskList = ({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">タスクがありません</p>
        <p className="text-gray-400 text-sm mt-2">上のフォームから新しいタスクを追加してください</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}