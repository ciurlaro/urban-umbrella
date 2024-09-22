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
    };
  },
  computed: {
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No Question Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1);
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

          // Perform any other logic or API calls if needed
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
        console.log('Quiz completed or no more questions');
      }
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
  padding: 20px; /* Added padding */
  box-sizing: border-box;
  overflow: hidden;
}

/* Answers container */
.answers-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  background: #ececec;
}

/* Progression bar styling */
.progression-bar {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 14px;
  color: #333;
}
</style>
