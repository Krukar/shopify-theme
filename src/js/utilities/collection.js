import * as ajax from './ajax';

export function get(url) {
  return ajax.get(url).then(response => response);
}

export function merge(collection) {
  const unique = {};

  for (let i = 0; i < collection.length; i += 1) {
    const product = collection[i];
    const title = product.title;

    if (!unique[title]) {
      unique[title] = product;
    } else {
      unique[title].variants = [...unique[title].variants, ...product.variants];
    }
  }

  return Object.values(unique);
}
