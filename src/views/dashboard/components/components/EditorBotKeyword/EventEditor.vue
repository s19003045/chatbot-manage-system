<template>
  <div class>
    <h1>EventEditor</h1>
    <p>{{textEvents}}</p>
  </div>
</template>

<script>
// import helpers
// import keywordReplyAPI from "../../../../../apis/keywordReply.js";
// import { Toast } from "../../../../../utils/helpers";

export default {
  name: "EventEditor",
  props: {
    textEvents: {
      type: Array
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>