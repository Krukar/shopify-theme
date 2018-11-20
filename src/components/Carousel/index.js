import Component from './js/component';
import './scss/component.scss';

export default function (selector, options) {
  const targets = document.querySelectorAll(selector);

  targets.forEach((target) => {
    Component(target, options);
  });
}
