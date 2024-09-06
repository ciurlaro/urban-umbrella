<template>
  <div>
    <h1>Welcome to Urban Umbrella</h1>
    <p>This is the home page.</p>
    <h2>Device Info</h2>
    <p><strong>Operating System:</strong> {{ deviceInfo.operatingSystem }}</p>
    <p><strong>Platform:</strong> {{ deviceInfo.platform }}</p>
    <p><strong>Model:</strong> {{ deviceInfo.model }}</p>
    <p><strong>UUID:</strong> {{ deviceInfo.uuid }}</p>
  </div>
</template>

<script>
import {Device} from '@capacitor/device';

export default {
  name: 'Home',
  data() {
    return {
      deviceInfo: {
        operatingSystem: '',
        platform: '',
        model: '',
        uuid: ''
      }
    };
  },
  async mounted() {
    // Fetch device information when the component is mounted
    const info = await Device.getInfo();
    this.deviceInfo.operatingSystem = info.operatingSystem;
    this.deviceInfo.platform = info.platform;
    this.deviceInfo.model = info.model;
    this.deviceInfo.uuid = info.uuid;
  }
};
</script>

<style>
h2 {
  margin-top: 20px;
}
</style>
