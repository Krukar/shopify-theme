import * as ajax from './ajax';

export function get(url) {
  return ajax.get(url).then(response => response.product);
}

export function merge(handles) {
  const urls = handles.split('|').map(handle => ajax.get(`${window.location.origin}/product/${handle}.json`));

  return Promise.all(urls).then((responses) => {
    const { product } = responses[0];
    const options = product.options[0].values;
    const variants = [];

    for (let i = 1; i < responses.length; i += 1) {
      variants.push(responses[i].product.variants);
      options.push(responses[i].product.options[0].values[0]);
    }

    product.variants = [].concat(...variants);

    return product;
  });
}
