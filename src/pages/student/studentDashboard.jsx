import { NavLink, Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-green-600">Student Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/student/exams"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Available Exams
          </NavLink>
          <NavLink
            to="/student/results"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            My Results
          </NavLink>
          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
