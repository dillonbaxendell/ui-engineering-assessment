import { createTestingPinia } from '@pinia/testing';
import {
  mount,
  shallowMount,
} from '@vue/test-utils';
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
 * Create a test wrapper for component testing unit tests.
 *
 * @param {object} options
 * @param {object} options.component
 * @param {boolean} options.isShallow
 * @param {object} options.mocks
 * @param {object} options.options
 * @param {object} options.provide
 * @param {Array} options.stubs
 * @param {object} options.parentComponent
 * @returns {object}
 */
export function createTestWrapper({
  component,
  isShallow = true,
  mocks = {},
  options = {},
  provide = {},
  parentComponent = {
    template: '<div />',
  },
  stubs,
}) {
  const mountingMethod = isShallow ? shallowMount : mount;
  const createWrapper = async () => mountingMethod(component, {
    stubs,
    parentComponent,
    global: {
      mocks,
      provide,
      stubs: {
        teleport: true,
      },
      plugins: [
        createTestingPinia({ ...options.pinia }),
      ],
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

  return createWrapper();
}
