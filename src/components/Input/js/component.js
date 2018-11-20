class Input {
  constructor(element) {
    this.settings = {
      element,
    };
  }

  bindUI = () => {
    this.settings.element.addEventListener('focusin', () => {
      this.settings.element.classList.add('input--active');
    });

    this.settings.element.addEventListener('focusout', () => {
      if (!this.settings.element.querySelector('.input__element').value) {
        this.settings.element.classList.remove('input--active');
      }
    });
  }

  foobar = () => {
    console.log('foobar called');
  }
}

export default Input;
