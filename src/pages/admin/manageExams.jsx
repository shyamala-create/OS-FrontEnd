import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageExams = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([
    { id: 1, title: "JavaScript Basics", date: "2025-09-15", duration: "60 mins" },
    { id: 2, title: "React Fundamentals", date: "2025-09-20", duration: "90 mins" },
  ]);

  const handleViewQuestions = (examId) => {
    navigate(`/admin/exams/${examId}/questions`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Exams</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Exam Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{exam.id}</td>
                <td className="p-3">{exam.title}</td>
                <td className="p-3">{exam.date}</td>
                <td className="p-3">{exam.duration}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleViewQuestions(exam.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    View Questions
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageExams;
