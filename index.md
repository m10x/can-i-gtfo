---
layout: search
---

<!-- Search Form -->
<div class="search-container">
  <form method="get" action="/" class="search-form">
    <div class="search-fields">
      <div class="search-field">
        <label for="verb-input">Verb:</label>
        <input 
          type="text" 
          name="verb" 
          id="verb-input" 
          placeholder="e.g. create, *, patch" 
          class="search-input"
        />
      </div>
      <div class="search-field">
        <label for="resource-input">Resource:</label>
        <input 
          type="text" 
          name="resource" 
          id="resource-input" 
          placeholder="e.g. pods, *, secrets" 
          class="search-input"
        />
      </div>
    </div>
  </form>
</div>

<!-- Filter Links -->
<div class="filter-container">
  <h3>Filter by Abuse Type:</h3>
  <div class="filter-links" id="filter-links">
    <!-- Filter links will be populated by JavaScript -->
  </div>
</div>

<!-- Results Container -->
<div class="entries-container">
  {% for entry in site.entries %}
  <div class="entry-card" 
       data-verb="{{ entry.verb | downcase }}" 
       data-resource="{{ entry.resource | downcase }}" 
       data-description="{{ entry.description | downcase }}"
       data-abuse-types="{% for abuse in entry.abuses %}{{ abuse.type }}|{% endfor %}">
    <h3><a href="{{ entry.url | relative_url }}">{{ entry.verb }} {{ entry.resource }}</a></h3>
    <p>{{ entry.description }}</p>
    <div class="abuse-types">
      {% for abuse in entry.abuses %}
        <span class="abuse-type-tag">{{ abuse.type }}</span>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</div>

<!-- No Results Message -->
<div id="no-results" class="no-results" style="display: none;">
  <h3>No entries found</h3>
  <p>Try a different search term or filter, or <a href="/">show all entries</a>.</p>
</div>

<!-- Results count -->
<div class="results-info">
  <p id="results-info">{{ site.entries.size }} entries total</p>
</div>

<style>
/* Search Form Styles */
.search-container {
  margin: 2rem 0;
}

.search-form {
  width: 100%;
}

.search-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-field {
  display: flex;
  flex-direction: column;
}

.search-field label {
  color: #f0f6fc;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #c9d1d9;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #58a6ff;
}

.current-search {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 4px;
  font-size: 0.875rem;
}

.clear-search {
  color: #f85149;
  text-decoration: none;
  margin-left: 0.5rem;
}

.clear-search:hover {
  text-decoration: underline;
}

/* Filter Styles */
.filter-container {
  margin: 2rem 0;
  padding: 1rem;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 6px;
}

.filter-container h3 {
  margin-top: 0;
  color: #58a6ff;
}

.filter-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.filter-link {
  padding: 0.25rem 0.5rem;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  color: #c9d1d9;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.filter-link:hover {
  background: #30363d;
  text-decoration: none;
}

.filter-link.active {
  background: #238636;
  color: #ffffff;
  border-color: #2ea043;
}

.filter-link.clear-filter {
  background: #21262d;
  border-color: #30363d;
  color: #c9d1d9;
}

.filter-link.clear-filter:hover {
  background: #30363d;
}

.filter-link.clear-filter.active {
  background: #238636;
  border-color: #2ea043;
  color: #ffffff;
}

.current-filter {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 4px;
  font-size: 0.875rem;
}

.remove-filter {
  color: #f85149;
  text-decoration: none;
  margin-left: 0.5rem;
}

.remove-filter:hover {
  text-decoration: underline;
}

/* Entry Card Styles */
.entries-container {
  margin: 2rem 0;
}

.entry-card {
  background: #161b22;
  border: 1px solid #21262d;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.entry-card:hover {
  border-color: #58a6ff;
}

.entry-card h3 {
  margin-top: 0;
}

.entry-card h3 a {
  color: #58a6ff;
  text-decoration: none;
}

.entry-card h3 a:hover {
  text-decoration: underline;
}

.abuse-types {
  margin-top: 1rem;
}

.abuse-type-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
}

/* Error Message Styles */
.error-message {
  background: #21262d;
  border: 1px solid #f85149;
  border-radius: 6px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
}

.error-message h3 {
  color: #f85149;
  margin-top: 0;
  margin-bottom: 1rem;
}

.error-message a {
  color: #58a6ff;
  text-decoration: none;
}

.error-message a:hover {
  text-decoration: underline;
}

/* No Results Styles */
.no-results {
  text-align: center;
  padding: 3rem 1rem;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 6px;
  margin: 2rem 0;
}

.no-results h3 {
  color: #f85149;
  margin-bottom: 1rem;
}

.no-results ul {
  text-align: left;
  display: inline-block;
  margin: 1rem 0;
}

.no-results li {
  margin: 0.5rem 0;
}

.no-results a {
  color: #58a6ff;
  text-decoration: none;
}

.no-results a:hover {
  text-decoration: underline;
}

/* Results Info */
.results-info {
  text-align: center;
  margin: 2rem 0;
  color: #8b949e;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-fields {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .filter-links {
    justify-content: center;
  }
  
  .entry-card {
    padding: 1rem;
  }
}
</style>
