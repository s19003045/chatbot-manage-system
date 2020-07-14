<template>
  <div class="my-2">
    <h1>AnalyticsTemplate</h1>

    <div class="container">
      <div class="row my-2">
        <div class="col">
          <ModuleKeywordAnalysis />
        </div>
      </div>
      <div class="row my-2">
        <div class="col">
          <ModulePostBackAnalysis />
        </div>
      </div>
      <div class="row my-2">
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