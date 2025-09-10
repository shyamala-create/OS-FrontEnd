const AvailableExams = () => {
  const exams = [
    { id: 1, title: "JavaScript Basics", date: "2025-09-15", duration: "60 mins" },
    { id: 2, title: "React Fundamentals", date: "2025-09-18", duration: "90 mins" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Exams</h2>
      <div className="grid gap-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{exam.title}</h3>
            <p className="text-gray-600">Date: {exam.date}</p>
            <p className="text-gray-600">Duration: {exam.duration}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableExams;
