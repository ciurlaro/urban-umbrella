<template>
  <div class="question-card">
    <div class="question-text" ref="questionText">{{ formattedQuestionTitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    formattedQuestionTitle: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(this.fitText);
    window.addEventListener('resize', this.fitText);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.fitText);
  },
  methods: {
    fitText() {
      const element = this.$refs.questionText;
      const parent = element.parentNode;
      let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
      const minFontSize = 12; // Minimum font size in pixels
      const maxFontSize = 20; // Reduced maximum font size

      // Start from max font size
      fontSize = maxFontSize;
      element.style.fontSize = fontSize + 'px';

      let elementHeight = element.scrollHeight;
      let parentHeight = parent.clientHeight;

      // Reduce font size until text fits within parent height or reaches minimum font size
      while (elementHeight > parentHeight && fontSize > minFontSize) {
        fontSize -= 0.5; // Decrease font size gradually
        element.style.fontSize = fontSize + 'px';
        elementHeight = element.scrollHeight;
      }
    },
  },
  watch: {
    formattedQuestionTitle() {
      this.$nextTick(this.fitText);
    },
  },
};
</script>

<style scoped>
.question-card {
  width: 100%;
  height: 15vh; /* Fixed height */
  background-color: #fff;
  padding: 70px 10px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Box shadow */
}

.question-text {
  text-align: center;
  line-height: 1.2;
  word-wrap: break-word;
  font-size: 1.0rem; /* Reduced font size */
  font-weight: 425;   /* Reduced font weight */
  color: #000000;
}
</style>
