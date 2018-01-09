<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <select class="form-control my-3" v-model="needat">
              <option value="" selected="selected">Select option</option>
              <option value="Report a Bug">Report a Bug</option>
              <option value="Submit Feedback">Submit Feedback</option>
            </select>
            <wysiwyg v-model="content" placeholder="Enter Details" />
            <button
              @click="createArticle()"
              :disabled="loading"
              class="btn form-control btn-success"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? "" : "Submit" }}
            </button>
          </div>
        </div>
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
      needat: "",
      content: "",
      loading: false,
      postedByName: this.$root.auth.displayName,
      userId: this.$root.auth.uid,
      postedByEmail: this.$root.auth.email,
    };
  },
  methods: {
    createArticle() {
      if (!this.needat || !this.content) {
        this.$noty.error("Please fill in all fields.");
        return;
      }

      this.loading = true;
      Axios.post("/users/newBug", {
        needat: this.needat,
        content: this.content,
        userId: this.userId,
        postedByName: this.postedByName,
        postedByEmail: this.postedByEmail,
      })
        .then(() => {
          this.loading = false;
          this.$noty.success("Successfully submitted.");
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.$noty.error("Oops! Something went wrong");
        });
    },
  },
};
</script>
