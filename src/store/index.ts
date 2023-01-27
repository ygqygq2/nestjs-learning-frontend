import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { App } from "vue";

// 数据持久化

const store = createPinia();
store.use(piniaPluginPersistedstate);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
