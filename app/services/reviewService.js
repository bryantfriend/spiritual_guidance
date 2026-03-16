import { mockReviews } from '../utils/mockData.js';

let reviews = [...mockReviews];

export const ReviewService = {
    async getPractitionerReviews(practitionerId) {
        return reviews.filter(r => r.practitionerId === practitionerId);
    },

    async addReview(reviewData) {
        const newReview = {
            id: 'r' + Date.now(),
            ...reviewData,
            date: new Date().toISOString().split('T')[0]
        };
        reviews.push(newReview);
        return newReview;
    }
};
