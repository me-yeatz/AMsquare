import React, { useState } from 'react';
import {
    Plus, Search, Edit2, Trash2, Pin, Tag, AlertCircle,
    MoreVertical, Palette, Calendar
} from 'lucide-react';
import type { Note, NoteCategory, NotePriority, Project } from '../types';

interface NotesProps {
    notes: Note[];
    projects: Project[];
    onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
    onUpdateNote: (id: string, note: Partial<Note>) => void;
    onDeleteNote: (id: string) => void;
}

const Notes: React.FC<NotesProps> = ({
    notes,
    projects,
    onAddNote,
    onUpdateNote,
    onDeleteNote
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'general' as NoteCategory,
        priority: 'medium' as NotePriority,
        projectId: '',
        isPinned: false
    });

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            category: 'general',
            priority: 'medium',
            projectId: '',
            isPinned: false
        });
        setEditingNote(null);
        setShowAddModal(false);
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setFormData({
            title: note.title,
            content: note.content,
            category: note.category,
            priority: note.priority,
            projectId: note.projectId || '',
            isPinned: note.isPinned || false
        });
        setShowAddModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingNote) {
            onUpdateNote(editingNote.id, {
                ...formData,
                updatedAt: new Date().toISOString()
            });
        } else {
            onAddNote(formData);
        }
        resetForm();
    };

    const getCategoryColor = (category: NoteCategory) => {
        switch (category) {
            case 'meeting': return '#3b82f6';
            case 'idea': return '#f59e0b';
            case 'project': return '#10b981';
            case 'todo': return '#ec4899';
            case 'personal': return '#8b5cf6';
            default: return '#64748b';
        }
    };

    const getPriorityColor = (priority: NotePriority) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
        }
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-display mb-2"
                        style={{ color: 'var(--text-primary)' }}>
                        Notes
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Capture ideas, meeting minutes, and to-do lists
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        color: 'white'
                    }}>
                    <Plus className="w-5 h-5" />
                    New Note
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center overflow-x-auto pb-2">
                <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search notes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none"
                        style={{
                            background: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>
                {['all', 'general', 'meeting', 'idea', 'project', 'todo', 'personal'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as NoteCategory | 'all')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap"
                        style={{
                            background: selectedCategory === cat
                                ? 'var(--accent-light)'
                                : 'var(--bg-tertiary)',
                            color: selectedCategory === cat
                                ? 'var(--accent-primary)'
                                : 'var(--text-secondary)',
                            border: selectedCategory === cat
                                ? '1px solid var(--accent-primary)'
                                : '1px solid transparent'
                        }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNotes.map(note => (
                    <div key={note.id}
                        className="glass rounded-xl p-5 flex flex-col h-[280px] group transition-all hover:-translate-y-1"
                        style={{
                            borderColor: note.isPinned ? 'var(--accent-primary)' : 'var(--border)',
                            boxShadow: note.isPinned ? '0 0 20px -5px var(--accent-glow)' : 'none'
                        }}>
                        {/* Note Header */}
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs px-2 py-1 rounded-full capitalize font-medium"
                                style={{
                                    background: `${getCategoryColor(note.category)}20`,
                                    color: getCategoryColor(note.category)
                                }}>
                                {note.category}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onUpdateNote(note.id, { isPinned: !note.isPinned })}
                                    className="p-1.5 rounded hover:bg-white/10"
                                    title={note.isPinned ? 'Unpin' : 'Pin'}>
                                    <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`}
                                        style={{ color: note.isPinned ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
                                </button>
                                <button
                                    onClick={() => handleEdit(note)}
                                    className="p-1.5 rounded hover:bg-white/10">
                                    <Edit2 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Delete this note?')) onDeleteNote(note.id);
                                    }}
                                    className="p-1.5 rounded hover:bg-red-500/20">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>

                        {/* Note Content */}
                        <h3 className="text-lg font-bold mb-2 line-clamp-2"
                            style={{ color: 'var(--text-primary)' }}>
                            {note.title}
                        </h3>
                        <p className="text-sm line-clamp-5 flex-1 whitespace-pre-wrap"
                            style={{ color: 'var(--text-muted)' }}>
                            {note.content}
                        </p>

                        {/* Note Footer */}
                        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs"
                            style={{ borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                                <Calendar className="w-3 h-3" />
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </div>
                            {note.projectId && (
                                <span className="text-xs px-2 py-0.5 rounded bg-white/5 truncate max-w-[120px]"
                                    title={projects.find(p => p.id === note.projectId)?.title}>
                                    Project #{note.projectId}
                                </span>
                            )}
                            <div className="w-2 h-2 rounded-full"
                                style={{ background: getPriorityColor(note.priority) }}
                                title={`${note.priority} priority`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                    onClick={() => setShowAddModal(false)}>
                    <div className="glass rounded-2xl p-8 max-w-2xl w-full"
                        onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-6 font-display"
                            style={{ color: 'var(--text-primary)' }}>
                            {editingNote ? 'Edit Note' : 'New Note'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Note Title"
                                    className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-slate-600"
                                    style={{ color: 'var(--text-primary)' }}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 uppercase tracking-wider"
                                        style={{ color: 'var(--text-muted)' }}>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value as NoteCategory })}
                                        className="w-full px-3 py-2 rounded-lg border outline-none text-sm capitalize"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}>
                                        {['general', 'meeting', 'idea', 'project', 'todo', 'personal'].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 uppercase tracking-wider"
                                        style={{ color: 'var(--text-muted)' }}>Priority</label>
                                    <select
                                        value={formData.priority}
                                        onChange={e => setFormData({ ...formData, priority: e.target.value as NotePriority })}
                                        className="w-full px-3 py-2 rounded-lg border outline-none text-sm capitalize"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1 uppercase tracking-wider"
                                    style={{ color: 'var(--text-muted)' }}>Link to Project (Optional)</label>
                                <select
                                    value={formData.projectId}
                                    onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}>
                                    <option value="">None</option>
                                    {projects.map(p => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    rows={8}
                                    placeholder="Type your note here..."
                                    className="w-full px-4 py-3 rounded-lg border outline-none resize-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 rounded-lg font-medium transition-colors hover:bg-white/5"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg font-medium text-white transition-all shadow-lg hover:shadow-xl active:scale-95"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                    }}>
                                    {editingNote ? 'Save Changes' : 'Create Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
