import { mockArticles } from '../utils/mockData.js';

export const ArticleService = {
    async getAllArticles() {
        return mockArticles;
    },

    async getArticleById(id) {
        return mockArticles.find(a => a.id === id) || null;
    }
};
