import { UserService } from '../services/userService.js';
import { ServiceService } from '../services/serviceService.js';
import { ServiceCard } from '../components/serviceCard.js';

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
            
            const nameEl = document.getElementById('profile-name');
            const bioEl = document.getElementById('profile-bio');
            const photoEl = document.getElementById('profile-photo');
            const listEl = document.getElementById('offerings-list');

            if (user) {
                nameEl.textContent = user.name || 'Anonymous Practitioner';
                bioEl.textContent = user.bio || 'No bio provided yet.';
                photoEl.src = user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${practitionerId}`;
            }

            if (services.length > 0) {
                listEl.innerHTML = services.map(s => ServiceCard.render(s, { showBookBtn: true })).join('');
                lucide.createIcons();
            } else {
                listEl.innerHTML = '<p class="empty-state">No active offerings.</p>';
            }

        } catch (error) {
            console.error(error);
        }
    }

    loadProfile();
});
