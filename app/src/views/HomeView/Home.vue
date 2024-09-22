<template>
  <div class="homepage">
    <div class="content-wrapper">
      <!-- Title -->
      <h1 class="title">Urban Umbrella Quiz</h1>

      <!-- Start Button -->
      <button class="start-button" @click="startQuiz">
        Start
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    startQuiz() {
      // Handle the start button click (e.g., navigate to the quiz page)
      this.$router.push('/quiz');
    },
  },
};
</script>

<style scoped>
/* General page styles */
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f7f6; /* Light-colored background */
  color: #333; /* Darker text for contrast */
  font-family: 'Poppins', sans-serif; /* Modern, clean font */
}

/* Wrapper to center content */
.content-wrapper {
  text-align: center;
  animation: fadeIn 1.5s ease-out; /* Smooth fade-in effect */
}

/* Title styles */
.title {
  font-size: 3rem;
  margin-bottom: 30px;
  letter-spacing: 2px;
  color: #333; /* Dark text color for contrast on light background */
  text-transform: uppercase;
  background-image: linear-gradient(45deg, #2c3e50, #4a5568); /* Darker gradient text */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideIn 1.2s ease-in-out; /* Slide-in effect */
}

/* Start Button styles */
.start-button {
  font-size: 1.5rem;
  padding: 15px 50px;
  color: #fff; /* White text */
  background-color: #2c3e50; /* Dark button */
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Soft shadow */
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
}

.start-button:hover {
  background-color: #1c2e3f; /* Darker shade on hover */
  transform: scale(1.05); /* Slightly enlarge on hover */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
}

.start-button:active {
  background-color: #1c2e3f; /* Same as hover for click */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); /* Reduced shadow on click */
  transform: scale(1); /* Remove scale effect on click */
}

/* Button ripple effect */
.start-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.6s;
}

.start-button:hover::before {
  opacity: 1;
  transition: opacity 0.6s;
}

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
