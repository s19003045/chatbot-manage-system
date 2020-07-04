<template>
  <div class="dashboard container">
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

