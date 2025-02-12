import { useQuery } from "@tanstack/react-query"

export interface QueryResponse<T> {
  payload: Array<T>;
  meta: {
    previousCursor?: string;
    nextCursor?: string;
  }
}

export interface Thing {
	title: string;
	description: string;
	imagePath: string;
}

function useThings() {
  return useQuery({
    queryKey: ['thing'],
    retry: false,
    queryFn: async (): Promise<Response<Thing>> => {
      const response = await fetch('http://localhost:3000')
      return await response.json()
    },
  })
}

export { useThings }