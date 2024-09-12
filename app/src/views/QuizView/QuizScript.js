export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      currentQuestion: '',
      currentAnswers: [],
      correctAnswer: null,
      questionIndex: 0,
      selectedAnswers: [],
      showAlert: false,
      alertType: '',
      alertMessage: '',
      answersDisabled: false,
    };
  },
  computed: {
    // Compute the formatted title for the current question
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No Question Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1).toLowerCase();
    },
    // Compute the percentage of quiz progress
    progressPercentage() {
      if (this.questions.length === 0) return 0;
      return ((this.questionIndex + 1) / this.questions.length) * 100;
    },
  },
  methods: {
    // Load questions from the provided JSON file
    loadQuestions() {
      fetch('/quizData.json')
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
          this.loadQuestionByIndex(0); // Load the first question by default
        })
        .catch((error) => {
          console.error('Error loading quiz data:', error);
        });
    },

    // Load a question by its index in the array
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

    // Handle answer selection in the QuestionCard component
    selectAnswer(index) {
      this.selectedAnswers = [index]; // Track the selected answer index
      this.answersDisabled = true; // Disable further selections

      // Show success or danger alert based on the correctness of the answer
      if (this.correctAnswer === index) {
        this.alertType = 'success';
        this.alertMessage = 'You selected the correct answer.';
      } else {
        this.alertType = 'danger';
        this.alertMessage = 'That was not the correct answer.';
      }

      this.showAlert = true;

      // Automatically move to the next question after a delay
      setTimeout(() => {
        const nextIndex = this.questionIndex + 1;
        if (nextIndex < this.questions.length) {
          this.loadQuestionByIndex(nextIndex);
        } else {
          console.log('Quiz completed or no more questions');
        }
      }, 1500); // Adjust delay as needed
    },

    // Handle the closing of the alert from the Alert component
    closeAlert() {
      this.showAlert = false;
    },
  },
  mounted() {
    this.loadQuestions(); // Fetch and load questions when the component is mounted
  },
};
