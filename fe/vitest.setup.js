// eslint-disable-next-line import/no-extraneous-dependencies
import vueSnapshotSerializer from 'jest-serializer-vue';

// Otherwise your snapshots will have a lot of escaped " characters.
expect.addSnapshotSerializer(vueSnapshotSerializer);

// mock .getContext() method for testing
HTMLCanvasElement.prototype.getContext = () => { };
