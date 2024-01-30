import { expect, vi } from 'vitest';
import component from '@/components/tables/EventsTable.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const events = [{
  name: 'Test event 2',
  location: 'Threeflow',
  description: 'This is a test',
  start_date: '2024-01-01T00:00:00.000Z',
  user_id: 2,
  attendees: 3,
}, {
  name: 'Test event 3',
  location: 'Threeflow',
  description: 'This is a test',
  start_date: '2024-01-01T00:00:00.000Z',
  user_id: 2,
  attendees: 3,
}, {
  name: 'Test event 1',
  location: 'Threeflow',
  description: 'This is a test',
  start_date: '2024-01-01T00:00:00.000Z',
  user_id: 2,
  attendees: 3,
}];

describe('EventsTable', () => {
  let wrapper;
  const createWrapper = async (initialData = {}) => {
    wrapper = await createTestWrapper({
      isShallow: false,
      component,
      mocks: {
        $route: {
          name: 'MyEvents',
        },
      },
      options: {
        slots: { ...initialData.slots },
        propsData: {
          eventsType: 'myEvents',
          ...initialData.propsData,
        },
        pinia: {
          initialState: {
            auth: {
              ...initialData.user,
            },
            events: {
              events: [
                ...events,
              ],
            },
          },
        },
      },
    });
  };

  it('should sort the table', async () => {
    await createWrapper();

    wrapper.vm.doSort({
      prop: 'name',
      order: 'ascending',
    });

    expect(wrapper.vm.localEvents[0].name).toEqual('Test event 1');

    wrapper.vm.doSort({
      prop: 'name',
      order: 'descending',
    });

    expect(wrapper.vm.localEvents[0].name).toEqual('Test event 3');
  });
});
