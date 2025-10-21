import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom Tooltip with dark mode support
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow-lg">
        {label && <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-700 dark:text-gray-200">
            <span style={{ color: entry.color }} className="font-semibold">{entry.name}: </span>
            {entry.value && typeof entry.value === 'number' ? `$${entry.value.toFixed(2)}` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = ({ transactions }) => {
  // Calculate category breakdown for pie chart (expenses only)
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: parseFloat(amount.toFixed(2))
  }));

  // Calculate daily totals for line chart
  const dailyTotals = transactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.date === transaction.date);
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    
    if (existing) {
      existing.amount += amount;
      if (transaction.type === 'income') {
        existing.income += transaction.amount;
      } else {
        existing.expense += transaction.amount;
      }
    } else {
      acc.push({
        date: transaction.date,
        amount: amount,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expense: transaction.type === 'expense' ? transaction.amount : 0
      });
    }
    return acc;
  }, []);

  // Sort by date
  const lineData = dailyTotals
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => ({
      date: item.date,
      income: parseFloat(item.income.toFixed(2)),
      expense: parseFloat(item.expense.toFixed(2))
    }));

  const COLORS = ['#9accff', '#ccffff', '#ffcc9a', '#ccffcc', '#ffffcc', '#9accff', '#ffcc9a', '#ccffcc'];

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Charts</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Add transactions to see visualizations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-primary/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 mb-8 border border-primary/30 dark:border-gray-600">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-1 h-8 bg-primary dark:bg-blue-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Charts & Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Expenses by Category */}
        {pieData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Expenses by Category</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Line Chart - Income vs Expenses Over Time */}
        {lineData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Income vs Expenses Over Time</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-700 dark:text-gray-300" />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-700 dark:text-gray-300" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} name="Expense" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
