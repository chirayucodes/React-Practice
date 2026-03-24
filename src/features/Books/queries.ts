import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "services";

const QUERY_KEY = ['books'];


export function useBooksQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.BookForm[]>('books');
    },
  });
}


export function useCreateBookMutation() {
  const queryClient = useQueryClient();
  return  useMutation({
    mutationFn: async (book: Master.BookDetails) => {
      const result = await ApiService.post<Master.BookForm>("books", book);
      if (!result) {
        throw new Error("Failed to create book");
      }
      return result;
    },
    onSuccess: (result: Master.BookForm) => {
      if (!result) {
        return;
      }

      const existingBooks =
        queryClient.getQueryData<Master.BookForm[]>(QUERY_KEY);

      if (!existingBooks) return;
      queryClient.setQueryData<Master.BookForm[]>(QUERY_KEY, [
        ...existingBooks,
        result,
      ]);
    },
  });
} 

export function useDeleteBookMutation() {
const queryClient = useQueryClient();
const rs = useMutation({
    mutationFn: (id: number) => 
         ApiService.del('master/books/'+ id),
    onSuccess: (_, id) => {
        const data = queryClient.getQueryData<Master.BookForm[]>(QUERY_KEY);
        if (!data){
            return;
        }
        const newData = data.filter((b) => b.id !== id);
        queryClient.setQueryData(QUERY_KEY, newData);
    },     
});

        return rs;
}