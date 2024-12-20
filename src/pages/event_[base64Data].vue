<template>
  <div class="submit-button-wrapper">
    <v-btn
      class="w-100 submit-button"
      style="font-size: var(--v-btn-size); height: 48px"
      color="primary"
      variant="flat"
      rounded="xl"
      size="large"
      @click="handleAddToCalendar"
      >добавить в календарь</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { SharedEvent } from "@/types";
import { base64_decode, downloadICS, generateICS } from "@/utils";

const route = useRoute("/event_[base64Data]");

const handleAddToCalendar = () => {
  const sharedEvent = JSON.parse(
    decodeURIComponent(base64_decode(route.params.base64Data))
  ) as SharedEvent;
  const icsContent = generateICS(sharedEvent);
  downloadICS(icsContent);
};
</script>

<style lang="scss">
@media (max-width: 720px) {
  .submit-button-wrapper {
    padding: 16px 24px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
