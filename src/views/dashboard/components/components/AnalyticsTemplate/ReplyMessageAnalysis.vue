<template>
  <div class>
    <h3>回應訊息樣版分析</h3>
    <table class="table">
      <thead>
        <tr>
          <td>#</td>
          <td>樣版名稱</td>
          <td>樣版使用次數</td>
          <td>使用者已讀次數</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in ReplyMessageAnalysis" :key="key">
          <td>{{key}}</td>
          <td>{{value.name}}</td>
          <td>{{value.replyMsgCount}}</td>
          <td>{{value.readMsgCount}}</td>
        </tr>
      </tbody>
    </table>
    <canvas id="reply-msg-chart"></canvas>
  </div>
</template>

<script>
// import helpers
import analyticsAPI from "../../../../../apis/analytics.js";

// import package
import Chart from "chart.js";

export default {
  name: "ReplyMessageAnalysis",
  data() {
    return {
      ReplyMessageAnalysis: [],
      chartData: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "樣版使用次數",
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
                "rgba(255, 206, 86, 0.2)"
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
                "rgba(255, 206, 86, 1)"
              ],
              borderWidth: 1
            },
            {
              label: "樣版已閱次數",
              type: "line",
              data: []
            }
          ]
        },
        options: {
          title: {
            display: true,
            fontSize: 20,
            text: "回應訊息樣版分析"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true //坐標軸從 0 開始
                },
                gridLines: {
                  offsetGridLines: true
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: true
                }
              }
            ]
          },
          legend: {
            position: "right",
            display: true
            // labels: {
            //   fontColor: "black",
            //   fontFamily: "'Noto Sans TC', 'Lato', sans-serif"
            // }
          }
        }
      },
      reservedDataNumber: 6
    };
  },
  async created() {
    try {
      //faked data
      const apiData = {
        params: {
          botId: 1 //之後會從 this.$store 或從 this.$route 取得
        },
        query: {
          ChatbotId: 1 //之後會從 this.$store 取得
        },
        data: {}
      };

      const { statusText, data } = await analyticsAPI.getReplyMessageAnalysis(
        apiData
      );

      if (statusText === "OK") {
        const replyMsgAnalysis = [...data.data.replyMsgAnalysis];

        //sort : descending
        replyMsgAnalysis.sort((a, b) => {
          return b.replyMsgCount - a.replyMsgCount;
        });

        //只保留前幾名數據
        replyMsgAnalysis.splice(this.reservedDataNumber);

        //指派給 local variable
        this.ReplyMessageAnalysis = replyMsgAnalysis;

        //組裝成 chart 需要的 data
        this.ReplyMessageAnalysis.forEach(element => {
          //為每筆數據命名
          this.chartData.data.labels.push(element.name);
          //異動 replyMsgCount
          this.chartData.data.datasets[0].data.push(element.replyMsgCount);
          //異動 moduleReadCount
          this.chartData.data.datasets[1].data.push(element.readMsgCount);
        });

        //繪製chart
        this.createChart("reply-msg-chart", this.chartData);
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
        options: chartData.options
      });
    }
  }
};
</script>