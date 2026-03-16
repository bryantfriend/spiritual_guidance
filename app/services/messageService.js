import { mockConversations, mockMessages, mockUsers } from '../utils/mockData.js';

let conversations = [...mockConversations];
let messages = [...mockMessages];

export const MessageService = {
    async getConversations(uid) {
        return conversations
            .filter(c => c.participants.includes(uid))
            .map(c => {
                const otherUid = c.participants.find(p => p !== uid);
                const otherUser = mockUsers.find(u => u.uid === otherUid);
                return { ...c, otherUser };
            });
    },

    async getMessages(conversationId) {
        return messages.filter(m => m.conversationId === conversationId);
    },

    async sendMessage(conversationId, senderId, text) {
        const newMessage = {
            id: 'm' + Date.now(),
            conversationId,
            senderId,
            text,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);

        const convIndex = conversations.findIndex(c => c.id === conversationId);
        if (convIndex !== -1) {
            conversations[convIndex].lastMessage = text;
            conversations[convIndex].timestamp = newMessage.timestamp;
        }

        return newMessage;
    },

    async startConversation(participant1, participant2) {
        const existing = conversations.find(c => 
            c.participants.includes(participant1) && c.participants.includes(participant2)
        );
        if (existing) return existing.id;

        const newConv = {
            id: 'conv' + Date.now(),
            participants: [participant1, participant2],
            lastMessage: '',
            timestamp: new Date().toISOString()
        };
        conversations.push(newConv);
        return newConv.id;
    }
};
