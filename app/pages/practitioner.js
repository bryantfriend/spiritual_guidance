import { ReviewService } from '../services/reviewService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const practitionerId = urlParams.get('id');

    if (!practitionerId) {
        alert('Practitioner not found');
        window.location.href = 'explore.html';
        return;
    }

    async function loadProfile() {
        try {
            const user = await UserService.getUserById(practitionerId);
            const services = await ServiceService.getPractitionerServices(practitionerId);
            const reviews = await ReviewService.getPractitionerReviews(practitionerId);
            
            const nameEl = document.getElementById('profile-name');
            const bioEl = document.getElementById('profile-bio');
            const photoEl = document.getElementById('profile-photo');
            const listEl = document.getElementById('offerings-list');
            const reviewsEl = document.getElementById('reviews-list');

            if (user) {
                nameEl.textContent = user.name || 'Anonymous Practitioner';
                bioEl.textContent = user.bio || 'No bio provided yet.';
                photoEl.src = user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${practitionerId}`;
            }

            if (services.length > 0) {
                listEl.innerHTML = services.map(s => ServiceCard.render(s, { showBookBtn: true })).join('');
            } else {
                listEl.innerHTML = '<p class="empty-state">No active offerings.</p>';
            }

            if (reviews.length > 0) {
                reviewsEl.innerHTML = reviews.map(r => `
                    <div class="glass-card" style="padding: 16px; border-radius: 16px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-weight: 700;">${r.clientName}</span>
                            <span style="color: var(--accent); font-weight: 700;">⭐ ${r.rating}.0</span>
                        </div>
                        <p style="font-size: 0.9rem; color: var(--text-muted);">${r.comment}</p>
                        <p style="font-size: 0.75rem; color: rgba(255,255,255,0.3); margin-top: 8px;">${r.date}</p>
                    </div>
                `).join('');
            }

            lucide.createIcons();

        } catch (error) {
            console.error(error);
        }
    }

    const msgBtn = document.querySelector('.profile-footer .btn-primary');
    if (msgBtn) {
        msgBtn.addEventListener('click', async () => {
            const current = await UserService.getCurrentUser();
            if (!current) {
                alert('Please log in to message practitioners');
                return;
            }
            const { MessageService } = await import('../services/messageService.js');
            const convId = await MessageService.startConversation(current.uid, practitionerId);
            window.location.href = `messages.html?convId=${convId}`;
        });
    }

    loadProfile();
});
