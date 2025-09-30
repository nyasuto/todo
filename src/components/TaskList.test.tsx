import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskList } from './TaskList'
import { Task } from '../types'

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      priority: 'high',
      tags: ['work'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Task 2',
      status: 'completed',
      priority: 'low',
      tags: [],
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02'),
    },
  ]

  it('should render empty state when no tasks', () => {
    const onToggle = vi.fn()
    const onUpdate = vi.fn()
    const onDelete = vi.fn()

    render(<TaskList tasks={[]} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />)

    expect(screen.getByText('タスクがありません')).toBeInTheDocument()
  })

  it('should render all tasks', () => {
    const onToggle = vi.fn()
    const onUpdate = vi.fn()
    const onDelete = vi.fn()

    render(
      <TaskList tasks={mockTasks} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
    )

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  it('should display task descriptions', () => {
    const onToggle = vi.fn()
    const onUpdate = vi.fn()
    const onDelete = vi.fn()

    render(
      <TaskList tasks={mockTasks} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
    )

    expect(screen.getByText('Description 1')).toBeInTheDocument()
  })
})