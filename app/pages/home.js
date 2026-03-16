import { Navbar } from '../components/navbar.js';
import { mockUsers, mockServices, mockFeatured } from '../utils/mockData.js';

document.addEventListener('DOMContentLoaded', () => {
    Navbar.render();
    
    initPractitionerScroll();
    initServiceGrids();
});

function initPractitionerScroll() {
    const scrollEl = document.getElementById('practitioner-scroll');
    const practitioners = mockUsers.filter(u => u.role === 'practitioner');
    
    if (practitioners.length === 0) {
        scrollEl.innerHTML = '<p class="empty-state">No practitioners found.</p>';
        return;
    }

    scrollEl.innerHTML = practitioners.map(p => `
        <div class="practitioner-card">
            <img src="${p.profilePhoto}" class="card-image" alt="${p.name}">
            <div class="card-content">
                <h4>${p.name}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${p.specialty}</p>
                <div class="rating-chip">
                    <i data-lucide="star" style="width:14px; height:14px; fill:var(--accent);"></i>
                    <span>${p.rating} (${p.reviews})</span>
                </div>
                <a href="practitioner.html?id=${p.uid}" class="btn btn-glass btn-sm" style="margin-top: 12px; width: 100%; display: block;">View Profile</a>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

function initServiceGrids() {
    const servicesGrid = document.getElementById('popular-services-grid');
    const articlesGrid = document.getElementById('latest-articles-grid');

    if (servicesGrid) {
        servicesGrid.innerHTML = mockFeatured.popularServices.map(item => `
            <div class="tile-card">
                <img src="${item.image}" class="tile-bg" alt="${item.title}">
                <div class="tile-overlay">
                    <span class="tile-title">${item.title}</span>
                </div>
            </div>
        `).join('');
    }

    if (articlesGrid) {
        articlesGrid.innerHTML = mockFeatured.latestArticles.map(item => `
            <div class="tile-card">
                <img src="${item.image}" class="tile-bg" alt="${item.title}">
                <div class="tile-overlay">
                    <span class="tile-title">${item.title}</span>
                </div>
            </div>
        `).join('');
    }
}
