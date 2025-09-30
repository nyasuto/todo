import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadTasks, saveTasks } from './storage'
import { Task } from '../types'

describe('storage', () => {
  beforeEach(() => {
    // LocalStorageモックをクリア
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending',
          priority: 'medium',
          tags: ['test'],
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      ]

      saveTasks(tasks)

      expect(localStorage.setItem).toHaveBeenCalledWith('todo-tasks', JSON.stringify(tasks))
    })

    it('should handle errors when saving tasks', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      localStorage.setItem = vi.fn(() => {
        throw new Error('Storage error')
      })

      const tasks: Task[] = []
      saveTasks(tasks)

      expect(consoleSpy).toHaveBeenCalledWith('Failed to save tasks:', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('loadTasks', () => {
    it('should load tasks from localStorage', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          status: 'pending',
          priority: 'high',
          tags: ['work'],
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-02'),
        },
      ]

      localStorage.getItem = vi.fn(() => JSON.stringify(tasks))

      const loadedTasks = loadTasks()

      expect(loadedTasks).toHaveLength(1)
      expect(loadedTasks[0].title).toBe('Test Task')
      expect(loadedTasks[0].priority).toBe('high')
      expect(loadedTasks[0].tags).toEqual(['work'])
    })

    it('should return empty array when no tasks in localStorage', () => {
      localStorage.getItem = vi.fn(() => null)

      const tasks = loadTasks()

      expect(tasks).toEqual([])
    })

    it('should handle missing priority and tags fields', () => {
      const oldTask = {
        id: '1',
        title: 'Old Task',
        status: 'pending',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
      }

      localStorage.getItem = vi.fn(() => JSON.stringify([oldTask]))

      const tasks = loadTasks()

      expect(tasks[0].priority).toBe('medium')
      expect(tasks[0].tags).toEqual([])
    })

    it('should parse date strings to Date objects', () => {
      const taskData = {
        id: '1',
        title: 'Test',
        status: 'pending',
        priority: 'medium',
        tags: [],
        dueDate: '2025-12-31',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z',
      }

      localStorage.getItem = vi.fn(() => JSON.stringify([taskData]))

      const tasks = loadTasks()

      expect(tasks[0].createdAt).toBeInstanceOf(Date)
      expect(tasks[0].updatedAt).toBeInstanceOf(Date)
      expect(tasks[0].dueDate).toBeInstanceOf(Date)
    })

    it('should handle errors when loading tasks', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      localStorage.getItem = vi.fn(() => {
        throw new Error('Storage error')
      })

      const tasks = loadTasks()

      expect(tasks).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load tasks:', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })
})