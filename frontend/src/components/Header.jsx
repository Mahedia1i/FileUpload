import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <h2 className="text-xl font-bold">Header</h2>
      <nav className="space-x-4">
        <Link to="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
          Profile Form
        </Link>
        <Link to="/data" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          Show Data
        </Link>
      </nav>
    </header>
  );
}

export default Header;
