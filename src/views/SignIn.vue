<template>
  <div class="container py-5 mt-5">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <form class="w-100" @submit.prevent.stop="handleSubmit">
          <div class="text-center mb-4">
            <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
          </div>

          <div class="form-label-group mb-2">
            <label for="email">email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="email"
              required
              autofocus
            />
          </div>

          <div class="form-label-group mb-3">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>

          <button
            class="btn btn-lg btn-primary btn-block mb-3"
            type="submit"
            :disabled="isProcessing"
          >
            Submit
          </button>

          <div class="text-center mb-3">
            <p>
              <router-link to="/signup">Sign Up</router-link>
            </p>
          </div>

          <p class="mt-5 mb-3 text-muted text-center">
            &copy; 2020 WoaWoaBot All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password",
          });
          return;
        }
        this.isProcessing = true;

        const apiData = {
          params: {},
          query: {},
          data: {
            email: this.email,
            password: this.password,
          },
        };
        // 使用 authorizationAPI 的 signIn 方法
        // 並且帶入使用者填寫的 email 和 password
        const { data, statusText } = await authorizationAPI.signIn(apiData);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);
        // 將 user 資料放進 store
        // this.$store.commit("setCurrentUser", data.user);

        Toast.fire({
          icon: "success",
          title: `status:${data.status}`,
          text: `message:${data.message}`,
        });
        // 成功登入後轉址到餐聽首頁
        this.$router.push({ name: "overview" });
      } catch (error) {
        this.isProcessing = false;
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "您輸入的帳號或密碼有誤",
        });
      }
    },
  },
};
</script>

<style>
</style>
