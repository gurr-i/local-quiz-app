const fs = require("fs");
const path = require("path");

const filePath = "./public/olympics copy.json";
const fileName = path.basename(filePath, path.extname(filePath));

console.log(fileName); // Output: olympics copy.json

var jsonData = {};

// Read the file synchronously
try {
  const data = fs.readFileSync(filePath, "utf8");
  jsonData = JSON.parse(data);
  // console.log(jsonData); // Now jsonData contains the content of your JSON file
} catch (err) {
  console.error("Error reading the file:", err);
}

const quizData = jsonData;

// Function to shuffle array elements and return the new index of the original element
function shuffleOptions(options, correctAnswerIndex) {
  const shuffledOptions = options.slice();
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }
  // Find new index of the original correct answer
  const newAnswerIndex = shuffledOptions.indexOf(options[correctAnswerIndex]);
  return { shuffledOptions, newAnswerIndex };
}

// Randomize options and adjust the answer index
function randomizeQuizData(data) {
  data.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      const correctAnswerIndex = question.answer;
      const { shuffledOptions, newAnswerIndex } = shuffleOptions(
        question.options,
        correctAnswerIndex
      );
      question.options = shuffledOptions;
      question.answer = newAnswerIndex;
    });
  });
}

// Randomize the quiz data
randomizeQuizData(quizData);

// Save the updated quiz data to a file
fs.writeFileSync(
  fileName + "_randomized.json",
  JSON.stringify(quizData, null, 2),
  "utf-8"
);

console.log("Quiz data randomized and saved to $(fileName)_randomized.json");
