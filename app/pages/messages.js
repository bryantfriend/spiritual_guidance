import { Navbar } from '../components/navbar.js';
import { UserService } from '../services/userService.js';
import { MessageService } from '../services/messageService.js';

let currentUser = null;
let activeConversationId = null;

document.addEventListener('DOMContentLoaded', async () => {
    Navbar.render();
    
    currentUser = await UserService.getCurrentUser();
    if (!currentUser) return;

    await loadConversations();

    const urlParams = new URLSearchParams(window.location.search);
    const convId = urlParams.get('convId');
    if (convId) {
        openChat(convId);
    }

    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

async function loadConversations() {
    const convList = document.getElementById('conversations-list');
    const conversations = await MessageService.getConversations(currentUser.uid);

    if (conversations.length === 0) {
        convList.innerHTML = '<p class="empty-state">No messages yet. Reach out to a practitioner to start a journey.</p>';
        return;
    }

    convList.innerHTML = conversations.map(c => `
        <div class="conversation-item" data-id="${c.id}">
            <img src="${c.otherUser.profilePhoto}" class="conv-avatar" alt="${c.otherUser.name}">
            <div class="conv-info">
                <h4>${c.otherUser.name}</h4>
                <p class="conv-last-msg">${c.lastMessage}</p>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', () => openChat(item.dataset.id));
    });

    if (window.lucide) window.lucide.createIcons();
}

async function openChat(convId) {
    activeConversationId = convId;
    const conversations = await MessageService.getConversations(currentUser.uid);
    const conv = conversations.find(c => c.id === convId);
    
    document.getElementById('messages-title').innerText = conv.otherUser.name;
    document.getElementById('conv-list-view').style.display = 'none';
    document.getElementById('chat-view').style.display = 'flex';
    
    loadMessages();
}

async function loadMessages() {
    const pane = document.getElementById('messages-pane');
    const messages = await MessageService.getMessages(activeConversationId);

    pane.innerHTML = messages.map(m => `
        <div class="message-bubble ${m.senderId === currentUser.uid ? 'message-sent' : 'message-received'}">
            ${m.text}
        </div>
    `).join('');

    pane.scrollTop = pane.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !activeConversationId) return;

    await MessageService.sendMessage(activeConversationId, currentUser.uid, text);
    input.value = '';
    loadMessages();
}
