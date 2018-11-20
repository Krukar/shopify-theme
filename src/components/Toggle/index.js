import Component from './js/component';

export default function (selector, optional, callback) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    Component(element, optional, callback);
  });
}
