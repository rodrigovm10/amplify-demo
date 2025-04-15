export default function Loading() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>My Todos</h1>
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className='animate-pulse'
          >
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          </div>
        ))}
      </div>
    </main>
  )
}
