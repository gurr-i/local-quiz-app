import React from "react";
import { Carousel } from "antd";
import "./Home.css"; // Ensure to style it properly

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  fontSize: "18px",
  fontWeight: "bold",
};

const QuizCarousel = ({ quizzes }) => (
  <Carousel autoplay className="latest-quizzes-carousel">
    {quizzes.slice(0, 5).map((quiz, index) => (
      <div key={index}>
        <h3 style={contentStyle}>{quiz.title}</h3>
      </div>
    ))}
  </Carousel>
);

export default QuizCarousel;
