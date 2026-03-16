import { ArticleService } from '../services/articleService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        window.location.href = 'index.html';
        return;
    }

    const article = await ArticleService.getArticleById(articleId);
    if (!article) {
        alert('Article not found');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('article-img').src = article.image;
    document.getElementById('article-title').innerText = article.title;
    document.getElementById('article-author').innerText = `By ${article.author}`;
    document.getElementById('article-date').innerText = article.date;
    document.getElementById('article-body').innerText = article.content;

    if (window.lucide) window.lucide.createIcons();
});
