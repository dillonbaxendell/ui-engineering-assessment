import { config } from '@vue/test-utils';

// eslint-disable-next-line import/no-extraneous-dependencies
import vueSnapshotSerializer from 'jest-serializer-vue';

// Otherwise your snapshots will have a lot of escaped " characters.
expect.addSnapshotSerializer(vueSnapshotSerializer);

// Stub the most common elements
config.stubs['app-icon'] = true;
config.stubs['app-button'] = true;

// mock .getContext() method for testing
HTMLCanvasElement.prototype.getContext = () => { };
