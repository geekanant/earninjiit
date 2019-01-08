<template>
  <div class="card my-3">
    <div class="card-header font-weight-bolder h5">{{ article.title }}</div>
    <div class="card-body">
      <div class="row">
        <div class="my-3 ml-3 text-muted">Category :</div>
        <div class="my-3 ml-1">{{ article.category }}</div>
      </div>
      <div class="row text-center">
        <div class="col-md-3 my-4 text-muted">
          Start by: <br />{{ article.startby }}
        </div>
        <div class="col-md-3 my-4 text-muted">
          Need it by: <br />
          {{ article.needitby }}
        </div>
        <div class="col-md-3 my-4 text-muted">
          Price offered: <br />
          {{ article.price }}
        </div>
        <div class="col-md-3 my-4 text-muted">
          Need at: <br />{{ article.needat }}
        </div>
      </div>
    </div>
    <div class="card-footer">
      <small class="text-muted"
        >Posted <timeago :datetime="this.article.created"></timeago> by
        {{ article.postedByName }}</small
      >
      <router-link
        :to="`/article/${article._id}`"
        v-if="sameUser()"
        class="btn btn-primary"
        style="float: right"
        >Edit or Delete</router-link
      >
      <router-link
        :to="`/article/${article._id}`"
        v-if="!sameUser()"
        class="btn btn-primary"
        style="float: right"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    sameUser() {
      return this.article.postedByEmail == this.$root.auth.email;
    },
  },
};
</script>
