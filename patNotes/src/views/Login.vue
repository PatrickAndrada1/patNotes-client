<script>
import { mapActions } from "pinia";
import { usePiniaStore } from "../stores/piniaStore";
import { RouterLink } from "vue-router";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(usePiniaStore, ["login"]),
    handleLogin() {
      this.login(this.loginForm);
    },
  },
};
</script>

<template>
  <div
    class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden py-6 sm:py-12">
    <div class="relative py-3 sm:w-96 mx-auto text-center">
      <div class="greetings">
        <span class="text-2xl font-light">Selamat Datang di Pat_Notes</span>
        <br /><br />
        <span class="text-2xl font-light">Masuk</span>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mt-4 bg-white shadow-md rounded-lg text-left">
          <div class="h-2 rounded-t-md"></div>
          <div class="px-8 py-6">
            <label class="block font-semibold"> Email </label>
            <input
              v-model="loginForm.email"
              type="text"
              placeholder="Email"
              class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <label class="block mt-3 font-semibold"> Password </label>
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="Password"
              class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <div class="flex justify-between items-baseline">
              <button
                type="submit"
                class="mt-4 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-800">
                Submit
              </button>
            </div>
            <p class="py-1.5">
              Belum punya akun?
              <a class="text-blue-500 hover:text-gray-500" href=""
                ><RouterLink to="/register">Daftar sekarang</RouterLink></a
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
