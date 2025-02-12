import { useThings } from './api'

import ThingsTable from './ThingsTable'


function Table() {
  const { status, data, error, isFetching } = useThings()

  return (
    <ThingsTable data={data} isFetching={isFetching} />
  )
}

export default Table
