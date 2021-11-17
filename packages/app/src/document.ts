export interface MyNode {
  type: string;
  children: MyNode[];
  textContent?: string;
}

// TODO: Specify actual JSON Schema for this document format
// https://json-schema.org
export interface MyDocument {
  $schema: 'https://example.com/my-document/1.0/';
  meta: {
    types: string[];
  };
  root: [MyNode];
}

export const SCHEMA_URL = 'https://example.com/my-document/1.0/';

export const loadDocument = (documentURI: string) => {
  console.log(`Loading ${documentURI}`);

  return fetch(documentURI)
    .then((r) => r.json())
    .then((doc) => {
      console.log(`Document has been loaded: ${documentURI}`);

      if (isMyDocument(doc)) {
        return doc;
      } else {
        throw new TypeError();
      }
    })
    .catch((e) => {
      console.error('Failed to load document: ${documentURI}');
      throw e;
    });
};

export const isMyDocument = (arg: any): arg is MyDocument =>
  !!arg && typeof arg === 'object' && arg.$schema === SCHEMA_URL;
