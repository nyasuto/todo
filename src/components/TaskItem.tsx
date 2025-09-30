import { Task } from '../types'
import { format } from 'date-fns'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <h3
          className={`text-lg font-medium ${
            task.status === 'completed'
              ? 'line-through text-gray-400'
              : 'text-gray-800'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          作成日: {format(task.createdAt, 'yyyy/MM/dd HH:mm')}
        </p>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
        aria-label="タスクを削除"
      >
        削除
      </button>
    </div>
  )
}