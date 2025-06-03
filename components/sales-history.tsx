"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, RefreshCw, Download, Calendar, Filter, Receipt } from "lucide-react"

interface Sale {
  id: string
  date: string
  time: string
  customer: string
  items: number
  total: number
  paymentMethod: string
  status: "completed" | "refunded" | "pending"
  cashier: string
}

export function SalesHistory() {
  const [sales] = useState<Sale[]>([
    {
      id: "TXN001",
      date: "2024-01-15",
      time: "14:30",
      customer: "John Doe",
      items: 5,
      total: 45.5,
      paymentMethod: "Cash",
      status: "completed",
      cashier: "Sarah Johnson",
    },
    {
      id: "TXN002",
      date: "2024-01-15",
      time: "14:25",
      customer: "Jane Smith",
      items: 3,
      total: 78.2,
      paymentMethod: "Card",
      status: "completed",
      cashier: "Mike Davis",
    },
    {
      id: "TXN003",
      date: "2024-01-15",
      time: "14:20",
      customer: "Walk-in Customer",
      items: 2,
      total: 32.1,
      paymentMethod: "Cash",
      status: "pending",
      cashier: "Sarah Johnson",
    },
    {
      id: "TXN004",
      date: "2024-01-15",
      time: "14:15",
      customer: "Mike Johnson",
      items: 8,
      total: 156.75,
      paymentMethod: "Card",
      status: "completed",
      cashier: "Lisa Wilson",
    },
    {
      id: "TXN005",
      date: "2024-01-15",
      time: "14:10",
      customer: "Sarah Wilson",
      items: 4,
      total: 89.3,
      paymentMethod: "Cash",
      status: "refunded",
      cashier: "Mike Davis",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesPayment = paymentFilter === "all" || sale.paymentMethod.toLowerCase() === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0)
  const completedSales = filteredSales.filter((sale) => sale.status === "completed").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
          <p className="text-gray-600">View and manage all sales transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredSales.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredSales.length > 0 ? (totalSales / filteredSales.length).toFixed(2) : "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by transaction ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cashier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.date}</div>
                      <div className="text-sm text-gray-500">{sale.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell className="font-medium">${sale.total.toFixed(2)}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                  </TableCell>
                  <TableCell>{sale.cashier}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedSale(sale)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Receipt className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sale Details Dialog */}
      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details - {selectedSale?.id}</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Transaction Info</h3>
                  <div className="space-y-1 text-sm">
                    <div>Date: {selectedSale.date}</div>
                    <div>Time: {selectedSale.time}</div>
                    <div>Cashier: {selectedSale.cashier}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Customer Info</h3>
                  <div className="space-y-1 text-sm">
                    <div>Name: {selectedSale.customer}</div>
                    <div>Payment: {selectedSale.paymentMethod}</div>
                    <div>
                      Status: <Badge className={getStatusColor(selectedSale.status)}>{selectedSale.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Items Purchased</h3>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Sample items for transaction {selectedSale.id}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Banana x 2</span>
                      <span>$1.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orange x 3</span>
                      <span>$1.80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Milk x 1</span>
                      <span>$3.50</span>
                    </div>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${selectedSale.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Receipt className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Process Refund
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
