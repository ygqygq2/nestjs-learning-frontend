<script setup lang="ts" name="SidebarNav">
import type { PropType } from "vue";
import { useRouter } from "vue-router";

import type { MenuItem } from "./types/SidebarNav";

const props = defineProps ({
  menus: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => [] as MenuItem[],
  },
});
const router = useRouter();

// 获取meta中的icon信息
function getIcon(item: MenuItem) {
  const res = router
    .getRoutes()
    .find(o =>
      item.routeName ? o.name === item.routeName : o.path === item.path
    );
  return res?.meta?.icon;
}
</script>

<template>
  <div class="nav-bg flex-fill">
    <ul class="nav flex-column">
      <li v-for="item in props.menus" :key="item.id" class="nav-item  py-1">
        <router-link class="nav-link text-white-50 d-flex align-items-center cursor" aria-current="page" :to="item.routeName ? { name: item.routeName } : item.path">
          <i class="pe-3 text-light" :class="[getIcon(item)]" />{{ item.name }}
        </router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'users'}">用户管理</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'roles'}">角色管理</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'menus'}" tabindex="-1" aria-disabled="true">菜单管理</router-link>
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  &:hover {
    background: rgb(255 255 255 / 30%);
  }

  .active {
    background: rgb(255 255 255 / 30%);
  }
}
</style>
