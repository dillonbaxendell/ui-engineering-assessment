import { expect } from 'vitest';
import EditUserModal from '@/components/modals/RegisterModal.vue';
import { createTestWrapper } from '../utils.js';

describe('EditUserModal', () => {
  let wrapper;
  const createWrapper = async (initialData = {}) => {
    wrapper = await createTestWrapper({
      isShallow: false,
      component: EditUserModal,
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

  it('should render the form with correct data', async () => {
    await createWrapper({
      user: {
        isEditModalVisible: true,
      },
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();

    await wrapper.setData({
      userForm: {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
      },
    });

    expect(wrapper.vm.userForm.firstName).toBe('John');
    expect(wrapper.vm.userForm.lastName).toBe('Doe');
    expect(wrapper.vm.userForm.emailAddress).toBe('john.doe@example.com');
  });

  // TODO: Test form validation rules for required fields (first name, last name, email).
  // TODO: Test form validation for invalid inputs (e.g., invalid email format).
  // TODO: Test form validation for valid inputs (e.g., valid email format).
  // TODO: Test manual form validation triggering and validate the validity state.

  // TODO: Test initial modal visibility (should be hidden by default).
  // TODO: Test modal visibility when triggering edit mode.
  // TODO: Test modal visibility when Cancel button is clicked.
  // TODO: Test modal visibility after saving user changes.
  // TODO: Test modal visibility after cancelling edit.

  // TODO: Test the saveUser function call with correct data when Confirm Edits button is clicked.
  // TODO: Test that the reload event is emitted after saving a user.

  // TODO: Test editing an existing user's details (populate form correctly, save changes).
  // TODO: Test form reset after editing an existing user.

  // TODO: Test Cancel button functionality (resets form, closes modal without saving changes).

  // TODO: Test edge cases such as submitting form with empty data or invalid inputs.
  // TODO: Test error handling scenarios (e.g., API request failure when saving a user).

  // TODO: Test component structure (presence of specific elements like form fields, buttons).
  // TODO: Test content of elements (e.g., button labels, form labels, error messages).
});
