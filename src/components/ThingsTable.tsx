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

const Image = styled.img`
  max-height: 10rem;
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

  return (
    <TableContainer>
      <TopBar>
        <ActionBar>
          <input type="button"
            disabled={onPaginationChange === undefined || !pagination.hasPreviousPage}
            onClick={() => {
                if (onPaginationChange) onPaginationChange("backward")
            }}
            value="Previous"
          />
          <input type="button"
            disabled={onPaginationChange === undefined || !pagination.hasNextPage}
            onClick={() => {
                if (onPaginationChange) onPaginationChange("forward")
            }}
            value="Next"
          />
        </ActionBar>
        <div>
          <span>{!isFetching && !error ? `${data?.payload?.length} rows of page ${pagination.pageIndex + 1}` : '. . .'}</span>
        </div>
      </TopBar>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data?.payload?.length ?
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
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
