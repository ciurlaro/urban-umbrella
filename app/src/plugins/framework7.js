import Framework7 from 'framework7/lite-bundle';
import Framework7Vue from 'framework7-vue';

export default {
  install(app) {
    app.use(Framework7Vue, Framework7);
  },
};
