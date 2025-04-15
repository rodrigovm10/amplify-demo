'use client'

import { useState } from 'react'

export default function ErrorButton() {
  const [error, setError] = useState<Error | null>(null)

  const triggerError = () => {
    // This will trigger the error boundary
    setError(new Error('This is a test error'))
  }

  if (error) {
    throw error
  }

  return (
    <button
      onClick={triggerError}
      className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
    >
      Trigger Error
    </button>
  )
}
