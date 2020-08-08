<template>
  <div class="mb-1 ml-3">
    <div class="form-group">
      <label for="modulePostBackName" class="h5">模組名稱</label>
      <input
        type="email"
        class="form-control"
        id="modulePostBackName"
        aria-describedby
        v-model="replyModule.name"
        ref="moduleName"
      />
      <small id class="form-text text-muted"></small>
    </div>
  </div>
</template>

<script>
// import store
import { mapMutations } from "vuex";

export default {
  name: "ModuleEditor",
  props: {
    replyModule: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    replyModuleName() {
      return this.replyModule.name;
    },
  },
  created() {},
  beforeUpdate() {
    this.focusInput();
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    ...mapMutations(["changeSavingStatus"]),
    focusInput() {
      this.$refs.moduleName.focus();
    },
  },
  watch: {
    replyModuleName() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({
        isEditing: true,
      });
    },
  },
};
</script>