'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='text-center py-12'>
        <h1 className='text-3xl font-bold text-red-600 mb-4'>Something went wrong!</h1>
        <p className='text-gray-600 mb-6'>
          We encountered an error while loading your todos. Please try again.
        </p>
        <button
          onClick={reset}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
        >
          Try again
        </button>
      </div>
    </main>
  )
}
