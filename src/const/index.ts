export const triggerOptions = [
  { label: "В момент события", value: "-PT0M" },
  { label: "За 5 минут", value: "-PT5M" },
  { label: "За 10 минут", value: "-PT10M" },
  { label: "За 15 минут", value: "-PT15M" },
  { label: "За 30 минут", value: "-PT30M" },
  { label: "За 1 час", value: "-PT1H" },
  { label: "За 2 часа", value: "-PT2H" },
  { label: "За 1 день", value: "-P1D" },
  { label: "За 2 дня", value: "-P2D" },
  { label: "Через 5 минут после события", value: "PT5M" },
  { label: "Через 15 минут после события", value: "PT15M" },
  { label: "Через 1 час после события", value: "PT1H" },
];

export const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
