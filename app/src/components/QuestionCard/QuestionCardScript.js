export default {
  name: 'QuestionCard',
  props: {
    formattedQuestionTitle: String,
    currentAnswers: Array,
    selectedAnswers: Array,
    answersDisabled: Boolean,
  },
  methods: {
    selectAnswer(index) {
      this.$emit('selectAnswer', index);
    },
  },
};
