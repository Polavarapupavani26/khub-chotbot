const chatBox = document.getElementById('chat-box');
const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');
const newChatButton = document.getElementById('new-chat-btn');
const chatList = document.getElementById('chat-list');

let currentChatId = null;

function appendMessage(role, text) {
    const message = document.createElement('div');
    message.classList.add('message', role);
    message.innerHTML = `<span>${text}</span>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchChatHistorySummary() {
    const res = await fetch('/get_chat_history_summary');
    const history = await res.json();

    chatList.innerHTML = '';
    history.forEach(chat => {
        const item = document.createElement('div');
        item.classList.add('chat-item');
        item.innerHTML = `
            <span onclick="loadChatSession('${chat.chat_id}')">${chat.title}</span>
            <button onclick="deleteChatSession('${chat.chat_id}')">🗑️</button>
        `;
        chatList.appendChild(item);
    });
}

async function loadChatSession(chatId) {
    const res = await fetch(`/get_chat_session/${chatId}`);
    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    chatBox.innerHTML = '';
    currentChatId = chatId;

    data.forEach(msg => {
        appendMessage(msg.role, msg.content);
    });
}

async function deleteChatSession(chatId) {
    if (!confirm("Are you sure you want to delete this chat?")) return;

    const res = await fetch(`/delete_chat_session/${chatId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    alert(data.message || data.error);
    if (chatId === currentChatId) {
        chatBox.innerHTML = '';
        currentChatId = null;
    }
    fetchChatHistorySummary();
}

async function startNewChat() {
    await fetch('/new_chat', { method: 'POST' });
    chatBox.innerHTML = '';
    currentChatId = null;
}

async function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage('user', text);
    inputField.value = '';

    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    if (data.response) {
        currentChatId = data.chat_id;
        appendMessage('bot', data.response);
        fetchChatHistorySummary();
    } else {
        appendMessage('bot', 'Something went wrong!');
    }
}

sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});
newChatButton.addEventListener('click', startNewChat);

window.onload = () => {
    fetchChatHistorySummary();
};
