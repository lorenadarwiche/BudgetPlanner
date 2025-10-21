import React, { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';

const RecurringTransactionForm = ({ onAddRecurring }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const expenseCategories = ['Food', 'Rent', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
  const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const recurringTransaction = {
      id: Date.now(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      frequency: formData.frequency,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      lastGenerated: null,
      active: true
    };

    onAddRecurring(recurringTransaction);

    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-success/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 mb-8 border border-success/30 dark:border-gray-600">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-success dark:bg-green-600 p-2 rounded-xl shadow-md">
          <RefreshCw className="w-5 h-5 text-gray-700 dark:text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Add Recurring Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
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
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date (Optional)</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-success to-secondary dark:from-green-600 dark:to-blue-500 hover:shadow-xl text-gray-800 dark:text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Recurring</span>
        </button>
      </form>
    </div>
  );
};

export default RecurringTransactionForm;
