import { Link, Routes, Route } from "react-router";
import Books from "./features/Books";
import Home from "./features/Home";
import Members from "./features/Members";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="bg-linear-to-r from-black to-indigo-600 m-4 p-4 flex  justify-center text-center rounded-2xl text-white gap-5 ">
        <Link to="/" className="text-white font-semibold">
          Home
        </Link>
        |
        <Link to="/books/list" className="text-white font-semibold ">
          Books
        </Link>
        |
        <Link to="/members/list" className="text-white font-semibold">
          Members
        </Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/books/*" element={<Books />} />
          <Route path="/members/*" element={<Members />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
