import { useState } from 'react'
import { Task, TaskPriority } from '../types'
import { format } from 'date-fns'
import { parseDateInLocalTimezone } from '../utils/dateParser'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (
    id: string,
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    tags?: string[]
  ) => void
  onDelete: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [editPriority, setEditPriority] = useState<TaskPriority>(task.priority)
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : ''
  )
  const [editTags, setEditTags] = useState(task.tags.join(', '))

  const handleSave = () => {
    if (editTitle.trim()) {
      const tags = editTags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t)
      onUpdate(
        task.id,
        editTitle.trim(),
        editDescription.trim() || undefined,
        editPriority,
        editDueDate ? parseDateInLocalTimezone(editDueDate) : undefined,
        tags
      )
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '')
    setEditTags(task.tags.join(', '))
    setIsEditing(false)
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    high: 'bg-red-100 text-red-700 border-red-300',
  }

  const priorityLabels = {
    low: '低',
    medium: '中',
    high: '高',
  }

  const isOverdue = task.dueDate && task.status === 'pending' && task.dueDate < new Date()

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
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">優先度:</label>
            <div className="flex gap-1">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setEditPriority(p)}
                  className={`px-3 py-1 text-sm rounded border transition-colors ${
                    editPriority === p
                      ? priorityColors[p]
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {priorityLabels[p]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">期限:</label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              タグ（カンマ区切り）:
            </label>
            <input
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              placeholder="例: 仕事, 重要"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={`text-lg font-medium ${
              task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`px-2 py-0.5 text-xs rounded border ${priorityColors[task.priority]}`}
          >
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <span
              className={`px-2 py-0.5 text-xs rounded ${
                isOverdue
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              期限: {format(task.dueDate, 'yyyy/MM/dd')}
            </span>
          )}
        </div>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        {task.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
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