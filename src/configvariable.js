const BASE_URL = "https://gurr-i.github.io/local-quiz-app";

const QUIZPATHS = {
  polity: {
    polity100: "/quizdata/Polity/Polity100.json",
    polity200: "/quizdata/Polity/Polity200.json",
  },
  currentAffairs: {
    general: "/quizdata/CurrentAffairs/current_affairs_quiz.json",
    sports: "/quizdata/CurrentAffairs/Sports_current_affairs.json",
  },
  sports: {
    olympics: "/quizdata/Sports/olympics.json",
    generalSports: "/quizdata/Sports/sports_quiz_data.json",
  },
  organizations: {
    general: "/quizdata/Organizations/organizations_quizdata.json",
  },
  staticsGk: {
    quiz1: "/quizdata/StaticsGk/statics_gk_quiz1.json",
    quiz2: "/quizdata/StaticsGk/statics_gk_quiz2.json",
  },
  history: {
    historyQuiz1: "/quizdata/History/Indus Valley Civilisation.json",
    historyQuiz2: "/quizdata/History/Jainism and Buddhism.json",
    historyQuiz3: "/quizdata/History/Stone_age.json",
    historyQuiz4: "/quizdata/History/Vedic Age.json",
  },
  sample: {
    sampleQuiz1: "/quizdata/Sample/testquiz.json",
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
