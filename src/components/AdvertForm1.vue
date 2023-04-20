<script setup lang="ts">
import { computed, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", advert: any): void;
}>();

const advert = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const { value: title, errorMessage: titleError } = useField(
  "title",
  () => advert.value.title,
  {
    syncVModel: false,
  }
);

const { value: description, errorMessage: descriptionError } = useField(
  "description",
  () => advert.value.description,
  {
    syncVModel: false,
  }
);

const updateAdvert = () =>
  (advert.value = { ...advert.value, title: title.value });

watch(title, updateAdvert);
watch(description, updateAdvert);
</script>

<template>
  <div class="advert-form">
    <label for="title">Title (*)</label>
    <input v-model="title" type="text" id="title" name="title" />
    <p v-if="titleError">{{ titleError }}</p>
    <label for="description">Description (*)</label>
    <textarea
      v-model="description"
      id="description"
      name="description"
    ></textarea>
    <p v-if="descriptionError">{{ descriptionError }}</p>
  </div>
</template>

<style>
.advert-form {
  display: flex;
  flex-direction: column;
}
</style>
