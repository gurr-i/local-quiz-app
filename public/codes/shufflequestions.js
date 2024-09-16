const fs = require("fs");
const path = require("path");

const filePath = "./public/quizdata/Polity100.json";
const fileName = path.basename(filePath, path.extname(filePath));

let jsonData = {};

// Read the file synchronously
try {
  const data = fs.readFileSync(filePath, "utf8");
  jsonData = JSON.parse(data);
  console.log(jsonData); // Log the parsed JSON data
} catch (err) {
  console.error("Error reading the file:", err);
}

const quizDataArray = jsonData; // Since jsonData is an array

// Ensure there is at least one quiz object and the questions array exists
if (!quizDataArray.length || !Array.isArray(quizDataArray[0].questions)) {
  console.error("Error: quizDataArray is empty or questions array is missing.");
  process.exit(1); // Exit if the structure is incorrect
}

// Select the first quiz (assuming you are only dealing with one quiz)
const quizData = quizDataArray[0];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the questions in the quiz data
const shuffledQuiz = {
  ...quizData,
  questions: shuffleArray([...quizData.questions]), // Shuffle the questions array
};

// Save the updated quiz data to a file
fs.writeFileSync(
  fileName + "_shuffle.json",
  JSON.stringify(
    [{ title: quizData.title, questions: shuffledQuiz.questions }],
    null,
    2
  ),
  "utf-8"
);

console.log(`Quiz data randomized and saved to ${fileName}_randomized.json`);
