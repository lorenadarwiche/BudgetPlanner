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
      <div className="bg-gradient-to-br from-success to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-success/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Income</p>
            </div>
            <p className="text-4xl font-bold text-gray-800">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-accent to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-accent/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Expenses</p>
            </div>
            <p className="text-4xl font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <TrendingDown className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-primary to-white' : 'from-warning to-white'} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border ${balance >= 0 ? 'border-primary/30' : 'border-warning/30'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 ${balance >= 0 ? 'bg-blue-600' : 'bg-yellow-600'} rounded-full`}></div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Balance</p>
            </div>
            <p className="text-4xl font-bold text-gray-800">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Wallet className={`w-8 h-8 ${balance >= 0 ? 'text-blue-600' : 'text-yellow-600'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
