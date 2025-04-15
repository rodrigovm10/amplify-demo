'use server'

import { generateClient } from 'aws-amplify/data'
import { Schema } from '../amplify/data/resource'
import { revalidatePath } from 'next/cache'

const client = generateClient<Schema>()

export const createTodo = async (content: string) => {
  const { data, errors } = await client.models.Todo.create({
    content,
  })

  if (errors) {
    throw new Error('Failed to create todo')
  }

  revalidatePath('/')

  return data
}

export const deleteTodo = async (id: string) => {
  const { data: deletedTodo, errors } = await client.models.Todo.delete({ id })

  if (errors) {
    throw new Error('Failed to delete todo')
  }

  revalidatePath('/')

  return deletedTodo
}
