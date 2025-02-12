import { useThings } from './api'

import ThingsTable from './ThingsTable'


function Table() {
  const { data, error, isFetching } = useThings()

  return (
    <ThingsTable data={data} isFetching={isFetching} error={error} />
  )
}

export default Table
