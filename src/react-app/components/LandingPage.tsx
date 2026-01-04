import React from 'react';
import {
    FolderKanban,
    FileText,
    DollarSign,
    Users,
    MessageSquare,
    TrendingUp,
    Clock,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                            style={{
                                background: 'white',
                                boxShadow: '0 4px 20px var(--accent-glow)'
                            }}>
                            <img
                                src="/AMSQUARE INTERIORS_Logo.jpg"
                                alt="AMsquare Interiors"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight"
                            style={{ color: 'var(--text-primary)' }}>
                            AMsquare
                        </span>
                    </div>
                    <button
                        onClick={onGetStarted}
                        className="px-6 py-2 rounded-xl font-medium transition-all shadow-lg"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                            color: 'white',
                            boxShadow: '0 4px 20px var(--accent-glow)'
                        }}>
                        Get Started
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                            style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                            <Sparkles size={16} />
                            <span className="text-sm font-medium">Interior Design Project Management</span>
                        </div>
                        <h1 className="text-6xl font-display font-bold mb-6 leading-tight"
                            style={{ color: 'var(--text-primary)' }}>
                            Where Vision Meets
                            <span className="block bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                                Precision
                            </span>
                        </h1>
                        <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
                            Streamline your interior design projects with powerful tools for project tracking,
                            client management, financial oversight, and team collaboration—all in one place.
                        </p>
                        <button
                            onClick={onGetStarted}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all shadow-lg active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white',
                                boxShadow: '0 8px 30px var(--accent-glow)'
                            }}>
                            Start Your Journey
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Hero Image/Mockup */}
                    <div className="mt-20 relative">
                        <div className="glass rounded-3xl p-4 md:p-8 shadow-2xl border"
                            style={{
                                borderColor: 'var(--border)',
                                background: 'var(--bg-secondary)'
                            }}>
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/Screenshot Desktop.png"
                                    alt="AMsquare Project Tracker Dashboard"
                                    className="w-full h-auto"
                                    style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                            style={{ background: 'var(--accent-primary)' }} />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                            style={{ background: 'var(--accent-secondary)' }} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4"
                            style={{ color: 'var(--text-primary)' }}>
                            Everything You Need
                        </h2>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            Powerful features designed for interior design professionals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FolderKanban size={32} />}
                            title="Project Management"
                            description="Track all your interior design projects from concept to completion with intuitive project cards and status tracking."
                        />
                        <FeatureCard
                            icon={<Users size={32} />}
                            title="Client Management"
                            description="Keep all client information organized in one place with contact details, project history, and communication logs."
                        />
                        <FeatureCard
                            icon={<FileText size={32} />}
                            title="Submission Tracking"
                            description="Monitor submissions to local authorities with detailed timelines and status updates for each submission stage."
                        />
                        <FeatureCard
                            icon={<DollarSign size={32} />}
                            title="Financial Overview"
                            description="Manage project finances, track payments, monitor consultant fees, and maintain complete financial transparency."
                        />
                        <FeatureCard
                            icon={<MessageSquare size={32} />}
                            title="Team Collaboration"
                            description="Built-in chat system for seamless team communication and real-time collaboration on projects."
                        />
                        <FeatureCard
                            icon={<Clock size={32} />}
                            title="Real-time Updates"
                            description="Get instant notifications and updates on project progress, submissions, and team activities."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            icon={<TrendingUp size={40} />}
                            value="100%"
                            label="Project Visibility"
                        />
                        <StatCard
                            icon={<CheckCircle size={40} />}
                            value="Real-time"
                            label="Collaboration"
                        />
                        <StatCard
                            icon={<Shield size={40} />}
                            value="Secure"
                            label="Data Protection"
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-display font-bold mb-6"
                                style={{ color: 'var(--text-primary)' }}>
                                Built for Interior Design Teams
                            </h2>
                            <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                                AMsquare Project Tracker is specifically designed to meet the unique needs of
                                interior design firms, from boutique studios to large agencies.
                            </p>
                            <div className="space-y-4">
                                <BenefitItem text="Track multiple projects simultaneously" />
                                <BenefitItem text="Manage client relationships effectively" />
                                <BenefitItem text="Monitor financial performance in real-time" />
                                <BenefitItem text="Collaborate seamlessly with your team" />
                                <BenefitItem text="Stay organized with notes and documents" />
                            </div>
                        </div>
                        <div className="glass rounded-3xl p-12 border text-center"
                            style={{
                                borderColor: 'var(--border)',
                                background: 'linear-gradient(135deg, var(--accent-light) 0%, transparent 100%)'
                            }}>
                            <Zap size={80} style={{ color: 'var(--accent-primary)' }} className="mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                Boost Productivity
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Streamline workflows and focus on what matters most—creating beautiful spaces.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-display font-bold mb-6"
                        style={{ color: 'var(--text-primary)' }}>
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
                        Join AMsquare Interiors and experience a new way to manage interior design projects.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all shadow-lg active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                            color: 'white',
                            boxShadow: '0 8px 30px var(--accent-glow)'
                        }}>
                        Get Started Now
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 px-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow overflow-hidden"
                            style={{ background: 'white' }}>
                            <img
                                src="/AMSQUARE INTERIORS_Logo.jpg"
                                alt="AMsquare Interiors"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="font-display font-bold text-lg"
                            style={{ color: 'var(--text-primary)' }}>
                            AMsquare Interiors
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Interior Design Project Management & Team Collaboration
                    </p>
                    <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} AMsquare Interiors. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="glass rounded-2xl p-8 border transition-all hover:shadow-xl"
            style={{ borderColor: 'var(--border)' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                    color: 'white'
                }}>
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {title}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
                {description}
            </p>
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
    return (
        <div className="glass rounded-2xl p-8 border text-center"
            style={{ borderColor: 'var(--border)' }}>
            <div style={{ color: 'var(--accent-primary)' }} className="mx-auto mb-4">
                {icon}
            </div>
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {value}
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
                {label}
            </div>
        </div>
    );
}

interface BenefitItemProps {
    text: string;
}

function BenefitItem({ text }: BenefitItemProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-primary)' }}>
                <CheckCircle size={16} color="white" />
            </div>
            <span style={{ color: 'var(--text-primary)' }}>{text}</span>
        </div>
    );
}
