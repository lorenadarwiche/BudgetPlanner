import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import RecurringTransactionList from './components/RecurringTransactionList';
import Filters from './components/Filters';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import Login from './components/Login';
import Register from './components/Register';
import { processRecurringTransactions } from './utils/recurringUtils';

function BudgetTrackerApp() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [recurringTransactions, setRecurringTransactions] = useState([]);
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
      const userRecurringKey = `recurring_${currentUser.id}`;
      
      const savedTransactions = localStorage.getItem(userTransactionsKey);
      const savedRecurring = localStorage.getItem(userRecurringKey);
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions([]);
      }
      
      if (savedRecurring) {
        setRecurringTransactions(JSON.parse(savedRecurring));
      } else {
        setRecurringTransactions([]);
      }
    } else {
      // Reset to login screen when user logs out
      setShowLogin(true);
    }
  }, [currentUser]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      const userTransactionsKey = `transactions_${currentUser.id}`;
      localStorage.setItem(userTransactionsKey, JSON.stringify(transactions));
    }
  }, [transactions, currentUser]);

  // Save recurring transactions to localStorage
  useEffect(() => {
    if (currentUser) {
      const userRecurringKey = `recurring_${currentUser.id}`;
      localStorage.setItem(userRecurringKey, JSON.stringify(recurringTransactions));
    }
  }, [recurringTransactions, currentUser]);

  // Process recurring transactions daily
  useEffect(() => {
    if (currentUser && recurringTransactions.length > 0) {
      const newTransactions = processRecurringTransactions(recurringTransactions, transactions);
      if (newTransactions.length > 0) {
        setTransactions([...newTransactions, ...transactions]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, recurringTransactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addRecurringTransaction = (recurring) => {
    setRecurringTransactions([recurring, ...recurringTransactions]);
  };

  const deleteRecurringTransaction = (id) => {
    setRecurringTransactions(recurringTransactions.filter(r => r.id !== id));
  };

  const toggleRecurringTransaction = (id) => {
    setRecurringTransactions(
      recurringTransactions.map(r =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  };

  const editRecurringTransaction = (id, updates) => {
    setRecurringTransactions(
      recurringTransactions.map(r =>
        r.id === id ? { ...r, ...updates } : r
      )
    );
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
        
        <TransactionForm 
          onAddTransaction={addTransaction}
          onAddRecurring={addRecurringTransaction}
        />
        
        {recurringTransactions.length > 0 && (
          <RecurringTransactionList
            recurringTransactions={recurringTransactions}
            onDelete={deleteRecurringTransaction}
            onToggle={toggleRecurringTransaction}
            onEdit={editRecurringTransaction}
          />
        )}
        
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
