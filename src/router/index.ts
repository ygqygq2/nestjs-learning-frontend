import { App } from "vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/login/register.vue"),
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
