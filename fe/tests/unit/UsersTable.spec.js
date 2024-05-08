import { expect, vi } from 'vitest';
import component from '@/components/tables/UsersTable.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const users = [{
  firstName: 'User C',
  lastName: 'User C',
  emailAddress: 'UserC@threeflow.com',
  admin: false,
}, {
  firstName: 'User A',
  lastName: 'User A',
  emailAddress: 'UserA@threeflow.com',
  admin: false,
}, {
  firstName: 'User B',
  lastName: 'User B',
  emailAddress: 'UserB@threeflow.com',
  admin: false,
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
      prop: 'emailAddress',
      order: 'ascending',
    });

    expect(wrapper.vm.localUsers[0].emailAddress).toEqual('UserA@threeflow.com');

    wrapper.vm.doSort({
      prop: 'emailAddress',
      order: 'descending',
    });

    expect(wrapper.vm.localUsers[0].emailAddress).toEqual('UserC@threeflow.com');
  });
});
