import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { createPinia } from "pinia";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
