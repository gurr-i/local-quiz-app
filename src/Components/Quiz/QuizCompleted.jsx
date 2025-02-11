import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Card, Typography } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

function QuizCompleted({
  score,
  questions,
  accuracy,
  totalTime,
  toggleReviewMode,
}) {
  // Data for the bar chart
  //   const score = calculateScore();
  //   const accuracy = calculateAccuracy().toFixed(2);

  const data = {
    labels: ["Accuracy"],
    datasets: [
      {
        label: "Quiz Results",
        data: [accuracy],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["Score"],
    datasets: [
      {
        label: "Score",
        data: [score],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="quiz-card" bordered={false}>
      <AntTitle level={2}>Quiz Completed!</AntTitle>

      {/* Results Summary */}
      <div className="results">
        <Typography.Paragraph>
          Your score:{" "}
          <strong>
            {score} / {questions.length}
          </strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Accuracy: <strong>{accuracy}%</strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Total Time: <strong>{totalTime} seconds</strong>
        </Typography.Paragraph>
      </div>

      {/* Chart Containers */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <div className="chart-container">
        <Bar data={data2} options={options} />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => window.location.reload()}
      >
        Retake Quiz
      </Button>

      {/* Review Button */}
      <Button
        className="review-button"
        type="primary"
        size="large"
        onClick={toggleReviewMode}
      >
        Review Answers
      </Button>
    </Card>
  );
}

export default QuizCompleted;
