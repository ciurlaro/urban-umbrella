<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header text-center bg-primary text-white">
            <h3>Quiz</h3>
          </div>
          <div class="card-body">
            <p class="lead text-center">Is the grass green?</p>
            <div class="d-grid gap-2">
              <button class="btn btn-success btn-lg" @click="checkAnswer('yes')">Yes</button>
              <button class="btn btn-danger btn-lg" @click="checkAnswer('no')">No</button>
            </div>
          </div>
        </div>
        <div v-if="showAlert" class="alert mt-4" :class="alertClass" role="alert">
          {{ alertMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertClass = ref('');

    const checkAnswer = (answer) => {
      showAlert.value = true;
      if (answer === 'yes') {
        alertMessage.value = 'Correct! Grass is green.';
        alertClass.value = 'alert-success';
      } else {
        alertMessage.value = 'Wrong! Grass is green.';
        alertClass.value = 'alert-danger';
      }
    };

    return {
      showAlert,
      alertMessage,
      alertClass,
      checkAnswer,
    };
  },
};
</script>
