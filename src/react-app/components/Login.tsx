import React, { useState } from 'react';
import { User, LogIn, Lock } from 'lucide-react';
import type { User as UserType } from '../types';

interface LoginProps {
    onLogin: (user: UserType) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Demo users for the team
    const demoUsers: UserType[] = [
        {
            id: '1',
            username: 'admin',
            password: 'admin123',
            fullName: 'Admin User',
            email: 'admin@amsquareinteriors.com',
            role: 'admin',
            isOnline: false
        },
        {
            id: '2',
            username: 'designer',
            password: 'design123',
            fullName: 'Sarah Designer',
            email: 'sarah@amsquareinteriors.com',
            role: 'designer',
            isOnline: false
        },
        {
            id: '3',
            username: 'manager',
            password: 'manager123',
            fullName: 'John Manager',
            email: 'john@amsquareinteriors.com',
            role: 'project-manager',
            isOnline: false
        },
        {
            id: '4',
            username: 'finance',
            password: 'finance123',
            fullName: 'Emma Finance',
            email: 'emma@amsquareinteriors.com',
            role: 'finance',
            isOnline: false
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate authentication delay
        setTimeout(() => {
            const user = demoUsers.find(
                u => u.username === username && u.password === password
            );

            if (user) {
                const loggedInUser = { ...user, isOnline: true };
                localStorage.setItem('amsquare_user', JSON.stringify(loggedInUser));
                onLogin(loggedInUser);
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'
            }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-bg opacity-30"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl mb-4 overflow-hidden"
                        style={{
                            background: 'white',
                            boxShadow: '0 10px 40px var(--accent-glow)'
                        }}>
                        <img
                            src="/AMSQUARE INTERIORS_Logo.jpg"
                            alt="AMsquare Interiors"
                            className="w-full h-full object-contain p-2"
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 font-display"
                        style={{ color: 'var(--text-primary)' }}>
                        AMsquare Interiors
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Project Tracker
                    </p>
                </div>

                {/* Login Form */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}>
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border transition-all outline-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                    placeholder="Enter your username"
                                    required
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                    style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border transition-all outline-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                    placeholder="Enter your password"
                                    required
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg text-sm"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                            style={{
                                background: isLoading
                                    ? 'var(--bg-tertiary)'
                                    : 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white',
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px var(--accent-glow)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <LogIn className="w-5 h-5" />
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                            Demo Credentials:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {demoUsers.map(user => (
                                <div key={user.id} className="p-2 rounded"
                                    style={{ background: 'var(--bg-tertiary)' }}>
                                    <div style={{ color: 'var(--text-secondary)' }}>
                                        {user.username} / {user.password}
                                    </div>
                                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                        {user.role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                    © 2024 AMsquare Interiors. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
