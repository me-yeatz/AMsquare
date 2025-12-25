import type { Project, Client, FinanceRecord, ChatRoom, User, Note, ProjectDocument } from '../types';

// Mock Users
export const MOCK_USERS: User[] = [
    {
        id: '1',
        username: 'admin',
        password: 'admin123',
        fullName: 'Admin User',
        email: 'admin@amsquareinteriors.com',
        role: 'admin',
        isOnline: true
    },
    {
        id: '2',
        username: 'designer',
        password: 'design123',
        fullName: 'Sarah Designer',
        email: 'sarah@amsquareinteriors.com',
        role: 'designer',
        isOnline: true
    },
    {
        id: '3',
        username: 'manager',
        password: 'manager123',
        fullName: 'John Manager',
        email: 'john@amsquareinteriors.com',
        role: 'project-manager',
        isOnline: false,
        lastSeen: '2024-12-24T18:30:00Z'
    },
    {
        id: '4',
        username: 'finance',
        password: 'finance123',
        fullName: 'Emma Finance',
        email: 'emma@amsquareinteriors.com',
        role: 'finance',
        isOnline: true
    }
];

// Mock Clients
export const MOCK_CLIENTS: Client[] = [
    {
        id: 'c1',
        name: 'Mr. Ahmad bin Abdullah',
        email: 'ahmad.abdullah@email.com',
        phone: '+60 12-345 6789',
        address: 'Damansara Heights, Kuala Lumpur',
        company: 'Private Individual',
        notes: 'Prefers modern minimalist design. Very detail-oriented.',
        projectIds: ['1'],
        createdDate: '2024-01-10',
        totalSpent: 2500000
    },
    {
        id: 'c2',
        name: 'Synergy Holdings',
        email: 'contact@synergyholdings.com',
        phone: '+60 3-2161 8888',
        address: 'KLCC, Kuala Lumpur',
        company: 'Synergy Holdings Sdn Bhd',
        notes: 'Corporate client. Requires green building certification.',
        projectIds: ['2'],
        createdDate: '2024-01-20',
        totalSpent: 15000000
    },
    {
        id: 'c3',
        name: 'Heritage Hospitality Group',
        email: 'info@heritagehospitality.com',
        phone: '+60 4-262 1234',
        address: 'Georgetown, Penang',
        company: 'Heritage Hospitality Group',
        notes: 'Specializes in boutique hotels. Values heritage preservation.',
        projectIds: ['3'],
        createdDate: '2023-09-15',
        totalSpent: 5000000
    },
    {
        id: 'c4',
        name: 'Ms. Lisa Tan',
        email: 'lisa.tan@email.com',
        phone: '+60 16-789 0123',
        address: 'Mont Kiara, Kuala Lumpur',
        company: '',
        notes: 'Looking for contemporary condo interior design.',
        projectIds: [],
        createdDate: '2024-12-01',
        totalSpent: 0
    }
];

// Mock Projects
export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Residential Villa - Damansara Heights',
        clientId: 'c1',
        clientName: 'Mr. Ahmad bin Abdullah',
        location: 'Damansara Heights, Kuala Lumpur',
        description: 'Modern 3-story residential villa with sustainable design features',
        status: 'submitted',
        startDate: '2024-01-15',
        targetCompletionDate: '2024-12-30',
        totalBudget: 2500000,
        color: '#623443',
        submissions: [
            {
                id: 's1',
                type: 'planning-permission',
                authority: 'DBKL - Kuala Lumpur City Hall',
                submittedDate: '2024-02-20',
                expectedApprovalDate: '2024-04-20',
                status: 'pending',
                consultantFee: 15000,
                notes: 'Awaiting feedback on setback requirements'
            },
            {
                id: 's2',
                type: 'structural-approval',
                authority: 'JKR - Public Works Department',
                submittedDate: '2024-03-01',
                expectedApprovalDate: '2024-04-15',
                status: 'approved',
                consultantFee: 8000,
                approvalDate: '2024-04-10'
            }
        ]
    },
    {
        id: '2',
        title: 'Commercial Office Building - KLCC',
        clientId: 'c2',
        clientName: 'Synergy Holdings Sdn Bhd',
        location: 'KLCC, Kuala Lumpur',
        description: '12-story commercial office building with green building certification',
        status: 'design-development',
        startDate: '2024-02-01',
        targetCompletionDate: '2025-06-30',
        totalBudget: 15000000,
        color: '#7a4356',
        submissions: [
            {
                id: 's3',
                type: 'environmental-impact',
                authority: 'DOE - Department of Environment',
                submittedDate: '2024-03-15',
                expectedApprovalDate: '2024-05-15',
                status: 'resubmission-required',
                consultantFee: 25000,
                notes: 'Need to revise drainage system design'
            }
        ]
    },
    {
        id: '3',
        title: 'Boutique Hotel Renovation - Georgetown',
        clientId: 'c3',
        clientName: 'Heritage Hospitality Group',
        location: 'Georgetown, Penang',
        description: 'Heritage building conversion to 20-room boutique hotel',
        status: 'approved',
        startDate: '2023-10-01',
        targetCompletionDate: '2024-08-31',
        totalBudget: 5000000,
        color: '#8a5366',
        submissions: [
            {
                id: 's4',
                type: 'planning-permission',
                authority: 'MPPP - Penang Island City Council',
                submittedDate: '2023-11-10',
                expectedApprovalDate: '2024-01-10',
                approvalDate: '2024-01-05',
                status: 'approved',
                consultantFee: 12000
            },
            {
                id: 's5',
                type: 'fire-safety',
                authority: 'Bomba - Fire Department',
                submittedDate: '2023-12-01',
                expectedApprovalDate: '2024-02-01',
                approvalDate: '2024-01-28',
                status: 'approved',
                consultantFee: 6000
            }
        ]
    }
];

