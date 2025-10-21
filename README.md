# Budget Tracker

A modern, feature-rich budget tracking application built with React, Tailwind CSS, and Recharts. Track your income and expenses, visualize spending patterns, and manage your finances with ease.

## Features

- **🔐 User Authentication**: Secure login and registration system with personalized accounts
- **📧 Email Verification**: Real email sending via EmailJS (with demo mode fallback)
- **👤 User-Specific Data**: Each user has their own isolated transaction data
- **🌓 Dark Mode**: Toggle between light and dark themes with persistent preference
- **Add Transactions**: Record income and expense transactions with amount, category, date, and description
- **Categorize Transactions**: Organize transactions into predefined categories (Food, Rent, Travel, etc.)
- **Visual Analytics**: 
  - Pie chart showing expense breakdown by category
  - Line chart displaying income vs expenses over time
- **Smart Filtering**: Filter transactions by type, category, and date range
- **Real-time Summary**: View total income, expenses, and balance at a glance
- **Persistent Storage**: All data is saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient cards and sleek pastel color scheme

## Tech Stack

- **Frontend**: React 18 with Hooks (useState, useEffect, useContext)
- **Styling**: Tailwind CSS with custom color palette and dark mode
- **Charts**: Recharts
- **Icons**: Lucide React
- **Email Service**: EmailJS for verification emails
- **Authentication**: Custom Context API with localStorage
- **Storage**: Browser localStorage (user-specific data isolation)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd budget-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Email Configuration (Optional)

By default, the app runs in **demo mode** where verification codes are displayed on screen. To send real emails:

1. **Sign up for EmailJS** (free): [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Follow the setup guide**: See `EMAILJS_SETUP.md` for detailed instructions
3. **Create a `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```
4. **Add your credentials** to the `.env` file
5. **Restart the app**: `npm start`

Once configured, verification codes will be sent to users' actual email addresses instead of being displayed on screen.

## Usage

### Creating an Account

1. When you first open the app, you'll see the login screen
2. Click "Create one" to go to the registration page
3. Enter your name, email, and password
4. Click "Create Account"
5. **Email Verification**:
   - A 6-digit verification code will be sent to your email
   - **Demo Mode**: If EmailJS is not configured, the code is displayed on screen
   - **Email Mode**: Check your email inbox (and spam folder) for the code
   - Enter the 6-digit code to verify
   - You can resend the code after 60 seconds
6. After verification, you'll be automatically logged in

### Logging In

1. Enter your email and password on the login screen
2. Click "Sign In"
3. If your email is not verified, you'll be prompted to verify it first
4. Your personal budget data will load automatically

### Adding a Transaction

1. Fill in the transaction form at the top:
   - Select transaction type (Income or Expense)
   - Enter the amount
   - Choose a category
   - Set the date
   - Add a description
2. Click the "Add" button

### Filtering Transactions

Use the filters section to:
- Filter by transaction type (All, Income, Expense)
- Filter by category
- Set a date range (from/to)

### Viewing Analytics

- **Summary Cards**: Shows total income, expenses, and balance
- **Pie Chart**: Visualizes expense distribution by category
- **Line Chart**: Tracks income and expenses over time

### Managing Transactions

- View all transactions in the transaction list
- Delete transactions by clicking the trash icon

## Project Structure

```
budget-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar with dark mode toggle
│   │   ├── Login.jsx           # Login form
│   │   ├── Register.jsx        # Registration form
│   │   ├── EmailVerification.jsx # Email verification screen
│   │   ├── Summary.jsx         # Summary cards (income/expenses/balance)
│   │   ├── TransactionForm.jsx # Form to add transactions
│   │   ├── Filters.jsx         # Filter controls
│   │   ├── Charts.jsx          # Pie and line charts
│   │   └── TransactionList.jsx # Transaction table
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Authentication context provider
│   │   └── ThemeContext.jsx    # Dark/light theme context provider
│   ├── services/
│   │   └── emailService.js     # EmailJS integration
│   ├── App.js                  # Main app component with auth
│   ├── index.css               # Tailwind CSS imports
│   └── index.js                # App entry point
├── tailwind.config.js          # Tailwind config with dark mode
├── postcss.config.js
├── .env.example                # EmailJS configuration template
├── EMAILJS_SETUP.md            # Email setup guide
└── package.json
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Future Enhancements

<<<<<<< HEAD
=======
- ✅ ~~User authentication for multi-user support~~ (Implemented!)
- ✅ ~~Email verification system~~ (Implemented!)
- ✅ ~~Dark mode toggle~~ (Implemented!)
>>>>>>> 17e7f06 (Add dark mode support and EmailJS integration)
- Backend API integration with database (MongoDB/PostgreSQL)
- Password encryption and secure authentication
- Export data to CSV/Excel
- Recurring transaction support
- Budget goals and alerts
- Monthly/yearly reports
- Email notifications for budget alerts
- Multi-device sync with cloud backend
- Social sharing features

## License

This project is open source and available under the MIT License.
