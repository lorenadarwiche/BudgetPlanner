import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const Summary = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-success to-white dark:from-green-900/50 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-success/30 dark:border-green-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider">Income</p>
            </div>
            <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-accent to-white dark:from-orange-900/50 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-accent/30 dark:border-orange-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider">Expenses</p>
            </div>
            <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md">
            <TrendingDown className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-primary to-white dark:from-blue-900/50 dark:to-gray-800' : 'from-warning to-white dark:from-yellow-900/50 dark:to-gray-800'} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border ${balance >= 0 ? 'border-primary/30 dark:border-blue-700' : 'border-warning/30 dark:border-yellow-700'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 ${balance >= 0 ? 'bg-blue-600' : 'bg-yellow-600'} rounded-full`}></div>
              <p className="text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider">Balance</p>
            </div>
            <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md">
            <Wallet className={`w-8 h-8 ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
