import { Link } from "react-router";
import Button from "shared/components/home-button/index";

export default function Home() {
  return (
    <div className=" min-h-screen bg-linear-to-r from-black to-indigo-600 flex items-center justify-center rounded-3xl ">
      <div className=" z-10 opacity-100 bg-transparent shadow-xl border-black shadow-black rounded-2xl p-10 text-center max-w-xl">
        <p className=" text-4xl font-bold bg-linear-to-r from-indigo-600 via-white to-black mb-4 text-transparent bg-clip-text">
          Welcome to Library Management System
        </p>

        <p className="text-white tracking-tight mb-8">
          Manage your books, authors, and publishers easily with this modern
          library management platform.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="Books">
            <Button label={["Books"]} />
          </Link>

          <Link to="Members">
            <Button label={["Members"]} />
          </Link>
        </div>
      </div>
    </div>
  );
}
