export const ServiceCard = {
    render(service, options = {}) {
        const { showAuthor = false, showBookBtn = true, authorName = '' } = options;
        
        return `
            <div class="service-card" data-id="${service.id}">
                ${service.image ? `<img src="${service.image}" alt="${service.title}">` : `
                    <div class="service-image-placeholder" style="height: 160px; background: linear-gradient(135deg, var(--surface), var(--background)); display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="sparkles" style="color: var(--primary);"></i>
                    </div>
                `}
                <div class="service-details">
                    <span class="category-tag">${service.category || 'Spiritual'}</span>
                    <h4>${service.title}</h4>
                    <p class="service-desc" style="color: var(--text-muted); font-size: 0.9rem; margin: 8px 0;">${service.description?.substring(0, 80) || 'No description provided.'}...</p>
                    
                    ${showAuthor ? `<p class="service-author">by ${authorName}</p>` : ''}
                    
                    <div class="service-footer">
                        <span class="price">$${service.price}</span>
                        <div style="display: flex; gap: 8px;">
                            ${showBookBtn ? `<a href="booking.html?serviceId=${service.id}&practitionerId=${service.practitionerId}" class="btn btn-primary btn-sm">Book</a>` : ''}
                            <a href="practitioner.html?id=${service.practitionerId}" class="btn btn-glass btn-sm"><i data-lucide="user"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
