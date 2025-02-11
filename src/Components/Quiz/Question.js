import React from "react";
import PropTypes from "prop-types";
import "./Question.css";

function Question({
  question,
  selectedOption,
  onOptionClick,
  showAnswer,
  correctAnswer,
}) {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <ul className="options-list">
        {question.options.map((option, index) => (
          <li
            key={index}
            className={`option ${
              showAnswer
                ? index === correctAnswer
                  ? "correct"
                  : index === selectedOption
                  ? "wrong"
                  : ""
                : ""
            } ${index === selectedOption ? "selected" : ""}`}
            onClick={() => onOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  selectedOption: PropTypes.number,
  onOptionClick: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

export default Question;
