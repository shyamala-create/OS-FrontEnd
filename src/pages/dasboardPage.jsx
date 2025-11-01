import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://online-assessment-backend-wnre.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (!user) return <div className="p-6 text-red-500">No user found. Please log in again.</div>;

  // ✅ Redirect admins into AdminDashboard layout
  if (user.role === "admin") {
    navigate("/admin/exams"); // or just "/admin" to show sidebar + default route
    return null;
  }

  if(user.role === "proctor"){
    navigate("/proctoring");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.firstName} 👋 ({user.role})
      </h1>

      {/* Student Dashboard */}
      {user.role === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Available Exams" link="/student/exams" />
          <Card title="My Results" link="/student/results" />
        </div>
      )}

      {/* Proctor Dashboard */}
      {user.role === "proctor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Live Monitoring" link="/proctoring/monitoring" />
          <Card title="Flagged Incidents" link="/proctor/incidents" />
        </div>
      )}
    </div>
  );
}

function Card({ title, link }) {
  return (
    <a
      href={link}
      className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </a>
  );
}
