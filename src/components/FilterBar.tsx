import { TaskStatus } from '../types'

export type SortOption = 'createdAt' | 'updatedAt' | 'title'

interface FilterBarProps {
  filter: TaskStatus | 'all'
  onFilterChange: (filter: TaskStatus | 'all') => void
  sortBy: SortOption
  onSortChange: (sortBy: SortOption) => void
}

export const FilterBar = ({ filter, onFilterChange, sortBy, onSortChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">フィルター:</label>
        <div className="flex gap-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            全て
          </button>
          <button
            onClick={() => onFilterChange('pending')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'pending'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            未完了
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            完了
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">並び順:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-1 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt">作成日時</option>
          <option value="updatedAt">更新日時</option>
          <option value="title">タイトル</option>
        </select>
      </div>
    </div>
  )
}