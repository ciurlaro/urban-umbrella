<template>
  <div class="card shadow">
    <div class="card-header text-center bg-primary text-white">
      <h3>Quiz</h3>
    </div>
    <div class="card-body">
      <QuizQuestion :question="currentQuestion[0]" />
      <div class="d-grid gap-2 mt-4">
        <QuizButton
          v-for="(option, index) in currentQuestion"
          :key="index"
          :option="option"
          @selected="handleAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import QuizQuestion from './QuizQuestion.vue';
import QuizButton from './QuizButton.vue';

export default {
  components: {
    QuizQuestion,
    QuizButton,
  },
  setup() {
    const questions = ref([]);
    const currentQuestion = ref([]);

    const loadQuestions = async () => {
      try {
        const response = await fetch('/src/assets/quizData.json');
        const data = await response.json();
        questions.value = data;
        currentQuestion.value = data[0].Question;
      } catch (error) {
        console.error('Error loading quiz data:', error);
      }
    };

    const handleAnswer = (answer) => {
      console.log('Selected answer:', answer);
    };

    onMounted(() => {
      loadQuestions();
    });

    return {
      currentQuestion,
      handleAnswer,
    };
  },
};
</script>

