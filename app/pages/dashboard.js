import { UserService } from '../services/userService.js';
import { ServiceService } from '../services/serviceService.js';
import { BookingService } from '../services/bookingService.js';
import { Navbar } from '../components/navbar.js';

document.addEventListener('DOMContentLoaded', async () => {
    Navbar.render();
    let currentUser = null;

    // Check Auth State
    UserService.onAuth(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        
        currentUser = await UserService.getCurrentUser();
        initDashboard(currentUser);
        loadServices(currentUser.uid);
        loadBookings(currentUser.uid);
    });

    function initDashboard(user) {
        const nameEl = document.getElementById('practitioner-name');
        const roleEl = document.getElementById('practitioner-role');
        const bioEl = document.getElementById('practitioner-bio');
        const avatarEl = document.getElementById('dashboard-avatar');

        if (nameEl) nameEl.textContent = user.name || 'Anonymous Practitioner';
        if (roleEl) roleEl.textContent = user.role || 'Practitioner';
        if (bioEl) bioEl.value = user.bio || '';
        if (avatarEl && user.profilePhoto) avatarEl.src = user.profilePhoto;
        
        lucide.createIcons();
    }

    async function loadBookings(uid) {
        const bookings = await BookingService.getPractitionerBookings(uid);
        const listEl = document.getElementById('practitioner-bookings-list');
        
        if (bookings.length === 0) {
            listEl.innerHTML = '<p class="empty-state">No booking requests yet.</p>';
        } else {
            listEl.innerHTML = bookings.map(b => `
                <div class="booking-item">
                    <div class="booking-info">
                        <h4>${b.serviceTitle || 'Session'}</h4>
                        <p>${b.date} at ${b.time}</p>
                        <p class="booking-meta">from Client ID: ${b.clientId.substring(0, 8)}</p>
                    </div>
                    <div class="booking-actions">
                        ${b.status === 'pending' ? `
                            <button class="btn btn-sm btn-primary confirm-booking" data-id="${b.id}">Confirm</button>
                            <button class="btn btn-sm btn-outline cancel-booking" data-id="${b.id}">Cancel</button>
                        ` : `
                            <span class="status status-${b.status}">${b.status}</span>
                        `}
                    </div>
                </div>
            `).join('');
            
            // Add status listeners
            document.querySelectorAll('.confirm-booking').forEach(btn => {
                btn.addEventListener('click', async () => {
                    await BookingService.updateStatus(btn.dataset.id, 'confirmed');
                    loadBookings(uid);
                });
            });
            document.querySelectorAll('.cancel-booking').forEach(btn => {
                btn.addEventListener('click', async () => {
                    if (confirm('Cancel this booking?')) {
                        await BookingService.updateStatus(btn.dataset.id, 'cancelled');
                        loadBookings(uid);
                    }
                });
            });
        }
    }

    async function loadServices(uid) {
        const services = await ServiceService.getPractitionerServices(uid);
        const listEl = document.getElementById('dashboard-services-list');
        
        if (services.length === 0) {
            listEl.innerHTML = '<p class="empty-state">No services added yet.</p>';
        } else {
            listEl.innerHTML = services.map(s => `
                <div class="dashboard-service-card">
                    <div class="service-info">
                        <h4>${s.title}</h4>
                        <p>$${s.price}</p>
                    </div>
                    <div class="service-actions">
                        <button class="btn-icon delete-service" data-id="${s.id}"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
            
            // Add delete listeners
            document.querySelectorAll('.delete-service').forEach(btn => {
                btn.addEventListener('click', async () => {
                    if (confirm('Delete this service?')) {
                        await ServiceService.deleteService(btn.dataset.id);
                        loadServices(uid);
                    }
                });
            });
        }
    }

    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Switch panes
            document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
            const targetPane = document.getElementById(`${tab.dataset.tab}-pane`);
            if (targetPane) targetPane.style.display = 'block';
        });
    });

    // Modal Logic
    const modal = document.getElementById('add-service-modal');
    const openModalBtn = document.getElementById('open-add-service');
    const closeModalBtn = document.getElementById('close-modal');

    if (openModalBtn) openModalBtn.addEventListener('click', () => modal.style.display = 'flex');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

    // Submit Service Logic
    const submitBtn = document.getElementById('submit-service');
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const title = document.getElementById('service-title').value;
            const price = document.getElementById('service-price').value;
            const description = document.getElementById('service-desc').value;

            if (!title || !price) return alert('Fill title and price');

            try {
                submitBtn.disabled = true;
                await ServiceService.addService({
                    practitionerId: currentUser.uid,
                    title,
                    price: parseFloat(price),
                    description
                });
                modal.style.display = 'none';
                loadServices(currentUser.uid);
            } catch (error) {
                alert('Failed to add service');
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    // Save Profile Logic (Existing)
    const saveBtn = document.getElementById('save-profile');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const bio = document.getElementById('practitioner-bio').value;
            try {
                saveBtn.disabled = true;
                saveBtn.textContent = 'Saving...';
                await UserService.updateProfile(currentUser.uid, { bio });
                alert('Profile updated successfully!');
            } catch (error) {
                alert('Update failed');
            } finally {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Save Changes';
            }
        });
    }
});
