<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm } from "vee-validate";

import AdvertForm1 from "./AdvertForm1.vue";
import AdvertForm2 from "./AdvertForm2.vue";

import { advertSchema } from "../schema";

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

const currentStep = ref(0);

const activeSchema = computed(() => advertSchema[currentStep.value]);

const { handleSubmit } = useForm({
  validationSchema: activeSchema.value,
  initialValues: advert.value,
  keepValuesOnUnmount: true,
});

const next = handleSubmit((values) => {
  if (currentStep.value === 1) {
    console.log(JSON.stringify(values));
    alert("Form submitted");
  } else {
    currentStep.value++;
  }
});

const prev = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const buttonLabel = computed(() => (currentStep.value < 1 ? "Next" : "Submit"));
</script>

<template>
  <form @submit="next">
    <AdvertForm1 v-if="currentStep === 0" v-model="advert" />
    <AdvertForm2 v-if="currentStep === 1" v-model="advert" />
    <div class="buttons">
      <button type="submit">{{ buttonLabel }}</button>
      <button @click="prev" v-if="currentStep > 0">Prev</button>
    </div>
    ">
  </form>
  <pre>
  {{ activeSchema }}
  </pre>
</template>

<style>
.buttons {
  margin-top: 20px;

  display: flex;
  flex-direction: row-reverse;

  justify-content: space-between;
}
</style>
