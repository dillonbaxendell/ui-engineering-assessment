import { createApp } from 'vue';
import {
  createPinia,
  PiniaVuePlugin,
} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { activateAxios } from '@/utils/apiClient.js';
import {
  ElAlert,
  ElButton,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTooltip,
} from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router.js';

import './assets/styles/main.scss';

// Set up axios defaults and request/response interceptors.
activateAxios();

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);

app.use(PiniaVuePlugin);
app.use(pinia);
app.use(router);

app.use(ElAlert);
app.use(ElButton);
app.use(ElDatePicker);
app.use(ElDialog);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElIcon);
app.use(ElInput);
app.use(ElMenu);
app.use(ElMenuItem);
app.use(ElSubMenu);
app.use(ElTabs);
app.use(ElTabPane);
app.use(ElTable);
app.use(ElTableColumn);
app.use(ElTooltip);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
