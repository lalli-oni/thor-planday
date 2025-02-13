import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Table from './components/common/organisms/Table'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  )
}

export default App
