import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'

import Table from './components/Table'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  )
}

export default App
