<template>
  <div id="manage-system">
    <Navbar />
    <main role="main" class="mt-5">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/Yeti/bootstrap.min.css";
import Navbar from "./views/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style scoped>
</style>