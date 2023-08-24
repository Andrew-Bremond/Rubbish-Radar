<template>
  <div class="userLogin">
    <template v-if="!userLoggedIn">
      <h2 style="text-align: center;">
        Login / Sign Up
      </h2>
      <!-- TODO: We should hide this if a user is already logged in and show logout instead -->
      Email: <input
        v-model.trim="email"
        type="text"
        style="text-align: left; margin-left: 10%;"
        placeholder="example@email.com"
      >
      <br>
      Password: <input
        v-model.trim="password"
        type="password"
        placeholder="password"
      >
      <template
        v-if="password != null && password.length != 0 && password.length < 6"
        style="color:red"
      >
        <br>Your password must be at least 6 characters
      </template>
      <br>
      <br>
      <br>
      <button @click="createUser()">
        Create User
      </button>
      <br>
      <button @click="login()">
        Login
      </button>
      <!-- TODO: Update the styling here to color:red -->
      <template v-if="userNotFound">
        <br>
        User not found
      </template>
      <template v-if="invalidPassword">
        <br>
        Invalid password
      </template>
    </template>
    <template v-else>
      <button @click="signOut()">
        Sign Out
      </button>
    </template>
  </div>
</template>



<script>
import { auth } from "../firebaseResources";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  // For this component to work you'll need to enable auth in your project and minimally enable
  // email/password as a authentication provider
  
  data() {
    return {
      email: null,
      password: null,

      userNotFound: false,
      invalidPassword: false,

      userLoggedIn: false,
    };
  },
  mounted() {
    // Here we check the user and handle their state manually, which is less than ideal and not the
    // recommended method. We do this for two reasons:
    // - To give you an example of how to access user state manually for cases you need it
    // - To avoid the introduction of stores which are taught later in the curriculum
    // The "correct" way to do this is to use the onAuthStateChanged to detect changes to the users
    // status and write that to a store so that its available across all pages. This will reduce the
    // amount of boilerplate code you have to write to check user state and be prone to errors around
    // user state transitions
    const user = auth.currentUser;
    if (user != null) {
      this.userLoggedIn = true;
    }
  },
  methods: {
    async login() {
      try {
        // Reset error messages
        this.userNotFound = false;
        this.invalidPassword = false;

        await signInWithEmailAndPassword(auth, this.email, this.password);

        // Mark that we are now logged in
        this.userLoggedIn = true;
      } catch(err) {
        if (err.code) {
          // Process auth specific error messages and display them to the user
          if (err.code === "auth/wrong-password") {
            console.error("Error in login, wrong password");
            this.invalidPassword = true;
          } else if (err.code === "auth/user-not-found") {
            console.error("Error in login, user not found");
            this.userNotFound = true;
          }
        } else {
          // All other errors are logged to the console
          console.error("Error in login", err);
        }
      }
    },
    async createUser() {
      try {
        // Reset error messages
        this.userNotFound = false;
        this.invalidPassword = false;

        await createUserWithEmailAndPassword(auth, this.email, this.password);

        // Mark that we are now logged in
        this.userLoggedIn = true;
        console.log("Current user", auth.currentUser);
      } catch(err) {
        console.error("Error in createUser", err);
      }
    },
    async signOut() {
      try {
        if (auth.currentUser) {
          await signOut(auth);

          // Mark that we are now logged out
          this.userLoggedIn = false;
        } else {
          console.warn("No user signed in");
        }
      } catch(err) {
        console.error("Error in signOut", err);
      }
    }
  }
};
</script>

<style>
    .userLogin {
        margin-top: 10%;
    }
</style>