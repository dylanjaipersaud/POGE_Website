import { createApp } from 'vue';
import App from './App.vue';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import store from './store/index';
import './file.css'; // Import the global styles

createApp(App).use(store).use(router).mount('#app');

// Define your custom dark blue theme
const CustomDarkBlueTheme = {
  dark: true, // Enable dark mode
  colors: {
    background: '#121212', // Dark background
    surface: '#1E1E1E', // Slightly lighter surface
    primary: '#1976D2', // Dark blue primary color
    'primary-darken-1': '#0D47A1', // Darker shade of primary
    secondary: '#BBDEFB', // Light blue secondary color
    'secondary-darken-1': '#90CAF9', // Darker shade of secondary
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'CustomDarkBlueTheme', // Set your custom theme as default
    themes: {
      CustomDarkBlueTheme,
    },
  },
});

createApp(App).use(store).use(router).use(vuetify).mount('#app');
