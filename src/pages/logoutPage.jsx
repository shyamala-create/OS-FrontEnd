import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://online-assessment-backend-wnre.onrender.com/api/auth/logout", {}, { withCredentials: true });
      navigate("/"); // redirect to login
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
