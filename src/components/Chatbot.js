import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// ⚠️ Update this to your deployed Next.js API URL for production
const CHAT_API_URL = "https://gummadii.com/api/chat";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); // { sender: 'user'|'bot'|'error', content: string }
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isLoading) return;

        const userMessage = { sender: 'user', content: trimmed };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // Send only the latest user message
            const response = await fetch(CHAT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: trimmed }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessages(prev => [...prev, { sender: 'bot', content: data.reply }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            // Show error as a chat bubble (filtered out before API calls)
            setMessages(prev => [
                ...prev,
                { sender: 'error', content: 'Something went wrong. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const retryLastMessage = async () => {
        if (isLoading) return;

        // Remove error bubbles, keep the original user message intact
        const cleanMessages = messages.filter(m => m.sender !== 'error');
        setMessages(cleanMessages);
        setIsLoading(true);

        try {
            // Resend the last user message
            const lastUserMsg = cleanMessages.filter(m => m.sender === 'user').pop();
            const response = await fetch(CHAT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: lastUserMsg?.content || '' }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessages(prev => [...prev, { sender: 'bot', content: data.reply }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [
                ...prev,
                { sender: 'error', content: 'Something went wrong. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    // Close icon
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.71a1 1 0 00-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 001.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.41z" />
                    </svg>
                ) : (
                    // Chat icon
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                        <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-left">
                            <div className="chatbot-header-avatar">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1.07A7 7 0 0113 21h-2a7 7 0 01-6.93-2H3a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm-3 13a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                                </svg>
                            </div>
                            <div className="chatbot-header-info">
                                <h4>TechTools AI</h4>
                                <span>Powered by Sarvam AI</span>
                            </div>
                        </div>
                        <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.length === 0 ? (
                            <div className="chatbot-welcome">
                                <div className="chatbot-welcome-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                                    </svg>
                                </div>
                                <h3>Hi there! 👋</h3>
                                <p>Ask me anything. I'm here to help!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                msg.sender === 'error' ? (
                                    <div key={idx} className="chatbot-msg error">
                                        <span>{msg.content}</span>
                                        <button
                                            className="chatbot-retry-btn"
                                            onClick={retryLastMessage}
                                            disabled={isLoading}
                                        >
                                            ↻ Retry
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        key={idx}
                                        className={`chatbot-msg ${msg.sender}`}
                                    >
                                        {msg.content}
                                    </div>
                                )
                            ))
                        )}

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="chatbot-typing">
                                <div className="chatbot-typing-dot" />
                                <div className="chatbot-typing-dot" />
                                <div className="chatbot-typing-dot" />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>


                    {/* Input */}
                    <div className="chatbot-input-area">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            disabled={isLoading}
                        />
                        <button
                            className="chatbot-send-btn"
                            onClick={sendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            aria-label="Send message"
                        >
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
