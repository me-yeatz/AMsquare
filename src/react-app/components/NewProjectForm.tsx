import React, { useState } from 'react';
import { X, Plus, Calendar, DollarSign, MapPin, FileText, User } from 'lucide-react';
import type { Project, Client, ProjectStatus } from '../types';

interface NewProjectFormProps {
    clients: Client[];
    onSubmit: (project: Omit<Project, 'id'>) => void;
    onClose: () => void;
}

export default function NewProjectForm({ clients, onSubmit, onClose }: NewProjectFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        clientId: '',
        location: '',
        description: '',
        status: 'concept' as ProjectStatus,
        startDate: new Date().toISOString().split('T')[0],
        targetCompletionDate: '',
        totalBudget: '',
        color: '#623443'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const statusOptions = [
        { value: 'concept', label: 'Concept' },
        { value: 'design-development', label: 'Design Development' },
        { value: 'submission-prep', label: 'Submission Prep' },
        { value: 'submitted', label: 'Submitted' },
        { value: 'approved', label: 'Approved' },
        { value: 'on-hold', label: 'On Hold' },
        { value: 'completed', label: 'Completed' }
    ];

    const colorOptions = [
        '#623443', '#4f46e5', '#0891b2', '#059669', '#dc2626',
        '#ea580c', '#ca8a04', '#7c3aed', '#db2777', '#475569'
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Project title is required';
        }
        if (!formData.clientId) {
            newErrors.clientId = 'Please select a client';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const selectedClient = clients.find(c => c.id === formData.clientId);
        if (!selectedClient) return;

        const newProject: Omit<Project, 'id'> = {
            title: formData.title,
            clientId: formData.clientId,
            clientName: selectedClient.name,
            location: formData.location,
            description: formData.description,
            status: formData.status,
            startDate: formData.startDate,
            targetCompletionDate: formData.targetCompletionDate || undefined,
            totalBudget: formData.totalBudget ? parseFloat(formData.totalBudget) : undefined,
            submissions: [],
            color: formData.color
        };

        onSubmit(newProject);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}>
            <div className="glass rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
                onClick={(e) => e.stopPropagation()}
                style={{ borderColor: 'var(--border)' }}>

                {/* Header */}
                <div className="sticky top-0 glass border-b px-8 py-6 flex items-center justify-between"
                    style={{ borderColor: 'var(--border)' }}>
                    <div>
                        <h2 className="text-2xl font-display font-bold"
                            style={{ color: 'var(--text-primary)' }}>
                            Create New Project
                        </h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                            Add a new interior design project to your portfolio
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors hover:bg-red-100"
                        style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Project Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            <span className="flex items-center gap-2">
                                <FileText size={16} />
                                Project Title *
                            </span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Modern Living Room Renovation"
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: errors.title ? '#ef4444' : 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                        />
                        {errors.title && (
                            <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Client Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                Client *
                            </span>
                        </label>
                        <select
                            value={formData.clientId}
                            onChange={(e) => handleInputChange('clientId', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: errors.clientId ? '#ef4444' : 'var(--border)',
                                color: 'var(--text-primary)'
                            }}>
                            <option value="">Select a client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.name} {client.company ? `(${client.company})` : ''}
                                </option>
                            ))}
                        </select>
                        {errors.clientId && (
                            <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                                {errors.clientId}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            <span className="flex items-center gap-2">
                                <MapPin size={16} />
                                Location *
                            </span>
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="e.g., Kuala Lumpur, Malaysia"
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: errors.location ? '#ef4444' : 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                        />
                        {errors.location && (
                            <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                                {errors.location}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            Project Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe the project scope, requirements, and objectives..."
                            rows={4}
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none resize-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: errors.description ? '#ef4444' : 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                        />
                        {errors.description && (
                            <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            Project Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)'
                            }}>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dates Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-primary)' }}>
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Start Date *
                                </span>
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: errors.startDate ? '#ef4444' : 'var(--border)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            {errors.startDate && (
                                <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                                    {errors.startDate}
                                </p>
                            )}
                        </div>

                        {/* Target Completion Date */}
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-primary)' }}>
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Target Completion Date
                                </span>
                            </label>
                            <input
                                type="date"
                                value={formData.targetCompletionDate}
                                onChange={(e) => handleInputChange('targetCompletionDate', e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}>
                            <span className="flex items-center gap-2">
                                <DollarSign size={16} />
                                Total Budget (RM)
                            </span>
                        </label>
                        <input
                            type="number"
                            value={formData.totalBudget}
                            onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 border rounded-xl transition-all outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-3"
                            style={{ color: 'var(--text-primary)' }}>
                            Project Color
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleInputChange('color', color)}
                                    className="w-10 h-10 rounded-lg border-2 transition-all hover:scale-110"
                                    style={{
                                        background: color,
                                        borderColor: formData.color === color ? 'var(--accent-primary)' : 'transparent',
                                        boxShadow: formData.color === color ? '0 0 0 2px var(--accent-light)' : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
                            style={{
                                background: 'var(--bg-tertiary)',
                                color: 'var(--text-primary)'
                            }}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white',
                                boxShadow: '0 4px 20px var(--accent-glow)'
                            }}>
                            <Plus size={20} />
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
