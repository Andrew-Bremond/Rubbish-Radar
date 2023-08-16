<template>
    <div class="auth">
    Email: <input type="text" v-model.trim="email" />
    <br>
    Password: <input type=password v-model="passwordInput" />
    <ul>
        <li style="color:red" v-if="isEmpty">Enter a password</li>
        <template v-else-if="!isValid">
            <li style="color:red" v-if="!hasNumber">Password must include at least one number</li>
            <li style="color:red" v-if="!hasLetter">Password must include at least one letter</li>
        </template>
        <li style="color:green" v-else>Password is valid</li>
    </ul>
    <button @click="createUser()">Create User</button>
      <br>
      <button @click="login()">Login</button>
    </div>
</template>
  
<script>

import { auth } from '../../firebaseResources';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default {
    data() {
      return {
        passwordInput: '',
        email: '',
      }
    },
    computed: {
      isEmpty() {
        return this.passwordInput.length === 0;
      },
      hasNumber() {
        return /[0-9]/.test(this.passwordInput);
      },
      hasLetter() {
        return /[a-zA-Z]/.test(this.passwordInput);
      },
      isValid() {
        return this.hasNumber && this.hasLetter;
      }
    },
    methods: {
        async login(){
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
                    if (err.code === 'auth/wrong-password') {
                        console.error('Error in login, wrong password');
                        this.invalidPassword = true;
                    } else if (err.code === 'auth/user-not-found') {
                        console.error('Error in login, user not found');
                        this.userNotFound = true;
                    }
                } else {
                    // All other errors are logged to the console
                    console.error('Error in login', err);
                }
            }
        },
        async createUser(){
            try {
                // Reset error messages
                this.userNotFound = false;
                this.invalidPassword = false;

                await createUserWithEmailAndPassword(auth, this.email, this.password);

                // Mark that we are now logged in
                this.userLoggedIn = true;
                console.log('Current user', auth.currentUser);
            } catch(err) {
                console.error('Error in createUser', err);
            }
        },
        async signOut() {
            try {
                if (auth.currentUser) {
                    await signOut(auth);

                    // Mark that we are now logged out
                    this.userLoggedIn = false;
                } else {
                    console.warn('No user signed in');
                }
            } catch(err) {
                console.error('Error in signOut', err);
            }
        }
    }
  }
  </script>
  