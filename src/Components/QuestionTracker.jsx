import React from "react";
import "./QuestionTracker.css";

function QuestionTracker({ questions, userAnswers }) {
  return (
    <div className="question-tracker">
      {questions.map((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        return (
          <div
            key={index}
            className={`tracker-item ${isCorrect ? "correct" : "wrong"} ${
              userAnswers[index] == null ? "unanswered" : ""
            }`}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default QuestionTracker;
