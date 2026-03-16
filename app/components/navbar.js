export const Navbar = {
    render() {
        const path = window.location.pathname;
        const pages = [
            { name: 'Home', icon: 'home', link: 'index.html' },
            { name: 'Explore', icon: 'search', link: 'explore.html' },
            { name: 'Bookings', icon: 'calendar', link: 'booking.html' },
            { name: 'Messages', icon: 'message-square', link: 'messages.html' },
            { name: 'Profile', icon: 'user', link: 'profile.html' }
        ];

        const navHTML = `
            <nav class="bottom-nav">
                ${pages.map(page => `
                    <a href="${page.link}" class="nav-item ${path.includes(page.link) || (path === '/' && page.link === 'index.html') ? 'active' : ''}">
                        <div class="nav-icon-wrapper">
                            <i data-lucide="${page.icon}"></i>
                        </div>
                        <span>${page.name}</span>
                    </a>
                `).join('')}
            </nav>
        `;

        // Inject styles if not present (or keep in main.css)
        // For true modularity, we could inject here, but let's stick to main.css for now.
        
        const existingNav = document.querySelector('.bottom-nav');
        if (existingNav) existingNav.remove();
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
};
