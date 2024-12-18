'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import '@/styles/loan-calculator.css'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000)
  const [loanTerm, setLoanTerm] = useState(2)
  const [interestRate, setInterestRate] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalLoanCost, setTotalLoanCost] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    // Calculate the loan amount after down payment
    const principalAmount = loanAmount * (1 - downPayment / 100)
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    let calculatedMonthlyPayment
    let calculatedTotalCost
    let calculatedTotalInterest

    if (interestRate === 0) {
      // Simple division for 0% interest
      calculatedMonthlyPayment = principalAmount / numberOfPayments
      calculatedTotalCost = principalAmount
      calculatedTotalInterest = 0
    } else {
      // Standard loan payment formula
      calculatedMonthlyPayment = 
        (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      
      calculatedTotalCost = calculatedMonthlyPayment * numberOfPayments
      calculatedTotalInterest = calculatedTotalCost - principalAmount
    }

    setMonthlyPayment(calculatedMonthlyPayment)
    setTotalLoanCost(calculatedTotalCost)
    setTotalInterest(calculatedTotalInterest)
  }, [loanAmount, loanTerm, interestRate, downPayment])

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#564cf9]/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-center text-black">Aircraft Loan Calculator</CardTitle>
        <CardDescription className="text-center text-black/80">Estimate your monthly payments and financing options instantly.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 flex-grow">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-base text-black">Loan Amount</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="loanAmount"
                  min={250000}
                  max={500000000}
                  step={10000}
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(250000, Math.min(500000000, Number(e.target.value))))}
                  className="w-24 md:w-32 no-spinner"
                  min="250000"
                  max="500000000"
                />
              </div>
              <p className="text-sm text-black/80">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm" className="text-base text-black">Loan Term (Years)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="loanTerm"
                  min={2}
                  max={30}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Math.max(2, Math.min(30, Number(e.target.value))))}
                  className="w-24 no-spinner"
                  min="2"
                  max="30"
                />
              </div>
              <p className="text-sm text-black/80">{loanTerm} {loanTerm === 1 ? 'year' : 'years'}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-base text-black">Interest Rate (%)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="interestRate"
                  min={0}
                  max={30}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-grow"
                />
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Math.min(30, Number(e.target.value))))}
                    className="w-20 no-spinner"
                    step={0.1}
                    min="0"
                    max="30"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment" className="text-base text-black">Down Payment (%)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="downPayment"
                  min={0}
                  max={99}
                  step={1}
                  value={[downPayment]}
                  onValueChange={(value) => setDownPayment(value[0])}
                  className="flex-grow"
                />
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Math.max(0, Math.min(99, Number(e.target.value))))}
                    className="w-20 no-spinner"
                    min="0"
                    max="99"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>
              <p className="text-sm text-black/80">{formatCurrency(loanAmount * downPayment / 100)}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/20 rounded-lg p-4 md:p-6 space-y-4">
              <h3 className="text-xl font-semibold text-black text-center">Loan Summary</h3>
              <div className="space-y-2">
                <div className="flex flex-col items-center justify-center py-4 bg-white/30 rounded-lg">
                  <p className="text-sm font-medium text-black/80">Monthly Payment</p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">{formatCurrency(monthlyPayment)}</p>
                </div>
                <Separator className="bg-black/20" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-black/80">Total Loan Cost</p>
                    <p className="text-base md:text-lg font-semibold text-black">{formatCurrency(totalLoanCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black/80">Principal</p>
                    <p className="text-base md:text-lg font-semibold text-black">{formatCurrency(loanAmount * (1 - downPayment / 100))}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black/80">Total Interest</p>
                    <p className="text-base md:text-lg font-semibold text-black">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black/80">Down Payment</p>
                    <p className="text-base md:text-lg font-semibold text-black">{formatCurrency(loanAmount * downPayment / 100)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 flex justify-center">
          <Link href="/register">
            <Button className="w-full md:w-64 bg-black hover:bg-black/90 text-white rounded-full py-2 md:py-3 text-sm md:text-base">Get Personalized Options</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

