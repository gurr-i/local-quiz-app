import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Question from "./Question";
import "./Quiz.css";
const config = require("../configvariable");

function Quiz() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(config.QUIZPATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data[id]) {
          setQuizData(data[id]);
        } else {
          throw new Error("Invalid quiz data or ID");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      });
  }, [id]);

  const handleOptionClick = (index) => {
    if (selectedOption === null) {
      // Prevent re-selection
      setSelectedOption(index);
      setShowAnswer(true);
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [
          ...prevAnswers.slice(0, currentQuestionIndex),
          index,
          ...prevAnswers.slice(currentQuestionIndex + 1),
        ];
        // console.log("Updated User Answers:", updatedAnswers);
        return updatedAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Ensure final answers are updated before finishing
      if (selectedOption !== null) {
        setUserAnswers((prevAnswers) => [
          ...prevAnswers.slice(0, currentQuestionIndex),
          selectedOption,
        ]);
      }
      // console.log("Final User Answers before completion:", userAnswers);
    }
  };

  const calculateScore = () => {
    const { questions } = quizData;
    const answeredQuestions = userAnswers.slice(0, questions.length);
    const correctAnswers = answeredQuestions.filter(
      (answer, index) => answer === questions[index]?.answer
    ).length;

    // console.log("User Answers:", userAnswers);
    // console.log("Questions:", questions);
    // console.log("Calculated Score:", correctAnswers);

    return correctAnswers;
  };

  const calculateAccuracy = () => {
    const { questions } = quizData;
    const totalQuestions = questions.length;
    const answeredQuestions = userAnswers.slice(0, totalQuestions);
    const score = calculateScore();

    // console.log("Total Questions:", totalQuestions);
    // console.log("Answered Questions:", answeredQuestions.length);
    // console.log(
    //   "Calculated Accuracy:",
    //   (score / answeredQuestions.length) * 100
    // );

    return totalQuestions > 0 ? (score / answeredQuestions.length) * 100 : 0;
  };

  if (error) {
    return <div className="quiz-container">Error: {error}</div>;
  }

  if (!quizData.questions) {
    return <div className="quiz-container">Loading...</div>;
  }

  const { questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];
  const isQuizCompleted =
    currentQuestionIndex === questions.length - 1 && selectedOption !== null;

  return (
    <div className="quiz-container">
      <Link to="/" className="home-button">
        Home
      </Link>
      <h1 className="quiz-title">{quizData.title}</h1>
      {isQuizCompleted ? (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {calculateScore()} / {questions.length}
          </p>
          <p>Accuracy: {calculateAccuracy().toFixed(2)}%</p>
        </div>
      ) : (
        <>
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          {currentQuestion ? (
            <Question
              question={currentQuestion}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              showAnswer={showAnswer}
              correctAnswer={currentQuestion.answer} // Pass the correct answer index
            />
          ) : (
            <div>Loading...</div>
          )}
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={!showAnswer}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
}

export default Quiz;
