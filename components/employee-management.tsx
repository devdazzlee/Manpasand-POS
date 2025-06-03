"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Edit, Trash2, UserCheck, DollarSign, Award } from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: string
  salary: number
  status: "active" | "inactive"
  joinDate: string
  totalSales: number
  hoursWorked: number
  performance: number
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@manpasand.com",
      phone: "+1 234-567-8901",
      role: "Manager",
      salary: 4500,
      status: "active",
      joinDate: "2023-01-15",
      totalSales: 15420.5,
      hoursWorked: 160,
      performance: 95,
    },
    {
      id: "2",
      name: "Mike Davis",
      email: "mike@manpasand.com",
      phone: "+1 234-567-8902",
      role: "Cashier",
      salary: 3200,
      status: "active",
      joinDate: "2023-03-20",
      totalSales: 12850.75,
      hoursWorked: 155,
      performance: 88,
    },
    {
      id: "3",
      name: "Lisa Wilson",
      email: "lisa@manpasand.com",
      phone: "+1 234-567-8903",
      role: "Cashier",
      salary: 3000,
      status: "active",
      joinDate: "2023-06-10",
      totalSales: 9875.0,
      hoursWorked: 148,
      performance: 92,
    },
    {
      id: "4",
      name: "John Smith",
      email: "john@manpasand.com",
      phone: "+1 234-567-8904",
      role: "Stock Manager",
      salary: 3800,
      status: "inactive",
      joinDate: "2022-11-05",
      totalSales: 0,
      hoursWorked: 0,
      performance: 0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({})

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.role) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone || "",
        role: newEmployee.role,
        salary: newEmployee.salary || 3000,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        totalSales: 0,
        hoursWorked: 0,
        performance: 0,
      }
      setEmployees([...employees, employee])
      setNewEmployee({})
      setIsAddDialogOpen(false)
    }
  }

  const handleEditEmployee = () => {
    if (editingEmployee) {
      setEmployees(employees.map((e) => (e.id === editingEmployee.id ? editingEmployee : e)))
      setEditingEmployee(null)
    }
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const activeEmployees = employees.filter((e) => e.status === "active").length
  const totalSalaries = employees.reduce((sum, e) => sum + e.salary, 0)
  const avgPerformance =
    employees.length > 0 ? employees.reduce((sum, e) => sum + e.performance, 0) / employees.length : 0

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600"
    if (performance >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage your team and track performance</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newEmployee.name || ""}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email || ""}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone || ""}
                  onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                      <SelectItem value="Stock Manager">Stock Manager</SelectItem>
                      <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Monthly Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newEmployee.salary || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleAddEmployee} className="w-full">
                Add Employee
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salaries</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalaries.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">Joined {employee.joinDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{employee.email}</div>
                      <div className="text-sm text-gray-500">{employee.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                        {employee.performance}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${employee.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className={employee.status === "active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingEmployee(employee)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Employee Dialog */}
      <Dialog open={!!editingEmployee} onOpenChange={() => setEditingEmployee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {editingEmployee && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingEmployee.email}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={editingEmployee.role}
                    onValueChange={(value) => setEditingEmployee({ ...editingEmployee, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                      <SelectItem value="Stock Manager">Stock Manager</SelectItem>
                      <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-salary">Monthly Salary</Label>
                  <Input
                    id="edit-salary"
                    type="number"
                    value={editingEmployee.salary}
                    onChange={(e) =>
                      setEditingEmployee({ ...editingEmployee, salary: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleEditEmployee} className="w-full">
                Update Employee
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
