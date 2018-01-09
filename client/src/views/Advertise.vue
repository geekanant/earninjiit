<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <p>
              If you are a startup/company(preferably by ex-JIITians) targeting
              college students, drop in your email below and we will get back to
              you.
            </p>
            <input
              v-model="title"
              v
              type="text"
              placeholder="Startup/Company Name"
              class="mb-3 form-control"
            />
            <input
              v-model="email"
              v
              type="text"
              placeholder="Email"
              class="mb-3 form-control"
            />
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
    if (this.$root.modeofcontact == "") {
      return next({ path: "/updatecontact" });
    }
    next();
  },

  data() {
    return {
      title: "",
      email: "",
      loading: false,
      postedByName: this.$root.auth.displayName,
      userId: this.$root.auth.uid,
      postedByEmail: this.$root.auth.email,
    };
  },
  methods: {
    createArticle() {
      if (!this.title || !this.email) {
        this.$noty.error("Please fill in all fields.");
        return;
      }

      this.loading = true;
      Axios.post("/users/advertise", {
        title: this.title,
        email: this.email,
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
