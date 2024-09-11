export default {
  name: 'Home',
  data() {
    return {
      questions: [],
      currentQuestion: '',
      currentAnswers: [],
      correctAnswer: null,
      questionIndex: 0,
      selectedAnswers: [],
      showAlert: false,   // Control alert visibility
      alertType: '',      // 'success' or 'danger' for different alert types
      alertMessage: '',   // Message to be displayed in the alert
      answersDisabled: false,  // Control whether answers are disabled after selection
    };
  },
  computed: {
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No Question Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1).toLowerCase();
    },
    progressPercentage() {
      if (this.questions.length === 0) return 0;
      return ((this.questionIndex + 1) / this.questions.length) * 100;
    },
  },
  methods: {
    loadQuestions() {
      fetch('/quizData.json')
        .then(response => response.json())
        .then(data => {
          this.questions = data;
          this.loadQuestionByIndex(0); // Load the first question by default
        })
        .catch(error => {
          console.error('Error loading quiz data:', error);
        });
    },

    loadQuestionByIndex(index) {
      if (index >= 0 && index < this.questions.length) {
        this.questionIndex = index;
        const selectedQuestion = this.questions[index];
        this.currentQuestion = selectedQuestion.question || 'No question available';
        this.currentAnswers = selectedQuestion.answers || [];
        this.correctAnswer = selectedQuestion.correct_answer ?? null;
        this.selectedAnswers = []; // Clear previous selections
        this.showAlert = false; // Hide alert when a new question loads
        this.answersDisabled = false; // Enable answers when a new question loads
      } else {
        console.warn('Invalid question index:', index);
      }
    },

    // Select an answer, show an alert, and then move to the next question
    selectAnswer(index) {
      // Handle selection
      this.selectedAnswers = [index];

      // Disable other answers
      this.answersDisabled = true;

      // Check if the selected answer is correct and show the appropriate alert
      if (this.correctAnswer === index) {
        this.alertType = 'success';
        this.alertMessage = 'Well done! You selected the correct answer.';
      } else {
        this.alertType = 'danger';
        this.alertMessage = 'Oh snap! That was not the correct answer.';
      }

      // Show the alert
      this.showAlert = true;

      // Move to the next question after a brief delay
      setTimeout(() => {
        const nextIndex = this.questionIndex + 1;
        if (nextIndex < this.questions.length) {
          this.loadQuestionByIndex(nextIndex);
        } else {
          console.log('Quiz completed or no more questions');
        }
      }, 1500); // Adjust delay if needed
    },
  },
  mounted() {
    this.loadQuestions();
  },
};
