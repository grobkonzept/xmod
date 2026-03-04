/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Bewegtbild website cleanup
 * Purpose: Remove non-content elements and fix HTML issues
 * Applies to: www.bewegtbild.ch (all templates)
 * Generated: 2026-03-04
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 * - Page structure analysis
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header navigation - handled separately by navigation skill
    // EXTRACTED: Found <header class="pagelayer-header"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header.pagelayer-header',
    ]);

    // Remove footer - handled separately
    // EXTRACTED: Found <footer class="pagelayer-footer"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.pagelayer-footer',
    ]);

    // Remove empty post props div
    // EXTRACTED: Found <div class="p-jyw3570 pagelayer-post_props"> (empty) in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.pagelayer-post_props',
    ]);

    // Remove parallax window wrappers (images handled by block parsers)
    // EXTRACTED: Found <div class="pagelayer-parallax-window"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.pagelayer-parallax-window',
      '.pagelayer-row-shape',
    ]);

    // Remove FontAwesome icon elements (not needed in EDS)
    // EXTRACTED: Found <i class="fas fa-bars">, <i class="fas fa-times">,
    // <i class="fas fa-exclamation-circle"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'i.fas',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove Google Fonts link (handled by EDS styles)
    // EXTRACTED: Found <link href="https://fonts.googleapis.com/css?family=Open%20Sans..."> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'link[href*="fonts.googleapis.com"]',
    ]);

    // Clean up empty entry-header
    // EXTRACTED: Found <header class="entry-header"></header> (empty) in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header.entry-header',
    ]);

    // Remove remaining source elements not needed
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
    ]);
  }
}
