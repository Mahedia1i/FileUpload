import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    signature: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle text inputs (Name, Email)
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs (Photo, Signature)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setLoading(true); // Start loading state

    // Prepare form data to send
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("photo", formData.photo);
    formDataToSend.append("signature", formData.signature);

    console.log(formDataToSend);
    

    try {
      // Make API request
      const response = await axios.post("http://localhost:8000/api/v1/upload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Form submitted successfully!");
      console.log("✅ Response:", response.data);
    } catch (error) {
      setMessage("❌ Form submission failed!");
      console.error("❌ Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Form</h1>

      {/* Display Success or Error Messages */}
      {message && <p className="text-center font-semibold text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleTextChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block text-gray-700 font-medium">Upload Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Upload Signature */}
        <div>
          <label className="block text-gray-700 font-medium">Upload Signature</label>
          <input
            type="file"
            name="signature"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Form;
