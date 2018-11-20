import utilities from 'Utilities';

export default function (trigger, className, callback) {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    utilities.toggle.toggle(trigger, className, callback);
  });
}
