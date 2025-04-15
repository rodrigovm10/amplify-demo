import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'

const client = generateClient<Schema>()

export const fetchTodos = async () => {
  const { data: todos, errors } = await client.models.Todo.list()

  if (errors) {
    throw new Error('Failed to fetch todos')
  }

  return todos
}
