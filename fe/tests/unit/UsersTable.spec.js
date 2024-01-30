import { expect, vi } from 'vitest';
import component from '@/components/tables/UsersTable.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const users = [{
  first_name: 'User C',
  last_name: 'User C',
  email_address: 'UserC@threeflow.com',
}, {
  first_name: 'User A',
  last_name: 'User A',
  email_address: 'UserA@threeflow.com',
}, {
  first_name: 'User B',
  last_name: 'User B',
  email_address: 'UserB@threeflow.com',
}];

describe('UsersTable', () => {
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
            users: {
              users,
              ...initialData.user,
            },
          },
        },
      },
    });
  };

  it('should sort the table', async () => {
    await createWrapper();

    wrapper.vm.doSort({
      prop: 'email_address',
      order: 'ascending',
    });

    expect(wrapper.vm.localUsers[0].email_address).toEqual('UserA@threeflow.com');

    wrapper.vm.doSort({
      prop: 'email_address',
      order: 'descending',
    });

    expect(wrapper.vm.localUsers[0].email_address).toEqual('UserC@threeflow.com');
  });
});
