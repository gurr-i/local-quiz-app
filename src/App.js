import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import AppHeader from "./Components/Header";
import AppFooter from "./Components/Footer";
import "./App.css"; // Add your custom styles here
// import QuizContainer from "./Components/Quiz/QuizContainer";

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Layout.Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:id/:subcategory" element={<Quiz />} />
            {/* <Route path="/quiz/:id/:subcategory" element={<QuizContainer />} /> */}
          </Routes>
        </Layout.Content>
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default App;
