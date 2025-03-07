import { isSomething, Plugin, Something } from '@robbert/platform/src/index';
import { MyDocument } from './document';
import { renderDocument } from './render';

const useSomethingPlugin = (plugin: Plugin<Something>) => {
  plugin.exports.doSomething();
};

const usePlugin = ({ name, version }: Plugin) => {
  console.log(`Enable plugin: ${name}@${version}`);
};

export const startApp = ({
  doc,
  plugins,
}: {
  doc: MyDocument;
  plugins: Plugin[];
}) => {
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

  renderDocument(doc, document.body);
};
