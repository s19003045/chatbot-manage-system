<template>
  <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">
    <!-- <b-navbar-toggle target="console-sidebar">
      <template v-slot:default>
        <b-icon icon="list" scale="2"></b-icon>
      </template>
    </b-navbar-toggle>-->
    <b-btn v-b-toggle.console-sidebar variant="outline-light" class="mr-4">
      <b-icon icon="list" font-scale="1.5" scale="1.3"></b-icon>
    </b-btn>
    <b-navbar-brand :to="{name:'overview',params:{
      botId:chatbot.botId
    }}">WoaWoaBot</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav fill>
        <!-- <b-nav-item active>link</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="mr-3">
          <template v-slot:button-content right>
            <b-icon font-scale="2" icon="bell" class="user-notify"></b-icon>
            <b-badge class="user-notify-badge">{{userNotification.length}}</b-badge>
          </template>

          <b-dropdown-item
            variant="light"
            v-for="(notify,index) in userNotification"
            :key="index"
            href="#"
            class="user-notify-item py-0"
          >
            {{notify.title}}
            <br />
            {{notify.text}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template v-slot:button-content right>
            <b-icon font-scale="2" icon="person-circle"></b-icon>
          </template>

          <b-dropdown-item variant="light" href="#">個人資料</b-dropdown-item>
          <b-dropdown-item variant="light" href="#">個人帳單</b-dropdown-item>
          <b-dropdown-item variant="light" href="#">登出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
// import helpers
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["chatbot", "channel", "userNotification"]),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.user-notify-badge {
  border-radius: 5px;
  min-width: 15px;
  min-height: 15px;
  font-size: 12px;
  padding: 3px 7px;
  line-height: 15px;
  text-align: center;
}
</style>