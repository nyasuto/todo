import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('should render input form', () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    expect(screen.getByPlaceholderText('新しいタスクを入力...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument()
  })

  it('should call onAdd with task title when form is submitted', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'New Task')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).toHaveBeenCalledWith('New Task', undefined, 'medium')
  })

  it('should clear input after submitting', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...') as HTMLInputElement
    await user.type(input, 'New Task')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(input.value).toBe('')
  })

  it('should show character counter', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'Test')

    expect(screen.getByText(/4 \/ 100文字/)).toBeInTheDocument()
  })

  it('should not submit empty task', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('should trim whitespace from task title', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, '  Task with spaces  ')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).toHaveBeenCalledWith('Task with spaces', undefined, 'medium')
  })

  it('should allow selecting priority', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: '高' }))

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'High priority task')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).toHaveBeenCalledWith('High priority task', undefined, 'high')
  })

  it('should reset priority to medium after submission', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: '低' }))

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'Low priority task')
    await user.click(screen.getByRole('button', { name: '追加' }))

    // 2回目は medium に戻る
    await user.type(input, 'Another task')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).toHaveBeenLastCalledWith('Another task', undefined, 'medium')
  })
})