<template>
  <div class="container">
    <div id="recaptcha-container"></div>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <p>
              Please select your preferred mode of contact for users to contact
              you
            </p>
            <select
              class="form-control my-3"
              v-model="modeofcontact"
              :disabled="verified"
            >
              <option value="" selected="selected">
                Select preferred mode of contact
              </option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
            <input
              v-model="email"
              type="text"
              v-if="modeofcontact == 'Email'"
              disabled
              class="mb-3 form-control"
            />
            <input
              v-model="phone"
              type="number"
              v-if="modeofcontact == 'Phone'"
              :disabled="verified || otpsent"
              placeholder="Enter Phone"
              class="mb-3 form-control"
            />
            <button
              v-if="modeofcontact == 'Phone'"
              :disabled="otpsent"
              class="mb-3 btn-info"
              @click="sendOtp"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? "" : "Send OTP" }}
            </button>
            <input
              v-if="modeofcontact == 'Phone' && this.otpsent == true"
              class="mb-3 form-control"
              type="number"
              :disabled="verified"
              v-model="otp"
              placeholder="Enter OTP"
            />
            <button
              v-if="modeofcontact == 'Phone' && this.otpsent == true"
              class="mb-3 btn-primary"
              :disabled="verified"
              @click="verifyOtp"
            >
              Verify
            </button>
            <button
              v-if="modeofcontact == 'Phone' && this.otpsent == true"
              class="mb-3 ml-2 btn-info"
              :disabled="verified"
              @click="sendOtp()"
            >
              Resend OTP
            </button>
            <button
              v-if="this.verified == true || this.modeofcontact == 'Email'"
              @click="createArticle()"
              :disabled="loading"
              class="btn form-control btn-success"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? "" : "Update Contact Details" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import firebase from "firebase";

export default {
  beforeRouteEnter(to, from, next) {
    //Executes before route is mounted
    if (!localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      appVerifier: "",
      verified: false,
      otp: "",
      otpsent: false,
      otpentered: false,
      modeofcontact: "",
      modeofcontact1: "",
      phone: "",
      email: this.$root.auth.email,
      loading: false,
    };
  },
  methods: {
    sendOtp() {
      if (this.phone.length != 10) {
        alert("Invalid Phone Number Format !");
      } else {
        //
        let countryCode = "+91"; //india
        let phoneNumber = countryCode + this.phone;
        //
        let appVerifier = this.appVerifier;
        //
        this.loading = true;

        let vm = this;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            vm.otpsent = true;
            vm.loading = false;
          })
          .catch(function (error) {
            // Error; SMS not sent
            // ...

            alert("Error ! SMS not sent");
          });
      }
    },
    //
    verifyOtp() {
      if (this.phone.length != 10 || this.otp.length != 6) {
        alert("Invalid Phone Number/OTP Format !");
      } else {
        //
        let vm = this;
        let code = this.otp;
        let suc = this.$noty.success("Successfully verified .");

        //createArticle
        window.confirmationResult
          .confirm(code)
          .then(function (result) {
            // User signed in successfully.
            var user = result.user;
            // ...

            vm.otpsent = true;
            vm.verified = true;
            suc;
          })
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error);
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {},
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 100);
    },

    createArticle() {
      if (this.phone == "") {
        this.modeofcontact1 = "email";
      } else {
        this.modeofcontact1 = "phone";
      }
      localStorage.setItem("modeofcontact", this.modeofcontact1);

      this.loading = true;
      Axios.post("/users/updatePhone", {
        phone: this.phone,
        email: this.$root.auth.email,
        modeofcontact: this.modeofcontact1,
      })
        .then(() => {
          this.loading = false;
          this.$root.modeofcontact = this.modeofcontact1;
          this.$noty.success("Successfully updated .");
          this.$router.push("/article/create");
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
  created() {
    this.initReCaptcha();
  },
};
</script>
