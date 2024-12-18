'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(250000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(15)

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return monthlyPayment.toFixed(2)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Aircraft Loan Calculator</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="loanAmount">Loan Amount: ${loanAmount.toLocaleString()}</Label>
          <Slider
            id="loanAmount"
            min={100000}
            max={10000000}
            step={10000}
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="interestRate">Interest Rate: {interestRate}%</Label>
          <Slider
            id="interestRate"
            min={1}
            max={20}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="loanTerm">Loan Term (years): {loanTerm}</Label>
          <Slider
            id="loanTerm"
            min={1}
            max={30}
            step={1}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Monthly Payment:</h3>
          <p className="text-3xl font-bold text-blue-600">${calculateMonthlyPayment()}</p>
        </div>
      </div>
    </div>
  )
}

export default LoanCalculator

