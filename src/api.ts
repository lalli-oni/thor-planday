import { useQuery } from "@tanstack/react-query"

export interface Data {
	title: string;
	description: string;
	imagePath: string;
}

function useData() {
  return useQuery({
    queryKey: ['data'],
    queryFn: async (): Promise<Array<Data>> => {
      const response = await fetch('http://localhost:3000')
      return await response.json()
    },
  })
}

export { useData }