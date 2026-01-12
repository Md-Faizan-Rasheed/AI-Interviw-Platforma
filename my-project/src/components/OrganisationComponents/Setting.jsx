import React, { useEffect, useState } from 'react';
import Onavbar from './Onavbar';
import { Pencil } from "lucide-react";

const Settings = () => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    emp_size:9,
    field_of_work: "Media & Entertainment",
    interviewIntroVideo: "",
    companyLocation: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/jobs/api/user-id', {
          method: 'POST',
          headers: {
            'authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token }) 
        });

        if (!response.ok) throw new Error('Failed to fetch user ID');
        const data = await response.json();
        setUserId(data.userId);
        fetchUserData(data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/api/users/${userId}`);
      const data = await response.json();
console.log("Data came from the DB",data)
console.log("Email in Setting section",data.email)

      setFormData({
        company_name: data.company_name  || "",
        emp_size: data.emp_size || "1-10 employees",
        field_of_work: data.field_of_work || "Media & Entertainment",
        interviewIntroVideo: data.interviewIntroVideo || "",
        companyLocation: data.companyLocation || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/jobs/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User information updated successfully!");
        alert("User information updated successfully!")
      }
      else console.log("Failed to update user information.");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Onavbar/>
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Organization Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name <span className="text-red-500">*</span></label>
            <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required className="mt-2 p-2 w-full border rounded" />
            </div>

          <div className="mb-4">
            <label className="block text-gray-700">Company Size</label>
            <select name="emp_size" value={formData.emp_size} onChange={handleChange} className="mt-2 p-2 w-full border rounded">
              <option>10 </option>
              <option>50 </option>
              <option>200 </option>
              <option>500 </option>
              <option>1500</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Industry <span className="text-red-500">*</span></label>
            <select name="field_of_work" value={formData.field_of_work} onChange={handleChange} required className="mt-2 p-2 w-full border rounded">
              <option>Media & Entertainment</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Interview Intro Video (URL)</label>
            <input type="text" name="interviewIntroVideo" value={formData.interviewIntroVideo} onChange={handleChange} className="mt-2 p-2 w-full border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Company Location</label>
            <input type="text" name="companyLocation" value={formData.companyLocation} onChange={handleChange} className="mt-2 p-2 w-full border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-2 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="mt-2 p-2 w-full border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="mt-2 p-2 w-full border rounded" />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-40 hover:bg-blue-700">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

