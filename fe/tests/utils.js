import { createRouter, createWebHistory } from 'vue-router';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import { routes } from '@/routes.js';
import {
  ElAlert,
  ElButton,
  ElCard,
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
  ElTag,
  ElTooltip,
} from 'element-plus';
import { Calendar } from '@element-plus/icons-vue';
/**
 * A Pinia plugin for mocking getters in component tests.
 *
 * @param {object} gettersMap
 * @returns {Function}
 */
const createTestingPiniaGetters = (gettersMap) => ({ store, options }) => {
  if (gettersMap[store.$id]) {
    Object.keys(options.getters).forEach((getter) => {
      Object.defineProperty(store, getter, {
        get: () => gettersMap[store.$id][getter] || options.getters[getter],
      });
    });
  }
};

/**
 * Create a test wrapper for component testing unit tests.
 *
 * @param {object} options
 * @param {object} options.component
 * @param {boolean} options.isShallow
 * @param {object} options.mocks
 * @param {object} options.options
 * @param {Array} options.stubs
 * @returns {object}
 */
export function createTestWrapper({
  component,
  isShallow = true,
  mocks = {},
  options = {},
  stubs,
}) {
  const mountingMethod = isShallow ? shallowMount : mount;
  const createWrapper = async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    await flushPromises();
    // Mock Pinia getters by using custom createTestingPiniaGetters plugin since Pinia currently doesn't mock getters properly for Vue2 projects
    const piniaGetters = options.pinia?.getters
      ? {
        plugins: [createTestingPiniaGetters({
          ...options.pinia.getters,
        })],
      }
      : {};
    const optionsIncludingPinia = options.pinia
      ? {
        ...options,
        pinia: createTestingPinia({ ...options.pinia, ...piniaGetters }),
      }
      : options;

    return mountingMethod(component, {
      ...optionsIncludingPinia,
      stubs,
      global: {
        mocks,
        provide: {
          loadEvents: () => {},
        },
        stubs: {
          teleport: true,
        },
        plugins: [PiniaVuePlugin, router],
        components: {
          ElAlert,
          ElButton,
          ElCard,
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
          ElTag,
          ElTooltip,
          Calendar,
        },
      },
    });
  };

  return createWrapper();
}
