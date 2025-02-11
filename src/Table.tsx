import { useThings } from './api'


function Table() {
  const { status, data, error, isFetching } = useThings()

  return (
    <div>Placeholder</div>
  )
}

export default Table
