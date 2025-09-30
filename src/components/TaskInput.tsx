import { useState } from 'react'
import { TaskPriority } from '../types'

interface TaskInputProps {
  onAdd: (title: string, description?: string, priority?: TaskPriority) => void
}

const MAX_TITLE_LENGTH = 100

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('タスク名を入力してください')
      return
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError(`タスク名は${MAX_TITLE_LENGTH}文字以内で入力してください`)
      return
    }

    onAdd(trimmedTitle, undefined, priority)
    setTitle('')
    setPriority('medium')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (error) setError('')
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

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="新しいタスクを入力..."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              maxLength={MAX_TITLE_LENGTH + 10}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {title.length > 0 && (
              <p className="text-gray-400 text-xs mt-1">
                {title.length} / {MAX_TITLE_LENGTH}文字
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!title.trim()}
          >
            追加
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">優先度:</label>
          <div className="flex gap-1">
            {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  priority === p
                    ? priorityColors[p]
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {priorityLabels[p]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}