import { expect, vi } from 'vitest';
import component from '@/components/modals/RegisterModal.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

describe('RegisterModal', () => {
  let wrapper;
  const createWrapper = async (initialData = {}) => {
    wrapper = await createTestWrapper({
      isShallow: false,
      component,
      options: {
        slots: { ...initialData.slots },
        propsData: {
          ...initialData.propsData,
        },
        pinia: {
          initialState: {
            auth: {
              ...initialData.user,
            },
          },
        },
      },
    });
  };

  it('should validate the form', async () => {
    await createWrapper({
      user: {
        isRegisterModalVisible: true,
      },
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();

    await wrapper.setData({
      registerForm: {
        firstName: 'test',
        lastName: 'test',
        emailAddress: 'test',
      },
    });

    await wrapper.vm.$refs.form.validate();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isFormValid).toBeTruthy();
  });
});
