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
    };
  },
  computed: {
    formattedQuestionTitle() {
      if (!this.currentQuestion) return 'No Question Available';
      return this.currentQuestion.charAt(0).toUpperCase() + this.currentQuestion.slice(1).toLowerCase();
    },
  },
  methods: {
    loadQuestions() {
      fetch('/quizData.json')
        .then(response => response.json())
        .then(data => {
          this.questions = data;
          this.loadQuestionByIndex(0);
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
        this.selectedAnswers = [];
      } else {
        console.warn('Invalid question index:', index);
      }
    },

    nextQuestion() {
      const nextIndex = this.questionIndex + 1;
      if (nextIndex < this.questions.length) {
        this.loadQuestionByIndex(nextIndex);
      } else {
        console.log('No more questions');
      }
    },

    previousQuestion() {
      const previousIndex = this.questionIndex - 1;
      if (previousIndex >= 0) {
        this.loadQuestionByIndex(previousIndex);
      } else {
        console.log('This is the first question');
      }
    },
  },
  mounted() {
    this.loadQuestions();
  },
};
