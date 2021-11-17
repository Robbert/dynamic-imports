import { isPlugin, Plugin } from '@robbert/platform/src/index';

export const parsePackageReference = (
  reference: string,
): { version: string; scope: string; name: string } | null => {
  // TODO: Write proper pattern for npm-style version number
  const match = /^(?:@([^@]+)\/)?([^@]+)(?:@([\d\.]+))?$/.exec(reference);
  if (match) {
    const [, scope, name, version] = match;
    return { scope, name, version };
  }
  return null;
};

/**
 * Get the URL where npm package of the plugin can be found.
 * Example input: "@my-scope/my-package@1.0.0"
 * Example result: /package/@my-scope/my-package/dist/index.js"
 */
export const resolvePlugin = (reference: string): string | null => {
  const pkg = parsePackageReference(reference);

  if (pkg) {
    const { name, version } = pkg;

    if (version) {
      console.log(
        `${name} version ${version} is specified, but the latest version is loaded`,
      );
    }

    // TODO: Resolve specific version of package, and use `scope` too
    return `/packages/${name}/dist/index.js`;
  }

  return null;
};

/**
 * A document specifies what element types are used to create the document,
 * and this function loads the plugins necessary to edit such elements.
 */
export const loadPlugins = (references: string[]): Promise<Plugin>[] =>
  references
    .map(resolvePlugin)
    .filter((url): url is string => typeof url === 'string') // TODO: Handle package references that can't be parsed
    .map((url) =>
      import(/* @vite-ignore */ url).then((module) => {
        if (isPlugin(module.default)) {
          return module.default;
        } else {
          throw new TypeError();
        }
      }),
    );
