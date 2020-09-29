<template>
  <div class="container py-5 mt-5">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <form class="w-100" @submit.prevent.stop="handleSubmit">
          <div class="text-center mb-4">
            <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
          </div>

          <div class="form-label-group mb-2">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              class="form-control"
              placeholder="name"
              required
              autofocus
            />
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

          <div class="form-label-group mb-3">
            <label for="password-check">Password check</label>
            <input
              id="password-check"
              v-model="passwordCheck"
              name="passwordCheck"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>

          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
            Submit
          </button>

          <div class="text-center mb-3">
            <p>
              <router-link to="/signin"> Sign In </router-link>
            </p>
          </div>

          <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    handleSubmit: function (e) {
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2,
      });
      console.log(e);
      // TODO: 向後端驗證使用者註冊資訊是否合法
      console.log("data", data);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

