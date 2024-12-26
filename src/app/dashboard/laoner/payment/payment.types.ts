export interface PaymentRow {
    month: number
    payment: number
    principal: number
    interest: number
    remainingBalance: number
    status: string
    dueDate?: string
    paidDate?: string
  }
  
  export interface MonthlyPayingProps {
    loanAmount: number
    interestRate: number
    duration: number
    currency: string
    loanerId?: number
    renderPaymentButton?: (month: number) => React.ReactNode
  }