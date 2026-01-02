import React, { useState } from 'react';
import { Users, Plus, Mail, Phone, MapPin, Search, Edit2, Trash2, DollarSign } from 'lucide-react';
import type { Client } from '../types';

interface ClientManagementProps {
    clients: Client[];
    onAddClient: (client: Omit<Client, 'id' | 'createdDate' | 'totalSpent'>) => void;
    onUpdateClient: (id: string, client: Partial<Client>) => void;
    onDeleteClient: (id: string) => void;
}

const ClientManagement: React.FC<ClientManagementProps> = ({
    clients,
    onAddClient,
    onUpdateClient,
    onDeleteClient
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        notes: '',
        projectIds: [] as string[]
    });

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingClient) {
            onUpdateClient(editingClient.id, formData);
        } else {
            onAddClient(formData);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            company: '',
            notes: '',
            projectIds: []
        });
        setEditingClient(null);
        setShowAddModal(false);
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setFormData({
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            company: client.company || '',
            notes: client.notes || '',
            projectIds: client.projectIds
        });
        setShowAddModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-display mb-2"
                        style={{ color: 'var(--text-primary)' }}>
                        Client Management
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Manage your client database and relationships
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        color: 'white'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px var(--accent-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                    <Plus className="w-5 h-5" />
                    Add Client
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search clients by name, email, or company..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border transition-all outline-none"
                    style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map(client => (
                    <div key={client.id}
                        className="glass rounded-xl p-6 transition-all hover:scale-[1.02]"
                        style={{ borderColor: 'var(--border)' }}>
                        {/* Client Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                    }}>
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg"
                                        style={{ color: 'var(--text-primary)' }}>
                                        {client.name}
                                    </h3>
                                    {client.company && (
                                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                            {client.company}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(client)}
                                    className="p-2 rounded-lg transition-all"
                                    style={{ background: 'var(--bg-tertiary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--accent-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                                    }}>
                                    <Edit2 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this client?')) {
                                            onDeleteClient(client.id);
                                        }
                                    }}
                                    className="p-2 rounded-lg transition-all"
                                    style={{ background: 'var(--bg-tertiary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                                    }}>
                                    <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                                </button>
                            </div>
                        </div>

                        {/* Client Details */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>{client.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>{client.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>{client.address}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-4 pt-4 border-t flex items-center justify-between"
                            style={{ borderColor: 'var(--border)' }}>
                            <div>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Projects</p>
                                <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    {client.projectIds.length}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Spent</p>
                                <p className="text-lg font-semibold flex items-center gap-1"
                                    style={{ color: 'var(--accent-primary)' }}>
                                    <DollarSign className="w-4 h-4" />
                                    {client.totalSpent.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                    onClick={resetForm}>
                    <div className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-6 font-display"
                            style={{ color: 'var(--text-primary)' }}>
                            {editingClient ? 'Edit Client' : 'Add New Client'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Client Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border outline-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Notes
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border outline-none resize-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-lg font-medium transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                        color: 'white'
                                    }}>
                                    {editingClient ? 'Update Client' : 'Add Client'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 rounded-lg font-medium transition-all"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        color: 'var(--text-secondary)'
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientManagement;
