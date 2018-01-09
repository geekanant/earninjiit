<template>
  <div class="container">
    <h6 class="text-center mt-4">Posts by you will appear here</h6>
    <div class="input-group">
      <select
        class="abc form-control mt-3"
        v-model="category"
        @change="categoryfind()"
      >
        <option value="" selected="selected">Filter a category</option>
        <option
          :value="category.name"
          :key="category.name"
          v-for="category in categories"
        >
          {{ category.name }}
        </option>
      </select>
      <button
        @click="clearFilter()"
        :disabled="category == ''"
        class="btn btn-sm ml-2 mt-3 btn-success"
      >
        Clear
      </button>
    </div>
    <div class="loader text-center" v-if="loading">
      <i class="fas fa-5x mt-5 fa-spin fa-spinner"></i>
    </div>
    <div
      class="col-md-8 offset-md-2"
      v-for="article in articles"
      :key="article.id"
    >
      <Article :article="article" />
    </div>

    <div class="col-md-8 offset-md-2" v-if="articles.length < 1">
      <div class="container mt-5 text-center">
        <p>Sorry! No posts on this category yet. Check out later :)</p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Article from "@/components/Article.vue";

export default {
  beforeRouteEnter(to, from, next) {
    //Executes before route is mounted
    if (!localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  components: {
    Article,
  },
  mounted() {
    this.getArticles();
    this.getCategories();
  },
  data() {
    return {
      articles: {},
      category: "",
      categories: [],
      loading: true,
      postedBy: this.$root.auth.uid,
    };
  },
  methods: {
    getArticles() {
      Axios.get("/users/myposts", {
        params: {
          postedBy: this.postedBy,
        },
      }).then((response) => {
        this.loading = false;
        this.articles = response.data.posts;
      });
    },

    categoryfind() {
      Axios.get("/users/myfindposts", {
        params: {
          category: this.category,
          postedBy: this.postedBy,
        },
      }).then((response) => {
        this.articles = response.data.posts;
      });
    },

    clearFilter() {
      Axios.get("/users/myposts", {
        params: {
          postedBy: this.postedBy,
        },
      }).then((response) => {
        this.articles = response.data.posts;
        this.category = "";
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
