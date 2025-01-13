import React from "react";

function QuizReview({ questions, userAnswers, toggleReviewMode }) {
  return (
    <div className="quiz-review">
      <h2>Review Your Answers</h2>
      {questions.map((question, index) => (
        <div key={index} className="review-item">
          <p>
            <strong>Q{index + 1}:</strong> {question.question}
          </p>
          <p>
            <strong>Your Answer:</strong>{" "}
            {question.options[userAnswers[index]] || "Not Answered"}
          </p>
          <p>
            <strong>Correct Answer:</strong> {question.options[question.answer]}
          </p>
        </div>
      ))}
      <button className="back-button" onClick={toggleReviewMode}>
        Back to Results
      </button>
    </div>
  );
}

export default QuizReview;
