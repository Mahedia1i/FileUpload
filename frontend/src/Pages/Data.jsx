import React, { useState, useEffect } from "react";
import axios from "axios";

function Data() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Users from Backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/get-data");
        console.log(response);
        
        setUsers(response.data); 
      } catch (error) {
        setError("Failed to fetch users");
        console.error("❌ Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Uploaded Users</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="border p-4 rounded-md shadow">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex space-x-4 mt-2">
                <div>
                  <p className="text-sm font-semibold">Photo:</p>
                  <img src={user.photo} alt="User" className="w-24 h-24 rounded-md object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Signature:</p>
                  <img src={user.signature} alt="Signature" className="w-24 h-24 rounded-md object-cover" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Data;
