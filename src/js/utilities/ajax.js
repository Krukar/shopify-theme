import 'whatwg-fetch';

export function get(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response);
  }).then(response => response);
}

export function post(url, body) {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response);
  }).then(response => response);
}
