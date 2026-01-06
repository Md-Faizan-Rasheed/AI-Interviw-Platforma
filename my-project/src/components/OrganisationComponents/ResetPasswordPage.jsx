import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
     console.log("Tokent in reset",resetToken);
     console.log("password",password);
    try {
      const response = await fetch("http://localhost:8080/jobs/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password updated successfully! You can log in now.");
      } else {
        setMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
