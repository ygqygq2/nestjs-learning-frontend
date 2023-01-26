import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/login/register.vue"),
  },
  {
    path: "/home",
    component: () => import("@/layouts/default.vue"),
    redirect: "/home/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users/index.vue"),
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("@/views/roles/index.vue"),
      },
      {
        path: "menus",
        name: "menus",
        component: () => import("@/views/menus/index.vue"),
      },
    ],
  },
] as RouteRecordRaw[];

// 使用 hash 路由模式
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
