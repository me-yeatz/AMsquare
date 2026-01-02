import {
    MapPin,
    User,
    Calendar,
    DollarSign,
    FileText,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

const statusConfig = {
    'concept': { label: 'Concept', color: '#6366f1', icon: Clock },
    'design-development': { label: 'Design Dev', color: '#3b82f6', icon: Clock },
    'submission-prep': { label: 'Prep Submit', color: '#f59e0b', icon: Clock },
    'submitted': { label: 'Submitted', color: '#f97316', icon: AlertCircle },
    'approved': { label: 'Approved', color: '#059669', icon: CheckCircle2 },
    'on-hold': { label: 'On Hold', color: '#64748b', icon: XCircle },
    'completed': { label: 'Completed', color: '#10b981', icon: CheckCircle2 }
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const config = statusConfig[project.status];
    const StatusIcon = config.icon;

    const totalFees = project.submissions.reduce((sum, sub) => sum + sub.consultantFee, 0);
    const pendingSubmissions = project.submissions.filter(s => s.status === 'pending').length;
    const approvedSubmissions = project.submissions.filter(s => s.status === 'approved').length;

    return (
        <div
            onClick={onClick}
            className="glass p-6 rounded-2xl transition-all group cursor-pointer animate-fade-in hover:-translate-y-1"
            style={{ borderColor: 'var(--border)' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                    <FileText size={24} />
                </div>
                <button className="text-[var(--text-muted)] hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Project Title */}
            <h3 className="text-xl font-display font-bold mb-2 transition-colors line-clamp-2"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>
                {project.title}
            </h3>

            {/* Client & Location */}
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <User size={14} />
                    <span className="line-clamp-1">{project.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <MapPin size={14} />
                    <span className="line-clamp-1">{project.location}</span>
                </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                >
                    <StatusIcon size={14} />
                    {config.label}
                </div>
            </div>

            {/* Submissions Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[var(--bg-tertiary)]">
                <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">Pending</p>
                    <p className="text-lg font-bold text-amber-500">{pendingSubmissions}</p>
                </div>
                <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">Approved</p>
                    <p className="text-lg font-bold text-green-500">{approvedSubmissions}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <Calendar size={14} />
                    <span>Due {new Date(project.targetCompletionDate || project.startDate).toLocaleDateString('en-MY', { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1 text-[var(--text-secondary)] font-semibold">
                    <DollarSign size={14} />
                    <span>RM {(totalFees / 1000).toFixed(1)}K</span>
                </div>
            </div>
        </div>
    );
}
