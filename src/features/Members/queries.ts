import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "services";
const QUERY_KEY = ["Member"];

export function useMemberQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.MemberItems[]>("Members");
    },
  });
}

export function useRemoveMemberMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (memberId: number) => ApiService.del("Members/" + memberId),
    onSuccess: (_, memberId) => {
      const data = queryClient.getQueryData<Master.MemberItems[]>(QUERY_KEY);
      if (!data) {
        return;
      }
      const newData = data.filter((item) => item.id!== memberId);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}

// export function useUpdateMemberMutation(memberId: number) {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (member: Master.MemberForm) =>
//       await ApiService.put<Master.MemberItems[]>(
//         "Members/" + memberId,
//         member,
//       ),
//     onSuccess: (result) => {
//       if (!result) {
//         return;
//       }
//       const existing = queryClient.getQueryData<Master.MemberItems[]>(QUERY_KEY);
//       if (!existing) {
//         return;
//       }
//       const index = existing.findIndex(
//         (item) => item.id === memberId,
//       );
//       const first = existing.slice(0, index);
//       const next = existing.slice(index + 1);
//       queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
//     },
//   });
// }

export function useNewMemberMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member: Master.MemberForm) =>
      await ApiService.post("Members", member),
     onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.MemberItems[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY,[...existing,result]);
    },
  });
}