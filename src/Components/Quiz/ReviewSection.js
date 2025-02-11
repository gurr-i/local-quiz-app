import React from "react";
import "./ReviewSection.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const ReviewSection = ({ questions, userAnswers }) => {
  return (
    <div className="review-section">
      <h2>Review Your Answers</h2>
      {questions.map((q, index) => (
        <div key={index} className="review-question">
          <p style={{ color: "#007bff" }}>
            <strong>Q{index + 1}:</strong> {q.question}
          </p>
          <p>Your Answer: {q.options[userAnswers[index]] || "Not Answered"}</p>
          <p>Correct Answer: {q.options[q.answer]}</p>
        </div>
      ))}
      <Button type="primary" block className="start-quiz-button">
        <Link to={`/local-quiz-app/`}>Home</Link>
      </Button>
    </div>
  );
};

export default ReviewSection;
