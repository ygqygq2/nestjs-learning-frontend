<script setup lang="ts" name="default">
import HeaderNav from "./components/HeaderNav.vue";
import SidebarNav from "./components/SidebarNav.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <SidebarNav />
      </div>
      <div class="col-9">
        <div class="row">
          <div class="container-fluid">
            <!-- 头部导航 -->
            <HeaderNav />
            <!-- 主体内容 -->
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
