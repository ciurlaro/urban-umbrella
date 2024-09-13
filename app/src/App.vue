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
