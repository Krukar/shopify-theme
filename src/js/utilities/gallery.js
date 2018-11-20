export function filter(images, title) {
  return images.filter(image => title === image.alt);
}

export function generate() {
  return null;
}
