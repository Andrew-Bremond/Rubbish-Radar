<template>
  <div class="userLogin">
    <template v-if="!userLoggedIn">
      <h2 style="text-align: center;">Login / Sign Up</h2>
      
      <p style="text-align: left; ">
      Email: &nbsp; &nbsp; &nbsp; &nbsp; <input type="text" class="inputBox" v-model.trim="email" placeholder="example@email.com"/>
      </p>
      <br>
      Password: &nbsp; <input type="password" class="inputBox" v-model.trim="password" placeholder="password"/>
      <template v-if="password && password.length < 6" style="color:red">
        <br>Your password must be at least 6 characters
      </template>
      <br><br><br>
      <button class = "trashButtons" @click="createUser">Create User</button>
      <br>
      <button class = "trashButtons" @click="login">Login</button>
      <template v-if="userNotFound">
        <br>User not found
      </template>
      <template v-if="invalidPassword">
        <br>Invalid password
      </template>

      <!-- <p>
        <button class="social-button" @click="socialLogin">
          <img alt="Google Logo" src="../assets/google-logo4.png">
        </button>
      </p> -->

    </template>
    <template v-else>
      <button class = "trashButtons" @click="signOut">Sign Out</button>
    </template>
  </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

export default {
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
    const user = auth.currentUser;
    if (user) {
      this.userLoggedIn = true;
    }
  },
  methods: {
    async login() {
      try {
        this.userNotFound = false;
        this.invalidPassword = false;

        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.userLoggedIn = true;
        this.$router.replace('/UserAuth'); 
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          this.invalidPassword = true;
        } else if (err.code === 'auth/user-not-found') {
          this.userNotFound = true;
        }
      }
    },
    async createUser() {
      try {
        this.userNotFound = false;
        this.invalidPassword = false;

        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.userLoggedIn = true;
        this.$router.replace('/UserAuth'); // Navigate to the sign-out page
      } catch (err) {
        console.error('Error in createUser', err);
      }
    },
    async signOut() {
      try {
        await signOut(auth);
        this.userLoggedIn = false;
      } catch (err) {
        console.error('Error in signOut', err);
      }
    },
    async socialLogin() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        this.userLoggedIn = true;
        this.$router.replace('/UserAuth');  // Navigate to the sign-out page
      } catch (err) {
        console.error('Error in socialLogin', err);
      }
    },
  },
};
</script>

<style>
  .userLogin {
    margin-top: 5%;
    width: 40%;
    padding: 5%;
    /* background-color: white;
    border-radius: 15%; */
    /* border-width: 100%;
    border-style:solid;
    border-color:grey;
    border-bottom-width: 5%; */
  }
  .social-button {
    max-width: 100%;
    width: 60%;
  }
  .social-button img {
    object-fit: contain;
    width: 7%;
    height: auto;
    text-align: left;
  }
  .inputBox {
    border-radius: 10px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border: 0;
  }
</style>
