import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import "../styles/ChatContext.css"
const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Load chat messages from localStorage
    const savedMessages = localStorage.getItem('plantdoc_chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Simulate online users
    setOnlineUsers([
      { id: '1', name: 'Dr. Green', role: 'Expert', avatar: null },
      { id: '2', name: 'Plant Lover', role: 'Member', avatar: null },
      { id: '3', name: 'Garden Master', role: 'Moderator', avatar: null }
    ]);
  }, []);

  const sendMessage = (content, type = 'text') => {
    if (!user) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      type,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('plantdoc_chat_messages', JSON.stringify(updatedMessages));

    // Simulate bot response for certain keywords
    if (content.toLowerCase().includes('disease') || content.toLowerCase().includes('help')) {
      setTimeout(() => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: "I'd be happy to help! You can upload an image of your plant for AI analysis, or describe the symptoms you're seeing.",
          type: 'text',
          userId: 'bot',
          userName: 'PlantDoc AI Assistant',
          timestamp: new Date().toISOString(),
          likes: 0,
          replies: [],
          isBot: true
        };

        const updatedWithBot = [...updatedMessages, botResponse];
        setMessages(updatedWithBot);
        localStorage.setItem('plantdoc_chat_messages', JSON.stringify(updatedWithBot));
      }, 1000);
    }
  };

  const likeMessage = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('plantdoc_chat_messages', JSON.stringify(updatedMessages));
  };

  const replyToMessage = (messageId, replyContent) => {
    if (!user) return;

    const reply = {
      id: Date.now().toString(),
      content: replyContent,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, replies: [...msg.replies, reply] }
        : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('plantdoc_chat_messages', JSON.stringify(updatedMessages));
  };

  const value = {
    messages,
    onlineUsers,
    sendMessage,
    likeMessage,
    replyToMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};