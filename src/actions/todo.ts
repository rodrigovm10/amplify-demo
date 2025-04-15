import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../amplify/data/resource'

interface Todo {
  id: string
  content: string | null
  isDone: boolean | null
  createdAt: string
  updatedAt: string
}

export async function createTodo(content: string): Promise<Todo> {
  const client = generateClient<Schema>()
  const result = await client.models.Todo.create({
    content,
    isDone: false,
  })

  if (!result.data) {
    throw new Error('Failed to create todo')
  }

  // Ensure we return a non-null Todo
  return {
    id: result.data.id,
    content: result.data.content,
    isDone: result.data.isDone,
    createdAt: result.data.createdAt,
    updatedAt: result.data.updatedAt,
  }
}
