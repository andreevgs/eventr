<template>
  <div class="input-wrapper">
    <v-text-field
      v-model="model"
      :label="label"
      append-inner-icon="mdi-menu-down"
      readonly
    ></v-text-field>
    <select v-model="model" name="notification" class="native-picker">
      <option v-for="option in options" :key="option.value" :value="option">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { SelectOption } from "@/types";

interface Props {
  id: string;
  label: string;
  options: SelectOption[];
}
defineProps<Props>();

const model = defineModel<SelectOption>();
</script>
