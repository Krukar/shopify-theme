/* ============
index.js
Entry point for our app
============ */
/* ============
Stylesheets
============ */
import 'SCSS/css_shop.scss';

/* ============
Components
============ */
import AccordionMenu from './components/AccordionMenu/index';
import Addresses from './components/Addresses/index';
import Carousel from './components/Carousel/index';
import Dropdown from './components/Dropdown/index';
import Input from './components/Input/index';
import Product from './components/Product/index';
import Sort from './components/Sort/index';
import Toggle from './components/Toggle/index';

/* ============
Init
============ */
AccordionMenu('.mobile-menu');
Addresses('.template-address');
Carousel('.product-gallery', {
  arrows: false,
  dots: true,
});
Dropdown('.dropdown');
Input('.input');
Product('.product');
Sort('.sort');
Toggle('.js-toggle');
