"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, RotateCcw, CreditCard, DollarSign } from "lucide-react"

export function Returns() {
  const [returns, setReturns] = useState([
    {
      id: "RET-001",
      saleId: "SALE-1234",
      customer: "John Doe",
      date: "2024-01-15",
      reason: "Defective",
      amount: 2500,
      status: "pending",
      method: "cash",
    },
    {
      id: "RET-002",
      saleId: "SALE-1235",
      customer: "Jane Smith",
      date: "2024-01-14",
      reason: "Wrong Size",
      amount: 1800,
      status: "approved",
      method: "exchange",
    },
  ])

  const [isProcessOpen, setIsProcessOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Returns & Refunds</h1>
          <p className="text-gray-600">Process customer returns and refunds</p>
        </div>
        <Dialog open={isProcessOpen} onOpenChange={setIsProcessOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Process Return
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Process Return</DialogTitle>
              <DialogDescription>Process a customer return or refund</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sale-id">Original Sale ID</Label>
                  <Input placeholder="Enter sale ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input placeholder="Customer name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Return Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defective">Defective Product</SelectItem>
                    <SelectItem value="wrong-size">Wrong Size</SelectItem>
                    <SelectItem value="not-satisfied">Not Satisfied</SelectItem>
                    <SelectItem value="damaged">Damaged in Transit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refund-method">Refund Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash Refund</SelectItem>
                    <SelectItem value="card">Card Refund</SelectItem>
                    <SelectItem value="store-credit">Store Credit</SelectItem>
                    <SelectItem value="exchange">Exchange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea placeholder="Additional notes about the return" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProcessOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsProcessOpen(false)}>Process Return</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <p className="text-xs text-muted-foreground">Today's total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">Of total sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Returns</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search returns..." className="pl-10" />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Returns & Refunds</CardTitle>
              <CardDescription>Manage customer returns and refunds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return ID</TableHead>
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returns.map((returnItem) => (
                    <TableRow key={returnItem.id}>
                      <TableCell className="font-medium">{returnItem.id}</TableCell>
                      <TableCell>{returnItem.saleId}</TableCell>
                      <TableCell>{returnItem.customer}</TableCell>
                      <TableCell>{returnItem.date}</TableCell>
                      <TableCell>{returnItem.reason}</TableCell>
                      <TableCell>₹{returnItem.amount.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{returnItem.method}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(returnItem.status)}>{returnItem.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
