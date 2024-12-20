<template>
  <div class="input-wrapper" @click="handleWrapperElClick">
    <v-text-field
      v-model="localizedStartDate"
      :label="label"
      append-inner-icon="mdi-calendar-text"
      readonly
      :error="!isValid"
      :messages="message || invalidMsg"
    ></v-text-field>
    <input
      id="startDate"
      ref="inputEl"
      v-model="model"
      class="native-picker"
      type="datetime-local"
      :min="min"
    />
  </div>
</template>

<script lang="ts" setup>
import { formatLocalizedDate, isDateValid } from "@/utils";

interface Props {
  id: string;
  label: string;
  min?: string;
  message?: string;
}
defineProps<Props>();

const model = defineModel<string>();
const localizedStartDate = computed(() => formatLocalizedDate(model.value));

const inputEl = ref<HTMLInputElement | null>(null);
const isValid = computed(() => isDateValid(model.value));

const invalidMsg = computed(() =>
  isValid.value ? "" : "дата начала не может быть в прошлом"
);

const handleWrapperElClick = () => {
  inputEl.value?.showPicker();
};
</script>
