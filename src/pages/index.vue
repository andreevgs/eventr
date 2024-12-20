<template>
  <v-card class="w-100 pa-2 card" max-width="720">
    <v-card-title>Новое событие</v-card-title>
    <v-card-item>
      <v-text-field v-model="title" label="Название"></v-text-field>
      <div class="input-wrapper" @click="handleStartDateElClick">
        <v-text-field
          v-model="localizedStartDate"
          label="Начало"
          append-inner-icon="mdi-calendar-text"
          readonly
          :error="!isStartDateValid"
          :messages="startDateErrorMsg"
        ></v-text-field>
        <input
          id="startDate"
          ref="startDateEl"
          v-model="startDate"
          class="native-picker"
          type="datetime-local"
          :min="getMinDate()"
        />
      </div>
      <div class="input-wrapper" @click="handleEndDateElClick">
        <v-text-field
          v-model="localizedEndDate"
          label="Конец"
          append-inner-icon="mdi-calendar-text"
          readonly
          :error="!isEndDateValid"
          :messages="endDateErrorMsg"
        ></v-text-field>
        <input
          id="endDate"
          ref="endDateEl"
          v-model="endDate"
          class="native-picker"
          type="datetime-local"
          :min="getMinDate(startDate)"
        />
      </div>
      <v-btn-toggle
        v-model="withNotification"
        class="w-100 d-flex mb-6"
        variant="outlined"
        rounded="xl"
        divided
        mandatory
      >
        <v-btn class="w-50" :value="false">не напоминать</v-btn>
        <v-btn class="w-50" :value="true">напомнить</v-btn>
      </v-btn-toggle>
      <div v-if="withNotification" class="input-wrapper">
        <v-text-field
          v-model="notification.label"
          label="Напоминание"
          append-inner-icon="mdi-menu-down"
          readonly
        ></v-text-field>
        <select
          v-model="notification"
          name="notification"
          class="native-picker"
        >
          <option
            v-for="option in triggerOptions"
            :key="option.value"
            :value="option"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <v-btn-toggle
        :model-value="withLocation"
        class="w-100 d-flex mb-6"
        variant="outlined"
        rounded="xl"
        divided
        mandatory
        @update:model-value="handleChangeWithLocation"
      >
        <v-btn class="w-50" :value="false">без места</v-btn>
        <v-btn class="w-50" :value="true">с местом</v-btn>
      </v-btn-toggle>
      <location-picker
        v-if="withLocation"
        v-model:visible="locationPickerActive"
        v-model:geocode="geocode"
        v-model:lat="lat"
        v-model:lng="lng"
        v-model:zoom="zoom"
        label="Место"
      ></location-picker>
      <div class="submit-button-wrapper">
        <v-btn
          class="w-100 submit-button"
          style="font-size: var(--v-btn-size); height: 48px"
          color="primary"
          variant="flat"
          rounded="xl"
          size="large"
          :disabled="!isFormValid"
          @click="handleSubmit"
          >поделиться</v-btn
        >
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { locationOptions, triggerOptions } from "@/const";
import { SharedEvent } from "@/types";
import { base64_encode, formatLocalizedDate, getMinDate } from "@/utils";
import { isAfter } from "date-fns";

const title = ref("");
const notification = ref(triggerOptions[0]);
const startDate = ref("");
const endDate = ref("");
const lat = ref<number>();
const lng = ref<number>();
const zoom = ref(14);
const geocode = ref<string>("");

const withNotification = ref(false);
const withLocation = ref(false);
const locationPickerActive = ref(false);

const startDateEl = ref<HTMLInputElement | null>(null);
const endDateEl = ref<HTMLInputElement | null>(null);

const localizedStartDate = computed(() => formatLocalizedDate(startDate.value));
const localizedEndDate = computed(() => formatLocalizedDate(endDate.value));

const isStartDateValid = computed(() =>
  startDate.value ? isAfter(startDate.value, new Date()) : true
);
const isEndDateValid = computed(() =>
  startDate.value && endDate.value
    ? isAfter(endDate.value, startDate.value)
    : true
);
const startDateErrorMsg = computed(() =>
  isStartDateValid.value ? "" : "дата начала не может быть в прошлом"
);
const endDateErrorMsg = computed(() =>
  isEndDateValid.value ? "" : "дата конца не может быть раньше даты начала"
);

const isFormValid = computed(
  () =>
    title.value &&
    startDate.value &&
    endDate.value &&
    isStartDateValid &&
    isEndDateValid
);

const handleStartDateElClick = () => {
  startDateEl.value?.showPicker();
};

const handleEndDateElClick = () => {
  endDateEl.value?.showPicker();
};

const handleChangeWithLocation = (value: boolean) => {
  if (!value) {
    withLocation.value = false;
    return;
  }
  if (lat.value && lng.value) {
    withLocation.value = true;
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = pos.coords;
      lat.value = coords.latitude;
      lng.value = coords.longitude;
      withLocation.value = true;
      locationPickerActive.value = true;
    },
    (error) => {
      alert(JSON.stringify(error));
    },
    locationOptions
  );
};

const handleSubmit = () => {
  const sharedEvent: SharedEvent = {
    title: title.value,
    description: "Описание события",
    startDate: startDate.value,
    endDate: endDate.value,
    notification: notification.value.value,
    icsLocation: withLocation.value
      ? {
          location: [lat.value, lng.value],
          geocode: geocode.value,
        }
      : undefined,
  };
  navigator.share({
    url: `https://andreevgs.github.io/eventr/#/event_${encodeURIComponent(
      base64_encode(JSON.stringify(sharedEvent))
    )}`,
  });
  // const icsContent = generateICS(sharedEvent);
  // downloadICS(icsContent);
};
</script>

<style lang="scss">
.select-wrapper {
  position: relative;
}

select {
  position: absolute;
}
.input-wrapper {
  position: relative;

  .native-picker {
    cursor: text;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 22px;
    left: 0;
    right: 0;
  }
}
.v-btn__content {
  padding-top: 4px;
  padding-bottom: 4px;
}

@media (max-width: 720px) {
  .card {
    box-shadow: none;
    position: static;
    padding-bottom: 24px;
    .submit-button-wrapper {
      padding: 16px 24px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }
}
</style>
