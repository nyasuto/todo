import { useState } from 'react'

interface TaskInputProps {
  onAdd: (title: string) => void
}

const MAX_TITLE_LENGTH = 100

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [title, setTitle] = useState('')
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

    onAdd(trimmedTitle)
    setTitle('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (error) setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-2">
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
      </div>
    </form>
  )
}