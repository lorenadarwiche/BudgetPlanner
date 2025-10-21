import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ filters, onFilterChange, transactions }) => {
  // Get unique categories from transactions
  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="bg-gradient-to-br from-white to-warning/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 mb-8 border border-warning/50 dark:border-gray-600">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-warning dark:bg-yellow-600 p-2 rounded-xl shadow-md">
          <Filter className="w-5 h-5 text-gray-700 dark:text-gray-100" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-warning focus:border-warning transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-warning focus:border-warning transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-warning focus:border-warning transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-warning focus:border-warning transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
