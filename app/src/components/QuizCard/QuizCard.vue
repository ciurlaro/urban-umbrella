<template>
  <div class="card-container">
    <!-- Conditionally render checkmark or cross only after selection -->
    <i
      v-if="isSelected"
      class="icon f7-icons"
      style="position: absolute; left: 15px; top: 15px; z-index: 1000;"
    >
      {{ isCorrect ? 'checkmark_circle_fill' : 'xmark_circle_fill' }}
    </i>

    <!-- Card -->
    <div
      class="card"
      :class="{
        'disabled': isDeactivated,
      }"
      @click="handleClick"
      :style="cardStyles"
    >
      <div class="card-content">
        <div class="card-text" ref="cardText">
          {{ formattedAnswer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizCard',
  props: {
    answer: {
      type: String,
      required: true,
    },
    answerNumber: {
      type: Number,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    onAccept: {
      type: Function,
      required: true,
    },
  },
  computed: {
    cardStyles() {
      let backgroundColor = '#000'; // Default black background (fully opaque)
      let border = '3px solid white'; // Default white border
      let boxShadow = 'none'; // No shadow by default
      let transform = 'none'; // No transformation by default

      if (this.isSelected) {
        backgroundColor = this.isCorrect
          ? 'rgba(56, 142, 60, 0.8)' // Dark green with transparency
          : 'rgba(211, 47, 47, 0.8)'; // Dark red with transparency
        border = '3px solid black'; // Black border when selected
        boxShadow = this.isCorrect
          ? '0 0 15px 5px rgba(56, 142, 60, 0.7)' // Green glow if correct
          : '0 0 15px 5px rgba(211, 47, 47, 0.7)'; // Red glow if incorrect
      }

      // Add hover effect only if the card is not selected
      // if (!this.isSelected && !this.isDeactivated) {
      //   transform = 'scale(1.05)';
      //   boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      // }

      return {
        backgroundColor: backgroundColor,
        border: border,
        boxShadow: boxShadow,
        transform: transform,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
      };
    },
    formattedAnswer() {
      // Ensure the first letter of the answer is capitalized
      return this.answer.charAt(0).toUpperCase() + this.answer.slice(1);
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
    handleClick() {
      try {
        if (!this.isDeactivated && !this.isSelected) {
          this.onAccept(this.answerNumber);
          this.triggerBlinkAnimation();
        }
      } catch (error) {
        console.error("Error in handleClick:", error);
      }
    },
    fitText() {
      const element = this.$refs.cardText;
      const parent = element.parentNode;
      let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
      const minFontSize = 6; // Minimum font size in pixels
      const maxFontSize = 18; // Maximum font size in pixels

      // Start from max font size
      fontSize = maxFontSize;
      element.style.fontSize = fontSize + 'px';

      let elementHeight = element.scrollHeight;
      let parentHeight = parent.clientHeight;

      // Reduce font size until text fits within parent height or reaches minimum font size
      while (elementHeight > parentHeight && fontSize > minFontSize) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
        elementHeight = element.scrollHeight;
      }
    },
    triggerBlinkAnimation() {
      const card = this.$el.querySelector('.card');
      card.classList.add('blink-border');
      setTimeout(() => {
        card.classList.remove('blink-border');
      }, 300); // Duration of the blink animation
    },
  },
  watch: {
    answer() {
      this.$nextTick(this.fitText);
    },
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  position: relative;
  overflow: hidden; /* Ensure no scrolling */

}

/* Adjusted card styles */
.card {
  width: 100%;
  padding-right: 20vw;
  padding-left: 30px;
  margin-left: 50px;
  color: white;
  cursor: pointer;
  height: 12vh; /* Fixed height for the answer button */
  display: flex;
  justify-content: flex-start; /* Align text to the left */
  align-items: center;
  overflow: hidden; /* Ensure no scrolling */
  box-sizing: border-box;
  position: relative;
  background-color: #000; /* Solid black background */
  box-shadow: none; /* No shadow by default */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add smooth transitions */
}

.card:hover {
  transform: scale(1.05); /* Slightly enlarge the card on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
}

.card.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.card.correct-answer,
.card.incorrect-answer {
  border: 3px solid black; /* Black border when selected */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left-align content */
  justify-content: center;
  height: 100%;
}

.card-text {
  font-size: 1rem; /* Base font size */
  white-space: normal; /* Allow wrapping */
  overflow: hidden; /* Prevent scrolling */
  word-wrap: break-word; /* Wrap long words */
  text-align: left; /* Align text to the left */
  padding-left: 10px; /* Padding to avoid text touching the edge */
  padding-right: 10px; /* Padding to avoid text touching the edge */
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
}

/* Icon styles */
.icon {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 1000;
  font-size: 1.5rem;
}

/* Blinking Border Animation */
@keyframes blink {
  0% {
    border-color: rgba(255, 255, 255, 0);
  }
  50% {
    border-color: rgba(255, 255, 255, 1);
  }
  100% {
    border-color: rgba(255, 255, 255, 0);
  }
}

.blink-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  animation: blink 0.3s ease-in-out;
}

/* Prevent Text Cropping */
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
