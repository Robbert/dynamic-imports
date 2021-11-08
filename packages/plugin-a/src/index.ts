import { Plugin } from '@robbert/platform';

const definition: Plugin = {
  name: 'plugin-a',
  version: '1.0.0',
  exports: {
    doSomething: () => {
      console.info('Doing something!');
    },
  },
};

export default definition;
