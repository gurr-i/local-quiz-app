import React from "react";

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
        Your score: {score} / {totalQuestions}
      </p>
      <p>Accuracy: {accuracy.toFixed(2)}%</p>
      <p>Total Time: {totalTime} seconds</p>
      <button className="review-button" onClick={toggleReviewMode}>
        Review Answers
      </button>
    </div>
  );
}

export default QuizResult;
