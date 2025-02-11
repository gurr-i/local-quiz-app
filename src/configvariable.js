const BASE_URL = "https://gurr-i.github.io/local-quiz-app";

const QUIZPATHS = {
  polity: {
    "Polity Quiz 1": "/quizdata/Polity/ICA0_50.json",
    "Polity Quiz 2": "/quizdata/Polity/ICA50_100.json",
    "Polity Quiz 3": "/quizdata/Polity/ICA100_150.json",
    "Polity Quiz 4": "/quizdata/Polity/ICA150_200.json",
  },
  currentAffairs: {
    "Quiz 1": "/quizdata/CurrentAffairs/current_affairs_quiz.json",
    "Quiz 2": "/quizdata/CurrentAffairs/current_affairs_quiz_4.json",
    "Quiz 3": "/quizdata/CurrentAffairs/current_affairs_3.json",
  },
  sports: {
    "Olympics Quiz": "/quizdata/Sports/olympics.json",
    "Sports Current Affairs Quiz": "/quizdata/Sports/Sports_current_affairs.json",
    "General Sports Quiz": "/quizdata/Sports/sports_quiz_data.json",
  },
  organizations: {
    "Organizations Quiz": "/quizdata/Organizations/organizations_quizdata.json",
  },
  staticsGk: {
    "Classical Dance of India Quiz": "/quizdata/StaticsGk/ClassicalDanceOfIndiaQuiz.json",
  },
  history: {
    "Stone Age Quiz": "/quizdata/History/1_Stone_Age.json",
    "Indus Valley Civilisation Quiz": "/quizdata/History/2_Indus_Valley_Civilisation.json",
    "Vedic Age Quiz": "/quizdata/History/3_Vedic_Age.json",
    "Jainism and Buddhism Quiz": "/quizdata/History/4_Jainism_and_Buddhism.json",
    "Mahajanapadas and Magadha Empire Quiz": "/quizdata/History/5_Mahajanapadas_and_Magadha_Empire.json",
    "Mauryan Empire Quiz 1": "/quizdata/History/6_Mauryan_Empire_Quiz_1.json",
    "Post Mauryan Dynasties Quiz": "/quizdata/History/7_Post_Mauryan_Dynasties_Quiz.json",
    "Sangam Age Quiz": "/quizdata/History/8_Sangam_Age_Quiz.json",
    "Gupta and Chalukya Dynasties Quiz": "/quizdata/History/9_Gupta_and_Chalukya_Dynasties_Quiz.json",
    "Tripartite Struggle & Chola Empire Quiz": "/quizdata/History/10_Tripartite_Struggle_Chola_Empire_Quiz.json",
    "Tripartite Struggle & Chola Empire PYQ Quiz": "/quizdata/History/11_Tripartite_Struggle_Chola_Empire_PYQ_Quiz.json",
    "Delhi Sultanate Quiz": "/quizdata/History/12_Delhi_Sultanate_Quiz.json",
    "Delhi Sultanate - Khilji, Tughlaq, and Lodi Dynasties": "/quizdata/History/13_Delhi_Sultanate_Khilji_Tughlaq_Lodi_Dynasties.json",
    "Vijayanagara Empire Quiz": "/quizdata/History/14_Vijayanagara_Empire.json",
    "Vijayanagar Empire Quiz": "/quizdata/History/15_Vijayanagar_Empire.json",
    "Mughal Empire Quiz 1": "/quizdata/History/16_Mughal_Empire_quiz_1.json",
    "Mughal Empire Quiz 2": "/quizdata/History/17_Mughal_Empire_quiz_2.json",
    "Advent of Europeans Quiz": "/quizdata/History/18_Advent_of_Europeans.json",
    "1857 Revolt Quiz": "/quizdata/History/19_Quiz_1857_REVOLT.json",
    "Marathas Quiz": "/quizdata/History/20_Marathas.json",
    "Bhakti and Sufi Movements Quiz": "/quizdata/History/21_Bhakti_and_Sufi_Movements_1.json",
    "Socio-Religious Reform Movements Quiz": "/quizdata/History/22_Socio_Religious_Reform_Movements.json",
    "Indian National Congress Quiz": "/quizdata/History/23_Indian_National_Congress.json",
    "Bengal Partition Quiz": "/quizdata/History/24_Bengal_Partition.json",
    "Emergence of Gandhi Quiz": "/quizdata/History/25_Emergence_of_Gandhi.json",
    "Socialism, Simon, and Civil Disobedience Movement Quiz": "/quizdata/History/26_Socialism_Simon_and_CDM.json",
    "Quit India Movement Quiz": "/quizdata/History/27_Quit_India_Movement.json",
  },
  sample: {
    "Sample Quiz 1": "/quizdata/Schema.json",
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

export { BASE_URL, QUIZPATHS, getQuizUrl, fetchQuizData } ;
