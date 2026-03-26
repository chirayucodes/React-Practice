import { useNavigate } from "react-router";
import { useNewMemberMutation } from "../queries";
import Form from "../components/Form";

export default function Create() {
  const { mutateAsync } = useNewMemberMutation();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> Add New Member</h1>

      <button
        onClick={() => navigate("/members/list")}
        className="mb-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-black transition"
      >
        Back to List
      </button>

      <Form
        submitCaption="Add Member"
        onSubmit={async (members) => {
          await mutateAsync(members);
        }}
      />
    </div>
  );
}
