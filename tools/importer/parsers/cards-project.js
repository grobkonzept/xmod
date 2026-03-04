/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-project block (no images variant)
 *
 * Source: https://www.bewegtbild.ch
 * Base Block: cards
 *
 * Block Structure (from Cards no-images library example):
 * - Row N: Single text cell (title, description, CTA)
 *
 * Source HTML Pattern (.p-qqr9302):
 *   <div class="pagelayer-row-holder">
 *     <div class="pagelayer-col pagelayer-col-3">
 *       <div class="pagelayer-iconbox">
 *         <div class="pagelayer-service-container">
 *           <div class="pagelayer-service-icon">
 *             <i class="fas fa-exclamation-circle">...</i>
 *           </div>
 *           <div class="pagelayer-service-details">
 *             <div class="pagelayer-service-heading">CH7</div>
 *             <div class="pagelayer-service-text"><p>Unser erster grosser Spielfilm...</p></div>
 *             <a href="..." class="pagelayer-service-btn"><span>Ansehen!</span></a>
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
  // VALIDATED: Source uses .pagelayer-iconbox as card container (icon-based cards)
  const iconCards = element.querySelectorAll('.pagelayer-iconbox');

  const cells = [];

  iconCards.forEach((card) => {
    // Extract title
    // VALIDATED: Source has .pagelayer-service-heading inside .pagelayer-service-details
    const titleEl = card.querySelector('.pagelayer-service-heading');

    // Extract description
    // VALIDATED: Source has .pagelayer-service-text with <p> inside
    const descEl = card.querySelector('.pagelayer-service-text');

    // Extract CTA link
    // VALIDATED: Source has a.pagelayer-service-btn with <span> text
    const ctaEl = card.querySelector('a.pagelayer-service-btn');

    // Build single text cell (no images variant)
    const textCell = [];

    if (titleEl) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(strong);
      textCell.push(p);
    }

    if (descEl) {
      const text = descEl.textContent.trim();
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        textCell.push(p);
      }
    }

    if (ctaEl) {
      const a = document.createElement('a');
      a.href = ctaEl.href;
      a.textContent = ctaEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.push(p);
    }

    // Single column row for no-images variant
    cells.push([textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Project', cells });
  element.replaceWith(block);
}
