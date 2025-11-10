/**
 * Real-time search and filtering for Jekyll site
 */

(function () {
  'use strict';

  const DEBOUNCE_DELAY = 300;

  let verbInput, resourceInput, filterLinks, entryCards, resultsInfo, noResultsElement;
  let debounceTimer = null;
  let currentVerb = '';
  let currentResource = '';
  let currentFilter = '';

  function init() {
    verbInput = document.getElementById('verb-input');
    resourceInput = document.getElementById('resource-input');
    entryCards = document.querySelectorAll('.entry-card');
    resultsInfo = document.getElementById('results-info');
    noResultsElement = document.getElementById('no-results');

    if (!verbInput || !resourceInput || !entryCards.length) return;

    generateFilterLinks();
    filterLinks = document.querySelectorAll('.filter-link');
    extractInitialState();
    setupEventListeners();
    performFiltering();
    updateFilterLinkStates();
  }

  function generateFilterLinks() {
    const container = document.getElementById('filter-links');
    if (!container) return;

    const abuseTypes = new Set();
    entryCards.forEach(card => {
      const types = (card.dataset.abuseTypes || '').split('|');
      types.forEach(type => {
        const trimmed = type.trim();
        if (trimmed) abuseTypes.add(trimmed);
      });
    });

    const sortedTypes = Array.from(abuseTypes).sort();
    container.innerHTML = '';

    // "Show all" link
    const showAll = document.createElement('a');
    showAll.href = '/';
    showAll.className = 'filter-link clear-filter';
    showAll.textContent = 'Show all';
    container.appendChild(showAll);

    // Filter links
    sortedTypes.forEach(type => {
      const link = document.createElement('a');
      link.href = '/?filter=' + encodeURIComponent(type);
      link.className = 'filter-link';
      link.textContent = type;
      container.appendChild(link);
    });
  }

  function extractInitialState() {
    const params = new URLSearchParams(window.location.search);
    currentVerb = params.get('verb') || '';
    currentResource = params.get('resource') || '';
    currentFilter = params.get('filter') || '';

    if (verbInput && currentVerb) {
      verbInput.value = currentVerb;
    }
    if (resourceInput && currentResource) {
      resourceInput.value = currentResource;
    }
  }

  function setupEventListeners() {
    // Verb input with debouncing
    verbInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentVerb = e.target.value.trim();
        performFiltering();
        updateBrowserURL();
      }, DEBOUNCE_DELAY);
    });

    // Resource input with debouncing
    resourceInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentResource = e.target.value.trim();
        performFiltering();
        updateBrowserURL();
      }, DEBOUNCE_DELAY);
    });

    // Prevent form submission
    verbInput.closest('form').addEventListener('submit', e => {
      e.preventDefault();
      currentVerb = verbInput.value.trim();
      currentResource = resourceInput.value.trim();
      performFiltering();
      updateBrowserURL();
    });

    // Filter links
    filterLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        currentFilter = link.classList.contains('clear-filter') ? '' : link.textContent.trim();
        performFiltering();
        updateFilterLinkStates();
        updateBrowserURL();
      });
    });

    // Browser navigation
    window.addEventListener('popstate', () => {
      extractInitialState();
      performFiltering();
      updateFilterLinkStates();
    });
  }

  function performFiltering() {
    let visibleCount = 0;

    entryCards.forEach(card => {
      let matches = true;

      // Check verb match (with wildcard support)
      if (currentVerb && matches) {
        const cardVerb = (card.dataset.verb || '').toLowerCase();
        const searchVerb = currentVerb.toLowerCase();
        
        if (searchVerb === '*') {
          // Wildcard matches everything
          matches = true;
        } else if (searchVerb.includes('*')) {
          // Pattern matching with wildcards
          const pattern = searchVerb.replace(/\*/g, '.*');
          const regex = new RegExp('^' + pattern + '$');
          matches = regex.test(cardVerb);
        } else {
          // Exact match
          matches = cardVerb === searchVerb;
        }
      }

      // Check resource match (with wildcard support)
      if (currentResource && matches) {
        const cardResource = (card.dataset.resource || '').toLowerCase();
        const searchResource = currentResource.toLowerCase();
        
        if (searchResource === '*') {
          // Wildcard matches everything
          matches = true;
        } else if (searchResource.includes('*')) {
          // Pattern matching with wildcards
          const pattern = searchResource.replace(/\*/g, '.*');
          const regex = new RegExp('^' + pattern + '$');
          matches = regex.test(cardResource);
        } else {
          // Exact match
          matches = cardResource === searchResource;
        }
      }

      // Check abuse type filter
      if (currentFilter && matches) {
        const types = (card.dataset.abuseTypes || '').split('|');
        matches = types.some(type => type.trim() === currentFilter);
      }

      card.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    });

    updateResultsInfo(visibleCount);
    updateNoResultsDisplay(visibleCount);
  }

  function updateResultsInfo(visibleCount) {
    if (!resultsInfo) return;
    const total = entryCards.length;
    resultsInfo.textContent = (currentVerb || currentResource || currentFilter) 
      ? `${visibleCount} of ${total} entries shown`
      : `${total} entries total`;
  }

  function updateNoResultsDisplay(visibleCount) {
    if (!noResultsElement) return;
    noResultsElement.style.display = 
      (visibleCount === 0 && (currentVerb || currentResource || currentFilter)) ? 'block' : 'none';
  }

  function updateBrowserURL() {
    if (!window.history?.pushState) return;

    const params = new URLSearchParams();
    if (currentVerb) params.set('verb', currentVerb);
    if (currentResource) params.set('resource', currentResource);
    if (currentFilter) params.set('filter', currentFilter);

    const newURL = window.location.pathname + (params.toString() ? '?' + params : '');
    if (newURL !== window.location.pathname + window.location.search) {
      window.history.pushState({ verb: currentVerb, resource: currentResource, filter: currentFilter }, '', newURL);
    }
  }

  function updateFilterLinkStates() {
    filterLinks.forEach(link => {
      if (link.classList.contains('clear-filter')) {
        let href = '/';
        const params = new URLSearchParams();
        if (currentVerb) params.set('verb', currentVerb);
        if (currentResource) params.set('resource', currentResource);
        if (params.toString()) href += '?' + params.toString();
        
        link.href = href;
        link.classList.toggle('active', !currentFilter);
      } else {
        const type = link.textContent.trim();
        const params = new URLSearchParams();
        params.set('filter', type);
        if (currentVerb) params.set('verb', currentVerb);
        if (currentResource) params.set('resource', currentResource);
        
        link.href = '/?' + params.toString();
        link.classList.toggle('active', type === currentFilter);
      }
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();