const BASE_URL = "https://gurr-i.github.io/local-quiz-app";
// const BASE_URL = "../..";

const QUIZPATHS = {
  polity: {
    polity100: "/quizdata/Polity100.json",
    polity200: "/quizdata/Polity200.json",
  },
  currentAffairs: {
    general: "/quizdata/current_affairs_quiz.json",
    sports: "/quizdata/Sports_current_affairs.json",
  },
  sports: {
    olympics: "/quizdata/olympics.json",
    generalSports: "/quizdata/sports_quiz_data.json",
  },
  organizations: {
    general: "/quizdata/organizations_quizdata.json",
  },
  general: {
    quizData: "/quizdata/quizData.json",
  },
  history: {
    // Add paths for quizzes inside the History folder
    historyQuiz1: "/quizdata/History/Indus Valley Civilisation.json",
    historyQuiz2: "/quizdata/History/Jainism and Buddhism.json",
    historyQuiz3: "/quizdata/History/Stone_age.json",
    historyQuiz4: "/quizdata/History/Vedic Age.json",
    // Add more as needed
  },
  sample: {
    sampleQuiz: "/quizdata/testquiz.json",
  },
};

// Helper function to get the full URL for a quiz
const getQuizUrl = (category, subcategory) => {
  if (QUIZPATHS[category] && QUIZPATHS[category][subcategory]) {
    return `${BASE_URL}${QUIZPATHS[category][subcategory]}`;
  }
  throw new Error(
    `Quiz path not found for category: ${category}, subcategory: ${subcategory}`
  );
};

// Helper function to fetch quiz data
const fetchQuizData = async (category, subcategory) => {
  const url = getQuizUrl(category, subcategory);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch quiz data from ${url}`);
  }
  return response.json();
};

export { BASE_URL, QUIZPATHS, getQuizUrl, fetchQuizData };
