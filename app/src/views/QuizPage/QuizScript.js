export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      currentQuestion: '',
      currentAnswers: [],
      correctAnswer: null,
      questionIndex: 0,
      selectedAnswerIndex: null,
      selectedAnswers: [],
      showModal: false,
      isCorrect: null,
      answersDisabled: false,
    };
  },
  computed: {
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No QuestionCard Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1).toLowerCase();
    },
    progressPercentage() {
      if (this.questions.length === 0) return 0;
      return ((this.questionIndex + 1) / this.questions.length) * 100;
    },
    selectedAnswerText() {
      if (this.selectedAnswerIndex !== null) {
        return this.currentAnswers[this.selectedAnswerIndex];
      }
      return '';
    },
  },
  methods: {
    loadQuestions() {
      fetch('/quizData.json')
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
          this.loadQuestionByIndex(0);
        })
        .catch((error) => {
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
        this.selectedAnswers = [];
        this.showModal = false;
        this.isCorrect = null;
        this.answersDisabled = false;
      } else {
        console.warn('Invalid question index:', index);
      }
    },

    openModal(index) {
      this.selectedAnswerIndex = index;
      this.showModal = true;
    },

    submitAnswer() {
      if (this.selectedAnswerIndex === this.correctAnswer) {
        this.isCorrect = true;
        this.$refs.modal.playSuccessSound();
      } else {
        this.isCorrect = false;
        this.$refs.modal.playErrorSound();
      }

      this.answersDisabled = true;

      setTimeout(() => {
        this.loadNextQuestion();
      }, 1300);
    },

    loadNextQuestion() {
      const nextIndex = this.questionIndex + 1;
      if (nextIndex < this.questions.length) {
        this.loadQuestionByIndex(nextIndex);
      } else {
        console.log('Quiz completed or no more questions');
      }
    },

    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.loadQuestions();
  },
};
