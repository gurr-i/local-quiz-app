import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure this CSS file contains the updated styles
const config = require("../configvariable");
function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(config.QUIZPATH) // Adjust the path as necessary
      .then((response) => response.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div className="home-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <h1 id="title"></h1>
      <div className="quiz-list">
        {quizzes.map((quiz, index) => (
          <div key={index} className="quiz-item">
            <h2>{quiz.title}</h2>
            <Link to={`/quiz/${index}`} className="start-button">
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
