import utilities from 'Utilities';

class AccordionMenu {
  constructor(element) {
    this.settings = {
      triggers: element.querySelectorAll(`.js__toggle--${element.className}`),
      links: element.querySelectorAll(`.${element.className}-item`),
    };
  }

  bindUI = () => {
    this.settings.triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        utilities.toggle.toggle(trigger);
      });
    });

    this.settings.links.forEach((link, index) => {
      link.addEventListener('keydown', (event) => {
        if (event.keyCode === utilities.keys.up) {
          event.preventDefault();
          this.up(index);
        } else if (event.keyCode === utilities.keys.down) {
          event.preventDefault();
          this.down(index);
        } else if (event.keyCode === utilities.keys.home) {
          this.first();
        } else if (event.keyCode === utilities.keys.end) {
          this.last();
        }
      });
    });
  }

  first = () => {
    this.update(this.settings.triggers[0]);
  }

  last = () => {
    this.update(this.settings.triggers[this.settings.triggers.length - 1]);
  }

  up = (index) => {
    if (index === 0) {
      return this.last();
    } else if (this.settings.links[index - 1].offsetParent === null) {
      return this.up(index - 1);
    }

    return this.update(this.settings.links[index - 1]);
  }

  down = (index) => {
    if (index === this.settings.links.length - 1) {
      return this.first();
    } else if (this.settings.links[index + 1].offsetParent === null) {
      return this.down(index + 1);
    }

    return this.update(this.settings.links[index + 1]);
  }

  update = (target) => {
    target.focus();
  }
}

export default AccordionMenu;

