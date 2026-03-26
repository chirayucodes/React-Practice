import { Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { TextBox } from "shared/components/form";
import { Button } from "shared/components/submit-button";
import { useMemberForm } from "./Member.Form";

interface FormProps {
  onSubmit: (p: Master.MemberForm) => Promise<void>;
  onLoad?: () => Promise<Master.MemberForm>;
  submitCaption?: string;
}

export default function Form({ onSubmit, onLoad, ...props }: FormProps) {
  const { get, handleSubmit, submitting } = useMemberForm(onLoad);
  const navigate = useNavigate();

  return (
    <div className="flex- justify-center">
      <form
        className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        onSubmit={handleSubmit(async (data: Master.MemberForm) => {
          await onSubmit(data);
          navigate("/members/list");
        })}
      >
        <TextBox label="Member Name" {...get("name")} />

        <Controller
          control={get("typeName").control}
          name="memberTypeID"
          render={({ field }) => (
            <select
              {...field}
              disabled={submitting}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Member Type</option>
              <option value={2}>Premium</option>
              <option value={1}>Standard</option>
            </select>
          )}
        />
        <Button
          caption={props.submitCaption || "Submit"}
          disabled={submitting}
        />
      </form>
    </div>
  );
}
