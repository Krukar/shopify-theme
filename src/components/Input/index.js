import utilities from 'Utilities';
import Component from './js/component';
import './scss/component.scss';

export default function (selector) {
  utilities.initializer(selector, Component);
}
