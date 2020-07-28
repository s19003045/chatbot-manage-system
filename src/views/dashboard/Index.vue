<template>
  <div class="dashboard container-fluid pt-1 mx-auto">
    <Nav-tab :nav-tab-select="navTabSelect" />
    <router-view />
  </div>
</template>

<script>
import NavTab from "./components/core/NavTab";

// import helpers
import { ToastLeave } from "../../utils/helpers";

export default {
  name: "App",
  components: {
    NavTab,
  },
  data() {
    return {
      navTabSelect: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    //跳出警示訊息，詢問是否確定要離開
    ToastLeave.fire().then((result) => {
      // 留在此頁面
      if (!result.value) {
        this.navTabSelect = from.name;
        return;
      }
      //確定要離開，帶往下個頁面
      if (result.value) {
        this.navTabSelect = to.name;
        next();
      }
    });
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



