const fs = require("fs");
const path = require("path");

const filePath = "./public/test.json";
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

// Function to convert answers to indices
function convertAnswersToIndices(quiz) {
  quiz.forEach((category) => {
    category.questions.forEach((question) => {
      const { options, answer } = question;

      // Check if answer is a string (not already an index)
      if (typeof answer === "string") {
        // Find the index of the answer in the options array
        const answerIndex = options.indexOf(answer);
        // Update the answer to the index if it's found
        question.answer = answerIndex !== -1 ? answerIndex : null; // Handle case where answer is not found
      }
      // If answer is already an index, do nothing
    });
  });
}

// Convert answers to indices
convertAnswersToIndices(quizData);

// Output the modified quiz data
// console.log(quizData);

// Save the updated quiz data to a file
fs.writeFileSync(
  fileName + "_fixed_index.json",
  JSON.stringify(quizData, null, 2),
  "utf-8"
);

console.log("Quiz data randomized and saved to $(fileName)_fixed_index.json");
