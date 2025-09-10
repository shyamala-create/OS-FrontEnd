import { useParams } from "react-router-dom";

const ExamDetails = () => {
  const { examId } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Exam Details (ID: {examId})</h2>
      <p className="mt-4 text-gray-700">
        Here you can show detailed instructions, schedule, and rules for this exam.
      </p>
      <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Start Exam
      </button>
    </div>
  );
};

export default ExamDetails;
