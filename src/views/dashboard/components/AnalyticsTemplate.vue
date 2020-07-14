<template>
  <div class="my-3">
    <div class="container">
      <div class="row py-5">
        <div class="col">
          <ModuleKeywordAnalysis />
        </div>
      </div>
      <div class="row py-5">
        <div class="col">
          <ModulePostBackAnalysis />
        </div>
      </div>
      <div class="row py-5">
        <div class="col">
          <ReplyMessageAnalysis />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleKeywordAnalysis from "./components/AnalyticsTemplate/ModuleKeywordAnalysis.vue";
import ModulePostBackAnalysis from "./components/AnalyticsTemplate/ModulePostBackAnalysis.vue";
import ReplyMessageAnalysis from "./components/AnalyticsTemplate/ReplyMessageAnalysis.vue";

export default {
  name: "AnalyticsTemplate",
  components: {
    ModuleKeywordAnalysis,
    ModulePostBackAnalysis,
    ReplyMessageAnalysis
  },
  data() {
    return {};
  },
  created() {},
  beforeUpdate() {},
  methods: {}
};
</script>