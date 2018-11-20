import utilities from 'Utilities';

class Dropdown {
  constructor(element) {
    this.settings = {
      className: element.className,
      links: element.querySelectorAll('[aria-haspopup="true"]'), // aria-haspopup="true" represents a top level link
    };
  }

  bindUI = () => {
    // Bind UI for every top level link
    this.settings.links.forEach((link, linkIndex) => {
      const parent = link.parentNode; // The parent is the li that contains the link and a submenu
      const menu = parent.querySelector('[role="menu"]'); // role="menu" represents a submenu
      const items = menu.querySelectorAll('[role="menuitem"]'); // role="menuitem" represents a toggable element in the submenu

      // On hover expand menu
      parent.addEventListener('mouseover', () => this.expand(menu, link));

      // On hover exit collapse menu
      parent.addEventListener('mouseleave', () => this.collapse(menu, link));

      // On blur of a top level link collapse the menu IF toggled out of the submenu
      link.addEventListener('blur', event => this.blur(event, menu, link));

      // Key events on top level links
      link.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
          case utilities.keys.up:
            // On up expand the menu and jump to last submenu element
            event.preventDefault();
            this.expand(menu, link);
            this.update(items[items.length - 1]);
            break;

          case utilities.keys.down:
          case utilities.keys.enter:
          case utilities.keys.space:
            // On down/enter/space expand menu and jump to first submenu element
            event.preventDefault();
            this.expand(menu, link);
            this.update(items[0]);
            break;

          case utilities.keys.left:
            // On left go to previous top level link
            event.preventDefault();
            this.left(linkIndex);
            break;

          case utilities.keys.right:
            // On right go to next top level link
            event.preventDefault();
            this.right(linkIndex);
            break;

          case utilities.keys.home:
            // On home go to first top level link
            this.home();
            break;

          case utilities.keys.end:
            // On end go to last top level link
            this.end();
            break;

          default:
            break;
        }
      });

      // We iterate through each submenu so that it creates an index and we can cycle through it
      items.forEach((item, itemIndex) => {
        // On focus expand the menu
        item.addEventListener('focus', () => this.expand(menu, link));

        // On blur collapse the menu IF toggled out of the submenu
        item.addEventListener('blur', event => this.blur(event, menu, link));

        // Key events on submenu items
        item.addEventListener('keydown', (event) => {
          switch (event.keyCode) {
            case utilities.keys.up:
              // On up move up the submenu
              event.preventDefault();
              this.up(items, itemIndex);
              break;

            case utilities.keys.down:
              // On down move down the submenu
              event.preventDefault();
              this.down(items, itemIndex);
              break;

            case utilities.keys.left:
              // On left go to previous top level link
              event.preventDefault();
              this.left(linkIndex, true);
              break;

            case utilities.keys.right:
              // On right go to next top level link
              event.preventDefault();
              this.right(linkIndex, true);
              break;

            case utilities.keys.home:
              // On home go to first top level link
              this.home();
              break;

            case utilities.keys.end:
              // On end go to last top level link
              this.end();
              break;

            case utilities.keys.escape:
              // On escape close the submenu and go to top level link
              this.update(link);
              this.collapse(menu, link);
              break;

            default:
              break;
          }
        });
      });
    });
  }

  blur = (event, menu, link) => {
    if (!event.relatedTarget || menu !== event.relatedTarget.parentNode.parentNode) {
      this.collapse(menu, link);
    }
  }

  collapse = (menu, link) => {
    link.setAttribute('aria-expanded', false);
    menu.classList.remove(`${this.settings.className}__list--active`);
  }

  down = (items, itemIndex) => {
    if (itemIndex >= items.length - 1) {
      return this.update(items[0]);
    }

    return this.update(items[itemIndex + 1]);
  }

  end = () => {
    this.update(this.settings.links[this.settings.links.length - 1]);
  }

  expand = (menu, link) => {
    link.setAttribute('aria-expanded', true);
    menu.classList.add(`${this.settings.className}__list--active`);
  }

  home = () => {
    this.update(this.settings.links[0]);
  }

  left = (linkIndex, expand) => {
    const newLink = linkIndex <= 0 ?
      this.settings.links[this.settings.links.length - 1] :
      this.settings.links[linkIndex - 1];

    if (expand) {
      this.expand(newLink.nextElementSibling, newLink);
    }

    return this.update(newLink);
  }

  right = (linkIndex, expand) => {
    const newLink = linkIndex >= this.settings.links.length - 1 ?
      this.settings.links[0] :
      this.settings.links[linkIndex + 1];

    if (expand) {
      this.expand(newLink.nextElementSibling, newLink);
    }

    return this.update(newLink);
  }

  up = (items, itemIndex) => {
    if (itemIndex === 0) {
      return this.update(items[items.length - 1]);
    }

    return this.update(items[itemIndex - 1]);
  }

  update = (target) => {
    target.focus();
  }
}

export default Dropdown;
