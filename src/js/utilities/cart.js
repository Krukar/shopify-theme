import * as ajax from './ajax';

export function add(id, quantity) {
  return ajax.post('/cart/add.js', { id, quantity });
}

export function clear() {
  return ajax.get('/cart/clear.js');
}

export function get() {
  return ajax.get('/cart.js');
}
