<template>
  <v-app>
    <v-main>
      <v-container fluid class="container"><router-view /></v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
<style lang="scss">
@media (min-width: 720px) {
  .container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 100% !important;
    justify-content: center !important;
  }
}
@media (max-width: 720px) {
  .container {
    padding: 0 !important;
  }
}
</style>
