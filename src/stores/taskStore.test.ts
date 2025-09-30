import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTaskStore } from './taskStore'
import * as storage from '../utils/storage'

vi.mock('../utils/storage')

describe('taskStore', () => {
  beforeEach(() => {
    // ストアをリセット
    useTaskStore.setState({ tasks: [] })
    vi.clearAllMocks()
  })

  describe('loadTasks', () => {
    it('should load tasks from storage', () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test',
          status: 'pending' as const,
          priority: 'medium' as const,
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

      const { loadTasks } = useTaskStore.getState()
      loadTasks()

      expect(useTaskStore.getState().tasks).toEqual(mockTasks)
    })
  })

  describe('addTask', () => {
    it('should add a new task with default priority', () => {
      const { addTask } = useTaskStore.getState()

      addTask('New Task')

      const tasks = useTaskStore.getState().tasks
      expect(tasks).toHaveLength(1)
      expect(tasks[0].title).toBe('New Task')
      expect(tasks[0].status).toBe('pending')
      expect(tasks[0].priority).toBe('medium')
      expect(storage.saveTasks).toHaveBeenCalledWith(tasks)
    })

    it('should add a task with custom priority and tags', () => {
      const { addTask } = useTaskStore.getState()

      addTask('Important Task', 'Description', 'high', undefined, ['work', 'urgent'])

      const tasks = useTaskStore.getState().tasks
      expect(tasks[0].priority).toBe('high')
      expect(tasks[0].tags).toEqual(['work', 'urgent'])
    })

    it('should add a task with due date', () => {
      const { addTask } = useTaskStore.getState()
      const dueDate = new Date('2025-12-31')

      addTask('Task with deadline', undefined, 'medium', dueDate)

      const tasks = useTaskStore.getState().tasks
      expect(tasks[0].dueDate).toEqual(dueDate)
    })
  })

  describe('updateTask', () => {
    it('should update task properties', () => {
      const { addTask, updateTask } = useTaskStore.getState()

      addTask('Original Task')
      const taskId = useTaskStore.getState().tasks[0].id

      updateTask(taskId, 'Updated Task', 'New description', 'high')

      const updatedTask = useTaskStore.getState().tasks[0]
      expect(updatedTask.title).toBe('Updated Task')
      expect(updatedTask.description).toBe('New description')
      expect(updatedTask.priority).toBe('high')
    })

    it('should update task tags and due date', () => {
      const { addTask, updateTask } = useTaskStore.getState()

      addTask('Task')
      const taskId = useTaskStore.getState().tasks[0].id
      const dueDate = new Date('2025-12-31')

      updateTask(taskId, 'Task', undefined, 'low', dueDate, ['new', 'tags'])

      const updatedTask = useTaskStore.getState().tasks[0]
      expect(updatedTask.dueDate).toEqual(dueDate)
      expect(updatedTask.tags).toEqual(['new', 'tags'])
    })

    it('should not update non-existent task', () => {
      const { addTask, updateTask } = useTaskStore.getState()

      addTask('Task')
      const initialTasks = useTaskStore.getState().tasks

      updateTask('non-existent-id', 'Updated')

      expect(useTaskStore.getState().tasks).toEqual(initialTasks)
    })
  })

  describe('deleteTask', () => {
    it('should delete a task by id', () => {
      const { addTask, deleteTask } = useTaskStore.getState()

      addTask('Task 1')
      addTask('Task 2')

      const taskId = useTaskStore.getState().tasks[0].id
      deleteTask(taskId)

      const tasks = useTaskStore.getState().tasks
      expect(tasks).toHaveLength(1)
      expect(tasks[0].title).toBe('Task 2')
      expect(storage.saveTasks).toHaveBeenCalledWith(tasks)
    })

    it('should handle deleting non-existent task', () => {
      const { addTask, deleteTask } = useTaskStore.getState()

      addTask('Task')
      const initialTasks = useTaskStore.getState().tasks

      deleteTask('non-existent-id')

      expect(useTaskStore.getState().tasks).toEqual(initialTasks)
    })
  })

  describe('toggleTask', () => {
    it('should toggle task status from pending to completed', () => {
      const { addTask, toggleTask } = useTaskStore.getState()

      addTask('Task')
      const taskId = useTaskStore.getState().tasks[0].id

      toggleTask(taskId)

      expect(useTaskStore.getState().tasks[0].status).toBe('completed')
    })

    it('should toggle task status from completed to pending', () => {
      const { addTask, toggleTask } = useTaskStore.getState()

      addTask('Task')
      const taskId = useTaskStore.getState().tasks[0].id

      toggleTask(taskId) // pending -> completed
      toggleTask(taskId) // completed -> pending

      expect(useTaskStore.getState().tasks[0].status).toBe('pending')
    })

    it('should update updatedAt when toggling', () => {
      const { addTask, toggleTask } = useTaskStore.getState()

      addTask('Task')
      const taskId = useTaskStore.getState().tasks[0].id
      const originalUpdatedAt = useTaskStore.getState().tasks[0].updatedAt

      // 少し待ってから toggle
      setTimeout(() => {
        toggleTask(taskId)

        const newUpdatedAt = useTaskStore.getState().tasks[0].updatedAt
        expect(newUpdatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime())
      }, 10)
    })
  })
})