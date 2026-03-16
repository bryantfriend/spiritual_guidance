import { mockBookings } from '../utils/mockData.js';

let bookings = [...mockBookings];

export const BookingService = {
    // Create a new booking request
    async createBooking(bookingData) {
        const newBooking = {
            id: 'b' + Date.now(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        bookings.push(newBooking);
        return newBooking.id;
    },

    // Get bookings for a practitioner
    async getPractitionerBookings(practitionerId) {
        return bookings
            .filter(b => b.practitionerId === practitionerId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Get bookings for a client
    async getClientBookings(clientId) {
        return bookings
            .filter(b => b.clientId === clientId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Update booking status
    async updateStatus(bookingId, status) {
        const index = bookings.findIndex(b => b.id === bookingId);
        if (index !== -1) {
            bookings[index].status = status;
        }
    }
};
