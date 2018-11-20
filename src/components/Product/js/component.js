import $ from 'jquery';
import utilities from 'Utilities';

class Product {
  constructor(element) {
    this.settings = {
      carousel: $('.slick-slider', element),
      form: element.querySelector('.product-form'),
      options: element.querySelectorAll('.product-option'),
      price: element.querySelector('.product-price'),
      product: window.demac.product,
      quantity: element.querySelector('.input__element--product-quantity'),
      selected: undefined,
      submit: element.querySelector('.button--submit'),
    };
  }

  bindUI = () => {
    // Shopify outputs selected (via url) or first available variant
    const selected = this.settings.product.variants.find(variant =>
      variant.id === window.demac.product.selected_or_first_available_variant);
    this.update(selected);

    // Select options for selected variant
    this.settings.options.forEach((option, index) => {
      option.querySelector(`.radio__element--product-option[value=${this.settings.selected[`option${index + 1}`]}]`).checked = true;
    });

    // When the form changes
    this.settings.form.addEventListener('change', this.change);

    // When the form submits
    this.settings.form.addEventListener('submit', this.submit);
  }

  // Form change event
  change = () => {
    const title = [...this.settings.options].map(option => option.querySelector('.radio__element--product-option:checked').value).join(' / ');
    const selected = this.settings.product.variants.find(v => v.title === title);

    this.update(selected);
  }

  // Form submit event
  submit = (event) => {
    event.preventDefault();
    utilities.cart.add(this.settings.selected.id, this.settings.quantity.value).then((response) => {
      console.log('Added to cart');
      console.log(response);
    });
  }

  // Update function when a variant is selected
  update = (selected) => {
    this.settings.selected = selected;
    this.updateGallery(this.settings.selected.title);
    this.updatePrice(this.settings.selected.price, this.settings.selected.compare_at_price);
    this.updateUrl(this.settings.selected.id);
  }

  // Filter slick carousel using selected variant title and image alt tag
  updateGallery = (title) => {
    this.settings.carousel.slick('slickUnfilter');
    this.settings.carousel.slick('slickFilter', (index, slide) => title === slide.querySelector('.product-gallery__image').alt);
  }

  // Update price
  updatePrice = (price, sale) => {
    const content = sale ? `<span class="product-price__money product-price__money--sale">${sale}</span> - <span class="product-price__money product-price__money--regular">${price}</span>` : `<span class="product-price__money product-price__money--regular">${price}</span>`;
    this.settings.price.innerHTML = content;
  }

  // Modify the url for selected variant
  updateUrl = id => window.history.replaceState(null, null, `?variant=${id}`);
}

export default Product;
