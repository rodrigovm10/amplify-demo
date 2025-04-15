import { fetchTodos } from '@/services/todo'
import TodoWrapper from '@/components/TodoWrapper'

export default async function Home() {
  const todos = await fetchTodos()

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>My Todos</h1>

      <TodoWrapper initialTodos={todos} />
    </main>
  )
}
