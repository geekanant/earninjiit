<template>
  <div class="container my-5">
    <div class="row text-center">
      <div class="col-md-10 offset-md-1">
        <div class="card" v-if="!loading">
          <div class="card-body" v-for="article in article" :key="article.id">
            <h1 class="card-title text-center my-3">
              {{ article.title }}
            </h1>
            <p>Start By: {{ article.startby }}</p>
            <p>Need it By: {{ article.needitby }}</p>
            <p>Price offered: {{ article.price }}</p>
            <p>Need At: {{ article.needat }}</p>
            <div class="my-3" v-html="article.content"></div>
          </div>
        </div>
        <div class="loader text-center" v-if="loading">
          <i class="fas fa-5x fa-spin fa-spinner"></i>
        </div>
        <button
          @click="deletePost()"
          :disabled="loading"
          v-if="sameUser()"
          class="btn mt-3 btn-danger"
        >
          <i class="fas fa-spin fa-spinner" v-if="loading"></i>
          {{ loading ? "" : "Delete Post" }}
        </button>

        <router-link :to="`/article/edit/${article[0]._id}`">
          <button
            :disabled="loading"
            v-if="sameUser()"
            class="btn mt-3 ml-3 btn-success"
          >
            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
            {{ loading ? "" : "Edit Post" }}
          </button>
        </router-link>

        <button
          @click="contactNow()"
          :disabled="loading"
          v-if="!sameUser()"
          class="btn mt-3 ml-3 btn-success"
        >
          <i class="fas fa-spin fa-spinner" v-if="loading"></i>
          {{ loading ? "" : "Contact Now" }}
        </button>

        <button
          @click="reportNow()"
          :disabled="loading"
          v-if="!sameUser()"
          class="btn mt-3 ml-3 btn-danger"
        >
          <i class="fas fa-spin fa-spinner" v-if="loading"></i>
          {{ loading ? "" : "Report Post/User" }}
        </button>

        <a :href="'mailto:' + this.user.email" target="_blank">
          <button
            :disabled="loading"
            v-if="this.user.modeofcontact == 'email'"
            class="btn mt-3 ml-3 btn-info"
          >
            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
            {{ loading ? "" : "Send Mail" }}
          </button></a
        >

        <a :href="'tel:' + this.user.phone" target="_blank">
          <button
            :disabled="loading"
            v-if="this.user.modeofcontact == 'phone'"
            class="btn mt-3 ml-3 btn-info"
          >
            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
            {{ loading ? "" : "Call Now" }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    //Executes before route is mounted
    if (!localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  data() {
    return {
      article: {},
      loading: true,
      user: {},
      postedByName: this.$root.auth.displayName,
      userId: this.$root.auth.uid,
      postedByEmail: this.$root.auth.email,
    };
  },

  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      Axios.get(`/users/posts/${this.$route.params.id}`).then((response) => {
        this.loading = false;
        this.article = response.data.posts;
      });
    },
    deletePost() {
      Axios.get(`/users/posts/${this.$route.params.id}/delete`).then(() => {
        this.loading = false;
        this.$noty.success("Successfully deleted.");
        this.$router.push("/");
      });
    },

    contactNow() {
      Axios.get("/users/postcontact", {
        params: { postedByEmail: this.article[0].postedByEmail },
      }).then((response) => {
        this.loading = false;
        this.user = response.data;
      });
    },

    reportNow() {
      if (
        this.article[0].postedByEmail == "anantpatni1@gmail.com" ||
        this.article[0].postedByEmail == "singhalshivam96@gmail.com" ||
        this.article[0].postedByEmail == "manika.kaushik1430@gmail.com" ||
        this.article[0].postedByEmail == "vishalchaudhary758@gmail.com" ||
        this.article[0].postedByEmail == "b.dubey1111@gmail.com"
      ) {
        this.$noty.error(
          "Sorry! you cannot report someone who is part of the team."
        );
      } else {
        Axios.post("/users/reportUser", {
          email: this.article[0].postedByEmail,
          userId: this.userId,
          reportedPost: this.article[0]._id,
          reportedByName: this.postedByName,
          reportedByEmail: this.postedByEmail,
        })
          .then(() => {
            this.loading = false;
            this.$noty.success("Successfully reported.");
          })
          .catch(() => {
            this.loading = false;
            this.$noty.error("Oops! Something went wrong");
          });
      }
    },

    sameUser() {
      if (this.article[0].postedByEmail == this.$root.auth.email) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
