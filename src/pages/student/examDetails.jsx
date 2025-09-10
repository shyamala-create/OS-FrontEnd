import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/exams/${examId}`, {
          withCredentials: true,
        });
        setExam(res.data);
      } catch (err) {
        console.error("Error fetching exam details:", err);
      }
    };
    fetchExam();
  }, [examId]);

  if (!exam) return <p className="p-6">Loading exam details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl border">
      <h2 className="text-2xl font-bold mb-4">{exam.title}</h2>
      <p className="text-gray-700 mb-2">📅 Date: {new Date(exam.date).toLocaleString()}</p>
      <p className="text-gray-700 mb-2">⏱ Duration: {exam.duration} minutes</p>
      <p className="text-gray-700 mb-4">📝 Description: {exam.description}</p>
      <button
        onClick={async () => {
          try {
            await axios.post(
              "http://localhost:3000/api/exams/enroll",
              { examId },
              { withCredentials: true }
            );
            alert("Enrolled successfully!");
          } catch (err) {
            console.error("Enrollment failed", err);
          }
        }}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default ExamDetails;
