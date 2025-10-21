import React from 'react';
import { Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-gradient-to-br from-white to-accent/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 border border-accent/30 dark:border-gray-600">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1 h-8 bg-accent dark:bg-orange-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Transaction History</h2>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <Wallet className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No transactions yet. Add your first transaction above!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-primary/10 dark:hover:from-blue-900/30 hover:to-transparent transition-all duration-200">
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {transaction.type === 'income' ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Income</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600 font-medium">Expense</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    <span className="bg-gradient-to-r from-secondary to-primary dark:from-blue-700 dark:to-blue-600 px-3 py-1 rounded-full text-xs font-medium dark:text-gray-100">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{transaction.description}</td>
                  <td className={`py-3 px-4 text-sm text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
