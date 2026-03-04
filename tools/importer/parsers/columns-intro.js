/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-intro block
 *
 * Source: https://www.bewegtbild.ch
 * Base Block: columns
 *
 * Block Structure (from Columns block library example):
 * - Row 1: Column 1 content | Column 2 content
 *
 * Source HTML Pattern (.p-u0m6798):
 *   <div class="pagelayer-row-holder">
 *     <div class="pagelayer-col pagelayer-col-8"> (text column)
 *       <div class="pagelayer-heading"><div class="pagelayer-heading-holder">Wir fördern...</div></div>
 *       <div class="pagelayer-text"><div class="pagelayer-text-holder"><p>...</p></div></div>
 *     </div>
 *     <div class="pagelayer-col pagelayer-col-4"> (image gallery column)
 *       <div class="pagelayer-grid_gallery">
 *         <ul class="pagelayer-grid-gallery-ul">
 *           <li><div><img class="pagelayer-img" src="..." /></div></li>
 *           ...
 *         </ul>
 *       </div>
 *     </div>
 *   </div>
 *
 * Generated: 2026-03-04
 */
export default function parse(element, { document }) {
  // VALIDATED: Source has .pagelayer-col-8 for text and .pagelayer-col-4 for images
  const textCol = element.querySelector('.pagelayer-col-8, [class*="pagelayer-col"]:first-child');
  const imageCol = element.querySelector('.pagelayer-col-4, .pagelayer-grid_gallery');

  // Build left column content (text)
  const leftContent = [];

  if (textCol) {
    // Extract heading
    // VALIDATED: Source has .pagelayer-heading-holder
    const headingEl = textCol.querySelector('.pagelayer-heading-holder');
    if (headingEl) {
      const h2 = document.createElement('h2');
      h2.textContent = headingEl.textContent.trim();
      leftContent.push(h2);
    }

    // Extract body text paragraphs
    // VALIDATED: Source has .pagelayer-text-holder with <p> elements inside
    const textHolder = textCol.querySelector('.pagelayer-text-holder');
    if (textHolder) {
      const paragraphs = textHolder.querySelectorAll('p');
      paragraphs.forEach((para) => {
        const text = para.textContent.trim();
        if (text) {
          const p = document.createElement('p');
          p.textContent = text;
          leftContent.push(p);
        }
      });
    }
  }

  // Build right column content (images)
  const rightContent = [];

  // VALIDATED: Source has .pagelayer-grid-gallery-ul with <li> items containing <img class="pagelayer-img">
  const galleryImages = element.querySelectorAll('.pagelayer-grid-gallery-ul .pagelayer-img');
  if (galleryImages.length > 0) {
    galleryImages.forEach((img) => {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || img.title || '';
      rightContent.push(imgEl);
    });
  } else if (imageCol) {
    // Fallback: get any images in image column
    const imgs = imageCol.querySelectorAll('img');
    imgs.forEach((img) => {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      rightContent.push(imgEl);
    });
  }

  // Build cells: single row with 2 columns
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Intro', cells });
  element.replaceWith(block);
}
