import { useCallback, useMemo, useState } from 'react'

import Table, { TableButton, type FetchDirection } from './common/organisms/Table'
import AddPictureModal from './AddPictureModal'

import { useInfiniteQuery } from '@tanstack/react-query'

function ThingsTable() {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [showAddPictureModal, setShowAddPictureModal] = useState<boolean>(false)
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['thing'],
    retry: false,
    initialPageParam: null,
    queryFn: async ({ pageParam, direction }) => {
      const host = 'http://localhost:3000'
      let response
      if (!pageParam) {
        response = await fetch(host)
      } else {
        const queryParams = new URLSearchParams()
        queryParams.append(direction === 'forward' ? 'startCursor' : 'endCursor', pageParam)
        response = await fetch(`${host}?${queryParams.toString()}`)
      }
      return await response.json()
    },
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.meta.previousCursor,
  })

  const onPaginationChange = useCallback((direction: FetchDirection) => {
    if (direction === 'forward') {
      const newIndex = pageIndex + 1
      setPageIndex(newIndex)
      if (!data?.pages[newIndex]) fetchNextPage()
    } else {
      const newIndex = pageIndex - 1
      setPageIndex(newIndex)
      if (!data?.pages[newIndex]) fetchPreviousPage()
    }
  }, [fetchNextPage, fetchPreviousPage, pageIndex, data?.pages])

  const pagination = useMemo(() => {
    return {
      hasNextPage: hasNextPage || data?.pages[pageIndex + 1] !== undefined,
      hasPreviousPage: hasPreviousPage || data?.pages[pageIndex - 1] !== undefined,
      pageIndex
    }
  }, [pageIndex, hasPreviousPage, hasNextPage, data?.pages])

  const onAddPicture = (title: string, picture: string) => {
    console.log(`${title} - ${picture}`)
    setShowAddPictureModal(false)
  }

  return (
    <>
      {showAddPictureModal ? <AddPictureModal onAddPicture={onAddPicture} onClose={() => setShowAddPictureModal(false)} /> : null}
      <Table
        data={data?.pages[pageIndex]}
        pagination={pagination}
        isFetching={isFetching}
        error={error}
        onPaginationChange={onPaginationChange}
        additionalControls={
          <TableButton key="add-picture"
            onClick={() => setShowAddPictureModal(true)}
            
          >
            Add picture
          </TableButton>}
      />
    </>
  )
}

export default ThingsTable
