/**
 * Real-time search and filtering for Jekyll site
 */

(function () {
  'use strict';

  const DEBOUNCE_DELAY = 300;

  let searchInput, filterLinks, entryCards, resultsInfo, noResultsElement;
  let debounceTimer = null;
  let currentSearch = '';
  let currentFilter = '';

  function init() {
    searchInput = document.getElementById('search-input');
    entryCards = document.querySelectorAll('.entry-card');
    resultsInfo = document.getElementById('results-info');
    noResultsElement = document.getElementById('no-results');

    if (!searchInput || !entryCards.length) return;

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

    const exploitTypes = new Set();
    entryCards.forEach(card => {
      const types = (card.dataset.exploitTypes || '').split('|');
      types.forEach(type => {
        const trimmed = type.trim();
        if (trimmed) exploitTypes.add(trimmed);
      });
    });

    const sortedTypes = Array.from(exploitTypes).sort();
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
    currentSearch = params.get('search') || '';
    currentFilter = params.get('filter') || '';

    if (searchInput && currentSearch) {
      searchInput.value = currentSearch;
    }
  }

  function setupEventListeners() {
    // Search input with debouncing
    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        performFiltering();
        updateBrowserURL();
      }, DEBOUNCE_DELAY);
    });

    // Prevent form submission
    searchInput.closest('form').addEventListener('submit', e => {
      e.preventDefault();
      currentSearch = searchInput.value.trim();
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
    const searchTerm = currentSearch.toLowerCase();

    entryCards.forEach(card => {
      let matches = true;

      if (searchTerm) {
        const content = [
          card.dataset.verb || '',
          card.dataset.resource || '',
          card.dataset.description || '',
          card.dataset.exploitTypes || ''
        ].join(' ').toLowerCase();
        matches = content.includes(searchTerm);
      }

      if (currentFilter && matches) {
        const types = (card.dataset.exploitTypes || '').split('|');
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
    resultsInfo.textContent = (currentSearch || currentFilter) 
      ? `${visibleCount} of ${total} entries shown`
      : `${total} entries total`;
  }

  function updateNoResultsDisplay(visibleCount) {
    if (!noResultsElement) return;
    noResultsElement.style.display = 
      (visibleCount === 0 && (currentSearch || currentFilter)) ? 'block' : 'none';
  }

  function updateBrowserURL() {
    if (!window.history?.pushState) return;

    const params = new URLSearchParams();
    if (currentSearch) params.set('search', currentSearch);
    if (currentFilter) params.set('filter', currentFilter);

    const newURL = window.location.pathname + (params.toString() ? '?' + params : '');
    if (newURL !== window.location.pathname + window.location.search) {
      window.history.pushState({ search: currentSearch, filter: currentFilter }, '', newURL);
    }
  }

  function updateFilterLinkStates() {
    filterLinks.forEach(link => {
      if (link.classList.contains('clear-filter')) {
        link.href = currentSearch ? `/?search=${encodeURIComponent(currentSearch)}` : '/';
        link.classList.toggle('active', !currentFilter);
      } else {
        const type = link.textContent.trim();
        let href = `/?filter=${encodeURIComponent(type)}`;
        if (currentSearch) href += `&search=${encodeURIComponent(currentSearch)}`;
        link.href = href;
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