<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <p>Earn in JIIT reserves the right to:</p>
            <p>
              1. Ban users from the platform if repeatedly found posting
              fake/spam posts.
            </p>
            <p>2. Ban users outside JIIT if found.</p>
            <p>3. Ban users if they are found reporting posts unnecessarily.</p>
            <p>
              4. The platform is connecting two people. Payment/Getting work
              done right is not within our scope.
            </p>
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
};
</script>
