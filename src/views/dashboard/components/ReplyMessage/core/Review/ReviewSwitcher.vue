<template>
  <div>
    <!-- text message -->
    <div v-if="replyMsgItem.type === 'text'" class>
      <TextMessage :reply-msg-item="replyMsgItem" />
    </div>

    <!-- button template message -->
    <div v-if="replyMsgItem.type === 'template' && replyMsgItem.template.type === 'buttons'" class>
      <ButtonsTemplate :reply-msg-item="replyMsgItem" />
    </div>

    <!-- carousel template message -->
    <div v-if="replyMsgItem.type === 'template' && replyMsgItem.template.type === 'carousel'" class>
      <CarouselTemplate :reply-msg-item="replyMsgItem" />
    </div>
  </div>
</template>

<script>
import TextMessage from "./TextMessage.vue";
import ButtonsTemplate from "./ButtonsTemplate.vue";
import CarouselTemplate from "./CarouselTemplate.vue";

export default {
  props: {
    replyMsgItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    TextMessage,
    ButtonsTemplate,
    CarouselTemplate,
  },
};
</script>

<style lang="scss" scoped>
</style>