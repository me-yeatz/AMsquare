export type ProjectStatus =
    | 'concept'
    | 'design-development'
    | 'submission-prep'
    | 'submitted'
    | 'approved'
    | 'on-hold'
    | 'completed';

export type SubmissionType =
    | 'planning-permission'
    | 'building-permit'
    | 'structural-approval'
    | 'fire-safety'
    | 'environmental-impact'
    | 'other';

export interface Submission {
    id: string;
    type: SubmissionType;
    authority: string;
    submittedDate?: string;
    expectedApprovalDate?: string;
    approvalDate?: string;
    status: 'pending' | 'approved' | 'rejected' | 'resubmission-required';
    consultantFee: number;
    notes?: string;
}

export interface Project {
    id: string;
    title: string;
    clientId: string;
    clientName: string;
    location: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    targetCompletionDate?: string;
    actualCompletionDate?: string;
    totalBudget?: number;
    submissions: Submission[];
    color: string;
}

export interface FinancialSummary {
    totalProjects: number;
    activeProjects: number;
    totalConsultantFees: number;
    pendingSubmissions: number;
    approvedSubmissions: number;
}

// User & Authentication
export type UserRole = 'admin' | 'project-manager' | 'designer' | 'finance';

export interface User {
    id: string;
    username: string;
    password: string; // In production, this would be hashed
    fullName: string;
    email: string;
    role: UserRole;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
}

// Client Management
export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company?: string;
    notes?: string;
    projectIds: string[];
    createdDate: string;
    totalSpent: number;
}

// Finance & Fees
export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type PaymentType = 'deposit' | 'milestone' | 'final' | 'consultant-fee' | 'material' | 'other';

export interface Payment {
    id: string;
    projectId: string;
    type: PaymentType;
    description: string;
    amount: number;
    paidAmount: number;
    status: PaymentStatus;
    dueDate?: string;
    paidDate?: string;
    invoiceNumber?: string;
    notes?: string;
}

export interface FinanceRecord {
    id: string;
    projectId: string;
    clientId: string;
    payments: Payment[];
    totalAmount: number;
    paidAmount: number;
    balance: number;
}

// Team Chat
export interface ChatMessage {
    id: string;
    userId: string;
    username: string;
    message: string;
    timestamp: string;
    isEdited?: boolean;
    replyTo?: string;
}

export interface ChatRoom {
    id: string;
    name: string;
    projectId?: string;
    messages: ChatMessage[];
    participants: string[]; // user IDs
    createdDate: string;
}

// Notes
export type NoteCategory = 'general' | 'meeting' | 'idea' | 'project' | 'personal' | 'todo';
export type NotePriority = 'low' | 'medium' | 'high';

export interface Note {
    id: string;
    title: string;
    content: string;
    category: NoteCategory;
    priority: NotePriority;
    projectId?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    isPinned?: boolean;
}

// Documents
export type DocumentType = 'pdf' | 'excel' | 'image' | 'word' | 'cad' | 'other';

export interface ProjectDocument {
    id: string;
    projectId: string;
    name: string;
    type: DocumentType;
    size: string;
    uploadedBy: string;
    uploadedAt: string;
    url?: string;
}
