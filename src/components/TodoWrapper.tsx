'use client'

import { useOptimistic, useState } from 'react'
import TodoList from './TodoList'
import CreateTodo from './CreateTodo'

interface Todo {
  id: string
  content: string | null
  isDone: boolean | null
  createdAt: string
  updatedAt: string
}

export default function TodoWrapper({ initialTodos }: { initialTodos: Todo[] }) {
  const [optimisticTodos, addNewTodo] = useOptimistic(
    initialTodos,
    (currentTodos, newTodo: Todo) => [...currentTodos, newTodo]
  )

  const handleAddTodo = (optimisticTodo: Todo) => {
    addNewTodo(optimisticTodo)
  }

  return (
    <div>
      <CreateTodo onAdd={handleAddTodo} />
      <TodoList todos={optimisticTodos} />
    </div>
  )
}
