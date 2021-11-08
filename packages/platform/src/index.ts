export interface Plugin<Exports = any, DefaultExport = any> {
  version: string;
  name: string;
  exports: Exports;
  defaultExport?: DefaultExport;
}

export type PluginType = 'something' | 'unknown';

export const isPlugin = (arg: any): arg is Plugin =>
  typeof arg === 'object' &&
  !!arg &&
  Object.prototype.hasOwnProperty.call(arg, 'name') &&
  Object.prototype.hasOwnProperty.call(arg, 'version');

export interface Something {
  doSomething: () => void;
}

export const isSomething = (arg: any): arg is Something =>
  typeof arg === 'object' && !!arg && typeof arg.doSomething === 'function';

export const getPluginType = (plugin: Plugin): PluginType => {
  if (isSomething(plugin.exports)) {
    return 'something';
  } else {
    return 'unknown';
  }
};
