<template>
  <f7-page>
    <!-- Question Block -->
    <QuestionCard :formattedQuestionTitle="formattedQuestionTitle" />

    <!-- Answers Container -->
    <div class="answers-container">
      <QuizCard
        v-for="(answer, index) in currentAnswers"
        :key="index"
        :answer="answer"
        :answerNumber="index"
        :isSelected="selectedAnswerIndex === index"
        :isDeactivated="selectedAnswerIndex !== null && selectedAnswerIndex !== index"
        :isCorrect="index === correctAnswer"
        :onAccept="acceptAnswer"
      />
    </div>

    <!-- Progression Bar -->
    <div class="progression-bar">
      Question {{ questionIndex + 1 }} of {{ questions.length }}
    </div>

    <!-- Home Button -->
    <div class="home-button" @click="goHome">Home</div>

    <!-- Result Modal -->
    <div v-if="showResultModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Your Score</h2>
        <p>You got {{ correctAnswersCount }} out of {{ questions.length }} correct.</p>
        <!-- List of Wrong Answers -->
        <div class="wrong-answers" v-if="wrongAnswers.length">
          <h3>Incorrect Answers:</h3>
          <div
            v-for="(answer, index) in wrongAnswers"
            :key="index"
            class="wrong-answer-item"
          >
            <p><strong>Question:</strong> {{ answer.question }}</p>
            <p><strong>Your Answer:</strong> {{ answer.selectedAnswer }}</p>
            <p><strong>Correct Answer:</strong> {{ answer.correctAnswer }}</p>
          </div>
        </div>
        <!-- Go Home Button -->
        <f7-button @click="goHome">Go Home</f7-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7ready } from 'framework7-vue';
import QuizCard from "../../components/QuizCard/QuizCard.vue";
import QuestionCard from "../../components/QuestionCard/QuestionCard.vue";

export default {
  name: 'QuizPage',
  components: {
    QuizCard,
    QuestionCard,
  },
  data() {
    return {
      questions: [],
      currentQuestion: '',
      currentAnswers: [],
      correctAnswer: null,
      questionIndex: 0,
      selectedAnswerIndex: null,
      userAnswers: [], // Stores user's answers and correctness
      showResultModal: false, // Controls the display of the result modal
    };
  },
  computed: {
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No Question Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1);
    },
    correctAnswersCount() {
      return this.userAnswers.filter((ans) => ans.isCorrect).length;
    },
    wrongAnswers() {
      return this.userAnswers.filter((ans) => !ans.isCorrect);
    },
  },
  methods: {
    loadQuestions() {
      fetch('/quizData.json')
        .then((response) => response.json())
        .then((data) => {
          const shuffledQuestions = data.sort(() => 0.5 - Math.random());
          this.questions = shuffledQuestions.slice(0, 20);
          this.loadQuestionByIndex(0);
        })
        .catch((error) => {
          console.error('Error loading quiz data:', error);
        });
    },
    loadQuestionByIndex(index) {
      try {
        if (index >= 0 && index < this.questions.length) {
          this.questionIndex = index;
          const selectedQuestion = this.questions[index];
          this.currentQuestion = selectedQuestion.question || 'No question available';
          this.currentAnswers = selectedQuestion.answers || [];
          this.correctAnswer = selectedQuestion.correct_answer ?? null;
          this.selectedAnswerIndex = null; // Reset answer selection
        } else {
          console.warn('Invalid question index:', index);
        }
      } catch (error) {
        console.error('Error in loadQuestionByIndex:', error);
      }
    },
    acceptAnswer(index) {
      try {
        // Check if an answer is already selected
        if (this.selectedAnswerIndex === null) {
          this.selectedAnswerIndex = index;

          // Record user's answer and correctness
          const isCorrect = index === this.correctAnswer;
          this.userAnswers.push({
            question: this.currentQuestion,
            selectedAnswer: this.currentAnswers[index],
            correctAnswer: this.currentAnswers[this.correctAnswer],
            isCorrect: isCorrect,
          });

          // Proceed to next question after a brief delay
          setTimeout(() => {
            this.loadNextQuestion();
          }, 800);
        }
      } catch (error) {
        console.error("Error in acceptAnswer:", error);
      }
    },
    loadNextQuestion() {
      const nextIndex = this.questionIndex + 1;
      if (nextIndex < this.questions.length) {
        this.loadQuestionByIndex(nextIndex);
      } else {
        // Quiz completed
        this.showResultModal = true;
      }
    },
    closeModal() {
      this.showResultModal = false;
    },
    goHome() {
      this.$router.push('/');
    },
  },
  mounted() {
    f7ready(() => {
      this.loadQuestions();
    });
  },
};
</script>

<style scoped>
/* Full page setup */
f7-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: #f4f7f6; /* Light-colored background */
}

/* Answers container */
.answers-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  background: #ececec;
  padding: 10px;
  border-radius: 12px; /* Smooth rounded corners */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Soft shadow for depth */
  transition: box-shadow 0.3s ease;
}

.answers-container:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

/* Progression bar styling */
.progression-bar {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 14px;
  color: #2c3e50; /* Dark color for contrast */
  padding: 5px 10px;
  border-radius: 8px; /* Rounded edges for modern look */
}

/* Home button styling */
.home-button {
  position: absolute;
  bottom: 2.25vw;
  left: 20px;
  font-size: 14px;
  color: white;
  background: linear-gradient(135deg, #4ca1af, #3b826f);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease;
}

.home-button:hover {
  transform: scale(1.03);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
}

/* Apply scaling effect on click */
.home-button:active {
  animation: scaleUp 0.3s ease-in-out;
}

/* Result Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-height: 90%;
  background: white;
  padding: 20px;
  border-radius: 12px;
  overflow-y: auto; /* Makes the modal scrollable */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Adds depth to modal */
}

.modal-content h2,
.modal-content h3 {
  margin-top: 0;
  color: #2c3e50;
}

.wrong-answers {
  margin-top: 20px;
}

.wrong-answer-item {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.wrong-answer-item p {
  margin: 5px 0;
}

/* Subtle fade-in effect */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply fade-in animation to page content */
f7-page {
  animation: fadeIn 1s ease-out;
}
</style>
