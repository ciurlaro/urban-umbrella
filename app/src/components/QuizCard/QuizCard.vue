<template>
  <div class="card-container">
    <!-- Conditionally render checkmark or cross only after selection -->
    <i
        v-show="isSelected"
        class="icon f7-icons"
    >
      {{ isCorrect ? 'checkmark_circle_fill' : 'xmark_circle_fill' }}
    </i>

    <!-- Card -->
    <div
        class="card"
        :class="{
        'disabled': isDeactivated,
        'scale-up': scaleEffectActive, /* Add class for scaling */
      }"
        @click="handleClick($event)"
        :style="cardStyles"
    >
      <div class="card-content">
        <div class="card-text" ref="cardText">
          {{ formattedAnswer }}
        </div>
      </div>
      <!-- Ripple effect element -->
      <span class="ripple"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizCard',
  data() {
    return {
      scaleEffectActive: false, // To toggle the scaling effect
    };
  },
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
      let backgroundColor = 'linear-gradient(135deg, #2c3e50, #4ca1af)'; // Gradient background
      let border = '3px solid transparent'; // Transparent border
      let boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Subtle shadow
      let transform = 'none'; // No transformation by default

      if (this.isSelected) {
        backgroundColor = this.isCorrect
            ? 'linear-gradient(135deg, #28a745, #1e7d32)' // Green gradient if correct
            : 'linear-gradient(135deg, #f85032, #e73827)'; // Red gradient if incorrect
        border = '3px solid black'; // Black border when selected
        boxShadow = this.isCorrect
            ? '0 0 15px 5px rgba(67, 206, 162, 0.7)' // Green glow if correct
            : '0 0 15px 5px rgba(248, 80, 50, 0.7)'; // Red glow if incorrect
      }

      return {
        backgroundImage: backgroundColor,
        border: border,
        boxShadow: boxShadow,
        transform: transform,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease', // Smooth transitions
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
    handleClick(event) {
      try {
        if (!this.isDeactivated && !this.isSelected) {
          this.onAccept(this.answerNumber);
          this.triggerRippleEffect(event);
          this.triggerBlinkAnimation();
          this.triggerScaleEffect(); // Trigger the scale effect on click
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
    triggerRippleEffect(event) {
      const ripple = this.$el.querySelector('.ripple');
      const card = this.$el.querySelector('.card');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple-active');
      ripple.addEventListener('animationend', () => {
        ripple.classList.remove('ripple-active');
      }, {once: true});
    },
    triggerBlinkAnimation() {
      const card = this.$el.querySelector('.card');
      card.classList.add('blink-border');
      setTimeout(() => {
        card.classList.remove('blink-border');
      }, 300); // Duration of the blink animation
    },
    triggerScaleEffect() {
      // Apply the scaling class for the effect
      this.scaleEffectActive = true;
      setTimeout(() => {
        this.scaleEffectActive = false; // Reset after animation duration
      }, 300); // Duration of the scale effect
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
  overflow: hidden;
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
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease; /* Add smooth transitions */
}

.card:hover {
  transform: scale(1.03); /* Slightly enlarge the card on hover */
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.2), /* Outer shadow */
  inset 0 0 3px rgba(255, 255, 255, 0.5) !important; /* Adds inner glow */
}

.card.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.card.correct-answer,
.card.incorrect-answer {
  border: 3px solid black; /* Black border when selected */
}

.card.scale-up {
  animation: scaleUp 0.3s ease-in-out; /* Temporary scale effect on click */
}

/* Animation for scaling */
@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.105); /* Temporarily enlarge the card */
  }
  100% {
    transform: scale(1); /* Return to original size */
  }
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
  -webkit-line-clamp: 5; /* Limit to 5 lines */
  -webkit-box-orient: vertical;
}

/* Icon styles */
.icon {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 1000;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.5s ease-in-out; /* Smooth fade-in */
}

.icon[style*="display: none"] {
  opacity: 0;
}

/* When isSelected is true, the icon is shown and opacity transitions to 1 */
[style*="display: block"] .icon {
  opacity: 1;
}

/* Ripple effect styles */
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  pointer-events: none;
}

.ripple-active {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
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

.blink-border {
  animation: blink 0.6s ease-in-out;
}

/* Prevent Text Cropping */
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
