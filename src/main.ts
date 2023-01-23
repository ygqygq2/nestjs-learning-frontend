import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store/index';

function boostrap() {
  const app = createApp(App);
  // router
  setupRouter(app);

  // store
  setupStore(app);

  app.mount('#app');
}

boostrap();