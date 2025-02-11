import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>Table Placeholder</div>
    </QueryClientProvider>
  )
}

export default App
