export default function decorate(block) {
  const picture = block.querySelector(':scope > div:first-child picture');
  if (picture) {
    // Move picture to be a direct child for absolute positioning
    block.prepend(picture);
    // Remove the now-empty first row
    const firstRow = block.querySelector(':scope > div:first-child:not(picture)');
    if (firstRow && firstRow.tagName === 'DIV' && !firstRow.querySelector('picture')) {
      firstRow.remove();
    }
  } else {
    block.classList.add('no-image');
  }
}
