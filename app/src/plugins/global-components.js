// plugins/global-components.js
import {
  f7App,
  f7View,
  f7Page,
  f7Navbar,
  f7Block,
  f7Button,
} from 'framework7-vue';

export default {
  install(app) {
    app.component('f7-app', f7App);
    app.component('f7-view', f7View);
    app.component('f7-page', f7Page);
    app.component('f7-navbar', f7Navbar);
    app.component('f7-block', f7Block);
    app.component('f7-button', f7Button);
  },
};
