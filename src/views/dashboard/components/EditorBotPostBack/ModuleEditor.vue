<template>
  <div class="mb-1 ml-3">
    <div class="form-group">
      <label for="modulePostBackName" class="h5">模組名稱</label>
      <input
        type="email"
        class="form-control"
        id="modulePostBackName"
        aria-describedby
        v-model="modulePostBack.name"
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
    modulePostBack: {
      type: Object
    }
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
    }
  }
};
</script>