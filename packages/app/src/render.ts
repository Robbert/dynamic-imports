import { MyDocument, MyNode } from './document';

export type RenderFunction = (node: MyNode, target: Element) => Element | void;

/**
 * Example function to render "@robbert/plugin-a@1.0".
 * TODO: Move this function to a plugin.
 */
export const renderPluginA: RenderFunction = (node, target) => {
  const pre = target.ownerDocument.createElement('pre');
  pre.dataset['type'] = node.type;
  return pre;
};

/**
 * Example function to render "@robbert/plugin-b@1.0".
 * TODO: Move this function to a plugin.
 */
export const renderPluginB: RenderFunction = (node, target) => {
  const span = target.ownerDocument.createElement('span');
  span.dataset['type'] = node.type;
  span.appendChild(target.ownerDocument.createTextNode(node.textContent || ''));
  return target.appendChild(span);
};

/**
 * Collection of render functions for every node type
 * TODO: Make an instance of this type of collection for every app,
 * and populate this dynamically using the plugin system.
 */
export const renderers: { [index: string]: RenderFunction } = {
  '@robbert/plugin-a@1.0.0': renderPluginA,
  '@robbert/plugin-b@1.0.0': renderPluginB,
};

/**
 * Render this node recursively, using render functions available in the collection.
 */
export const renderNode: RenderFunction = (node, target) => {
  let renderContainer = target;
  if (Object.prototype.hasOwnProperty.call(renderers, node.type)) {
    console.log(`Render node type ${node.type}`);
    const element = renderers[node.type](node, target);
    if (element) {
      renderContainer.appendChild(element);
      renderContainer = element;
    }
  } else {
    console.log(`No renderer found for node type ${node.type}`);
  }

  if (node.children) {
    node.children.forEach((node) => renderNode(node, renderContainer));
  }
};

export const renderDocument = (doc: MyDocument, target: Element) => {
  doc.root.forEach((node) => renderNode(node, target));
};
