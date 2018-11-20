import Component from './js/component';

export default function (selector) {
  const targets = document.querySelectorAll(selector);

  targets.forEach((target) => {
    const component = new Component(target);
    component.bindUI();
  });
}
