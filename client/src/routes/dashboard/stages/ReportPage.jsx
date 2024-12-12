import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLocation, useNavigate } from "react-router-dom";

// Register required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.predictions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>No data available. Please return to the upload page.</p>
        <button
          onClick={() => navigate("/upload")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { predictions } = state;

  const barData = {
    labels: [
      "Plinth Beam Construction",
      "Backfilling and Compaction",
      "Retaining Walls (if applicable)",
      "Waterproofing and Damp-Proofing",
      "Preparation for the Transition Stage",
    ],
    datasets: [
      {
        label: "Progress (%)",
        data: [100, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Construction Progress",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
  };

  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overall Construction Progress",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Site Name</h1>
        <div className="flex justify-between mb-6">
          <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-600">Weather: Sunny</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">
            Construction workers are wetting pre-cast concrete columns with water to cure them. Gunny bags are seen placed on plinth beams for curing. The foundation stage is nearly complete.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold">Predictions:</h3>
          <p> {predictions.stage}</p>
          <p> {predictions.activity}</p>
          <p> {predictions.components}</p>
          <p> {predictions.sub_stage_name}</p>
          <p> {predictions.overall_progress}%</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="font-semibold text-gray-700">Bar Chart</h4>
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="font-semibold text-gray-700">Pie Chart</h4>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          
          
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="font-semibold text-gray-700">
              <img src="assets/re1.png" />
            </h4>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="font-semibold text-gray-700">
              <img src="assets/re2.png" />
            </h4>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="font-semibold text-gray-700">
              <img src="assets/re3.png" />
            </h4>
          </div>
        </div>

        <button
          onClick={() => navigate("/upload")}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Upload
        </button>
      </div>
    </div>
  );
};

export default ReportPage;