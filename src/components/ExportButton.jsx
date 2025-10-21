import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { exportToCSV, exportToExcel } from '../utils/exportUtils';

const ExportButton = ({ transactions }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExportCSV = () => {
    const filename = `budget-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(transactions, filename);
    setShowMenu(false);
  };

  const handleExportExcel = () => {
    const filename = `budget-tracker-${new Date().toISOString().split('T')[0]}.xlsx`;
    exportToExcel(transactions, filename);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-blue-500 hover:shadow-xl text-gray-800 dark:text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105"
        disabled={transactions.length === 0}
      >
        <Download className="w-5 h-5" />
        <span>Export Data</span>
      </button>

      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          ></div>
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-600 overflow-hidden z-20">
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            >
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Export as CSV</span>
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-600"></div>
            
            <button
              onClick={handleExportExcel}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            >
              <FileSpreadsheet className="w-5 h-5 text-green-500" />
              <span className="font-medium">Export as Excel</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton;
