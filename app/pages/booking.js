import { Navbar } from '../components/navbar.js';
import { BookingService } from '../services/bookingService.js';
import { ServiceService } from '../services/serviceService.js';
import { UserService } from '../services/userService.js';

document.addEventListener('DOMContentLoaded', async () => {
    Navbar.render();

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('serviceId');
    const practitionerId = urlParams.get('practitionerId');

    let selectedService = null;
    let currentUser = null;

    // Load User
    UserService.onAuth(user => {
        currentUser = user;
        if (user) loadUserBookings(user.uid);
    });

    // Load Service Info if provided
    if (serviceId) {
        try {
            // Need a way to get a single service
            // For now, get all and filter (or I'll add getService to ServiceService)
            const services = await ServiceService.getAllServices();
            selectedService = services.find(s => s.id === serviceId);
            
            if (selectedService) {
                const infoEl = document.getElementById('selected-service-info');
                infoEl.innerHTML = `
                    <h4>${selectedService.title}</h4>
                    <p class="price">$${selectedService.price}</p>
                    <p class="service-desc">${selectedService.description}</p>
                `;
            }
        } catch (error) {
            console.error('Error loading service:', error);
        }
    }

    // Handle Booking Submission
    const confirmBtn = document.getElementById('confirm-booking');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
            if (!currentUser) return alert('Please login to book a session');
            if (!serviceId || !practitionerId) return alert('No service selected');

            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const message = document.getElementById('booking-message').value;

            if (!date || !time) return alert('Please select a date and time');

            try {
                confirmBtn.disabled = true;
                confirmBtn.textContent = 'Submitting...';

                await BookingService.createBooking({
                    serviceId,
                    practitionerId,
                    clientId: currentUser.uid,
                    date,
                    time,
                    message,
                    serviceTitle: selectedService ? selectedService.title : 'Service'
                });

                alert('Booking request sent successfully!');
                loadUserBookings(currentUser.uid);
            } catch (error) {
                alert('Booking failed: ' + error.message);
            } finally {
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Confirm Booking Request';
            }
        });
    }

    async function loadUserBookings(uid) {
        try {
            const bookings = await BookingService.getClientBookings(uid);
            const listEl = document.getElementById('user-bookings-list');
            
            if (bookings.length === 0) {
                listEl.innerHTML = '<p class="empty-state">No bookings found.</p>';
            } else {
                listEl.innerHTML = bookings.map(b => `
                    <div class="booking-item">
                        <div class="booking-info">
                            <h4>${b.serviceTitle || 'Service'}</h4>
                            <p>${b.date} at ${b.time}</p>
                        </div>
                        <span class="status status-${b.status}">${b.status}</span>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }
});
