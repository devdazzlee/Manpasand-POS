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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, CreditCard, Gift, DollarSign, Users } from "lucide-react"

export function GiftCards() {
  const [giftCards, setGiftCards] = useState([
    {
      id: "GC-001",
      code: "GIFT2024001",
      balance: 5000,
      originalValue: 5000,
      customer: "John Doe",
      issueDate: "2024-01-15",
      status: "active",
      lastUsed: "2024-01-20",
    },
    {
      id: "GC-002",
      code: "GIFT2024002",
      balance: 2500,
      originalValue: 5000,
      customer: "Jane Smith",
      issueDate: "2024-01-14",
      status: "active",
      lastUsed: "2024-01-18",
    },
  ])

  const [isIssueOpen, setIsIssueOpen] = useState(false)
  const [isReloadOpen, setIsReloadOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "used":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gift Cards</h1>
          <p className="text-gray-600">Manage gift card issuance and transactions</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isReloadOpen} onOpenChange={setIsReloadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Reload Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reload Gift Card</DialogTitle>
                <DialogDescription>Add value to an existing gift card</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-code">Gift Card Code</Label>
                  <Input placeholder="Enter gift card code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reload-amount">Reload Amount</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReloadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsReloadOpen(false)}>Reload Card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isIssueOpen} onOpenChange={setIsIssueOpen}>
            <DialogTrigger asChild>
              <Button>
                <Gift className="w-4 h-4 mr-2" />
                Issue Gift Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue New Gift Card</DialogTitle>
                <DialogDescription>Create a new gift card for a customer</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input placeholder="Enter customer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Gift Card Value</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Input placeholder="Gift message" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsIssueOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsIssueOpen(false)}>Issue Card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">Outstanding balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redeemed Today</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,500</div>
            <p className="text-xs text-muted-foreground">23 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Cards</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Issued today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="used">Fully Used</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search gift cards..." className="pl-10" />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Gift Cards</CardTitle>
              <CardDescription>Manage all gift cards and their transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card ID</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Original Value</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {giftCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.id}</TableCell>
                      <TableCell className="font-mono">{card.code}</TableCell>
                      <TableCell>{card.customer}</TableCell>
                      <TableCell>₹{card.originalValue.toLocaleString()}</TableCell>
                      <TableCell>₹{card.balance.toLocaleString()}</TableCell>
                      <TableCell>{card.issueDate}</TableCell>
                      <TableCell>{card.lastUsed}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(card.status)}>{card.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Reload
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
