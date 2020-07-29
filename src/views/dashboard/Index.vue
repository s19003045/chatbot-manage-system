<template>
  <div class="dashboard container-fluid pt-1 mx-auto">
    <router-view />
  </div>
</template>

<script>
// import helpers
// import { ToastLeave } from "../../utils/helpers";

export default {
  name: "App",
  components: {},
  data() {
    return {
      navTabSelect: "",
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   //跳出警示訊息，詢問是否確定要離開
  //   ToastLeave.fire().then((result) => {
  //     // 留在此頁面
  //     if (!result.value) {
  //       this.navTabSelect = from.name;
  //       return;
  //     }
  //     //確定要離開，帶往下個頁面
  //     if (result.value) {
  //       this.navTabSelect = to.name;
  //       next();
  //     }
  //   });
  // },
};
</script>





