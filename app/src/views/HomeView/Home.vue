<template>
  <f7-page>
    <f7-navbar title="My Framework7 App"></f7-navbar>
    <f7-block>
      <p>Welcome to Framework7 with Vue and Vite!</p>
      <f7-button @click="handleClick">Click Me</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import {f7, f7ready} from 'framework7-vue';

export default {
  name: 'HomePage',
  methods: {
    goToQuiz() {
      f7ready(() => {
          this.$router.push({path: '/quiz'});
      });
    },
    handleClick() {
      f7ready(() => {
        f7.dialog.confirm('Do you want to start the quiz?', this.goToQuiz);
      });
    }
  },
};
</script>
