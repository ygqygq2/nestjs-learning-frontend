import axios from 'axios';
<script setup lang="ts" name="login">
import isEmail from "validator/lib/isEmail";

import { signin } from "@/api/login";

import { useUserStore } from "../../store/user";

interface LoginResponse {
  access_token: string
}

const router = useRouter();
const store = useUserStore();

const loginInfo = reactive({
  username: "",
  usernameMsg: computed(() => {
    if (loginInfo.username !== "" && !isEmail(loginInfo.username)) {
      return "请输入正确的邮箱地址";
    } else {
      return "";
    }
  }),
  password: "",
  passwordMsg: computed(() => {
    if (loginInfo.password !== "" && loginInfo.password.length < 6) {
      return "密码长度不能小于6位";
    } else {
      return "";
    }
  }),
});

const submit = async () => {
  // console.log(loginInfo);
  const { username, password } = loginInfo;
  const res = (await signin(
    username,
    password
  )) as unknown as LoginResponse;
  // { access_token: xxx } -> 读取token信息并存储在localStorage中，方便进行读取和使用
  if (res.access_token) {
    store.$patch({
      token: res.access_token,
    });
  }
  router.push("/home");
  // axios.post("/auth/login", loginInfo).then((res) => {
  //   console.log(res);
  // });
};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4 col-xxl-4">
      <form class="shadow-sm rounded p-4 border">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">用户名：</label>
          <input id="inputUsername" v-model="loginInfo.username" aria-describedby="emailHelp" type="email" class="form-control" :class="[{ 'is-invalid': loginInfo.usernameMsg }]">
          <div class="invalid-feedback">
            {{ loginInfo.usernameMsg }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">密码：</label>
          <input
            id="inputPassword" v-model="loginInfo.password" type="password" class="form-control" :class="[{ 'is-invalid': loginInfo.passwordMsg }]"
          >
          <div class="invalid-feedback">
            {{ loginInfo.passwordMsg }}
          </div>
        </div>
        <div class="mb-3 form-check">
          <input id="formCheck" type="checkbox" class="form-check-input">
          <label class="form-check-label" for="formCheck">记住我</label>
        </div>
        <div class="d-flex flex-column align-items-center px-1 text-light">
          <button type="submit" class="btn btn-primary w-100 mb-2" @click="submit()">
            登录
          </button>
          <router-link to="/register" class="border rounded w-100 text-decoration-none text-center">
            <button type="submit" class="btn">
              注册
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
