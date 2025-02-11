import { useQuery } from "@tanstack/react-query"

export interface Thing {
	title: string;
	description: string;
	imagePath: string;
}

function useThings() {
  return useQuery({
    queryKey: ['thing'],
    queryFn: async (): Promise<Array<Thing>> => {
      const response = await fetch('http://localhost:3000')
      return await response.json()
    },
  })
}

export { useThings }