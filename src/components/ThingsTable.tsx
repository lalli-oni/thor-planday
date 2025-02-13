import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import styled from "styled-components";

import { type QueryResponse, type Thing } from "../api";

export type FetchDirection = 'forward' | 'backward';

export interface ThingsTableProps {
  data?: QueryResponse<Thing>;
  isFetching: boolean;
  error: Error | null;
  onPaginationChange?: (direction: FetchDirection) => void;
  pagination: { hasNextPage: boolean; hasPreviousPage: boolean; pageIndex: number; };
}

const TableContainer = styled.div`
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`

const ActionBar = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.input.attrs({ type: 'submit' })`
  padding: 0.3rem;
`

const Image = styled.img`
  max-height: 10rem;
`

const TableHeader = styled.th`
  width: 20rem;
`

const TableCell = styled.td`
  width: 20rem;
  text-align: center;
`

function ThingsTable(props: ThingsTableProps) {
  const { data, isFetching, error, onPaginationChange, pagination } = props
  const thingsData = data?.payload ? data.payload : []
  const columnHelper = createColumnHelper<Thing>()

  const columnDefinitions = [
    columnHelper.accessor('description', {
      header: () => (<span>Description</span>),
      cell: info => info.renderValue()
    }),
    columnHelper.accessor('imagePath', {
      header: () => (<span>Image</span>),
      cell: info => (<Image src={info.getValue()} />)
    }),
  ]

  const table = useReactTable({
    data: thingsData,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
  })

  const pageReady = !isFetching && !error
  const pageEdges = [data?.payload[0]?.id, data?.payload[data?.payload?.length - 1]?.id]
  const edgeText = pageEdges.every(d => d !== undefined) ? `(${pageEdges[0] + 1}/${pageEdges[1] + 1})` : ''
  const paginationInfo = pageReady ? `${edgeText} page ${pagination.pageIndex + 1}` : '. . .'

  return (
    <TableContainer>
      <TopBar>
        <ActionBar>
          <Button type="button"
            disabled={onPaginationChange === undefined || !pagination.hasPreviousPage}
            onClick={() => {
                if (onPaginationChange) onPaginationChange("backward")
            }}
            value="Previous"
          />
          <Button type="button"
            disabled={onPaginationChange === undefined || !pagination.hasNextPage}
            onClick={() => {
                if (onPaginationChange) onPaginationChange("forward")
            }}
            value="Next"
          />
        </ActionBar>
        <div>
          <span>{paginationInfo}</span>
        </div>
      </TopBar>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data?.payload?.length ?
            table.getRowModel().rows.map(row => (
              <tr tabIndex={0} key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </tr>
            ))
          : null}
        </tbody>
      </table>
      {!isFetching && !error && !data?.payload?.length ? <div>no results</div> : null}
      {isFetching ? <div>Loading...</div> : null}
      {error ? <div>Error while loading data! {error.message}</div> : null}
    </TableContainer>
  )
}

export default ThingsTable
