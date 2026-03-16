import { ServiceService } from '../services/serviceService.js';
import { Navbar } from '../components/navbar.js';
import { ServiceCard } from '../components/serviceCard.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Render modular navbar
    Navbar.render();

    const gridEl = document.getElementById('service-grid');
    
    async function loadServices() {
        try {
            const services = await ServiceService.getAllServices();
            
            if (services.length === 0) {
                gridEl.innerHTML = '<p class="empty-state">No mystical services found yet.</p>';
                return;
            }

            const cardsHTML = services.map(s => ServiceCard.render(s, { showAuthor: true }));
            gridEl.innerHTML = cardsHTML.join('');
            lucide.createIcons();
        } catch (error) {
            console.error(error);
            gridEl.innerHTML = '<p class="empty-state">Unable to load services at this time.</p>';
        }
    }

    loadServices();

    // Search filter logic (client-side for MVP)
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                card.style.display = title.includes(query) ? 'block' : 'none';
            });
        });
    }
});
