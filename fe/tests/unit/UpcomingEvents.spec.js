import { expect, vi } from 'vitest';
import component from '@/components/UpcomingEvents.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const events = [{
  name: 'Test event',
  location: 'Threeflow',
  description: 'This is a test',
  start_date: '2024-01-01T00:00:00.000Z',
  user_id: 2,
  attendees: 3,
}];
const user = {
  id: 1,
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'undeliverable@threeflow.com',
};

describe('UpcomingEvents', () => {
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
            events: {
              events: [
                ...events,
              ],
            },
          },
        },
        provide: {
          loadEvents: vi.fn(),
        },
        stubs: {
          Calendar: {
            template: '<span />',
          },
        },
      },
    });
  };

  it('should render a sign in button if the user is not signed in', async () => {
    await createWrapper();

    expect(wrapper.find('[data-test="sign-in-button"]').exists()).toBeTruthy();
  });

  it('should render an attend button if the user is signed in', async () => {
    await createWrapper({
      user: {
        user,
        authenticated: true,
      },
    });

    expect(wrapper.find('[data-test="attend-event-button"]').exists()).toBeTruthy();
  });

  it('should render an edit button if the user owns the event', async () => {
    await createWrapper({
      user: {
        user: {
          ...user,
          id: 2,
        },
        authenticated: true,
      },
    });

    expect(wrapper.find('[data-test="edit-event-button"]').exists()).toBeTruthy();
  });
});
