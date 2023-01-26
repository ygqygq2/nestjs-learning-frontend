<script setup lang="ts" name="SidebarNav">
</script>

<template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <router-link :to="{ name: 'users' }" class="nav-link active" aria-current="page" href="#">
        用户管理
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'roles' }" class="nav-link" href="#">
        角色管理
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'menus' }" class="nav-link" href="#">
        菜单管理
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
</style>
