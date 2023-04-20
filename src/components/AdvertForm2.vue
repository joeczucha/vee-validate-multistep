<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", advert: any): void;
  (event: "submit"): void;
}>();

const advert = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const { value: costValue, errorMessage: costError } = useField(
  "cost",
  (costValue) => !!costValue,
  {
    syncVModel: false,
  }
);
</script>

<template>
  <div id="advert-form-2">
    <label for="cost">Cost (*)</label>
    <input v-model="costValue" type="number" id="cost" name="cost" />
    <p v-if="costError">{{ costError }}</p>
  </div>
</template>

<style>
.advert-form {
  display: flex;
  flex-direction: column;
}
</style>
