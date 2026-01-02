import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    DollarSign,
    Users,
    MessageSquare,
    LogOut,
    Plus,
    Search,
    Bell,
    TrendingUp,
    StickyNote
} from 'lucide-react';
import type {
    Project, Client, FinanceRecord, ChatRoom, User as UserType,
    FinancialSummary, ChatMessage, Payment, Note, ProjectDocument
} from './types';
import {
    MOCK_PROJECTS,
    MOCK_CLIENTS,
    MOCK_FINANCE_RECORDS,
    MOCK_CHAT_ROOMS,
    MOCK_USERS,
    MOCK_NOTES,
    MOCK_DOCUMENTS
} from './data/mockData';
import ProjectCard from './components/ProjectCard';
import SubmissionTimeline from './components/SubmissionTimeline';
import FinancialOverview from './components/FinancialOverview';
import Login from './components/Login';
import ClientManagement from './components/ClientManagement';
import FinanceManagement from './components/FinanceManagement';
import TeamChat from './components/TeamChat';
import Notes from './components/Notes';
import ProjectDetails from './components/ProjectDetails';

type ViewMode = 'dashboard' | 'projects' | 'submissions' | 'clients' | 'finances' | 'chat' | 'notes';

export default function App() {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [projects] = useState<Project[]>(MOCK_PROJECTS);
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>(MOCK_FINANCE_RECORDS);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>(MOCK_CHAT_ROOMS);
    const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
    const [documents] = useState<ProjectDocument[]>(MOCK_DOCUMENTS);
    const [allUsers] = useState<UserType[]>(MOCK_USERS);

    // UI State
    const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Check for saved user session
    useEffect(() => {
        const savedUser = localStorage.getItem('amsquare_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    // Handle login
    const handleLogin = (user: UserType) => {
        setCurrentUser(user);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('amsquare_user');
        setCurrentUser(null);
        setViewMode('dashboard');
        setSelectedProject(null);
    };

    // Navigation handler
    const handleNavigation = (mode: ViewMode) => {
        setViewMode(mode);
        setSelectedProject(null); // Clear selected project when changing main views
    };

    // Project handlers
    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setViewMode('projects'); // Ensure we are in projects view
    };

    // Client management handlers
    const handleAddClient = (clientData: Omit<Client, 'id' | 'createdDate' | 'totalSpent'>) => {
        const newClient: Client = {
            ...clientData,
            id: `c${clients.length + 1}`,
            createdDate: new Date().toISOString(),
            totalSpent: 0
        };
        setClients([...clients, newClient]);
    };

    const handleUpdateClient = (id: string, updates: Partial<Client>) => {
        setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const handleDeleteClient = (id: string) => {
        setClients(clients.filter(c => c.id !== id));
    };

    // Finance management handlers
    const handleAddPayment = (projectId: string, paymentData: Omit<Payment, 'id'>) => {
        const newPayment: Payment = {
            ...paymentData,
            id: `p${Date.now()}`
        };

        setFinanceRecords(financeRecords.map(record => {
            if (record.projectId === projectId) {
                const updatedPayments = [...record.payments, newPayment];
                const totalAmount = updatedPayments.reduce((sum, p) => sum + p.amount, 0);
                const paidAmount = updatedPayments.reduce((sum, p) => sum + p.paidAmount, 0);
                return {
                    ...record,
                    payments: updatedPayments,
                    totalAmount,
                    paidAmount,
                    balance: totalAmount - paidAmount
                };
            }
            return record;
        }));
    };

    const handleUpdatePayment = (projectId: string, paymentId: string, updates: Partial<Payment>) => {
        setFinanceRecords(financeRecords.map(record => {
            if (record.projectId === projectId) {
                const updatedPayments = record.payments.map(p =>
                    p.id === paymentId ? { ...p, ...updates } : p
                );
                const totalAmount = updatedPayments.reduce((sum, p) => sum + p.amount, 0);
                const paidAmount = updatedPayments.reduce((sum, p) => sum + p.paidAmount, 0);
                return {
                    ...record,
                    payments: updatedPayments,
                    totalAmount,
                    paidAmount,
                    balance: totalAmount - paidAmount
                };
            }
            return record;
        }));
    };

    // Chat handlers
    const handleSendMessage = (roomId: string, message: string) => {
        if (!currentUser) return;

        const newMessage: ChatMessage = {
            id: `m${Date.now()}`,
            userId: currentUser.id,
            username: currentUser.fullName,
            message,
            timestamp: new Date().toISOString()
        };

        setChatRooms(chatRooms.map(room =>
            room.id === roomId
                ? { ...room, messages: [...room.messages, newMessage] }
                : room
        ));
    };

    // Notes handlers
    const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
        if (!currentUser) return;

        const newNote: Note = {
            ...noteData,
            id: `n${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: currentUser.id
        };
        setNotes([newNote, ...notes]);
    };

    const handleUpdateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(n => n.id === id ? { ...n, ...updates } : n));
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    // Calculate financial summary
    const financialSummary: FinancialSummary = {
        totalProjects: projects.length,
        activeProjects: projects.filter(p =>
            ['concept', 'design-development', 'submission-prep', 'submitted'].includes(p.status)
        ).length,
        totalConsultantFees: projects.reduce((sum, project) =>
            sum + project.submissions.reduce((subSum, sub) => subSum + sub.consultantFee, 0), 0
        ),
        pendingSubmissions: projects.reduce((sum, project) =>
            sum + project.submissions.filter(s => s.status === 'pending').length, 0
        ),
        approvedSubmissions: projects.reduce((sum, project) =>
            sum + project.submissions.filter(s => s.status === 'approved').length, 0
        )
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show login if not authenticated
    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 glass border-r flex flex-col z-50"
                style={{ borderColor: 'var(--border)' }}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
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
                    <div>
                        <span className="font-display font-bold text-xl tracking-tight block"
                            style={{ color: 'var(--text-primary)' }}>
                            AMsquare
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Interior Design
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={viewMode === 'dashboard'}
                        onClick={() => handleNavigation('dashboard')}
                    />
                    <NavItem
                        icon={<FolderKanban size={20} />}
                        label="Projects"
                        active={viewMode === 'projects'}
                        onClick={() => handleNavigation('projects')}
                        badge={financialSummary.activeProjects}
                    />
                    <NavItem
                        icon={<Users size={20} />}
                        label="Clients"
                        active={viewMode === 'clients'}
                        onClick={() => handleNavigation('clients')}
                        badge={clients.length}
                    />
                    <NavItem
                        icon={<FileText size={20} />}
                        label="Submissions"
                        active={viewMode === 'submissions'}
                        onClick={() => handleNavigation('submissions')}
                        badge={financialSummary.pendingSubmissions}
                    />
                    <NavItem
                        icon={<DollarSign size={20} />}
                        label="Finances"
                        active={viewMode === 'finances'}
                        onClick={() => handleNavigation('finances')}
                    />
                    <NavItem
                        icon={<StickyNote size={20} />}
                        label="Notes"
                        active={viewMode === 'notes'}
                        onClick={() => handleNavigation('notes')}
                        badge={notes.length}
                    />
                    <NavItem
                        icon={<MessageSquare size={20} />}
                        label="Team Chat"
                        active={viewMode === 'chat'}
                        onClick={() => handleNavigation('chat')}
                    />
                </nav>

                <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="p-4 rounded-xl flex items-center gap-3 mb-3"
                        style={{ background: 'var(--bg-tertiary)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white'
                            }}>
                            {currentUser.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                {currentUser.fullName}
                            </p>
                            <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                                {currentUser.role.replace('-', ' ')}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all"
                        style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-secondary)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-tertiary)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        }}>
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 grid-bg relative">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={18}
                            style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search projects, clients, locations..."
                            className="pl-12 pr-6 py-3 border rounded-2xl w-96 transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.background = 'var(--bg-tertiary)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--border)';
                                e.target.style.background = 'var(--bg-secondary)';
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 border rounded-xl transition-colors relative"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: 'var(--border)'
                            }}>
                            <Bell size={20} style={{ color: 'var(--text-muted)' }} />
                            {financialSummary.pendingSubmissions > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full border-2"
                                    style={{
                                        background: 'var(--accent-primary)',
                                        borderColor: 'var(--bg-primary)'
                                    }}></span>
                            )}
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white',
                                boxShadow: '0 4px 20px var(--accent-glow)'
                            }}>
                            <Plus size={20} />
                            <span>New Project</span>
                        </button>
                    </div>
                </header>

                {/* Dashboard View */}
                {viewMode === 'dashboard' && (
                    <>
                        {/* Hero Section */}
                        <section className="mb-12 animate-fade-in">
                            <h1 className="text-4xl font-display font-bold mb-4"
                                style={{ color: 'var(--text-primary)' }}>
                                Good morning, {currentUser.fullName.split(' ')[0]}!
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                You have <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                                    {financialSummary.activeProjects} active projects
                                </span> and{' '}
                                <span className="font-semibold" style={{ color: '#f59e0b' }}>
                                    {financialSummary.pendingSubmissions} pending submissions
                                </span> requiring attention.
                            </p>
                        </section>

                        {/* Recent Projects */}
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-display font-bold"
                                    style={{ color: 'var(--text-primary)' }}>
                                    Active Projects
                                </h2>
                                <button
                                    onClick={() => handleNavigation('projects')}
                                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                                    style={{ color: 'var(--text-muted)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                                    View All <TrendingUp size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects.slice(0, 6).map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onClick={() => handleProjectClick(project)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Financial Overview */}
                        <FinancialOverview projects={projects} />
                    </>
                )}

                {/* Projects View */}
                {viewMode === 'projects' && (
                    <>
                        {selectedProject ? (
                            <ProjectDetails
                                project={selectedProject}
                                documents={documents.filter(d => d.projectId === selectedProject.id)}
                                financeRecords={financeRecords}
                                users={allUsers}
                                onBack={() => setSelectedProject(null)}
                                onAddPayment={handleAddPayment}
                                onUpdatePayment={handleUpdatePayment}
                            />
                        ) : (
                            <>
                                <section className="mb-8 animate-fade-in">
                                    <h1 className="text-4xl font-display font-bold mb-4"
                                        style={{ color: 'var(--text-primary)' }}>
                                        All Projects
                                    </h1>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Manage your interior design projects and track their progress
                                    </p>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onClick={() => handleProjectClick(project)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* Clients View */}
                {viewMode === 'clients' && (
                    <ClientManagement
                        clients={clients}
                        onAddClient={handleAddClient}
                        onUpdateClient={handleUpdateClient}
                        onDeleteClient={handleDeleteClient}
                    />
                )}

                {/* Submissions View */}
                {viewMode === 'submissions' && (
                    <>
                        <section className="mb-8 animate-fade-in">
                            <h1 className="text-4xl font-display font-bold mb-4"
                                style={{ color: 'var(--text-primary)' }}>
                                Submission Tracking
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Monitor all submissions to local authorities
                            </p>
                        </section>

                        <SubmissionTimeline projects={projects} />
                    </>
                )}

                {/* Finances View */}
                {viewMode === 'finances' && (
                    <FinanceManagement
                        financeRecords={financeRecords}
                        onAddPayment={handleAddPayment}
                        onUpdatePayment={handleUpdatePayment}
                    />
                )}

                {/* Notes View */}
                {viewMode === 'notes' && (
                    <Notes
                        notes={notes}
                        projects={projects}
                        onAddNote={handleAddNote}
                        onUpdateNote={handleUpdateNote}
                        onDeleteNote={handleDeleteNote}
                    />
                )}

                {/* Chat View */}
                {viewMode === 'chat' && (
                    <>
                        <section className="mb-6 animate-fade-in">
                            <h1 className="text-4xl font-display font-bold mb-2"
                                style={{ color: 'var(--text-primary)' }}>
                                Team Chat
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Collaborate with your team in real-time
                            </p>
                        </section>

                        <TeamChat
                            currentUser={currentUser}
                            chatRooms={chatRooms}
                            allUsers={allUsers}
                            onSendMessage={handleSendMessage}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
    badge?: number;
}

function NavItem({ icon, label, active = false, onClick, badge }: NavItemProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative"
            style={{
                background: active ? 'var(--accent-light)' : 'transparent',
                color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: active ? '1px solid var(--border-accent)' : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
                if (!active) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                }
            }}>
            {icon}
            <span className="font-medium">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="ml-auto text-white text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: 'var(--accent-primary)' }}>
                    {badge}
                </span>
            )}
        </button>
    );
}

