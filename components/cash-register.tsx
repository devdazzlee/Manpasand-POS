"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { DollarSign, CreditCard, Clock, User, Calculator, Receipt, AlertCircle } from "lucide-react"

export function CashRegister() {
  const [cashDrawer, setCashDrawer] = useState({
    openingAmount: 200.0,
    currentAmount: 847.5,
    totalSales: 2847.5,
    totalCash: 1456.75,
    totalCard: 1390.75,
    transactions: 156,
  })

  const [isOpenDrawerDialogOpen, setIsOpenDrawerDialogOpen] = useState(false)
  const [isCloseDrawerDialogOpen, setIsCloseDrawerDialogOpen] = useState(false)
  const [isAddCashDialogOpen, setIsAddCashDialogOpen] = useState(false)
  const [isRemoveCashDialogOpen, setIsRemoveCashDialogOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")

  const denominations = [
    { value: 100, label: "$100", count: 2 },
    { value: 50, label: "$50", count: 4 },
    { value: 20, label: "$20", count: 15 },
    { value: 10, label: "$10", count: 12 },
    { value: 5, label: "$5", count: 8 },
    { value: 1, label: "$1", count: 25 },
    { value: 0.25, label: "Quarter", count: 40 },
    { value: 0.1, label: "Dime", count: 30 },
    { value: 0.05, label: "Nickel", count: 20 },
    { value: 0.01, label: "Penny", count: 50 },
  ]

  const recentTransactions = [
    { id: "TXN156", time: "14:30", amount: 45.5, type: "Cash", customer: "John Doe" },
    { id: "TXN155", time: "14:25", amount: 78.2, type: "Card", customer: "Jane Smith" },
    { id: "TXN154", time: "14:20", amount: 32.1, type: "Cash", customer: "Walk-in" },
    { id: "TXN153", time: "14:15", amount: 156.75, type: "Card", customer: "Mike Johnson" },
    { id: "TXN152", time: "14:10", amount: 89.3, type: "Cash", customer: "Sarah Wilson" },
  ]

  const handleOpenDrawer = () => {
    // Logic to open cash drawer
    setIsOpenDrawerDialogOpen(false)
    alert("Cash drawer opened!")
  }

  const handleCloseDrawer = () => {
    // Logic to close cash drawer and generate report
    setIsCloseDrawerDialogOpen(false)
    alert("Cash drawer closed and report generated!")
  }

  const handleAddCash = () => {
    if (amount) {
      setCashDrawer((prev) => ({
        ...prev,
        currentAmount: prev.currentAmount + Number.parseFloat(amount),
      }))
      setAmount("")
      setReason("")
      setIsAddCashDialogOpen(false)
    }
  }

  const handleRemoveCash = () => {
    if (amount) {
      setCashDrawer((prev) => ({
        ...prev,
        currentAmount: prev.currentAmount - Number.parseFloat(amount),
      }))
      setAmount("")
      setReason("")
      setIsRemoveCashDialogOpen(false)
    }
  }

  const totalCashInDrawer = denominations.reduce((sum, denom) => sum + denom.value * denom.count, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cash Register</h1>
          <p className="text-gray-600">Manage cash drawer and daily operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Clock className="h-3 w-3 mr-1" />
            Shift: 10:00 AM - 6:00 PM
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <User className="h-3 w-3 mr-1" />
            Cashier: Sarah Johnson
          </Badge>
        </div>
      </div>

      {/* Cash Drawer Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opening Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashDrawer.openingAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${cashDrawer.currentAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashDrawer.totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cashDrawer.transactions}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Drawer Management */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Drawer Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Cash Sales</div>
                <div className="text-xl font-bold text-blue-900">${cashDrawer.totalCash.toFixed(2)}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 mb-1">Card Sales</div>
                <div className="text-xl font-bold text-purple-900">${cashDrawer.totalCard.toFixed(2)}</div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12" onClick={() => setIsOpenDrawerDialogOpen(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Open Drawer
              </Button>
              <Button variant="outline" className="h-12" onClick={() => setIsAddCashDialogOpen(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Add Cash
              </Button>
              <Button variant="outline" className="h-12" onClick={() => setIsRemoveCashDialogOpen(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Remove Cash
              </Button>
              <Button variant="outline" className="h-12" onClick={() => setIsCloseDrawerDialogOpen(true)}>
                <Receipt className="h-4 w-4 mr-2" />
                Close Drawer
              </Button>
            </div>

            {Math.abs(totalCashInDrawer - cashDrawer.currentAmount) > 0.01 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Cash count mismatch: Expected ${cashDrawer.currentAmount.toFixed(2)}, Counted $
                    {totalCashInDrawer.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cash Count */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {denominations.map((denom, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium w-16">{denom.label}</span>
                    <span className="text-sm text-gray-500">× {denom.count}</span>
                  </div>
                  <span className="font-medium">${(denom.value * denom.count).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between font-bold text-lg">
                <span>Total Cash</span>
                <span>${totalCashInDrawer.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${transaction.type === "Cash" ? "bg-green-100" : "bg-blue-100"}`}>
                    {transaction.type === "Cash" ? (
                      <DollarSign
                        className={`h-4 w-4 ${transaction.type === "Cash" ? "text-green-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.id}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.customer} • {transaction.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                  <Badge variant="outline" className="text-xs">
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={isOpenDrawerDialogOpen} onOpenChange={setIsOpenDrawerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open Cash Drawer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">Are you sure you want to open the cash drawer?</p>
            <div className="flex space-x-2">
              <Button onClick={handleOpenDrawer} className="flex-1">
                Open Drawer
              </Button>
              <Button variant="outline" onClick={() => setIsOpenDrawerDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddCashDialogOpen} onOpenChange={setIsAddCashDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Cash to Drawer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-amount">Amount</Label>
              <Input
                id="add-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="add-reason">Reason</Label>
              <Input
                id="add-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Change fund, Till adjustment"
              />
            </div>
            <Button onClick={handleAddCash} className="w-full">
              Add Cash
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRemoveCashDialogOpen} onOpenChange={setIsRemoveCashDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Cash from Drawer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="remove-amount">Amount</Label>
              <Input
                id="remove-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="remove-reason">Reason</Label>
              <Input
                id="remove-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Bank deposit, Petty cash"
              />
            </div>
            <Button onClick={handleRemoveCash} className="w-full">
              Remove Cash
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCloseDrawerDialogOpen} onOpenChange={setIsCloseDrawerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Cash Drawer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              This will close the cash drawer and generate an end-of-day report. Make sure all transactions are
              complete.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Opening Amount:</span>
                <span>${cashDrawer.openingAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Sales:</span>
                <span>${cashDrawer.totalSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Amount:</span>
                <span>${cashDrawer.currentAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Transactions:</span>
                <span>{cashDrawer.transactions}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCloseDrawer} className="flex-1">
                Close Drawer
              </Button>
              <Button variant="outline" onClick={() => setIsCloseDrawerDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
