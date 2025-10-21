import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import Filters from './components/Filters';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import Login from './components/Login';
import Register from './components/Register';

function BudgetTrackerApp() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [showLogin, setShowLogin] = useState(true);

  // Load user-specific transactions from localStorage on mount or user change
  useEffect(() => {
    if (currentUser) {
      const userTransactionsKey = `transactions_${currentUser.id}`;
      const savedTransactions = localStorage.getItem(userTransactionsKey);
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions([]);
      }
    }
  }, [currentUser]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      const userTransactionsKey = `transactions_${currentUser.id}`;
      localStorage.setItem(userTransactionsKey, JSON.stringify(transactions));
    }
  }, [transactions, currentUser]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filter transactions based on current filters
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filters.type === 'all' || transaction.type === filters.type;
    const categoryMatch = filters.category === 'all' || transaction.category === filters.category;
    const dateFromMatch = !filters.dateFrom || transaction.date >= filters.dateFrom;
    const dateToMatch = !filters.dateTo || transaction.date <= filters.dateTo;
    
    return typeMatch && categoryMatch && dateFromMatch && dateToMatch;
  });

  // Show login/register if not authenticated
  if (!currentUser) {
    return showLogin ? (
      <Login onSwitchToRegister={() => setShowLogin(false)} />
    ) : (
      <Register onSwitchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary/10 to-primary/10 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Summary transactions={filteredTransactions} />
        
        <TransactionForm onAddTransaction={addTransaction} />
        
        <Filters 
          filters={filters} 
          onFilterChange={setFilters}
          transactions={transactions}
        />
        
        <Charts transactions={filteredTransactions} />
        
        <TransactionList 
          transactions={filteredTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BudgetTrackerApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
