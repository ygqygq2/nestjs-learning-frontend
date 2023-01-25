<script setup lang="ts" name="register">
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4 col-xxl-4">
      <form class="shadow-sm rounded p-4 border">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">用户名</label>
          <input id="inputUsername" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">密码</label>
          <input id="inputPassword" type="password" class="form-control">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">确认密码</label>
          <input id="inputPassword" type="password" class="form-control">
        </div>
        <!-- <div class="mb-4 form-check">
          <input id="formCheck" type="checkbox" class="form-check-input">
          <label class="form-check-label" for="formCheck">记住我</label>
        </div> -->
        <div class="d-flex flex-column align-items-center px-1 text-light">
          <button type="submit" class="btn btn-primary w-100 mb-2">
            提交
          </button>
          <router-link to="/login" class="border rounded w-100 text-decoration-none text-center">
            <button type="submit" class="btn">
              返回登录
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
