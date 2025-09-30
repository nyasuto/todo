import { useState } from 'react'
import { Task } from '../types'
import { format } from 'date-fns'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string, description?: string) => void
  onDelete: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim(), editDescription.trim() || undefined)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-white border border-blue-300 rounded-lg shadow-md">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="タスク名"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="説明（任意）"
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={!editTitle.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="task-item flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
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
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          aria-label="タスクを編集"
        >
          編集
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
          aria-label="タスクを削除"
        >
          削除
        </button>
      </div>
    </div>
  )
}