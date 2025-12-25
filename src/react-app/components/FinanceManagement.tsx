import React, { useState } from 'react';
import {
    DollarSign, Plus, TrendingUp, TrendingDown, Clock,
    CheckCircle, AlertCircle, FileText, Calendar, Filter
} from 'lucide-react';
import type { Payment, PaymentStatus, PaymentType, FinanceRecord } from '../types';

interface FinanceManagementProps {
    financeRecords: FinanceRecord[];
    onAddPayment: (projectId: string, payment: Omit<Payment, 'id'>) => void;
    onUpdatePayment: (projectId: string, paymentId: string, payment: Partial<Payment>) => void;
}

const FinanceManagement: React.FC<FinanceManagementProps> = ({
    financeRecords,
    onAddPayment,
    onUpdatePayment
}) => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');

    const [paymentForm, setPaymentForm] = useState({
        type: 'deposit' as PaymentType,
        description: '',
        amount: 0,
        paidAmount: 0,
        status: 'pending' as PaymentStatus,
        dueDate: '',
        paidDate: '',
        invoiceNumber: '',
        notes: ''
    });

    // Calculate totals
    const totalRevenue = financeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
    const totalPending = financeRecords.reduce((sum, record) => sum + record.balance, 0);
    const totalInvoiced = financeRecords.reduce((sum, record) => sum + record.totalAmount, 0);

    const getStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case 'paid': return '#10b981';
            case 'partial': return '#f59e0b';
            case 'pending': return '#3b82f6';
            case 'overdue': return '#ef4444';
            default: return 'var(--text-muted)';
        }
    };

    const getStatusIcon = (status: PaymentStatus) => {
        switch (status) {
            case 'paid': return <CheckCircle className="w-4 h-4" />;
            case 'partial': return <Clock className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'overdue': return <AlertCircle className="w-4 h-4" />;
        }
    };

    const handleAddPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProject) {
            onAddPayment(selectedProject, paymentForm);
            setShowAddModal(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setPaymentForm({
            type: 'deposit',
            description: '',
            amount: 0,
            paidAmount: 0,
            status: 'pending',
            dueDate: '',
            paidDate: '',
            invoiceNumber: '',
            notes: ''
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-display mb-2"
                        style={{ color: 'var(--text-primary)' }}>
                        Finance Management
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Track payments, invoices, and financial overview
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                            <TrendingUp className="w-6 h-6" style={{ color: '#10b981' }} />
                        </div>
                        <span className="text-sm px-3 py-1 rounded-full"
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981'
                            }}>
                            Received
                        </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Total Revenue</p>
                    <p className="text-3xl font-bold" style={{ color: '#10b981' }}>
                        RM {totalRevenue.toLocaleString()}
                    </p>
                </div>

                <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                            <Clock className="w-6 h-6" style={{ color: '#3b82f6' }} />
                        </div>
                        <span className="text-sm px-3 py-1 rounded-full"
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6'
                            }}>
                            Pending
                        </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Outstanding Balance</p>
                    <p className="text-3xl font-bold" style={{ color: '#3b82f6' }}>
                        RM {totalPending.toLocaleString()}
                    </p>
                </div>

                <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--accent-light)' }}>
                            <FileText className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <span className="text-sm px-3 py-1 rounded-full"
                            style={{
                                background: 'var(--accent-light)',
                                color: 'var(--accent-primary)'
                            }}>
                            Total
                        </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Total Invoiced</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                        RM {totalInvoiced.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <Filter className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                <div className="flex gap-2">
                    {['all', 'pending', 'partial', 'paid', 'overdue'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as PaymentStatus | 'all')}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                            style={{
                                background: filterStatus === status
                                    ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                    : 'var(--bg-tertiary)',
                                color: filterStatus === status ? 'white' : 'var(--text-secondary)'
                            }}>
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Finance Records */}
            <div className="space-y-4">
                {financeRecords.map(record => {
                    const filteredPayments = filterStatus === 'all'
                        ? record.payments
                        : record.payments.filter(p => p.status === filterStatus);

                    if (filteredPayments.length === 0) return null;

                    return (
                        <div key={record.id} className="glass rounded-xl p-6">
                            {/* Project Header */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b"
                                style={{ borderColor: 'var(--border)' }}>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1"
                                        style={{ color: 'var(--text-primary)' }}>
                                        Project #{record.projectId}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        Client ID: {record.clientId}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                                        Balance
                                    </p>
                                    <p className="text-2xl font-bold"
                                        style={{ color: record.balance > 0 ? '#f59e0b' : '#10b981' }}>
                                        RM {record.balance.toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedProject(record.projectId);
                                        setShowAddModal(true);
                                    }}
                                    className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                        color: 'white'
                                    }}>
                                    <Plus className="w-4 h-4" />
                                    Add Payment
                                </button>
                            </div>

                            {/* Payments Table */}
                            <div className="space-y-2">
                                {filteredPayments.map(payment => (
                                    <div key={payment.id}
                                        className="flex items-center justify-between p-4 rounded-lg transition-all"
                                        style={{ background: 'var(--bg-tertiary)' }}>
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{ background: `${getStatusColor(payment.status)}20` }}>
                                                <span style={{ color: getStatusColor(payment.status) }}>
                                                    {getStatusIcon(payment.status)}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-medium"
                                                        style={{ color: 'var(--text-primary)' }}>
                                                        {payment.description}
                                                    </h4>
                                                    <span className="text-xs px-2 py-1 rounded capitalize"
                                                        style={{
                                                            background: 'var(--bg-primary)',
                                                            color: 'var(--text-muted)'
                                                        }}>
                                                        {payment.type.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm"
                                                    style={{ color: 'var(--text-muted)' }}>
                                                    {payment.invoiceNumber && (
                                                        <span>Invoice: {payment.invoiceNumber}</span>
                                                    )}
                                                    {payment.dueDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold mb-1"
                                                style={{ color: 'var(--text-primary)' }}>
                                                RM {payment.amount.toLocaleString()}
                                            </p>
                                            <p className="text-sm"
                                                style={{ color: getStatusColor(payment.status) }}>
                                                Paid: RM {payment.paidAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Payment Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                    onClick={() => setShowAddModal(false)}>
                    <div className="glass rounded-2xl p-8 max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-6 font-display"
                            style={{ color: 'var(--text-primary)' }}>
                            Add Payment Record
                        </h3>

                        <form onSubmit={handleAddPayment} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Payment Type
                                    </label>
                                    <select
                                        value={paymentForm.type}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value as PaymentType })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}>
                                        <option value="deposit">Deposit</option>
                                        <option value="milestone">Milestone</option>
                                        <option value="final">Final Payment</option>
                                        <option value="consultant-fee">Consultant Fee</option>
                                        <option value="material">Material</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Status
                                    </label>
                                    <select
                                        value={paymentForm.status}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, status: e.target.value as PaymentStatus })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}>
                                        <option value="pending">Pending</option>
                                        <option value="partial">Partial</option>
                                        <option value="paid">Paid</option>
                                        <option value="overdue">Overdue</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={paymentForm.description}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border outline-none"
                                    style={{
                                        background: 'var(--bg-tertiary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Amount (RM)
                                    </label>
                                    <input
                                        type="number"
                                        value={paymentForm.amount}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) })}
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
                                        Paid Amount (RM)
                                    </label>
                                    <input
                                        type="number"
                                        value={paymentForm.paidAmount}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, paidAmount: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        value={paymentForm.dueDate}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, dueDate: e.target.value })}
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
                                        Invoice Number
                                    </label>
                                    <input
                                        type="text"
                                        value={paymentForm.invoiceNumber}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, invoiceNumber: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border outline-none"
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-lg font-medium transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                        color: 'white'
                                    }}>
                                    Add Payment
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-6 py-3 rounded-lg font-medium"
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

export default FinanceManagement;
