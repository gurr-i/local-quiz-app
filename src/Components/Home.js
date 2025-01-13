import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Typography, Spin, Input, Select } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const config = require("../configvariable");

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // For handling errors from fetch

  // Define quiz categories (e.g., "polity", "currentAffairs", etc.)
  const categories = Object.keys(config.QUIZPATHS);

  // Default category to fetch (e.g., "polity")
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Define subcategories based on selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    Object.keys(config.QUIZPATHS[selectedCategory])[0]
  );

  // Fetch the quiz data based on the selected category and subcategory
  useEffect(() => {
    setLoading(true);

    // Construct the quiz path
    const quizPath = config.QUIZPATHS[selectedCategory][selectedSubcategory];
    const fullUrl = window.location.origin + quizPath;

    // For debugging: log the correct URL you're trying to fetch
    console.log("Fetching quiz data from:", fullUrl);

    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setError(`Failed to fetch quizzes: ${error.message}`);
        setLoading(false);
      });
  }, [selectedCategory, selectedSubcategory]);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => setSearchTerm(value);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Quiz Hub
      </Title>

      {/* Search Bar */}
      <Search
        placeholder="Search for quizzes..."
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        style={{
          marginBottom: "20px",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />

      {/* Category and Subcategory Selection */}
      <div style={{ marginBottom: "20px" }}>
        <Text strong>Select Category:</Text>
        <Select
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setSelectedSubcategory(Object.keys(config.QUIZPATHS[value])[0]);
          }}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Text strong>Select Subcategory:</Text>
        <Select
          value={selectedSubcategory}
          onChange={(value) => setSelectedSubcategory(value)}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          {Object.keys(config.QUIZPATHS[selectedCategory]).map(
            (subcategory) => (
              <Option key={subcategory} value={subcategory}>
                {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
              </Option>
            )
          )}
        </Select>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
      ) : error ? (
        <Text type="danger" style={{ display: "block", textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={quiz.title}
                  bordered={false}
                  hoverable
                  bodyStyle={{ padding: "20px" }}
                >
                  <Button type="primary" block>
                    <Link
                      to={`/quiz/${selectedCategory}/${selectedSubcategory}`}
                    >
                      Start Quiz
                    </Link>
                  </Button>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Text>No quizzes found.</Text>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}

export default Home;
