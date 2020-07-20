<template>
  <div class>CarouselTemplateMessage</div>
</template>

<script>
export default {
  name: "CarouselTemplateMessage",
  data() {
    return {
      schema: {
        type: "template",
        altText: "this is a carousel template",
        template: {
          type: "carousel",
          actions: [],
          columns: [
            {
              title: "",
              text: "",
              actions: [null, null]
            },
            {
              title: "",
              text: "",
              actions: [null, null]
            }
          ]
        }
      }
    };
  }
};
</script>