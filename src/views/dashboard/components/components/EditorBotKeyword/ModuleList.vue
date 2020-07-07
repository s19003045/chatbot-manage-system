<template>
  <div class="mb-5 py-3 px-1 border border-secondary rounded">
    <h5>關鍵字回應模組清單</h5>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">模組名稱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="moduleKeyword in moduleKeywords" v-bind:key="moduleKeyword.id">
          <td
            :data-module-keyword-uuid="moduleKeyword.uuid"
          >{{moduleKeyword.name === null ? "尚未命名模組" : moduleKeyword.name}}</td>
        </tr>
      </tbody>
    </table>

    <hr />
  </div>
</template>

<script>
export default {
  name: "ModuleList",
  props: {
    moduleKeywords: {
      type: Array
    }
  },
  data() {
    return {};
  },
  created() {}
};
</script>