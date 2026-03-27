/**
 * Shared JavaScript for iQ Labs Wireframes
 * Handles component loading and shared functionality
 */

// Load HTML components into placeholder elements
async function loadComponent(elementId, componentPath) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer if placeholder elements exist
  loadComponent('wf-header-placeholder', '../components/header.html');
  loadComponent('wf-footer-placeholder', '../components/footer.html');
});

// Mobile Navigation Toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.querySelector('.wf-menu-toggle');
  if (mobileNav) mobileNav.classList.toggle('wf-mobile-nav--open');
  if (menuToggle) menuToggle.classList.toggle('wf-menu-toggle--open');
}

// Expandable Search Toggle
function toggleSearch() {
  const search = document.getElementById('headerSearch');
  if (!search) return;

  const input = search.querySelector('.wf-header__search-input');
  search.classList.toggle('wf-header__search--open');

  if (search.classList.contains('wf-header__search--open') && input) {
    input.focus();
  }
}

// Close search when clicking outside
document.addEventListener('click', function(e) {
  const search = document.getElementById('headerSearch');
  if (search && !search.contains(e.target)) {
    search.classList.remove('wf-header__search--open');
  }
});
