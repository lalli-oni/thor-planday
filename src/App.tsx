import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ThingsTable from './components/ThingsTable'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThingsTable />
    </QueryClientProvider>
  )
}

export default App
