import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    expense: ['Food', 'Rent', 'Travel', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      onAddTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now()
      });
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }));
  };

  return (
    <div className="bg-gradient-to-br from-white to-secondary/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 mb-8 border border-secondary/50 dark:border-gray-600">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center space-x-2">
        <div className="w-1 h-8 bg-primary dark:bg-blue-500 rounded-full"></div>
        <span>Add Transaction</span>
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
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
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select...</option>
            {categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-blue-500 hover:shadow-lg text-gray-800 dark:text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
