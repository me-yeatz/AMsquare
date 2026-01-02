import { useState } from 'react';
import {
    ChevronLeft, MapPin, Building2,
    FileText, FileSpreadsheet, FileImage, File, Download,
    DollarSign, Clock, CheckCircle2,
    MoreVertical
} from 'lucide-react';
import type { Project, ProjectDocument, FinanceRecord, User, Payment } from '../types';
import FinanceManagement from './FinanceManagement';

interface ProjectDetailsProps {
    project: Project;
    documents: ProjectDocument[];
    financeRecords: FinanceRecord[];
    users: User[];
    onBack: () => void;
    onAddPayment: (projectId: string, payment: Omit<Payment, 'id'>) => void;
    onUpdatePayment: (projectId: string, paymentId: string, updates: Partial<Payment>) => void;
}

type Tab = 'details' | 'documents' | 'finances';

export default function ProjectDetails({
    project,
    documents,
    financeRecords,
    users,
    onBack,
    onAddPayment,
    onUpdatePayment
}: ProjectDetailsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('details');

    // Filter finance records for this project
    const projectFinance = financeRecords.filter(r => r.projectId === project.id);

    // Get document icon based on type
    const getFileIcon = (type: ProjectDocument['type']) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'excel': return <FileSpreadsheet className="text-emerald-500" />;
            case 'image': return <FileImage className="text-purple-500" />;
            default: return <File className="text-blue-500" />;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Navigation */}
            <div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:text-white"
                    style={{ color: 'var(--text-secondary)' }}>
                    <ChevronLeft size={16} />
                    Back to Projects
                </button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-display font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            {project.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <div className="flex items-center gap-2">
                                <Building2 size={16} />
                                {project.clientName}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                {project.location}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${project.status === 'completed' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' :
                                project.status === 'on-hold' ? 'border-orange-500/30 text-orange-500 bg-orange-500/10' :
                                    'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                }`}>
                                {project.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
                {([
                    { id: 'details', label: 'Project Details', icon: <FileText size={18} /> },
                    { id: 'documents', label: 'Documents', icon: <File size={18} /> },
                    { id: 'finances', label: 'Finances', icon: <DollarSign size={18} /> }
                ] as const).map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 font-medium text-sm flex items-center gap-2 transition-all relative ${activeTab === tab.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-primary)] rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {/* Details Tab */}
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass p-8 rounded-2xl" style={{ borderColor: 'var(--border)' }}>
                                <h3 className="text-xl font-bold mb-4 font-display" style={{ color: 'var(--text-primary)' }}>
                                    Project Submission Timeline
                                </h3>
                                {/* Reusing SubmissionTimeline logic but scoped to this project if possible 
                                    Currently SubmissionTimeline takes all projects, we can perhaps filter or just show the logic here.
                                    Actually SubmissionTimeline component is a full page view. 
                                    Let's build a simple vertical timeline here.
                                */}
                                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border)]">
                                    {project.submissions.map((sub) => (
                                        <div key={sub.id} className="relative pl-8">
                                            <div className={`absolute left-0 top-1 w-4.5 h-4.5 rounded-full border-2 z-10 bg-[var(--bg-primary)] ${sub.status === 'approved' ? 'border-emerald-500 bg-emerald-500' :
                                                sub.status === 'rejected' ? 'border-red-500 bg-red-500' :
                                                    'border-[var(--accent-primary)]'
                                                }`} />
                                            <div className="glass p-4 rounded-xl transition-colors hover:bg-[var(--bg-tertiary)]">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-[var(--accent-primary)] capitalize">
                                                        {sub.type.replace('-', ' ')}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${sub.status === 'approved' ? 'text-emerald-500 bg-emerald-500/10' :
                                                        sub.status === 'rejected' ? 'text-red-500 bg-red-500/10' :
                                                            'text-amber-500 bg-amber-500/10'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-[var(--text-secondary)] mb-2">
                                                    {sub.authority}
                                                </div>
                                                <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                                                    {sub.submittedDate && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            Submitted: {new Date(sub.submittedDate).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    {sub.approvalDate && (
                                                        <div className="flex items-center gap-1 text-emerald-500">
                                                            <CheckCircle2 size={12} />
                                                            Approved: {new Date(sub.approvalDate).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {project.submissions.length === 0 && (
                                        <p className="text-[var(--text-muted)] italic pl-8">No submissions recorded.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass p-6 rounded-2xl" style={{ borderColor: 'var(--border)' }}>
                                <h3 className="text-lg font-bold mb-4 font-display" style={{ color: 'var(--text-primary)' }}>
                                    Key Dates
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-secondary)] text-sm">Start Date</span>
                                        <span className="text-[var(--text-primary)] font-medium">
                                            {new Date(project.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {project.targetCompletionDate && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-[var(--text-secondary)] text-sm">Target Completion</span>
                                            <span className="text-[var(--text-primary)] font-medium">
                                                {new Date(project.targetCompletionDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="glass p-6 rounded-2xl" style={{ borderColor: 'var(--border)' }}>
                                <h3 className="text-lg font-bold mb-4 font-display" style={{ color: 'var(--text-primary)' }}>
                                    Description
                                </h3>
                                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                                Project Documents
                            </h3>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all shadow-lg hover:shadow-xl active:scale-95"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                }}>
                                <Download size={16} />
                                Upload File
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {documents.map(doc => {
                                const uploader = users.find(u => u.id === doc.uploadedBy);
                                return (
                                    <div key={doc.id} className="glass p-4 rounded-xl group transition-all hover:-translate-y-1"
                                        style={{ borderColor: 'var(--border)' }}>
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                                                {getFileIcon(doc.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate text-[var(--text-primary)]" title={doc.name}>
                                                    {doc.name}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)] uppercase mt-1">
                                                    {doc.type} • {doc.size}
                                                </p>
                                            </div>
                                            <button className="p-1.5 rounded hover:bg-[var(--bg-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical size={16} className="text-[var(--text-secondary)]" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-xs pt-3 border-t border-[var(--border)] text-[var(--text-muted)]">
                                            <span>{uploader?.fullName || 'Unknown'}</span>
                                            <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Upload Placeholder */}
                            <button className="border-2 border-dashed border-[var(--border)] rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all min-h-[120px]">
                                <Download size={24} />
                                <span className="text-sm font-medium">Drop files to upload</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Finances Tab */}
                {activeTab === 'finances' && (
                    <FinanceManagement
                        financeRecords={projectFinance}
                        onAddPayment={onAddPayment}
                        onUpdatePayment={onUpdatePayment}
                    />
                )}
            </div>
        </div>
    );
}
