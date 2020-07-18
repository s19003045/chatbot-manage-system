<template>
  <div class>
    <h3>TextMessage</h3>
    <div class>
      <ul>
        <li v-for="(item,index) in context" :key="index">
          <div class="input-group">
            <input type="text" v-model="item.text" />
          </div>
        </li>
      </ul>
    </div>
    <button @click="addText">新增一個文字訊息</button>
    <button @click="addQuickReply">加入快速回覆</button>
  </div>
</template>

<script>
export default {
  name: "TextMessage",
  data() {
    return {
      textSchema: {
        type: "text",
        text: ""
      },
      quickReplySchema: {
        items: [
          {
            type: "action", //required
            imageUrl: "", //optional
            action: {
              type: "",
              label: ""
            }
          }
        ]
      },
      actionSchemaForQuick: {
        postback: {
          type: "postback",
          label: "",
          data: "subject=&data=",
          text: ""
        },
        message: {
          type: "message",
          label: "",
          text: ""
        },
        cameraRoll: {
          type: "cameraRoll",
          label: "Send photo"
        },
        location: {
          type: "location",
          label: "Location"
        },
        datetimepicker: {
          type: "datetimepicker",
          label: "Select date",
          data: "storeId=12345",
          mode: "datetime",
          initial: "2017-12-25t00:00",
          max: "2018-01-24t23:59",
          min: "2017-12-25t00:00"
        }
      },
      actionSchema: {
        postback: {
          type: "postback",
          label: "",
          data: "subject=&data=",
          text: ""
        },
        message: {
          type: "message",
          label: "",
          text: ""
        },
        uri: {
          type: "uri",
          label: "",
          uri: "",
          altUri: {
            desktop: ""
          }
        },
        cameraRoll: {
          type: "cameraRoll",
          label: "Send photo"
        },
        location: {
          type: "location",
          label: "Location"
        },
        datetimepicker: {
          type: "datetimepicker",
          label: "Select date",
          data: "storeId=12345",
          mode: "datetime",
          initial: "2017-12-25t00:00",
          max: "2018-01-24t23:59",
          min: "2017-12-25t00:00"
        }
      },

      context: []
    };
  },
  created() {
    this.context.push({ ...this.textSchema });
  },
  mounted() {},
  beforeUpdate() {},
  methods: {
    //新增一個文字訊息
    addText() {
      this.context.push({ ...this.textSchema });
    },
    //新增 quick reply
    addQuickReply() {
      this.context[this.context.length - 1].quickReply = {
        ...this.quickReplySchema
      };
    }
  }
};
</script>