// Mock Finance Records
export const MOCK_FINANCE_RECORDS: FinanceRecord[] = [
    {
        id: 'f1',
        projectId: '1',
        clientId: 'c1',
        totalAmount: 2500000,
        paidAmount: 1500000,
        balance: 1000000,
        payments: [
            {
                id: 'p1',
                projectId: '1',
                type: 'deposit',
                description: 'Initial Deposit - 30%',
                amount: 750000,
                paidAmount: 750000,
                status: 'paid',
                dueDate: '2024-01-20',
                paidDate: '2024-01-18',
                invoiceNumber: 'INV-2024-001'
            },
            {
                id: 'p2',
                projectId: '1',
                type: 'milestone',
                description: 'Design Phase Completion',
                amount: 750000,
                paidAmount: 750000,
                status: 'paid',
                dueDate: '2024-03-15',
                paidDate: '2024-03-14',
                invoiceNumber: 'INV-2024-002'
            },
            {
                id: 'p3',
                projectId: '1',
                type: 'milestone',
                description: 'Construction Phase - 50%',
                amount: 1000000,
                paidAmount: 0,
                status: 'pending',
                dueDate: '2024-07-15',
                invoiceNumber: 'INV-2024-003'
            }
        ]
    },
    {
        id: 'f2',
        projectId: '2',
        clientId: 'c2',
        totalAmount: 15000000,
        paidAmount: 4500000,
        balance: 10500000,
        payments: [
            {
                id: 'p4',
                projectId: '2',
                type: 'deposit',
                description: 'Project Deposit - 20%',
                amount: 3000000,
                paidAmount: 3000000,
                status: 'paid',
                dueDate: '2024-02-10',
                paidDate: '2024-02-08',
                invoiceNumber: 'INV-2024-004'
            },
            {
                id: 'p5',
                projectId: '2',
                type: 'consultant-fee',
                description: 'Environmental Impact Assessment',
                amount: 25000,
                paidAmount: 25000,
                status: 'paid',
                dueDate: '2024-03-20',
                paidDate: '2024-03-19',
                invoiceNumber: 'INV-2024-005'
            },
            {
                id: 'p6',
                projectId: '2',
                type: 'milestone',
                description: 'Design Development Phase',
                amount: 4500000,
                paidAmount: 1475000,
                status: 'partial',
                dueDate: '2024-05-30',
                invoiceNumber: 'INV-2024-006',
                notes: 'Partial payment received, balance pending'
            }
        ]
    },
    {
        id: 'f3',
        projectId: '3',
        clientId: 'c3',
        totalAmount: 5000000,
        paidAmount: 5000000,
        balance: 0,
        payments: [
            {
                id: 'p7',
                projectId: '3',
                type: 'deposit',
                description: 'Initial Deposit',
                amount: 1500000,
                paidAmount: 1500000,
                status: 'paid',
                dueDate: '2023-10-15',
                paidDate: '2023-10-12',
                invoiceNumber: 'INV-2023-045'
            },
            {
                id: 'p8',
                projectId: '3',
                type: 'final',
                description: 'Final Payment',
                amount: 3500000,
                paidAmount: 3500000,
                status: 'paid',
                dueDate: '2024-08-31',
                paidDate: '2024-08-30',
                invoiceNumber: 'INV-2024-007'
            }
        ]
    }
];

