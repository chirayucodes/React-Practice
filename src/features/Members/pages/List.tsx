import { useNavigate } from "react-router";
import { useMemberQuery } from "../queries";
import { Loader } from "shared/components/loader";
import { Grid } from "shared/components/grid";

export default function MemberList() {
  const navigate = useNavigate();
  const { data, isLoading } = useMemberQuery();
  // const { isPending: isDeleting, mutateAsync: deleteMember } =
  //   useRemoveMemberMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Member Details
        </h1>

        <button
          onClick={() => navigate("/members/create")}
          className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          + Add Member
        </button>

        {!data || data.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            No Members Found
          </div>
        ) : (
          <Grid<Master.MemberForm>
            data={data}
            columns={[
              {
                field: "name",
                header: "Member Name",
              },
              {
                field: "typeName",
                header: "Member Type",
              },
            ]}
          />
        )}
      </>
    </div>
  );
}
