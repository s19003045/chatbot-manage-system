<template>
  <div id="manage-system" ref="manageSystem" :style="appStyle">
    <Navbar />
    <Sidebar />
    <main role="main" class="mt-5">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
// import components
import Navbar from "./views/components/Navbar";
import Sidebar from "./views/components/Sidebar";
import Footer from "./views/components/Footer";

// import helper
import _ from "lodash";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Footer,
  },

  data() {
    return {
      appContainer: {
        height: 0,
        windowHeight: 0,
      },
    };
  },
  mounted() {
    this.calculateApp();
  },

  computed: {
    appStyle() {
      return {
        height: this.appContainer.windowHeight + "px",
      };
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  watch: {},

  methods: {
    handleResize: _.throttle(function () {
      this.calculateApp();
    }, 200),

    calculateApp() {
      this.appContainer.height = this.$refs.manageSystem.offsetHeight;
      this.appContainer.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap");

* {
  font-family: "Noto Sans TC", "Lato", sans-serif;
}

main {
  min-height: 100%;
}

button.btn {
  border-radius: 3px;
}

button.rounded {
  border-radius: 5px;
}
</style>