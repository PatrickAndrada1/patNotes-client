<script>
import { usePiniaStore } from "../stores/piniaStore";
import { mapActions, mapState } from "pinia";

export default {
  name: "Note",
  props: ["id", "name", "isDone"],
  computed: {
    ...mapState(usePiniaStore, ["nDone", "done", "total"]),
  },
  methods: {
    ...mapActions(usePiniaStore, ["showNotes", "deleteNotes", "updateStatus"]),
    handlePatch(id) {
      if (this.isDone === false) {
        this.updateStatus(id, true);
      }
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="text">
      <div v-if="isDone === true">
        <p
          class="text-gray-300"
          style="text-decoration: line-through; text-decoration-color: gray">
          {{ name }}
        </p>
      </div>
      <div v-else>
        <p class="text-slate-50">{{ name }}</p>
      </div>
    </div>

    <div class="buttons">
      <button @click.prevent="handlePatch(id)" type="button">
        <i class="bi bi-check-circle" style="color: greenyellow"></i>
      </button>

      <button @click.prevent="deleteNotes(id)" type="button">
        <i class="bi bi-x-circle" style="color: brown"></i>
      </button>
    </div>
  </div>
</template>

<style>
.card {
  height: fit-content;
  width: 95%;
  background-color: cadetblue;
  margin: 10px auto;
  padding: 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.buttons button {
  margin: auto 5px;
}
</style>
