export function getMessages() {
    return JSON.parse(localStorage.getItem('messages')) || [];
}

export function saveMessage(message) {
    const messages = getMessages();
    if (messages.find(m => m.message.toLowerCase() === message.message.toLowerCase())) {
        return false;
    }
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    return true;
}
