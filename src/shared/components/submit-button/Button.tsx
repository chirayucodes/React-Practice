interface ButtonProps {
  caption: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  caption,
  type = "submit",
  ...rest
}: ButtonProps) {
  return (
    <button
      // className="m-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
      className="item-center m-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transitionfont-bold focus:outline-none focus:shadow-outline disabled:opacity-25"
      type={type}
      onClick={rest.onClick}
      disabled={rest.disabled}
    >
      {caption}
    </button>
  );
}
