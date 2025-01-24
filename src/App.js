import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import AppHeader from "./Components/Header";
import AppFooter from "./Components/Footer";
import "./App.css"; // Add your custom styles here

// Constants for routes (to avoid hardcoding paths)
const ROUTES = {
  HOME: "/",
  QUIZ: "/local-quiz-app/quiz/:id/:subcategory",
};

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <AppHeader />

        {/* Main Content */}
        <Layout.Content style={{ padding: "20px" }}>
          <Routes>
            {/* Home Route */}
            <Route path={ROUTES.HOME} element={<Home />} />

            {/* Quiz Route */}
            <Route path={ROUTES.QUIZ} element={<Quiz />} />

            {/* Fallback Route (e.g., for 404 pages) */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout.Content>

        {/* Footer */}
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default App;