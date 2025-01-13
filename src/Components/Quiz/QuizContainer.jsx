import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import QuizResult from "./QuizResult";
import QuizReview from "./QuizReview";
import Timer from "./Timer";
import HomeLink from "./HomeLink";
import { config } from "../../configvariable";

function QuizContainer() {
  const { id, subcategory } = useParams();
  const [quizData, setQuizData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    const quizPath = config.QUIZPATHS[id]?.[subcategory];
    if (!quizPath) {
      setError("Invalid category or subcategory.");
      return;
    }

    fetch(quizPath)
      .then((response) => response.json())
      .then((data) => setQuizData(data[0]))
      .catch((error) => setError(`Error fetching quizzes: ${error.message}`));
  }, [id, subcategory]);

  const handleOptionClick = (index) => {
    if (selectedOption === null) {
      setSelectedOption(index);
      setShowAnswer(true);
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [
          ...prevAnswers.slice(0, currentQuestionIndex),
          index,
          ...prevAnswers.slice(currentQuestionIndex + 1),
        ];
        return updatedAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    setTotalTime((prevTime) => prevTime + (30 - timer));
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      if (selectedOption !== null) {
        setUserAnswers((prevAnswers) => [
          ...prevAnswers.slice(0, currentQuestionIndex),
          selectedOption,
        ]);
      }
    }
  };

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
  };

  // Calculate the score
  const calculateScore = () => {
    const { questions } = quizData;
    return userAnswers.filter(
      (answer, index) => answer === questions[index]?.answer
    ).length;
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

  const score = calculateScore(); // Define score

  return (
    <div className="quiz-container">
      <HomeLink />
      <h1 className="quiz-title">{quizData.title}</h1>
      {reviewMode ? (
        <QuizReview
          questions={questions}
          userAnswers={userAnswers}
          toggleReviewMode={toggleReviewMode}
        />
      ) : isQuizCompleted ? (
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          accuracy={(score / questions.length) * 100}
          totalTime={totalTime}
          toggleReviewMode={toggleReviewMode}
        />
      ) : (
        <>
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <Timer
            timer={timer}
            setTimer={setTimer}
            handleNextQuestion={handleNextQuestion}
          />
          {currentQuestion && (
            <QuestionSection
              question={currentQuestion}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              showAnswer={showAnswer}
              correctAnswer={currentQuestion.answer}
            />
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

export default QuizContainer;
