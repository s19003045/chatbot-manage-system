<template>
  <div class="row">
    <div class="col col-12">
      <h3>回傳訊息模組分析</h3>
      <h5 class="py-2">截取使用次數前 {{reservedDataNumber}} 名</h5>
    </div>
    <div class="col col-12 col-lg-5">
      <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>模組名稱</td>
            <td>模組使用次數</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in replyModules" :key="key">
            <td>{{key}}</td>
            <td>{{value.name}}</td>
            <td>{{value.moduleUsedCount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col col-12 col-lg-7">
      <canvas id="reply-module-chart"></canvas>
    </div>
  </div>
</template>

<script>
// import helpers
import analyticsAPI from "../../../../apis/analytics.js";

// import package
import Chart from "chart.js";

export default {
  name: "ReplyModuleAnalysis",
  data() {
    return {
      replyModules: [],
      chartData: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "模組使用次數",
              type: "bar",
              data: [],
              barPercentage: 0.6,
              barThickness: "flex",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          //setting for title
          title: {
            display: true,
            fontSize: 20,
            text: "回應模組分析",
          },
          //setting for scales
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true, //坐標軸從 0 開始
                },
                gridLines: {
                  offsetGridLines: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: true,
                },
              },
            ],
          },
          //setting for legend
          legend: {
            position: "top",
            display: true,
            labels: {
              fontColor: "black",
              fontFamily: "'Noto Sans TC', 'Lato', sans-serif",
            },
          },
        },
      },
      reservedDataNumber: 6,
    };
  },
  async created() {
    try {
      //faked data
      const apiData = {
        params: {
          botId: this.$store.state.chatbot.botId, //之後會從 this.$store 或從 this.$route 取得
        },
        query: {
          ChatbotId: this.$store.state.chatbot.id, //之後會從 this.$store 取得
        },
        data: {},
      };

      const { statusText, data } = await analyticsAPI.getReplyModuleAnalysis(
        apiData
      );

      if (statusText === "OK") {
        const replyModules = [...data.data.replyModules];

        //sort : descending
        replyModules.sort((a, b) => {
          return b.moduleUsedCount - a.moduleUsedCount;
        });

        //只保留前幾名數據
        replyModules.splice(this.reservedDataNumber);

        //指派給 local variable
        this.replyModules = replyModules;

        //組裝成 chart 需要的 data
        this.replyModules.forEach((element) => {
          //為每筆數據命名
          this.chartData.data.labels.push(element.name);
          //異動 moduleUsedCount
          this.chartData.data.datasets[0].data.push(element.moduleUsedCount);
        });

        //繪製chart
        this.createChart("reply-module-chart", this.chartData);
      }
    } catch (err) {
      console.log(err);
    }
  },
  mounted() {},
  beforeUpdate() {},
  methods: {
    //產生圖表函式
    createChart: (chartId, chartData) => {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
};
</script>