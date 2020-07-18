<template>
  <div class>TextMessage</div>
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
};
</script>