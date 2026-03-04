/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-film block
 *
 * Source: https://www.bewegtbild.ch
 * Base Block: hero
 *
 * Block Structure (from Hero block library example):
 * - Row 1: Background image (optional)
 * - Row 2: Content (heading, subheading/description, CTA)
 *
 * Source HTML Pattern (2 instances on page):
 * Instance 1 (.p-ty62967): Hero with parallax background image, H1 heading, subheading, CTA button
 *   <div class="pagelayer-row-holder">
 *     <div class="pagelayer-col">
 *       <div class="pagelayer-heading"><div class="pagelayer-heading-holder">WIR SUCHEN TALENTE</div></div>
 *       <div class="pagelayer-heading"><div class="pagelayer-heading-holder">MÖCHTEST DU...</div></div>
 *       <div class="pagelayer-btn"><a class="pagelayer-btn-holder"><span class="pagelayer-btn-text">MEHR</span></a></div>
 *     </div>
 *   </div>
 *
 * Instance 2 (.p-io72443): BIWAK section with background image, H2 heading, description, CTA
 *   <div class="pagelayer-row-holder">
 *     <div class="pagelayer-col">
 *       <div class="pagelayer-heading"><div class="pagelayer-heading-holder">BIWAK</div></div>
 *       <div class="pagelayer-text"><div class="pagelayer-text-holder">...</div></div>
 *       <div class="pagelayer-btn"><a class="pagelayer-btn-holder"><span class="pagelayer-btn-text">FILM ANSCHAUEN</span></a></div>
 *     </div>
 *   </div>
 *
 * Generated: 2026-03-04
 */
export default function parse(element, { document }) {
  // Extract background image from parallax or direct img
  // VALIDATED: Source has <img class="pagelayer-img"> inside .pagelayer-parallax-window
  // and also direct <img> as first child of the row for BIWAK section
  const bgImage = element.querySelector('.pagelayerParallax img.pagelayer-img')
    || element.querySelector(':scope > img')
    || element.querySelector('img.pagelayer-img');

  // Extract headings
  // VALIDATED: Source uses .pagelayer-heading-holder for heading text
  const headings = Array.from(element.querySelectorAll('.pagelayer-heading-holder'));

  // Extract description text
  // VALIDATED: Source uses .pagelayer-text-holder for body text (BIWAK section)
  const textHolder = element.querySelector('.pagelayer-text-holder');

  // Extract CTA button
  // VALIDATED: Source uses .pagelayer-btn-holder with .pagelayer-btn-text inside
  const ctaLink = element.querySelector('.pagelayer-btn-holder.pagelayer-ele-link');

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Background image (optional)
  if (bgImage) {
    const imgEl = document.createElement('img');
    imgEl.src = bgImage.src;
    imgEl.alt = bgImage.alt || '';
    cells.push([imgEl]);
  }

  // Row 2: Content (heading + description + CTA)
  const contentElements = [];

  // Add first heading as main heading
  if (headings.length > 0) {
    const h = document.createElement('h1');
    h.textContent = headings[0].textContent.trim();
    contentElements.push(h);
  }

  // Add second heading or text description as paragraph
  if (headings.length > 1) {
    const p = document.createElement('p');
    p.textContent = headings[1].textContent.trim();
    contentElements.push(p);
  }

  if (textHolder) {
    // Extract all paragraphs from text holder
    const paragraphs = textHolder.querySelectorAll('p');
    if (paragraphs.length > 0) {
      paragraphs.forEach((para) => {
        const p = document.createElement('p');
        p.textContent = para.textContent.trim();
        if (p.textContent) contentElements.push(p);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = textHolder.textContent.trim();
      if (p.textContent) contentElements.push(p);
    }
  }

  // Add CTA link
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    const p = document.createElement('p');
    p.appendChild(a);
    contentElements.push(p);
  }

  cells.push(contentElements);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Film', cells });
  element.replaceWith(block);
}
