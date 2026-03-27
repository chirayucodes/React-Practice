import { useNavigate, useParams } from "react-router";
import { useUpdateMemberMutation } from "../queries";
import { useCallback } from "react";
import { ApiService } from "services";
import Form from "../components/Form";

interface EditRouteParams extends Record<string, string> {
  id: string;
}
export default function Edit() {
  const { id } = useParams<EditRouteParams>();
  const { mutateAsync } = useUpdateMemberMutation(parseInt(id!, 10));
  const navigate = useNavigate();
  const handleLoad = useCallback(
    async function () {
      const data = await ApiService.get<Master.MemberItems>("members/" + id);
      if (!data) {
        return {
          name: "",
          id: 0,
          typeName: "",
          memberTypeID: 0,
          maxBooks: 0,
        };
      }
      return data;
    },
    [id],
  );
  return (
    <div className="mt-10 px-6 text-black">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-black bg-clip-text">
          Edit Member Details
        </h1>

        <button
          onClick={() => navigate("/members/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>
      <Form
        onLoad={handleLoad}
        onSubmit={async (member) => {
          await mutateAsync(member);
        }}
        submitCaption="Update"
      />
    </div>
  );
}
