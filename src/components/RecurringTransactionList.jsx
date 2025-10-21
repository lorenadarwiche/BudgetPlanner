import React, { useState } from 'react';
import { Trash2, RefreshCw, TrendingUp, TrendingDown, Pause, Play, Edit2, X, Check } from 'lucide-react';

const RecurringTransactionList = ({ recurringTransactions, onDelete, onToggle, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const getFrequencyLabel = (frequency) => {
    const labels = {
      daily: 'Every Day',
      weekly: 'Every Week',
      monthly: 'Every Month',
      yearly: 'Every Year'
    };
    return labels[frequency] || frequency;
  };

  const startEditing = (recurring) => {
    setEditingId(recurring.id);
    setEditForm({
      frequency: recurring.frequency,
      startDate: recurring.startDate,
      endDate: recurring.endDate || '',
      amount: recurring.amount,
      description: recurring.description
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (id) => {
    onEdit(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-white to-success/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 mb-8 border border-success/30 dark:border-gray-600">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1 h-8 bg-success dark:bg-green-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recurring Transactions</h2>
      </div>

      {recurringTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <RefreshCw className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No recurring transactions set up yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recurringTransactions.map((recurring) => (
            <div
              key={recurring.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-2 transition-all duration-200 ${
                recurring.active
                  ? 'border-success/30 dark:border-green-700'
                  : 'border-gray-300 dark:border-gray-600 opacity-60'
              }`}
            >
              {editingId === recurring.id ? (
                // Edit Mode
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => handleEditChange('amount', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                      <select
                        value={editForm.frequency}
                        onChange={(e) => handleEditChange('frequency', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={editForm.startDate}
                        onChange={(e) => handleEditChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date (Optional)</label>
                      <input
                        type="date"
                        value={editForm.endDate}
                        onChange={(e) => handleEditChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={cancelEditing}
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={() => saveEdit(recurring.id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-success dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {recurring.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`font-semibold text-lg ${
                        recurring.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        ${recurring.amount.toFixed(2)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {recurring.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {recurring.description || 'No description'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-success/20 dark:bg-green-900/30 text-success-dark dark:text-green-400 px-3 py-1 rounded-full font-medium">
                        {getFrequencyLabel(recurring.frequency)}
                      </span>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                        Start: {recurring.startDate}
                      </span>
                      {recurring.endDate && (
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                          End: {recurring.endDate}
                        </span>
                      )}
                      {recurring.active ? (
                        <span className="bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">
                          Paused
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => startEditing(recurring)}
                      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onToggle(recurring.id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        recurring.active
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400'
                          : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400'
                      }`}
                      title={recurring.active ? 'Pause' : 'Resume'}
                    >
                      {recurring.active ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(recurring.id)}
                      className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 p-2 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecurringTransactionList;
