import { Link } from "react-router";

export default function Home() {
  return (
    <div className="  min-h-screen bg-gradient-to-r from-black to-indigo-600 flex items-center justify-center rounded-3xl ">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-xl">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Library Management System 
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your books, authors, and publishers easily with this modern
          library management platform.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            to="/books"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Books
          </Link>

          <Link
            to="/"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}

