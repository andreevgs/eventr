<template>
  <v-card class="event" title="поход в кино" subtitle="завтра в 17:20">
    <v-card-text>
      <v-chip prepend-icon="mdi-map-marker"> кинотеатр moon </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn
        prepend-icon="mdi-calendar-text"
        color="primary"
        variant="flat"
        @click="downloadCalendarEvent"
        >добавить в календарь</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const downloadCalendarEvent = () => {
  // Данные события
  const event = {
    title: "поход в кинооо",
    description: "Описание события",
    location: "Dana Mall",
    startDate: "2024-12-05T17:20:00",
    endDate: "2024-12-05T18:40:00",
  };

  // Форматирование даты в формате iCalendar (UTC)
  const formatDate = (date: string) =>
    new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Создание контента для файла .ics
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Напоминание о событии
END:VALARM
GEO:53.9340;27.6543
X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS=${
    event.location
  };X-APPLE-RADIUS=500;X-TITLE=${event.location}:geo:53.9340,27.6543
END:VEVENT
END:VCALENDAR`;
  console.log(icsContent);
  const blob = new Blob([icsContent.trim()], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "event.ics";
  link.click();
  URL.revokeObjectURL(url);
};
</script>

<style lang="scss"></style>
