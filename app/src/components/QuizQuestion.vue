<template>
  <div class="quiz-question">
    <h4 class="text-center">{{ question }}</h4>
  </div>
</template>

<script>
export default {
  name: 'QuizQuestion',
  props: {
    question: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.quiz-question {
  margin-bottom: 20px;
}
</style>
