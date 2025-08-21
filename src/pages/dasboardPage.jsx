import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name} 👋 ({user.role})
      </h1>

      {user.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Manage Exams" link="/admin/exams" />
          <Card title="Question Banks" link="/admin/questions" />
          <Card title="Reports & Analytics" link="/admin/reports" />
          <Card title="User Management" link="/admin/users" />
        </div>
      )}

      {user.role === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Available Exams" link="/student/exams" />
          <Card title="My Results" link="/student/results" />
        </div>
      )}

      {user.role === "proctor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Live Monitoring" link="/proctor/monitoring" />
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
