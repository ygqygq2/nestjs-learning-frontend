import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
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
        meta: {
          icon: "fas fa-home",
        },
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users/index.vue"),
        meta: {
          icon: "fas fa-user",
        },
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("@/views/roles/index.vue"),
        meta: {
          icon: "fas fa-tools",
        },
      },
      {
        path: "menus",
        name: "menus",
        component: () => import("@/views/menus/index.vue"),
        meta: {
          icon: "fas fa-bars",
        },
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
