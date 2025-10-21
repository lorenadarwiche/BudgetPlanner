// Export transactions to CSV format
export const exportToCSV = (transactions, filename = 'budget-tracker-export.csv') => {
  if (transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // CSV headers
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map(t => [
    t.date,
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.category,
    t.amount.toFixed(2),
    `"${t.description.replace(/"/g, '""')}"` // Escape quotes in description
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export transactions to Excel format (actually CSV with .xlsx extension for simplicity)
// For a true Excel file, you'd need a library like xlsx
export const exportToExcel = (transactions, filename = 'budget-tracker-export.xlsx') => {
  if (transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // For simplicity, we'll use CSV format with .xlsx extension
  // To create a real Excel file, install: npm install xlsx
  // Then use the XLSX library
  
  // CSV headers with better Excel compatibility
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  
  // Convert transactions to rows
  const rows = transactions.map(t => [
    t.date,
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.category,
    t.amount.toFixed(2),
    `"${t.description.replace(/"/g, '""')}"`
  ]);

  // Add summary at the bottom
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  // Combine all content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
    '', // Empty line
    'Summary', '', '', '', '',
    `Total Income,,,${totalIncome.toFixed(2)}`,
    `Total Expenses,,,${totalExpenses.toFixed(2)}`,
    `Balance,,,${balance.toFixed(2)}`
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
