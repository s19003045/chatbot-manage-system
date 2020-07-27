<template>
  <div class="mb-4">
    <div class="form-group">
      <label for="moduleKeywordName" class="h5">模組名稱</label>
      <input
        type="email"
        class="form-control"
        id="keywordName"
        aria-describedby
        v-model="keyword.name"
        ref="moduleName"
      />
      <small id class="form-text text-muted"></small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleEditor",
  props: {
    keyword: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {},
  beforeUpdate() {
    this.focusInput();
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.moduleName.focus();
    },
  },
};
</script>