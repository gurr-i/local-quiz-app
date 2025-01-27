import React, { useState, useEffect, useMemo } from "react";
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
        if (Array.isArray(data)) {
          setQuizData(data[0]);
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
  }, [id, subcategory]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex]);

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
    if (!quizData?.questions || quizData.questions.length === 0) return;

    setTotalTime((prevTime) => prevTime + (30 - timer));

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      if (selectedOption !== null) {
        setUserAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentQuestionIndex] = selectedOption;
          return updatedAnswers;
        });
      }
    }
  };

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
  };

  const score = useMemo(() => {
    return userAnswers.filter(
      (answer, index) => answer === quizData?.questions[index]?.answer
    ).length;
  }, [userAnswers, quizData]);

  const calculateAccuracy = useMemo(() => {
    const totalQuestions = quizData?.questions.length || 0;
    return totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  }, [score, quizData]);

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
                  {question.options[userAnswers[index]] || "Not Answered"}
                </Paragraph>
                <Paragraph>
                  <strong>Correct Answer:</strong>{" "}
                  {question.options[question.answer]}
                </Paragraph>
              </Card>
            ))}
            <Button
              type="dashed"
              size="large"
              onClick={toggleReviewMode}
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
          toggleReviewMode={toggleReviewMode}
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
              correctAnswer={currentQuestion.answer}
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
