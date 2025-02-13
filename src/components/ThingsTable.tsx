import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { type QueryResponse, type Thing } from "../api";

export type FetchDirection = 'forward' | 'backward';

export interface ThingsTableProps {
  data?: QueryResponse<Thing>;
  isFetching: boolean;
  error: Error | null;
  onPaginationChange?: (direction: FetchDirection) => void;
  pagination: { hasNextPage: boolean; hasPreviousPage: boolean; pageIndex: number; };
}


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
      cell: info => (<img src={info.getValue()} />)
    }),
  ]

  const table = useReactTable({
    data: thingsData,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div>
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
        <span>Showing {data?.payload?.length} rows of page {pagination.pageIndex}</span>
        <span>{data?.meta?.previousCursor} {data?.meta?.nextCursor}</span>
      </div>
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
      {!isFetching && !error ? <div>no results</div> : null}
      {isFetching ? <div>Loading...</div> : null}
      {error ? <div>Error while loading data! {error.message}</div> : null}
    </>
  )
}

export default ThingsTable
