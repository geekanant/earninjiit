<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <select class="form-control my-3" v-model="category">
              <option value="" selected="selected">Select a category</option>
              <option
                :value="category.name"
                :key="category.name"
                v-for="category in categories"
              >
                {{ category.name }}
              </option>
            </select>
            <input
              v-model="title"
              v
              type="text"
              placeholder="Title (Eg. Need Photocopy)"
              class="mb-3 form-control"
            />
            <select class="form-control my-3" v-model="startby">
              <option value="" selected="selected">Start by</option>
              <option value="ASAP">ASAP</option>
              <option value="2-4 days">2-4 days</option>
              <option value="Within a week">Within a week</option>
              <option value="No time boundations">No time boundations</option>
            </select>
            <select v-model="needitby" class="form-control my-3">
              <option value="" selected="selected">Need it by</option>
              <option value="Urgently (Less than a day)">
                Urgently (Less than a day)
              </option>
              <option value="2-4 days">2-4 days</option>
              <option value="Within a week">Within a week</option>
              <option value="No time boundations">No time boundations</option>
            </select>
            <select class="form-control my-3" v-model="needat">
              <option value="" selected="selected">Need at</option>
              <option value="JIIT 128">JIIT 128</option>
              <option value="JIIT 128 PG">JIIT 128 PG</option>
              <option value="JIIT 62">JIIT 62</option>
              <option value="JIIT 62 Hostel">JIIT 62 Hostel</option>
              <option value="JUET, Guna">JUET, Guna</option>
              <option value="JUIT, Solan">JUIT, Solan</option>
              <option value="Other(To be discussed on contact)">
                Other(To be discussed on contact)
              </option>
            </select>

            <input
              class="mb-3"
              v-model="priceuponcontact"
              type="checkbox"
              value="Price Upon Contact"
            />
            Price to be discussed on contact

            <input
              v-model="price"
              type="text"
              v-if="priceuponcontact == ''"
              placeholder="Price offered"
              class="mb-3 form-control"
            />

            <wysiwyg
              v-model="content"
              placeholder="Enter Additional Details (Optional)"
            />
            <button
              @click="createArticle()"
              :disabled="loading"
              class="btn form-control btn-success"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? "" : "Create Post" }}
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
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      startby: "",
      needitby: "",
      price: "",
      priceuponcontact: "",
      needat: "",
      additionaldetails: "",
      content: "",
      category: "",
      title: "",
      categories: [],
      loading: false,
      postedByName: this.$root.auth.displayName,
      userId: this.$root.auth.uid,
      postedByEmail: this.$root.auth.email,
    };
  },
  methods: {
    createArticle() {
      if (this.price == "" && this.priceuponcontact == "") {
        this.$noty.error("Please enter valid price.");
        return;
      } else if (this.priceuponcontact) {
        this.price = "To be discussed on contact";
      } else if (this.price !== "" && isNaN(this.price)) {
        this.$noty.error("Please enter valid price.");
        return;
      }
      if (this.price !== "" && !isNaN(this.price)) {
        this.price = "₹" + this.price;
      }
      if (
        !this.title ||
        !this.startby ||
        !this.needitby ||
        !this.price ||
        !this.needat ||
        !this.category
      ) {
        this.$noty.error("Please fill in all fields.");
        return;
      }

      this.loading = true;
      Axios.post("/users/newPost", {
        title: this.title,
        startby: this.startby,
        needitby: this.needitby,
        price: this.price,
        needat: this.needat,
        content: this.content,
        category: this.category,
        userId: this.userId,
        postedByName: this.postedByName,
        postedByEmail: this.postedByEmail,
      })
        .then(() => {
          this.loading = false;
          this.$noty.success(
            "Successfully created article. You can modify it in the My Posts section."
          );
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.$noty.error("Oops! Something went wrong");
        });
    },

    getCategories() {
      const categories = localStorage.getItem("categories");

      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }

      Axios.get("/users/categories").then((res) => {
        this.categories = res.data.category;
        localStorage.setItem("categories", JSON.stringify(this.categories));
      });
    },
  },
};
</script>
