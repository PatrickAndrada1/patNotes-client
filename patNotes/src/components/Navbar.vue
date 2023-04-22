<script>
import { RouterLink } from "vue-router";
import { mapActions, mapWritableState, mapState } from "pinia";
import { usePiniaStore } from "../stores/piniaStore";
import { ref } from "vue";

export default {
  name: "Navbar",
  setup() {
    let open = ref(false);
    function MenuOpen() {
      open.value = !open.value;
    }
    return { open, MenuOpen };
  },
  computed: {
    ...mapWritableState(usePiniaStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(usePiniaStore, ["logout"]),
  },
};
</script>

<template>
  <div
    class="bg-yellow-500 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
    <div class="flex items-center">
      <span class="text-green-900 text-xl mr-1">
        <i class="bi bi-journal-check"></i>
      </span>

      <h1 class="text-xl">Pat_Notes</h1>
    </div>

    <span
      @click="MenuOpen()"
      class="absolute md:hidden right-6 top-1.5 text-4x1">
      <i :class="[open ? 'bi bi-x-lg' : 'bi bi-list']"></i>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute bg-yellow-500 md:w-auto w-full top-14 duration-700 ease-in z-1"
      :class="[open ? 'left-0' : 'left-[-100%]']">
      <!-- <li class="md:mx-4 md:my-0 my-6">
<a v-if="isLogin" href="" class="text-xl hover:text-green-500"><RouterLink to="/">Halaman Utama</RouterLink></a>
</li> -->
      <li class="md:mx-4 md:my-0 my-6">
        <a v-if="!isLogin" href="" class="text-xl hover:text-green-500"
          ><RouterLink to="/register">Daftar</RouterLink></a
        >
      </li>
      <li class="md:mx-4 md:my-0 my-6">
        <a v-if="!isLogin" href="" class="text-xl hover:text-green-500"
          ><RouterLink to="/login">Masuk</RouterLink></a
        >
      </li>

      <li class="md:mx-4 md:my-0 my-6">
        <a
          v-if="isLogin"
          href=""
          @click.prevent="logout"
          class="text-xl hover:text-red-500"
          >Keluar</a
        >
      </li>
    </ul>
  </div>
</template>
