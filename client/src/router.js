import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import CreateArticle from "./views/CreateArticle.vue";
import Article from "./views/Article.vue";
import PostArchive from "./views/PostArchive.vue";
import MyPosts from "./views/MyPosts.vue";
import UpdateContact from "./views/UpdateContact.vue";
import EditPost from "./views/EditPost.vue";
import Report from "./views/ReportBug.vue";
import TermsAndConditions from "./views/TermsAndConditions.vue";
import Advertise from "./views/Advertise.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",

      component: Home,
    },

    {
      path: "/updatecontact",
      component: UpdateContact,
    },
    {
      path: "/category",
      component: Home,
    },
    {
      path: "/article/edit/:id",
      component: EditPost,
    },
    {
      path: "/archivedposts",
      component: PostArchive,
    },
    {
      path: "/myposts",
      component: MyPosts,
    },
    {
      path: "/article/create",
      component: CreateArticle,
    },
    {
      path: "/article/:id",
      component: Article,
    },
    {
      path: "/report",
      component: Report,
    },
    {
      path: "/termsandconditions",
      component: TermsAndConditions,
    },
    {
      path: "/advertise",
      component: Advertise,
    },
  ],
});

export default router;
