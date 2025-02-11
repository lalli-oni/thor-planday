import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Thing } from "./api";

export interface ThingsTableProps {
  data?: Array<Thing>;
}


function ThingsTable(props: ThingsTableProps) {
  const { data } = props
  const thingsData = data !== undefined ? data : []
  const columnHelper = createColumnHelper<Thing>()

  const columnDefinitions = [
    columnHelper.accessor('title', {
      header: () => (<span>Title</span>),
      cell: info => info.getValue()
    }),
    columnHelper.accessor('description', {
      header: () => (<span>Description</span>),
      cell: info => info.getValue()
    }),
    columnHelper.accessor('imagePath', {
      header: () => (<span>Image</span>),
      cell: info => info.getValue()
    }),
  ]

  const table = useReactTable({
    data: thingsData,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ThingsTable
