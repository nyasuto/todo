import { create } from 'zustand'
import { Task, TaskPriority } from '../types'
import { loadTasks, saveTasks } from '../utils/storage'

interface TaskStore {
  tasks: Task[]
  addTask: (
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    tags?: string[]
  ) => void
  updateTask: (
    id: string,
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    tags?: string[]
  ) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  loadTasks: () => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  loadTasks: () => {
    const tasks = loadTasks()
    set({ tasks })
  },

  addTask: (
    title: string,
    description?: string,
    priority: TaskPriority = 'medium',
    dueDate?: Date,
    tags: string[] = []
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'pending',
      priority,
      dueDate,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const tasks = [...get().tasks, newTask]
    set({ tasks })
    saveTasks(tasks)
  },

  updateTask: (
    id: string,
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    tags?: string[]
  ) => {
    const tasks = get().tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title,
            description,
            priority: priority ?? task.priority,
            dueDate: dueDate === undefined ? task.dueDate : dueDate,
            tags: tags ?? task.tags,
            updatedAt: new Date(),
          }
        : task
    )
    set({ tasks })
    saveTasks(tasks)
  },

  deleteTask: (id: string) => {
    const tasks = get().tasks.filter((task) => task.id !== id)
    set({ tasks })
    saveTasks(tasks)
  },

  toggleTask: (id: string) => {
    const tasks = get().tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: (task.status === 'pending' ? 'completed' : 'pending') as Task['status'],
            updatedAt: new Date(),
          }
        : task
    )
    set({ tasks })
    saveTasks(tasks)
  },
}))