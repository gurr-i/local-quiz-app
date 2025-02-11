import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Question from "./Quiz/Question";
import QuizCompleted from "./Quiz/QuizCompleted";
import QuestionTracker from "./Quiz/QuestionTracker";
import ReviewSection from "./Quiz/ReviewSection";
import ErrorMessage from "./Quiz/ErrorMessage";
import LoadingSpinner from "./Quiz/LoadingSpinner";
import { Button, Typography } from "antd";
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import backgroundImage from "../assets/5442676.jpg";
import "./Quiz.css";

const { Title } = Typography;
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
        if (!quizPath) throw new Error("Quiz not found.");
        const response = await fetch(`${config.BASE_URL}${quizPath}`);
        if (!response.ok)
          throw new Error(`Failed to fetch quiz data: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizData(data[0]);
          setUserAnswers(new Array(data[0].questions.length).fill(null));
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

  const handleNextQuestion = useCallback(() => {
    if (!quizData?.questions.length) return;
    setTotalTime((prev) => prev + (30 - timer));
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = selectedOption;
      return updated;
    });
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    }
  }, [quizData, currentQuestionIndex, selectedOption, timer]);

  useEffect(() => {
    let countdown;
    if (!reviewMode && currentQuestionIndex < quizData?.questions.length) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [currentQuestionIndex, handleNextQuestion, reviewMode, quizData]);

  const getAnswerIndex = (answer, options) =>
    typeof answer === "number" ? answer : options.indexOf(answer);

  const handleOptionClick = (answer) => {
    if (selectedOption === null) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const answerIndex = getAnswerIndex(answer, currentQuestion.options);
      if (answerIndex !== null) {
        setSelectedOption(answerIndex);
        setShowAnswer(true);
        setUserAnswers((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = answerIndex;
          return updated;
        });
      }
    }
  };

  const score = useMemo(
    () =>
      userAnswers.filter(
        (answer, index) =>
          answer ===
          getAnswerIndex(
            quizData?.questions[index]?.answer,
            quizData?.questions[index]?.options
          )
      ).length,
    [userAnswers, quizData]
  );

  const accuracy = useMemo(
    () =>
      quizData?.questions.length
        ? (score / quizData.questions.length) * 100
        : 0,
    [score, quizData]
  );

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setUserAnswers(new Array(quizData.questions.length).fill(null));
    setTimer(30);
    setTotalTime(0);
    setReviewMode(false);
  };

  if (error)
    return <ErrorMessage error={error} backgroundImage={backgroundImage} />;
  if (loading) return <LoadingSpinner />;
  if (!quizData?.questions)
    return (
      <ErrorMessage
        error="No quiz data found."
        backgroundImage={backgroundImage}
      />
    );

  return (
    <div className="quiz-container">
      <Title level={1} className="quiz-title">
        {quizData.title}
      </Title>
      <QuestionTracker
        questions={quizData.questions}
        userAnswers={userAnswers}
        getAnswerIndex={getAnswerIndex}
      />

      {reviewMode ? (
        <ReviewSection
          questions={quizData.questions}
          userAnswers={userAnswers}
          getAnswerIndex={getAnswerIndex}
          setReviewMode={setReviewMode}
        />
      ) : currentQuestionIndex === quizData.questions.length - 1 &&
        selectedOption !== null ? (
        <QuizCompleted
          score={score}
          questions={quizData.questions}
          accuracy={accuracy}
          totalTime={totalTime}
          toggleReviewMode={() => setReviewMode(true)}
          restartQuiz={restartQuiz}
        />
      ) : (
        <>
          <p className="question-info">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </p>
          <p className="timer">Time Remaining: {timer}s</p>
          <Question
            question={quizData.questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
            showAnswer={showAnswer}
            correctAnswer={getAnswerIndex(
              quizData.questions[currentQuestionIndex].answer,
              quizData.questions[currentQuestionIndex].options
            )}
          />
          <Button
            onClick={handleNextQuestion}
            disabled={!showAnswer}
            className="next-button"
            icon={
              currentQuestionIndex === quizData.questions.length - 1 ? (
                <CheckCircleOutlined />
              ) : (
                <ArrowRightOutlined />
              )
            }
          >
            {currentQuestionIndex === quizData.questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </Button>
        </>
      )}
    </div>
  );
}

export default Quiz;
