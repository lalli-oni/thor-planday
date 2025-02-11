import { useData } from './api'


function Table() {
  const { status, data, error, isFetching } = useData()

  return (
    <div>Placeholder</div>
  )
}

export default Table
