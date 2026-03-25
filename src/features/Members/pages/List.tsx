import { useNavigate } from "react-router";
import { useMemberQuery } from "../queries";
import { Loader } from "shared/components/loader";
import { Button } from "shared/components/submit-button";
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
    <div className="mt-10 px-6 text-black">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold bg-black text-transparent bg-clip-text">
          Member Details
        </h1>

        <Button
          caption="+ Add Member"
          type="button"
          onClick={() => navigate("/member/create")}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No Members Found</div>
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
    </div>
  );
}
