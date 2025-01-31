import React from "react";
import "./QuestionTracker.css";

function QuestionTracker({ questions, userAnswers }) {
  return (
    <div className="question-tracker">
      {questions.map((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        const isUnanswered = userAnswers[index] === null;
        return (
          <div
            key={index}
            className={`tracker-item ${
              isUnanswered ? "unanswered" : isCorrect ? "correct" : "wrong"
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
