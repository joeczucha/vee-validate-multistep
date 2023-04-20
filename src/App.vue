<script setup lang="ts">
import { ref } from "vue";

import AdvertForm from "./components/AdvertForm.vue";

const advert = ref({
  title: "",
  description: "",
  cost: null,
});
</script>

<template>
  {{ advert }}
  <AdvertForm v-model="advert" />
</template>

<style scoped></style>
