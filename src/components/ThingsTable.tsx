import { useCallback, useMemo, useState } from 'react'

import Table, { TableButton, type FetchDirection } from './common/organisms/Table'
import AddPictureModal from './AddPictureModal'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPictureMutationBody } from '../api'

function ThingsTable() {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [showAddPictureModal, setShowAddPictureModal] = useState<boolean>(false)

  const queryClient = useQueryClient()

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
      const host = 'https://planday-api.vercel.app'
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

  const addPictureMutation = useMutation({
    mutationFn: (newPicture: AddPictureMutationBody) => {
      return fetch('https://planday-api.vercel.app', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(newPicture)
      })
    }
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

  const onAddPicture = async (title: string, picture: string) => {
    try {
      await addPictureMutation.mutateAsync({ title, picture })
      queryClient.invalidateQueries({ queryKey: 'things' })
    } catch {
      // TODO (LTJ): Error handling
    }
    setShowAddPictureModal(false)
  }

  return (
    <>
      {showAddPictureModal ?
        <AddPictureModal
          isLoading={!addPictureMutation.isIdle && !addPictureMutation.isSuccess}
          onAddPicture={onAddPicture}
          onClose={() => setShowAddPictureModal(false)}
        />
      : null}
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
            Add tile
          </TableButton>}
      />
    </>
  )
}

export default ThingsTable
