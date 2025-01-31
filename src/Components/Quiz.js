import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Question from "./Question";
import "./Quiz.css"; // Import updated CSS for fancy styling
import QuestionTracker from "./QuestionTracker";
import QuizCompleted from "./QuizCompleted";
import { Button, Card, Typography, Spin } from "antd";
import backgroundImage from "../assets/5442676.jpg"; // Import the image

const { Title, Paragraph } = Typography;
const config = require("../configvariable");

function Quiz() {
  const { id, subcategory } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch quiz data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizPath = config.QUIZPATHS[id]?.[subcategory];
        if (!quizPath) {
          throw new Error("Quiz not found.");
        }
        const fullUrl = `${config.BASE_URL}${quizPath}`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizData(data[0]); // Ensure data is an array and has at least one item
          setUserAnswers(new Array(data[0].questions.length).fill(null)); // Initialize userAnswers
        } else {
          throw new Error("Invalid quiz data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, subcategory, handleNextQuestion]);

  // Handle moving to the next question
  const handleNextQuestion = useCallback(() => {
    if (!quizData?.questions || quizData.questions.length === 0) return;

    // Update total time
    setTotalTime((prevTime) => prevTime + (30 - timer));

    // Update userAnswers array with the selected option (or null if unanswered)
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      return updatedAnswers;
    });

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30); // Reset timer for the next question
    }
  }, [quizData, currentQuestionIndex, selectedOption, timer]);

  // Timer logic
  useEffect(() => {
    let countdown;
    if (!reviewMode && currentQuestionIndex < quizData?.questions.length) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion(); // Call handleNextQuestion when timer runs out
            return 30; // Reset timer
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [currentQuestionIndex, handleNextQuestion, reviewMode, quizData]);

  // Helper function to convert answer (text or index) to index
  const getAnswerIndex = (answer, options) => {
    if (typeof answer === "number") {
      return answer; // Already an index
    } else if (typeof answer === "string") {
      return options.indexOf(answer); // Convert text to index
    }
    return null; // Invalid answer
  };

  // Handle option selection
  const handleOptionClick = (answer) => {
    if (selectedOption === null) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const answerIndex = getAnswerIndex(answer, currentQuestion.options);

      if (answerIndex !== null) {
        setSelectedOption(answerIndex);
        setShowAnswer(true);
        setUserAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentQuestionIndex] = answerIndex;
          return updatedAnswers;
        });
      }
    }
  };

  // Calculate score
  const score = useMemo(() => {
    return userAnswers.filter((answer, index) => {
      const correctAnswerIndex = getAnswerIndex(
        quizData?.questions[index]?.answer,
        quizData?.questions[index]?.options
      );
      return answer === correctAnswerIndex;
    }).length;
  }, [userAnswers, quizData]);

  // Calculate accuracy
  const calculateAccuracy = useMemo(() => {
    const totalQuestions = quizData?.questions.length || 0;
    return totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  }, [score, quizData]);

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setUserAnswers(new Array(quizData.questions.length).fill(null));
    setTimer(30);
    setTotalTime(0);
    setReviewMode(false);
  };

  if (error) {
    return (
      <div
        className="quiz-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Typography.Title level={4} type="danger">
          Error: {error}
        </Typography.Title>
        <Link to="/local-quiz-app/Home" className="home-button">
          Go Back to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="quiz-container">
        <Spin size="large" className="loading-spinner" />
        <p>Loading quiz data...</p>
      </div>
    );
  }

  if (!quizData?.questions) {
    return (
      <div className="quiz-container">
        <Typography.Title level={4} type="danger">
          No quiz data found.
        </Typography.Title>
        <Link to="/local-quiz-app/Home" className="home-button">
          Go Back to Home
        </Link>
      </div>
    );
  }

  const { questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];
  const isQuizCompleted =
    currentQuestionIndex === questions.length - 1 && selectedOption !== null;

  return (
    <div className="quiz-container">
      <Title level={1} className="quiz-title">
        {quizData.title}
      </Title>
      <div className="question-tracker">
        {questions.map((question, index) => {
          const isCorrect =
            userAnswers[index] ===
            getAnswerIndex(question.answer, question.options);
          return (
            <div
              key={index}
              className={`tracker-item ${isCorrect ? "correct" : "wrong"} ${userAnswers[index] == null ? "unanswered" : ""
                }`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      {reviewMode ? (
        <div className="quiz-review">
          <Card className="review-card" bordered={false}>
            <Title level={2}>Review Your Answers</Title>
            {questions.map((question, index) => (
              <Card
                key={index}
                className="review-item"
                style={{ marginBottom: 20 }}
              >
                <Paragraph>
                  <strong>Q{index + 1}:</strong> {question.question}
                </Paragraph>
                <Paragraph>
                  <strong>Your Answer:</strong>{" "}
                  {userAnswers[index] !== null
                    ? question.options[userAnswers[index]]
                    : "Not Answered"}
                </Paragraph>
                <Paragraph>
                  <strong>Correct Answer:</strong>{" "}
                  {question.options[
                    getAnswerIndex(question.answer, question.options)
                  ]}
                </Paragraph>
              </Card>
            ))}
            <Button
              type="dashed"
              size="large"
              onClick={() => setReviewMode(false)}
              style={{ width: "100%" }}
            >
              Back to Results
            </Button>
          </Card>
        </div>
      ) : isQuizCompleted ? (
        <QuizCompleted
          score={score}
          questions={questions}
          accuracy={calculateAccuracy}
          totalTime={totalTime}
          toggleReviewMode={() => setReviewMode(true)}
          restartQuiz={restartQuiz}
        />
      ) : (
        <>
          <p className="question-info">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="timer">Time Remaining: {timer}s</p>
          {currentQuestion ? (
            <Question
              question={currentQuestion}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              showAnswer={showAnswer}
              correctAnswer={getAnswerIndex(
                currentQuestion.answer,
                currentQuestion.options
              )}
            />
          ) : (
            <div>Loading...</div>
          )}
          <Button
            type="primary"
            onClick={handleNextQuestion}
            disabled={!showAnswer}
            className="next-button"
          >
            {currentQuestionIndex === questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
          </Button>
        </>
      )}
    </div>
  );
}

export default Quiz;