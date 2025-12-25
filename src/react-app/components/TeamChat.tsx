import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Circle, Search, Smile, Paperclip } from 'lucide-react';
import type { ChatMessage, ChatRoom, User } from '../types';

interface TeamChatProps {
    currentUser: User;
    chatRooms: ChatRoom[];
    allUsers: User[];
    onSendMessage: (roomId: string, message: string) => void;
}

const TeamChat: React.FC<TeamChatProps> = ({
    currentUser,
    chatRooms,
    allUsers,
    onSendMessage
}) => {
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(
        chatRooms.length > 0 ? chatRooms[0] : null
    );
    const [messageInput, setMessageInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedRoom?.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim() && selectedRoom) {
            onSendMessage(selectedRoom.id, messageInput.trim());
            setMessageInput('');
        }
    };

    const getUserById = (userId: string) => {
        return allUsers.find(u => u.id === userId);
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const filteredRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-4">
            {/* Sidebar - Chat Rooms */}
            <div className="w-80 glass rounded-xl flex flex-col">
                {/* Search */}
                <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search rooms..."
                            className="w-full pl-10 pr-3 py-2 rounded-lg border outline-none text-sm"
                            style={{
                                background: 'var(--bg-tertiary)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>
                </div>

                {/* Room List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredRooms.map(room => {
                        const lastMessage = room.messages[room.messages.length - 1];
                        const isActive = selectedRoom?.id === room.id;

                        return (
                            <button
                                key={room.id}
                                onClick={() => setSelectedRoom(room)}
                                className="w-full p-4 text-left transition-all border-b"
                                style={{
                                    background: isActive ? 'var(--accent-light)' : 'transparent',
                                    borderColor: 'var(--border)',
                                    borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent'
                                }}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{
                                            background: isActive
                                                ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                                : 'var(--bg-tertiary)'
                                        }}>
                                        <Users className="w-5 h-5"
                                            style={{ color: isActive ? 'white' : 'var(--text-muted)' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium truncate"
                                            style={{ color: 'var(--text-primary)' }}>
                                            {room.name}
                                        </h4>
                                        {lastMessage && (
                                            <p className="text-sm truncate"
                                                style={{ color: 'var(--text-muted)' }}>
                                                {lastMessage.username}: {lastMessage.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {lastMessage && (
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {formatTime(lastMessage.timestamp)}
                                    </p>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Online Users */}
                <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                        ONLINE NOW
                    </p>
                    <div className="space-y-2">
                        {allUsers.filter(u => u.isOnline).map(user => (
                            <div key={user.id} className="flex items-center gap-2">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                            color: 'white'
                                        }}>
                                        {user.fullName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-green-500"
                                        style={{ color: '#10b981' }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                        {user.fullName}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 glass rounded-xl flex flex-col">
                {selectedRoom ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center justify-between"
                            style={{ borderColor: 'var(--border)' }}>
                            <div>
                                <h3 className="text-xl font-semibold font-display"
                                    style={{ color: 'var(--text-primary)' }}>
                                    {selectedRoom.name}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    {selectedRoom.participants.length} participants
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {selectedRoom.participants.slice(0, 5).map(userId => {
                                    const user = getUserById(userId);
                                    if (!user) return null;
                                    return (
                                        <div key={userId}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                                color: 'white'
                                            }}
                                            title={user.fullName}>
                                            {user.fullName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {selectedRoom.messages.map((message, index) => {
                                const isCurrentUser = message.userId === currentUser.id;
                                const user = getUserById(message.userId);
                                const showAvatar = index === 0 ||
                                    selectedRoom.messages[index - 1].userId !== message.userId;

                                return (
                                    <div key={message.id}
                                        className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                                        {showAvatar ? (
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                                                style={{
                                                    background: isCurrentUser
                                                        ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                                        : 'var(--bg-tertiary)',
                                                    color: isCurrentUser ? 'white' : 'var(--text-secondary)'
                                                }}>
                                                {user?.fullName.split(' ').map(n => n[0]).join('') || '?'}
                                            </div>
                                        ) : (
                                            <div className="w-8"></div>
                                        )}

                                        <div className={`flex-1 max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                                            {showAvatar && (
                                                <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                                                    <span className="text-sm font-medium"
                                                        style={{ color: 'var(--text-primary)' }}>
                                                        {message.username}
                                                    </span>
                                                    <span className="text-xs"
                                                        style={{ color: 'var(--text-muted)' }}>
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="px-4 py-2 rounded-lg"
                                                style={{
                                                    background: isCurrentUser
                                                        ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                                        : 'var(--bg-tertiary)',
                                                    color: isCurrentUser ? 'white' : 'var(--text-primary)',
                                                    borderRadius: isCurrentUser
                                                        ? '12px 12px 4px 12px'
                                                        : '12px 12px 12px 4px'
                                                }}>
                                                <p className="text-sm break-words">{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                                <div className="flex-1">
                                    <textarea
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        placeholder="Type your message..."
                                        rows={1}
                                        className="w-full px-4 py-3 rounded-lg border outline-none resize-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)',
                                            minHeight: '44px',
                                            maxHeight: '120px'
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!messageInput.trim()}
                                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-all"
                                    style={{
                                        background: messageInput.trim()
                                            ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                            : 'var(--bg-tertiary)',
                                        color: messageInput.trim() ? 'white' : 'var(--text-muted)',
                                        cursor: messageInput.trim() ? 'pointer' : 'not-allowed'
                                    }}>
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <Users className="w-16 h-16 mx-auto mb-4"
                                style={{ color: 'var(--text-muted)' }} />
                            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                Select a chat room to start messaging
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamChat;
