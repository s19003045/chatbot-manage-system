<template>
  <div id="manage-system">
    <Navbar />
    <Sidebar />
    <main role="main" class="mt-5">
      <router-view />
    </main>
  </div>
</template>

<script>
// import "bootstrap";
// import "bootswatch/dist/yeti/bootstrap.min.css";
import Navbar from "./views/components/Navbar";
import Sidebar from "./views/components/Sidebar";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
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