import {
  isPlugin,
  isSomething,
  Plugin,
  Something,
} from '@robbert/platform/src/index';

const resolvePlugin = (name: string) => `/packages/${name}/dist/index.js`;

const useSomethingPlugin = (plugin: Plugin<Something>) => {
  plugin.exports.doSomething();
};

const usePlugin = ({ name, version }: Plugin) => {
  const test = document.createElement('pre');
  test.textContent = `${name}@${version}`;
  document.body.appendChild(test);
};

const imports = ['plugin-a', 'plugin-b'].map(resolvePlugin).map((url) => {
  return import(/* @vite-ignore */ url);
});

Promise.all(imports).then((modules) => {
  const plugins = modules.map((module) => module.default);

  if (!plugins.every(isPlugin)) {
    throw new TypeError();
  }

  console.log(
    `${plugins.length} plugins loaded:\n${plugins
      .map(({ name, version }) => `- ${name}@${version}`)
      .join('\n')}`,
  );

  plugins.forEach(usePlugin);

  const somethingPlugins = plugins.filter((plugin) =>
    isSomething(plugin.exports),
  );

  somethingPlugins.forEach(useSomethingPlugin);
});
