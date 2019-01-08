<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.png" width="200px" height="60px" alt="" />
      </router-link>
      <div class="navbar-collapse collapse">
        <ul class="nav nav-justified"></ul>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="authUser">
            <router-link class="nav-link" to="/article/create"
              >Create New Post</router-link
            >
          </li>
          <li class="nav-item" v-if="authUser">
            <router-link class="nav-link" to="/archivedposts"
              >Post
            </router-link>
          </li>
          <li class="nav-item dropdown" v-if="authUser">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Hey {{ authUser.ofa }}!
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" @click="logout()" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {},
  computed: {
    authUser() {
      return this.$root.auth;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$root.auth = {};
      this.$noty.success("Successfully logged out.");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
