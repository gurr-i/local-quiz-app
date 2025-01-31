const BASE_URL = "https://gurr-i.github.io/local-quiz-app";

const QUIZPATHS = {
  polity: {
    polity100: "/quizdata/Polity/Polity100.json",
    polity200: "/quizdata/Polity/Polity200.json",
  },
  currentAffairs: {
    current_affairs_quiz: "/quizdata/CurrentAffairs/current_affairs_quiz.json",
    current_affairs_quiz_4:
      "/quizdata/CurrentAffairs/current_affairs_quiz_4.json",
      current_affairs_3:
      "/quizdata/CurrentAffairs/current_affairs_3.json",
  },
  sports: {
    olympics: "/quizdata/Sports/olympics.json",
    Sports_current_affairs: "/quizdata/Sports/Sports_current_affairs.json",
    sports_quiz_data: "/quizdata/Sports/sports_quiz_data.json",
  },
  organizations: {
    organizations_quiz: "/quizdata/Organizations/organizations_quizdata.json",
  },
  staticsGk: {
    Classical_Dance_of_India_Quiz: "/quizdata/StaticsGk/Classical Dance of India Quiz.json",
  },
  history: {
    Stone_age: "/quizdata/History/1_Stone_age.json",
    Indus_Valley_Civilisation: "/quizdata/History/2_Indus Valley Civilisation.json",
    Vedic_Age: "/quizdata/History/3_Vedic Age.json",
    Jainism_and_Buddhism: "/quizdata/History/4_Jainism and Buddhism.json",
    Mahajanapadas_and_the_Magadha_Empire: "/quizdata/History/5_Mahajanapadas and the Magadha Empire.json",
    Mauryan_Empire_Quiz_1: "/quizdata/History/6_Mauryan Empire Quiz 1.json",
    Post_Mauryan_Dynasties_Quiz: "/quizdata/History/7_Post Mauryan Dynasties Quiz.json",
    Sangam_Age_Quiz: "/quizdata/History/8_Sangam Age Quiz.json",
    Gupta_and_Chalukya_Dynasties_Quiz: "/quizdata/History/9_Gupta and Chalukya Dynasties Quiz.json",
    Tripartite_Struggle_Chola_Empire_Quiz: "/quizdata/History/10_Tripartite Struggle & Chola Empire Quiz.json",
    Tripartite_Struggle_Chola_Empire_PYQQuiz: "/quizdata/History/11_Tripartite Struggle & Chola Empire_PYQQuiz.json",
    Delhi_Sultanate_Quiz: "/quizdata/History/12_Delhi Sultanate Quiz.json"
  },
  sample: {
    sampleQuiz1: "/quizdata/Schema.json",
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
