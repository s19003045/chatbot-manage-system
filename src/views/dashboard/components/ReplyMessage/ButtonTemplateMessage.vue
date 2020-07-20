<template>
  <div class>ButtonTemplateMessage</div>
</template>

<script>
export default {
  name: "ButtonTemplateMessage",
  data() {
    return {
      schema: {
        type: "template",
        altText: "this is a buttons template",
        template: {
          type: "buttons",
          actions: [null],
          text: ""
        }
      }
    };
  }
};
</script>