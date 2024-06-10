import { expect, vi } from 'vitest';
import component from '@/components/tables/EventsTable.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const events = [{
  name: 'Test event 2',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}, {
  name: 'Test event 3',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}, {
  name: 'Test event 1',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
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
      provide: {
        loadEvents: () => new Promise((resolve) => {
          resolve();
        }),
      },
      options: {
        slots: { ...initialData.slots },
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

  // TODO: Test initial view mode (should default to table view).
  // TODO: Test toggling to card view and ensuring correct rendering of event cards.
  // TODO: Test toggling back to table view and ensuring correct rendering of table rows.
  // TODO: Test that the toggle button switches between card and table view modes.
  // TODO: Test that the correct view mode class is applied to the component based on the current mode.
  // TODO: Test that the component height and width adjust correctly based on the view mode.
  // TODO: Test that the component handles error cases (e.g., API request failure when loading events) in both view modes.
  // TODO: Test that the component properly updates when new events are added or existing events are edited/deleted in both view modes.
});
