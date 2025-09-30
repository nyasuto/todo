import { Task } from '../types'

const STORAGE_KEY = 'todo-tasks'

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const tasks = JSON.parse(stored)
    // Parse date strings back to Date objects
    return tasks.map((task: Task) => ({
      ...task,
      priority: task.priority || 'medium',
      tags: task.tags || [],
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }))
  } catch (error) {
    console.error('Failed to load tasks:', error)
    return []
  }
}

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks:', error)
  }
}