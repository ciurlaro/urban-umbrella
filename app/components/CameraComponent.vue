<template>
  <div>
    <h1 class="mb-4">Capture Image</h1>
    <button class="btn btn-primary mb-3" @click="takePicture">Take Picture</button>
    <div v-if="photo" class="mt-3">
      <img :src="photo" alt="Captured Image" class="img-thumbnail" />
    </div>
  </div>
</template>

<script>
import { Camera, CameraResultType } from '@capacitor/camera';

export default {
  data() {
    return {
      photo: null
    };
  },
  methods: {
    async takePicture() {
      try {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl
        });
        this.photo = image.dataUrl;
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }
};
</script>