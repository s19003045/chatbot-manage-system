<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary mb-5">
    <router-link
      class="navbar-brand text-lead"
      :to="{name:'overview',params:{botId:'bot-abcde'}}"
    >MaraBot</router-link>
  </nav>
</template>

<script>
export default {};
</script>