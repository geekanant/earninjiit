<template>
  <div>
    <header id="header" v-if="!authUser">
      <div class="container">
        <div id="logo" class="pull-left">
          <a href="#hero"
            ><img
              src="img/logo-landing.png"
              width="175px"
              height="50px"
              alt="Earn In JIIT"
              title=""
            />
          </a>
        </div>

        <nav id="nav-menu-container">
          <ul class="nav-menu">
            <li v-if="!authUser" class="menu-active">
              <a href="#hero">Home</a>
            </li>
            <li v-if="!authUser"><a href="#about">About</a></li>
            <li v-if="!authUser"><a href="#team1">Team</a></li>
            <li v-if="!authUser"><a href="#faq">FAQ</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="authUser">
      <router-link class="navspace navbar-brand" to="/">
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
        <ul class="navspace1 navbar-nav ml-auto">
          <li class="nav-item" v-if="phoneUser != ''">
            <router-link class="nav-link" to="/article/create"
              >Create New Post</router-link
            >
          </li>

          <li class="nav-item" v-if="phoneUser == ''">
            <router-link class="nav-link" to="/updatecontact"
              >Create New Post</router-link
            >
          </li>
          <li class="nav-item" v-if="authUser">
            <router-link class="nav-link" to="/">All Posts</router-link>
          </li>
          <li class="nav-item" v-if="authUser">
            <router-link class="nav-link" to="/archivedposts"
              >Post Archives</router-link
            >
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
              Hey {{ authUser }}!
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="nav-link ml-3" to="/myposts"
                >My Posts</router-link
              >
              <router-link class="nav-link ml-3" to="/report"
                >Report a Bug/Feedback</router-link
              >
              <router-link class="nav-link ml-3" to="/termsandconditions"
                >Terms And Conditions</router-link
              >
              <router-link class="nav-link ml-3" to="/advertise"
                >Advertise With Us</router-link
              >

              <a class="dropdown-item" @click="logout()" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <!-- #header -->
</template>

<script>
import Axios from "axios";

export default {
  mounted() {},
  computed: {
    authUser() {
      return this.$root.auth.displayName;
    },
    phoneUser() {
      return this.$root.modeofcontact;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("phone");
      this.$root.auth = {};
      this.$root.modeofcontact = "";
      this.$noty.success("Successfully logged out.");
      this.$router.push("/");
      this.$router.go();
    },
  },
};
</script>

<style>
.navspace {
  margin-left: 10%;
}

@media (max-width: 768px) {
  .navspace {
    margin-left: 3%;
  }
}

.navspace1 {
  margin-right: 20%;
}
</style>
