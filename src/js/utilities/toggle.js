export function toggle(trigger, className, callback) {
  const target = document.getElementById(trigger.getAttribute('aria-controls'));
  trigger.setAttribute('aria-expanded', trigger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  target.classList.toggle(className || 'd-none');

  if (callback) {
    callback();
  }
}

export function hide(trigger, className) {
  const target = document.getElementById(trigger.getAttribute('aria-controls'));
  trigger.setAttribute('aria-expanded', 'false');
  target.classList.add(className || 'd-none');
}

export function show(trigger, className) {
  const target = document.getElementById(trigger.getAttribute('aria-controls'));
  trigger.setAttribute('aria-expanded', 'true');
  target.classList.remove(className || 'd-none');
}
