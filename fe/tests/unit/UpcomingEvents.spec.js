import { expect, vi } from 'vitest';
import component from '@/components/UpcomingEvents.vue';
import { createTestWrapper } from '../utils.js';

const mockRoutePush = vi.fn();

vi.mock('vue-router', async () => ({
  RouterView: {},
  useRouter: () => ({
    push: mockRoutePush,
  }),
}));

const events = [{
  id: 1,
  name: 'Test event',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}];
const user = {
  id: 1,
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'undeliverable@threeflow.com',
  attendingEvents: [],
};

describe('UpcomingEvents', () => {
  let wrapper;
  const createWrapper = async (initialData = {}) => {
    wrapper = await createTestWrapper({
      isShallow: false,
      component,
      provide: {
        loadEvents: () => new Promise((resolve) => {
          resolve();
        }),
      },
      options: {
        slots: { ...initialData.slots },
        propsData: {
          ...initialData.propsData,
        },
        pinia: {
          initialState: {
            auth: {
              user: null,
              ...initialData.auth,
            },
            events: {
              events: [
                ...events,
              ],
            },
          },
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
      auth: {
        user,
        authenticated: true,
      },
    });

    expect(wrapper.find('[data-test="attend-event-button"]').exists()).toBeTruthy();
  });

  it('should render an edit button if the user owns the event', async () => {
    await createWrapper({
      auth: {
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
