/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-film block
 *
 * Source: https://www.bewegtbild.ch
 * Base Block: cards
 *
 * Block Structure (from Cards block library example):
 * - Row N: Image cell | Text cell (title, description, CTA)
 *
 * Source HTML Pattern (.p-7p82938):
 *   <div class="pagelayer-row-holder">
 *     <div class="pagelayer-col pagelayer-col-4">
 *       <div class="pagelayer-service">
 *         <div class="pagelayer-service-container">
 *           <div class="pagelayer-service-image">
 *             <img class="pagelayer-img" src="..." alt="..." />
 *           </div>
 *           <div class="pagelayer-service-details">
 *             <div class="pagelayer-service-heading">PSI</div>
 *             <div class="pagelayer-service-text">Found Footage...</div>
 *             <a href="..." class="pagelayer-service-btn">Film ansehen</a>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *     ... (repeated for each card)
 *   </div>
 *
 * Generated: 2026-03-04
 */
export default function parse(element, { document }) {
  // VALIDATED: Source uses .pagelayer-service as card container
  const serviceCards = element.querySelectorAll('.pagelayer-service');

  const cells = [];

  serviceCards.forEach((card) => {
    // Extract image
    // VALIDATED: Source has .pagelayer-service-image with img.pagelayer-img inside
    const img = card.querySelector('.pagelayer-service-image img.pagelayer-img')
      || card.querySelector('.pagelayer-service-image img');

    // Extract title
    // VALIDATED: Source has .pagelayer-service-heading
    const titleEl = card.querySelector('.pagelayer-service-heading');

    // Extract description
    // VALIDATED: Source has .pagelayer-service-text
    const descEl = card.querySelector('.pagelayer-service-text');

    // Extract CTA link
    // VALIDATED: Source has a.pagelayer-service-btn
    const ctaEl = card.querySelector('a.pagelayer-service-btn');

    // Build image cell
    const imageCell = [];
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || img.title || '';
      imageCell.push(imgEl);
    }

    // Build text cell
    const textCell = [];

    if (titleEl) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(strong);
      textCell.push(p);
    }

    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      textCell.push(p);
    }

    if (ctaEl) {
      const a = document.createElement('a');
      a.href = ctaEl.href;
      a.textContent = ctaEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.push(p);
    }

    // Add row: [image, text]
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Film', cells });
  element.replaceWith(block);
}