// Mock Chat Rooms
export const MOCK_CHAT_ROOMS: ChatRoom[] = [
    {
        id: 'room1',
        name: 'General Team Chat',
        participants: ['1', '2', '3', '4'],
        createdDate: '2024-01-01',
        messages: [
            {
                id: 'm1',
                userId: '2',
                username: 'Sarah Designer',
                message: 'Good morning team! Ready for today\'s design review?',
                timestamp: '2024-12-25T09:15:00Z'
            },
            {
                id: 'm2',
                userId: '1',
                username: 'Admin User',
                message: 'Yes! Let\'s start with the Damansara Heights project.',
                timestamp: '2024-12-25T09:16:30Z'
            },
            {
                id: 'm3',
                userId: '4',
                username: 'Emma Finance',
                message: 'Just a reminder - we have pending invoices for Project #2',
                timestamp: '2024-12-25T09:20:00Z'
            },
            {
                id: 'm4',
                userId: '2',
                username: 'Sarah Designer',
                message: 'Noted! I\'ll follow up with the client this afternoon.',
                timestamp: '2024-12-25T09:22:15Z'
            }
        ]
    },
    {
        id: 'room2',
        name: 'Project: Damansara Villa',
        projectId: '1',
        participants: ['1', '2', '3'],
        createdDate: '2024-01-15',
        messages: [
            {
                id: 'm5',
                userId: '3',
                username: 'John Manager',
                message: 'The structural approval came through! 🎉',
                timestamp: '2024-12-24T16:30:00Z'
            },
            {
                id: 'm6',
                userId: '1',
                username: 'Admin User',
                message: 'Excellent news! Let\'s schedule the next phase.',
                timestamp: '2024-12-24T16:35:00Z'
            },
            {
                id: 'm7',
                userId: '2',
                username: 'Sarah Designer',
                message: 'I\'ll prepare the construction drawings this week.',
                timestamp: '2024-12-25T08:45:00Z'
            }
        ]
    },
    {
        id: 'room3',
        name: 'Project: KLCC Office',
        projectId: '2',
        participants: ['1', '2', '4'],
        createdDate: '2024-02-01',
        messages: [
            {
                id: 'm8',
                userId: '4',
                username: 'Emma Finance',
                message: 'Received partial payment for design phase.',
                timestamp: '2024-12-25T10:00:00Z'
            },
            {
                id: 'm9',
                userId: '1',
                username: 'Admin User',
                message: 'Great! How much is still outstanding?',
                timestamp: '2024-12-25T10:05:00Z'
            },
            {
                id: 'm10',
                userId: '4',
                username: 'Emma Finance',
                message: 'RM 3,025,000 balance remaining on the current milestone.',
                timestamp: '2024-12-25T10:07:30Z'
            }
        ]
    },
    {
        id: 'room4',
        name: 'Design Team',
        participants: ['1', '2'],
        createdDate: '2024-01-01',
        messages: [
            {
                id: 'm11',
                userId: '2',
                username: 'Sarah Designer',
                message: 'Working on the new material palette for the Georgetown project.',
                timestamp: '2024-12-25T11:30:00Z'
            }
        ]
    }
];

// Mock Notes
export const MOCK_NOTES: Note[] = [
    {
        id: 'n1',
        title: 'Meeting with Mr. Ahmad',
        content: 'Discussed the kitchen layout and material selection for the island countertop. He prefers marble over granite.',
        category: 'meeting',
        priority: 'high',
        projectId: '1',
        createdBy: '1',
        createdAt: '2024-12-24T10:00:00Z',
        updatedAt: '2024-12-24T10:00:00Z',
        isPinned: true
    },
    {
        id: 'n2',
        title: 'Lighting Concept Idea',
        content: 'Use hidden LED strips in the cove ceiling for the master bedroom to create a warm ambient glow.',
        category: 'idea',
        priority: 'medium',
        createdBy: '2',
        createdAt: '2024-12-25T09:30:00Z',
        updatedAt: '2024-12-25T09:30:00Z',
        isPinned: false
    },
    {
        id: 'n3',
        title: 'Supplier Follow-up',
        content: 'Call the tile supplier regarding the delivery schedule for the KLCC office project. Invoice #INV-2024-005.',
        category: 'todo',
        priority: 'high',
        projectId: '2',
        createdBy: '1',
        createdAt: '2024-12-25T11:00:00Z',
        updatedAt: '2024-12-25T11:00:00Z',
        isPinned: true
    },
    {
        id: 'n4',
        title: 'Annual Team Lunch',
        content: 'Schedule the annual team lunch for next Friday. Location TBD.',
        category: 'general',
        priority: 'low',
        createdBy: '3',
        createdAt: '2024-12-20T14:00:00Z',
        updatedAt: '2024-12-20T14:00:00Z',
        isPinned: false
    }
];

// Mock Documents
export const MOCK_DOCUMENTS: ProjectDocument[] = [
    {
        id: 'd1',
        projectId: '1',
        name: 'Concept Design Presentation.pdf',
        type: 'pdf',
        size: '15.4 MB',
        uploadedBy: '2',
        uploadedAt: '2024-11-15T14:30:00Z'
    },
    {
        id: 'd2',
        projectId: '1',
        name: 'Material Schedule v2.xlsx',
        type: 'excel',
        size: '2.1 MB',
        uploadedBy: '2',
        uploadedAt: '2024-11-20T09:15:00Z'
    },
    {
        id: 'd3',
        projectId: '1',
        name: 'Kitchen Layout Plan.pdf',
        type: 'pdf',
        size: '5.8 MB',
        uploadedBy: '2',
        uploadedAt: '2024-11-22T16:45:00Z'
    },
    {
        id: 'd4',
        projectId: '2',
        name: 'Mood Board - Reception Area.jpg',
        type: 'image',
        size: '4.2 MB',
        uploadedBy: '2',
        uploadedAt: '2024-12-01T11:20:00Z'
    },
    {
        id: 'd5',
        projectId: '2',
        name: 'Quotation - Furniture.pdf',
        type: 'pdf',
        size: '1.5 MB',
        uploadedBy: '4',
        uploadedAt: '2024-12-05T10:00:00Z'
    }
];
