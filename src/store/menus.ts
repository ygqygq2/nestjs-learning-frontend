import { defineStore } from "pinia";

import type { MenuItem } from "@/components/types/SidebarNav";

export const useMenusStore = defineStore("menus", {
  state: () => ({
    menus: [
      {
        id: 1,
        name: "控制台",
        routeName: "dashboard",
      },
      {
        id: 2,
        name: "用户管理",
        routeName: "users",
      },
      {
        id: 3,
        name: "角色管理",
        routeName: "roles",
      },
      {
        id: 4,
        name: "菜单管理",
        routeName: "menus",
      },
    ] as MenuItem[],
  }),
  persist: true,
});
