import "bootstrap/dist/js/bootstrap";
import { createApp } from "vue";

import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store/index";

function bootstrap() {
  const app = createApp(App);
  // router
  setupRouter(app);

  // store
  setupStore(app);

  app.mount("#app");
}

bootstrap();
