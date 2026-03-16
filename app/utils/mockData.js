export const mockUsers = [
    {
        uid: 'p1',
        name: 'Maya Roberts',
        bio: 'Tarot & Intuitive Healer with a passion for uncovering hidden paths and guiding light.',
        profilePhoto: 'app/assets/images/practitioner_maya_1773644999506.png',
        role: 'practitioner',
        specialty: 'Tarot & Intuitive Healer',
        rating: 4.9,
        reviews: 120
    },
    {
        uid: 'p2',
        name: 'David Chen',
        bio: 'Energy Healer specialized in ancient zen techniques and modern energetic alignment.',
        profilePhoto: 'app/assets/images/practitioner_david_1773645020295.png',
        role: 'practitioner',
        specialty: 'Energy Healer',
        rating: 4.9,
        reviews: 120
    },
    {
        uid: 'p3',
        name: 'Sarah Williams',
        bio: 'Astrology expert and life coach helping you navigate the stars and your destiny.',
        profilePhoto: 'app/assets/images/practitioner_sarah_1773645042724.png',
        role: 'practitioner',
        specialty: 'Astrology & Coach',
        rating: 5.0,
        reviews: 530
    },
    {
        uid: 'c1',
        name: 'Serafina',
        profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Serafina',
        role: 'client'
    }
];

export const mockServices = [
    {
        id: 's1',
        practitionerId: 'p1',
        title: 'Tarot Reading',
        description: 'Discover what the cards have to say about your journey.',
        price: 45,
        category: 'Reading',
        image: 'https://images.unsplash.com/photo-1594910411244-998e3bccc87c?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 's2',
        practitionerId: 'p2',
        title: 'Energy Healing',
        description: 'Rebalance your aura and find inner peace.',
        price: 60,
        category: 'Healing',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400'
    }
];

export const mockFeatured = {
    popularServices: [
        { title: 'Tarot Reading', image: 'https://images.unsplash.com/photo-1611073238612-45e056976211?auto=format&fit=crop&q=80&w=400' },
        { title: 'Crystal Healing', image: 'https://images.unsplash.com/photo-1588613398717-d278453cc14b?auto=format&fit=crop&q=80&w=400' }
    ],
    latestArticles: [
        { id: 'a1', title: 'Moon Cycle Guide', image: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?auto=format&fit=crop&q=80&w=400' },
        { id: 'a2', title: 'Spirit Animals', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400' }
    ]
};

export const mockConversations = [
    {
        id: 'conv1',
        participants: ['c1', 'p1'],
        lastMessage: 'Looking forward to our session!',
        timestamp: new Date().toISOString()
    }
];

export const mockMessages = [
    { id: 'm1', conversationId: 'conv1', senderId: 'c1', text: 'Hi Maya, I have a question about the tarot reading.', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'm2', conversationId: 'conv1', senderId: 'p1', text: 'Hello! I am happy to help. What is on your mind?', timestamp: new Date(Date.now() - 3500000).toISOString() },
    { id: 'm3', conversationId: 'conv1', senderId: 'c1', text: 'Looking forward to our session!', timestamp: new Date().toISOString() }
];

export const mockReviews = [
    { id: 'r1', practitionerId: 'p1', clientId: 'c1', clientName: 'Serafina', rating: 5, comment: 'Maya is incredible. Her insights were spot on and really helped me find clarity.', date: '2026-03-10' },
    { id: 'r2', practitionerId: 'p1', clientId: 'c2', clientName: 'Luna', rating: 4, comment: 'Very peaceful session. Highly recommend.', date: '2026-03-05' }
];

export const mockArticles = [
    {
        id: 'a1',
        title: 'The Magic of Moon Cycles',
        content: 'The moon has long been a source of mystery and power. Understanding its phases can help you align your energy with the natural rhythms of the universe...',
        author: 'Sarah Williams',
        date: '2026-03-15',
        image: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?auto=format&fit=crop&q=80&w=800'
    }
];

export const mockBookings = [];
