'use client'

import { useState, useTransition } from 'react'
import { createTodo } from '../../actions/todo'
import { Todo } from '../types/todo'

export default function CreateTodo({ onAdd }: { onAdd: (optimisticTodo: Todo) => void }) {
  const [isPending, startTransition] = useTransition()
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      const serverTodo = await createTodo(content.trim())
      if (!serverTodo) return

      onAdd(serverTodo)
      setContent('')
    })
  }

  return (
    <div className='mb-8 p-4 bg-white rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-4'>Create New Todo</h2>
      <form
        onSubmit={handleSubmit}
        className='flex'
      >
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='What needs to be done?'
          className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isPending}
        />
        <button
          type='submit'
          disabled={isPending}
          className={`ml-2 px-4 py-2 text-white rounded-md transition-all ${
            isPending
              ? 'bg-blue-400 cursor-not-allowed flex items-center'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isPending ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </form>
    </div>
  )
}
