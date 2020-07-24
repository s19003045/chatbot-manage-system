<template>
  <div class="dashboard container-fluid pt-1 mx-auto">
    <Nav-tab />
    <router-view />
  </div>
</template>

<script>
import NavTab from "./components/core/NavTab";

export default {
  name: "App",
  components: {
    NavTab,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap");

* {
  font-family: "Noto Sans TC", "Lato", sans-serif;
}
</style>



