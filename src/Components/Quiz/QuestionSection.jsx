import React from "react";

function QuestionSection({
  question,
  selectedOption,
  onOptionClick,
  showAnswer,
  correctAnswer,
}) {
  return (
    <div className="question-section">
      <h2>{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${
            selectedOption === index ? "selected" : ""
          }`}
          onClick={() => onOptionClick(index)}
        >
          {option}
        </button>
      ))}
      {showAnswer && (
        <div>
          <p>
            <strong>Correct Answer:</strong> {question.options[correctAnswer]}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
