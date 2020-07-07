<template>
  <div class="dashboard container pt-4">
    <Nav-tab />
    <router-view />
  </div>
</template>

<script>
import NavTab from "./components/core/NavTab";

export default {
  name: "App",
  components: {
    NavTab
  }
};
</script>

