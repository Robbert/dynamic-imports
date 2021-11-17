import { loadDocument } from './document';
import { loadPlugins } from './plugin';
import { startApp } from './app';

loadDocument('/data/example.json').then((doc) => {
  // A document specifies what element types are used to create the document,
  // and this step loads the plugins necessary to edit such elements.
  Promise.all(loadPlugins(doc.meta.types)).then((plugins) =>
    startApp({ doc, plugins }),
  );
});
