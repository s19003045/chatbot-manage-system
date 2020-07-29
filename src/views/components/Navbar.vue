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
    <b-navbar-brand :to="{name:'overview'}">WoaWoaBot</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav fill>
        <!-- <b-nav-item active>link</b-nav-item>
        <b-nav-item active>Go</b-nav-item>-->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown fill text right>
          <template v-slot:button-content right>
            <b-icon font-scale="2" icon="person-circle"></b-icon>
          </template>

          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>