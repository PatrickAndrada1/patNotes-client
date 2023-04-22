<script>
import { mapActions } from "pinia";
import { usePiniaStore } from "../stores/piniaStore";
import { RouterLink } from "vue-router";

export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(usePiniaStore, ["register"]),
    handleRegister() {
      this.register(this.registerForm);
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
        <span class="text-2xl font-light">Daftar</span>
      </div>
      <form @submit.prevent="handleRegister">
        <div class="mt-4 bg-white shadow-md rounded-lg text-left">
          <div class="h-2 rounded-t-md"></div>
          <div class="px-8 py-6">
            <label class="block font-semibold"> Username </label>
            <input
              v-model="registerForm.username"
              type="text"
              placeholder="Username"
              class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <label class="block font-semibold"> Email </label>
            <input
              v-model="registerForm.email"
              type="email"
              placeholder="Email"
              class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <label class="block mt-3 font-semibold"> Password </label>
            <input
              v-model="registerForm.password"
              type="password"
              placeholder="Password minimal 5 karakter"
              class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            <div class="flex justify-between items-baseline">
              <button
                class="mt-4 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-800">
                Submit
              </button>
            </div>
            <p class="py-1.5">
              Sudah punya akun?
              <a class="text-blue-500 hover:text-gray-500" href=""
                ><RouterLink to="/login">Silahkan Masuk</RouterLink></a
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
