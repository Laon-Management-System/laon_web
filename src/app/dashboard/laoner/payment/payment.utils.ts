export const formatCurrency = (amount: number | string | undefined, currency: string) => {
  if (amount === undefined || amount === null) return '0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (currency === 'KHR') {
    return `${numAmount.toLocaleString()} ៛`;
  }
  return `$${numAmount.toLocaleString()}`;
}

export const calculatePayments = (loanAmount: number, interestRate: number, duration: number) => {
  const monthlyInterest = Number((loanAmount * interestRate / 100).toFixed(2))
  
  // Get current date for due dates calculation
  const startDate = new Date()
  
  return Array.from({ length: duration }, (_, i) => {
    const isLastMonth = i === duration - 1
    
    // Calculate due date for each month
    const dueDate = new Date(startDate)
    dueDate.setMonth(dueDate.getMonth() + i + 1)
    
    return {
      month: i + 1,
      payment: isLastMonth ? (loanAmount + monthlyInterest) : monthlyInterest,
      principal: isLastMonth ? loanAmount : 0,
      interest: monthlyInterest,
      remainingBalance: isLastMonth ? 0 : loanAmount,
      status: 'មិនទាន់បង់',
      dueDate: dueDate.toLocaleDateString('km-KH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      paidDate: ''
    }
  })
}