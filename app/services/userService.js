import { mockUsers } from '../utils/mockData.js';

// In-memory state for the showcase
let users = [...mockUsers];
let currentUser = mockUsers[0]; // Default to first practitioner for showcase

export const UserService = {
    // Auth State
    onAuth(callback) {
        // Simulate immediate auth
        setTimeout(() => callback(currentUser), 100);
    },

    async getCurrentUser() {
        return currentUser;
    },

    async getUserById(uid) {
        return users.find(u => u.uid === uid) || null;
    },

    // Login/Register (Mocks)
    async login(email, password) {
        // Just return the first user for any login for the showcase
        currentUser = users[0];
        return currentUser;
    },

    async register(email, password, userData) {
        const newUser = {
            uid: 'u' + Date.now(),
            ...userData,
            email,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        currentUser = newUser;
        return newUser;
    },

    async logout() {
        currentUser = null;
    },

    // Profile Management
    async updateProfile(uid, data) {
        const index = users.findIndex(u => u.uid === uid);
        if (index !== -1) {
            users[index] = { ...users[index], ...data };
            if (currentUser && currentUser.uid === uid) {
                currentUser = users[index];
            }
        }
    }
};
