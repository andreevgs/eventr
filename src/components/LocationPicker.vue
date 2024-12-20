<template>
  <v-text-field
    v-model="geocode"
    :label="label"
    append-inner-icon="mdi-map-marker"
    readonly
    @click:control="visible = true"
  ></v-text-field>
  <v-dialog v-model="visible" transition="dialog-bottom-transition" fullscreen>
    <v-card class="container">
      <v-toolbar class="toolbar">
        <v-btn icon="mdi-close" @click="visible = false"></v-btn>
        <v-toolbar-title>Выберите место</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            text="Применить"
            variant="text"
            @click="visible = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <span class="marker">📍</span>
      <div style="height: 100%; width: 100%">
        <l-map
          v-if="lat && lng"
          ref="map"
          v-model:zoom="zoom"
          :center="[lat, lng]"
          :use-global-leaflet="false"
          @update:center="onUpdateCenter"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
        </l-map>
      </div>
      <v-card class="map-actions w-100 py-4 px-6" elevation="20">
        <v-btn
          class="w-100"
          style="font-size: var(--v-btn-size); height: 48px"
          color="primary"
          variant="flat"
          rounded="xl"
          size="large"
          @click="visible = false"
          >готово</v-btn
        >
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { LatLng } from "leaflet";

interface Props {
  label: string;
}
defineProps<Props>();

const visible = defineModel<boolean>("visible");
const geocode = defineModel<string>("geocode");
const lat = defineModel<number>("lat");
const lng = defineModel<number>("lng");
const zoom = defineModel<number>("zoom");

const onUpdateCenter = async (newCenter: LatLng) => {
  console.log(newCenter);
  lat.value = newCenter.lat;
  lng.value = newCenter.lng;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${newCenter.lat}&lon=${newCenter.lng}&format=json&addressdetails=1`;

  try {
    // Запрос к API Nominatim
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.display_name) {
      // Обновляем geocode с результатами
      geocode.value = data.display_name.replace(",", "");
    }
  } catch {
    geocode.value = "Непоняно где";
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.map-actions {
  display: none;
  position: absolute !important;
  bottom: 0;
  z-index: 401 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.marker {
  font-size: 40px;
  position: absolute !important;
  z-index: 401 !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

@media (max-width: 720px) {
  .toolbar {
    display: none;
  }
  .map-actions {
    display: initial;
  }
}
</style>
