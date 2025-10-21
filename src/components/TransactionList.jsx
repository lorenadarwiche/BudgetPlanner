import React from 'react';
import { Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-gradient-to-br from-white to-accent/10 rounded-2xl shadow-lg p-8 border border-accent/30">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1 h-8 bg-accent rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Wallet className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No transactions yet. Add your first transaction above!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-200">
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
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
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <span className="bg-gradient-to-r from-secondary to-primary px-3 py-1 rounded-full text-xs font-medium">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.description}</td>
                  <td className={`py-3 px-4 text-sm text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
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
