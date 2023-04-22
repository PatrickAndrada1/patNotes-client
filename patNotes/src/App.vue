<script>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { mapWritableState } from "pinia";
import { usePiniaStore } from "./stores/piniaStore";

export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    ...mapWritableState(usePiniaStore, ["isLogin"]),
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
    }
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
body,
html {
  /* position: relative; */
  padding-bottom: 100px;
  /* min-height: 100vh; */
  background-color: tan;
}
</style>
