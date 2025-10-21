// Process recurring transactions and generate actual transactions
export const processRecurringTransactions = (recurringTransactions, existingTransactions) => {
  const newTransactions = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  recurringTransactions.forEach(recurring => {
    if (!recurring.active) return; // Skip paused recurring transactions

    const startDate = new Date(recurring.startDate);
    const endDate = recurring.endDate ? new Date(recurring.endDate) : null;
    const lastGenerated = recurring.lastGenerated ? new Date(recurring.lastGenerated) : null;

    // Check if end date has passed
    if (endDate && endDate < today) return;

    // Determine the next date to generate
    let nextDate = lastGenerated || startDate;
    
    // If last generated was in the past, calculate the next occurrence
    if (nextDate < today) {
      nextDate = getNextOccurrence(nextDate, recurring.frequency, today);
    }

    // Generate transactions from last generated (or start) up to today
    while (nextDate <= today && (!endDate || nextDate <= endDate)) {
      const dateString = nextDate.toISOString().split('T')[0];
      
      // Check if we already have a transaction for this recurring on this date
      const alreadyExists = existingTransactions.some(
        t => t.recurringId === recurring.id && t.date === dateString
      );

      if (!alreadyExists) {
        newTransactions.push({
          id: Date.now() + Math.random(), // Unique ID
          type: recurring.type,
          amount: recurring.amount,
          category: recurring.category,
          description: `${recurring.description} (Recurring)`,
          date: dateString,
          recurringId: recurring.id
        });
      }

      // Move to next occurrence
      nextDate = getNextOccurrence(nextDate, recurring.frequency);
    }

    // Update lastGenerated date
    if (newTransactions.length > 0) {
      recurring.lastGenerated = today.toISOString().split('T')[0];
    }
  });

  return newTransactions;
};

// Calculate next occurrence based on frequency
const getNextOccurrence = (fromDate, frequency, minDate = null) => {
  const nextDate = new Date(fromDate);

  switch (frequency) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      nextDate.setMonth(nextDate.getMonth() + 1);
  }

  // If minDate is provided and nextDate is before it, keep advancing
  if (minDate && nextDate < minDate) {
    return getNextOccurrence(nextDate, frequency, minDate);
  }

  return nextDate;
};

// Get the next scheduled date for a recurring transaction
export const getNextScheduledDate = (recurring) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = new Date(recurring.startDate);
  const lastGenerated = recurring.lastGenerated ? new Date(recurring.lastGenerated) : null;
  const endDate = recurring.endDate ? new Date(recurring.endDate) : null;

  if (endDate && endDate < today) {
    return 'Ended';
  }

  let nextDate = lastGenerated || startDate;
  
  if (nextDate < today) {
    nextDate = getNextOccurrence(nextDate, recurring.frequency, today);
  } else if (nextDate.getTime() === today.getTime()) {
    nextDate = getNextOccurrence(nextDate, recurring.frequency);
  }

  if (endDate && nextDate > endDate) {
    return 'Ending soon';
  }

  return nextDate.toISOString().split('T')[0];
};
