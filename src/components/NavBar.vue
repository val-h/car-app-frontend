<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Cars</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Ifs could be simplified and not duplicated -->
      <!-- Checked -->
      <b-navbar-nav v-if="!isLogged">
        <b-nav-item to="/register">Register</b-nav-item>
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item to="/logout">Logout</b-nav-item>
        <b-nav-item to="/post/create">Create post</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-icon icon='bell-fill'></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // FIXME Mapping getters/actions or other stuff should be consistent
  computed: {
    ...mapGetters([
      'is_staff'
    ]),
    isLogged () {
      return this.$store.getters.logged_in
    }
  }
}
</script>

<style scoped>
#nav a {
  color: azure;
}

#nav-collapse {
  color: azure;
}
</style>
