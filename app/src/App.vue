<template>
  <f7-app>
    <f7-view main>
      <router-view></router-view>
    </f7-view>
  </f7-app>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap');

* {
  font-family: 'Titillium Web', sans-serif;
}
</style>







