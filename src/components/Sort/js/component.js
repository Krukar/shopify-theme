class sort {
  constructor(element) {
    this.settings = {
      element,
      select: element.querySelector('.sort__element'),
    };
  }

  bindUI = () => {
    if (document.location.search.includes('sort=')) {
      this.settings.select.value = document.location.search.split('=')[1];
    }

    this.settings.element.addEventListener('change', (event) => {
      window.location.search = `?sort=${event.target.value}`;
    });
  };
}

export default sort;
