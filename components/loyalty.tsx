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
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Eye, Star, Users, Award, TrendingUp } from "lucide-react"

export function Loyalty() {
  const [members, setMembers] = useState([
    {
      id: "LM-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      tier: "Gold",
      points: 2500,
      totalSpent: 45000,
      joinDate: "2023-06-15",
      lastVisit: "2024-01-20",
    },
    {
      id: "LM-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 98765 43211",
      tier: "Silver",
      points: 1200,
      totalSpent: 25000,
      joinDate: "2023-08-20",
      lastVisit: "2024-01-18",
    },
  ])

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "bg-orange-100 text-orange-800"
      case "Silver":
        return "bg-gray-100 text-gray-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Platinum":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierProgress = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return 25
      case "Silver":
        return 50
      case "Gold":
        return 75
      case "Platinum":
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loyalty Program</h1>
          <p className="text-gray-600">Manage customer loyalty and rewards</p>
        </div>
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Loyalty Member</DialogTitle>
              <DialogDescription>Enroll a new customer in the loyalty program</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="member-name">Customer Name</Label>
                <Input placeholder="Enter customer name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-email">Email</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-phone">Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initial-points">Initial Points (Optional)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddMemberOpen(false)}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+89 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Issued</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Redeemed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tier Distribution</CardTitle>
            <CardDescription>Member distribution across tiers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Bronze (0-999 points)</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Silver (1000-2499 points)</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gold (2500-4999 points)</span>
                <span>20%</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Platinum (5000+ points)</span>
                <span>5%</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loyalty Settings</CardTitle>
            <CardDescription>Configure loyalty program rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Points per ₹1 spent</Label>
              <Input type="number" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label>Points redemption value</Label>
              <Input defaultValue="₹1 = 100 points" />
            </div>
            <div className="space-y-2">
              <Label>Tier upgrade thresholds</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Silver: 1000" />
                <Input placeholder="Gold: 2500" />
              </div>
            </div>
            <Button className="w-full">Update Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="bronze">Bronze</TabsTrigger>
          <TabsTrigger value="silver">Silver</TabsTrigger>
          <TabsTrigger value="gold">Gold</TabsTrigger>
          <TabsTrigger value="platinum">Platinum</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Members</CardTitle>
              <CardDescription>Manage loyalty program members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.email}</div>
                          <div className="text-gray-500">{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierColor(member.tier)}>{member.tier}</Badge>
                      </TableCell>
                      <TableCell>{member.points.toLocaleString()}</TableCell>
                      <TableCell>₹{member.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>{member.lastVisit}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Add Points
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
