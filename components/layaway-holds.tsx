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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Clock, DollarSign, Package, Calendar } from "lucide-react"

export function LayawayHolds() {
  const [layaways, setLayaways] = useState([
    {
      id: "LAY-001",
      customer: "John Doe",
      items: "iPhone 15 Pro, AirPods",
      totalAmount: 125000,
      paidAmount: 50000,
      remainingAmount: 75000,
      startDate: "2024-01-15",
      dueDate: "2024-03-15",
      status: "active",
      paymentPlan: "monthly",
    },
    {
      id: "LAY-002",
      customer: "Jane Smith",
      items: "MacBook Pro",
      totalAmount: 200000,
      paidAmount: 80000,
      remainingAmount: 120000,
      startDate: "2024-01-10",
      dueDate: "2024-04-10",
      status: "active",
      paymentPlan: "weekly",
    },
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "overdue":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentProgress = (paid: number, total: number) => {
    return (paid / total) * 100
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Layaway & Holds</h1>
          <p className="text-gray-600">Manage customer layaway plans and product holds</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Layaway
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Layaway Plan</DialogTitle>
              <DialogDescription>Set up a new layaway plan for a customer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input placeholder="Customer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input placeholder="Customer phone" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items</Label>
                <Input placeholder="List of items for layaway" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total-amount">Total Amount</Label>
                  <Input type="number" placeholder="Total cost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down Payment</Label>
                  <Input type="number" placeholder="Initial payment" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-plan">Payment Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Final Due Date</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Layaway</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Layaways</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,50,000</div>
            <p className="text-xs text-muted-foreground">In layaway plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Payment due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Layaways</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="due">Due Soon</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search layaways..." className="pl-10" />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Layaway Plans</CardTitle>
              <CardDescription>Manage customer layaway and payment plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layaway ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Payment Progress</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {layaways.map((layaway) => (
                    <TableRow key={layaway.id}>
                      <TableCell className="font-medium">{layaway.id}</TableCell>
                      <TableCell>{layaway.customer}</TableCell>
                      <TableCell>{layaway.items}</TableCell>
                      <TableCell>₹{layaway.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress
                            value={getPaymentProgress(layaway.paidAmount, layaway.totalAmount)}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500">
                            ₹{layaway.paidAmount.toLocaleString()} / ₹{layaway.totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>₹{layaway.remainingAmount.toLocaleString()}</TableCell>
                      <TableCell>{layaway.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(layaway.status)}>{layaway.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Payment
                          </Button>
                          <Button variant="outline" size="sm">
                            View
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
