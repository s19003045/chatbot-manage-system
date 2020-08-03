<template>
  <div>
    <!-- text message -->
    <div v-if="replyMsgItem.type === 'text'" class>
      <TextMessage :reply-msg-item="replyMsgItem" :reply-msg-index="replyMsgIndex" />
    </div>

    <!-- button template message -->
    <div v-if="replyMsgItem.type === 'template' && replyMsgItem.template.type === 'buttons'" class>
      <ButtonsTemplate :reply-msg-item="replyMsgItem" :reply-msg-index="replyMsgIndex" />
    </div>

    <!-- carousel template message -->
    <div v-if="replyMsgItem.type === 'template' && replyMsgItem.template.type === 'carousel'" class>
      <CarouselTemplate :reply-msg-item="replyMsgItem" :reply-msg-index="replyMsgIndex" />
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
    replyMsgIndex: {
      type: Number,
      default: -1,
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