import React from "react";
import "./QuizResult.css"; // Import the fancy CSS

function QuizResult({
  score,
  totalQuestions,
  accuracy,
  totalTime,
  toggleReviewMode,
}) {
  return (
    <div className="quiz-completed">
      <h2>Quiz Completed!</h2>
      <p>
        Your score: <strong>{score}</strong> / <strong>{totalQuestions}</strong>
      </p>
      <p>
        Accuracy: <strong>{accuracy.toFixed(2)}%</strong>
      </p>
      <p>
        Total Time: <strong>{totalTime}</strong> seconds
      </p>
      <button className="review-button" onClick={toggleReviewMode}>
        Review Answers
      </button>
    </div>
  );
}

export default QuizResult;
