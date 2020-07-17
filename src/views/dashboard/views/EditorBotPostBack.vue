<template>
  <div class="row">
    <div class="col col-12">
      <h3>EditorBotPostBack</h3>

      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import ButtonTemplateMessage from "../components/EditorBotPostBack/ButtonTemplateMessage";
import CarouselTemplateMessage from "../components/EditorBotPostBack/CarouselTemplateMessage";
import ConfirmTemplateMessage from "../components/EditorBotPostBack/ConfirmTemplateMessage";
import ImageMapMessage from "../components/EditorBotPostBack/ImageMapMessage";
import ImageMessage from "../components/EditorBotPostBack/ImageMessage";
import QuickReplyMessage from "../components/EditorBotPostBack/QuickReplyMessage";
import TextMessage from "../components/EditorBotPostBack/TextMessage";
import VideoMessage from "../components/EditorBotPostBack/VideoMessage";

export default {
  name: "EditorBotPostBack",
  components: {
    ButtonTemplateMessage,
    CarouselTemplateMessage,
    ConfirmTemplateMessage,
    ImageMapMessage,
    ImageMessage,
    QuickReplyMessage,
    TextMessage,
    VideoMessage
  },
  data() {
    return {};
  },
  created() {},
  beforeUpdate() {},
  mounted() {},
  methods: {}
};
</script>