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

//chart default setting
import Chart from "chart.js";
Chart.defaults.global.defaultFontFamily = "'Noto Sans TC', 'Lato', sans-serif";
Chart.defaults.global.defaultFontColor = "black";

//setting for legend
Chart.defaults.global.legend.labels.fontSize = 16;

//setting for line
//※Changing the global options only affects charts created after the change. Existing charts are not changed
Chart.defaults.line.backgroundColor = "rgba(0, 0, 0, 0.1)";
Chart.defaults.line.borderWidth = 5;
Chart.defaults.line.fill = false;
Chart.defaults.line.lineTension = 0;

//setting for line option
Chart.defaults.global.showLines = true;

//setting for point in line
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.hoverRadius = 8;
Chart.defaults.global.elements.point.borderWidth = 2;
Chart.defaults.global.elements.point.borderColor = "rgba(0, 0, 0, 0.3)";

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