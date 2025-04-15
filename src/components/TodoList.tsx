'use client'

import { useState, useTransition } from 'react'
import { Todo } from '../types/todo'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteTodo } from '../../actions/todo'
import { toast } from 'sonner'

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Sort todos by creation date (newest first)
  const sortedTodos = [...todos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleUpdate = (todo: Todo) => {
    // This will be implemented later
    console.log('Update todo:', todo)
  }

  const handleDelete = (todo: Todo) => {
    startTransition(async () => {
      try {
        await deleteTodo(todo.id)
        toast.success('Todo deleted successfully')
      } catch (error) {
        console.error('Error deleting todo:', error)
        toast.error('Failed to delete todo. Please try again.')
      }
    })
  }

  if (error) {
    return <div className='text-red-500 p-4 rounded-lg bg-red-50'>{error}</div>
  }

  if (todos.length === 0) {
    return (
      <div className='text-center py-8'>
        <div className='text-gray-500 text-lg mb-2'>No todos yet</div>
        <p className='text-gray-400'>Create your first todo to get started!</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {sortedTodos.map(todo => (
        <div
          key={todo.id}
          className='p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow'
        >
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-lg font-medium text-gray-900'>{todo.content}</h3>
              <div className='mt-2 text-sm text-gray-500'>
                Status: {todo.isDone ? 'Completed' : 'Pending'}
              </div>
              <div className='mt-2 text-sm text-gray-500'>
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className='flex space-x-2'>
              <button
                onClick={() => handleUpdate(todo)}
                className='p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors'
                aria-label='Edit todo'
                disabled={isPending}
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(todo)}
                className='p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
                aria-label='Delete todo'
                disabled={isPending}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
