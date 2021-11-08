import { Plugin } from '@robbert/platform';

const definition: Plugin = {
  name: 'plugin-b',
  version: '1.0.0',
  exports: {
    doSomethingElse: () => {
      console.info('Doing something else!');
    },
  },
};

export default definition;
