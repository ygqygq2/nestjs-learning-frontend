<script setup lang="ts" name="register">
import isEmail from "validator/lib/isEmail";

import axios from "@/utils/axios";

const regInfo = reactive({
  username: "",
  usernameMsg: computed(() => {
    if (regInfo.username !== "" && !isEmail(regInfo.username)) {
      return "请输入正确的邮箱地址";
    }
    else {
      return "";
    }
  }),
  password: "",
  passwordMsg: computed(() => {
    if (regInfo.password !== "" && regInfo.password.length < 6) {
      return "密码长度不能小于6位";
    }
    else {
      return "";
    }
  }),
  confirmPassword: "",
  confirmPasswordMsg: computed(() => {
    if (regInfo.confirmPassword !== "" && regInfo.password !== "" && regInfo.confirmPassword !== regInfo.password) {
      return "两次密码不一致";
    }
    else {
      return "";
    }
  }),
});

const submit = () => {
  const postData = {
    username: regInfo.username,
    password: regInfo.password,
  };
  axios.post("/api/register", postData).then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4 col-xxl-4">
      <form class="shadow-sm rounded p-4 border">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">用户名</label>
          <input id="inputUsername" v-model="regInfo.username" type="text" class="form-control" :class="[{ 'is-invalid': regInfo.usernameMsg }]">
          <div class="invalid-feedback">
            {{ regInfo.usernameMsg }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">密码</label>
          <input id="inputPassword" v-model="regInfo.password" type="password" class="form-control" :class="[{ 'is-invalid': regInfo.passwordMsg }]">
          <div class="invalid-feedback">
            {{ regInfo.passwordMsg }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputConfirmPassword" class="form-label">确认密码</label>
          <input id="inputConfirmPassword" v-model="regInfo.confirmPassword" type="password" class="form-control" :class="[{ 'is-invalid': regInfo.confirmPasswordMsg }]">
          <div class="invalid-feedback">
            {{ regInfo.confirmPasswordMsg }}
          </div>
        </div>
        <div class="d-flex flex-column align-items-center px-1 text-light">
          <button type="submit" class="btn btn-primary w-100 mb-2" @click="submit()">
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
