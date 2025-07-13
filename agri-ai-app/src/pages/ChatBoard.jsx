import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Reply, Users, Bot, Image, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import '../styles/ChatBoard.css'
const ChatBoard = () => {
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const messagesEndRef = useRef(null);

  const { user } = useAuth();
  const { messages, onlineUsers, sendMessage, likeMessage, replyToMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleReply = (messageId) => {
    if (replyContent.trim()) {
      replyToMessage(messageId, replyContent.trim());
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="chatboard min-h-screen py-8">
      <div className="container">
        <div className="grid-layout">
          {/* Online Users Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-content sticky-top">
              <h3 className="sidebar-title">
                <Users className="icon users-icon" />
                Online Users ({onlineUsers.length + 1})
              </h3>
              <div className="users-list">
                {/* Current User */}
                <div className="user-item current-user">
                  <div className="avatar-wrapper">
                    <div className="avatar online-bg">
                      <span className="avatar-initial">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="status-dot online-status"></div>
                  </div>
                  <div className="user-info">
                    <p className="user-name">{user?.name} (You)</p>
                    <p className="user-status online-text">Online</p>
                  </div>
                </div>

                {/* Other Users */}
                {onlineUsers.map((onlineUser) => (
                  <div key={onlineUser.id} className="user-item">
                    <div className="avatar-wrapper">
                      <div
                        className={`avatar ${
                          onlineUser.role === 'Expert'
                            ? 'expert-bg'
                            : onlineUser.role === 'Moderator'
                            ? 'moderator-bg'
                            : 'default-bg'
                        }`}
                      >
                        <span className="avatar-initial">{onlineUser.name.charAt(0)}</span>
                      </div>
                      <div className="status-dot online-status"></div>
                    </div>
                    <div className="user-info">
                      <p className="user-name">{onlineUser.name}</p>
                      <p
                        className={`user-role ${
                          onlineUser.role === 'Expert'
                            ? 'expert-text'
                            : onlineUser.role === 'Moderator'
                            ? 'moderator-text'
                            : 'default-text'
                        }`}
                      >
                        {onlineUser.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Guidelines */}
              <div className="guidelines">
                <h4 className="guidelines-title">Chat Guidelines</h4>
                <ul className="guidelines-list">
                  <li>• Be respectful to all members</li>
                  <li>• Share plant photos for better help</li>
                  <li>• Ask specific questions</li>
                  <li>• Help others when you can</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Chat Area */}
          <main className="chat-area">
            <div className="chat-container">
              {/* Chat Header */}
              <header className="chat-header">
                <h2 className="chat-title">Plant Care Community Chat</h2>
                <p className="chat-subtitle">Connect with experts and fellow plant enthusiasts</p>
              </header>

              {/* Messages Area */}
              <section className="messages-area">
                {Object.entries(messageGroups).map(([date, dateMessages]) => (
                  <div key={date} className="message-date-group">
                    {/* Date Separator */}
                    <div className="date-separator">{date}</div>

                    {/* Messages for this date */}
                    {dateMessages.map((message) => (
                      <div key={message.id} className="message-wrapper">
                        <div
                          className={`message-bubble-wrapper ${
                            message.userId === user?.id ? 'message-right' : 'message-left'
                          }`}
                        >
                          <div
                            className={`message-bubble ${
                              message.userId === user?.id
                                ? 'user-message'
                                : message.isBot
                                ? 'bot-message'
                                : 'other-message'
                            }`}
                          >
                            {message.userId !== user?.id && (
                              <div className="message-header">
                                {message.isBot ? (
                                  <Bot className="bot-icon" />
                                ) : (
                                  <div className="avatar small-avatar default-bg">
                                    <span className="avatar-initial">
                                      {message.userName.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className="message-username">{message.userName}</span>
                                <span className="message-time">{formatTime(message.timestamp)}</span>
                              </div>
                            )}

                            <p className="message-content">{message.content}</p>

                            {message.userId === user?.id && (
                              <div className="message-time message-time-right">
                                {formatTime(message.timestamp)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Message Actions */}
                        {message.userId !== user?.id && (
                          <div className="message-actions">
                            <button
                              onClick={() => likeMessage(message.id)}
                              className="action-btn like-btn"
                              aria-label="Like message"
                            >
                              <Heart className="icon-small" />
                              <span>{message.likes}</span>
                            </button>
                            <button
                              onClick={() => setReplyingTo(message.id)}
                              className="action-btn reply-btn"
                              aria-label="Reply to message"
                            >
                              <Reply className="icon-small" />
                              <span>Reply</span>
                            </button>
                          </div>
                        )}

                        {/* Replies */}
                        {message.replies && message.replies.length > 0 && (
                          <div className="replies-list">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="reply-item">
                                <div className="reply-header">
                                  <div className="avatar small-avatar default-bg">
                                    <span className="avatar-initial">{reply.userName.charAt(0)}</span>
                                  </div>
                                  <span className="reply-username">{reply.userName}</span>
                                  <span className="reply-time">{formatTime(reply.timestamp)}</span>
                                </div>
                                <p className="reply-content">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        {replyingTo === message.id && (
                          <div className="reply-input-wrapper">
                            <div className="reply-input-container">
                              <input
                                type="text"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write a reply..."
                                className="reply-input"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleReply(message.id);
                                  }
                                }}
                                aria-label="Write a reply"
                              />
                              <button
                                onClick={() => handleReply(message.id)}
                                className="btn btn-send-reply"
                                aria-label="Send reply"
                              >
                                <Send className="icon-send" />
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent('');
                                }}
                                className="btn btn-cancel-reply"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </section>

              {/* Message Input */}
              <footer className="message-input-area">
                <form onSubmit={handleSendMessage} className="send-message-form">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="message-input"
                      aria-label="Type your message"
                    />
                    <div className="input-icons">
                      <button type="button" className="icon-btn" aria-label="Attach file">
                        <Paperclip className="icon" />
                      </button>
                      <button type="button" className="icon-btn" aria-label="Add image">
                        <Image className="icon" />
                      </button>
                      <button type="button" className="icon-btn" aria-label="Add emoji">
                        <Smile className="icon" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="btn btn-send-message"
                    aria-label="Send message"
                  >
                    <Send className="icon-send" />
                    <span>Send</span>
                  </button>
                </form>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatBoard;
