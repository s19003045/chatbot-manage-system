<template>
  <div>
    <h3>KeywordEditor</h3>
    <div class="">
      keywords <br />
      {{ keywords }}<br />
      <hr />
      moduleClick <br />
      {{ moduleClick }}<br />
      <hr />
      replyModuleList<br />
      {{ replyModuleList }} <br />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keywords: {
      type: Array,
      default() {
        return [];
      },
    },
    moduleClick: {
      type: Object,
      default() {
        return [];
      },
    },
    replyModuleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped></style>
