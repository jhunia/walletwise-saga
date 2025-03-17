
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Plus,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Budget = () => {
  const [isNewBudgetDialogOpen, setIsNewBudgetDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample budget data
  const budgetData = [
    { id: 1, category: "Housing", budgeted: 1200, spent: 1200, remaining: 0, status: "on-track" },
    { id: 2, category: "Food & Dining", budgeted: 600, spent: 500, remaining: 100, status: "on-track" },
    { id: 3, category: "Transportation", budgeted: 350, spent: 300, remaining: 50, status: "on-track" },
    { id: 4, category: "Utilities", budgeted: 300, spent: 290, remaining: 10, status: "on-track" },
    { id: 5, category: "Entertainment", budgeted: 200, spent: 150, remaining: 50, status: "on-track" },
    { id: 6, category: "Shopping", budgeted: 200, spent: 250, remaining: -50, status: "over-budget" },
    { id: 7, category: "Health & Fitness", budgeted: 150, spent: 100, remaining: 50, status: "on-track" },
    { id: 8, category: "Personal Care", budgeted: 100, spent: 80, remaining: 20, status: "on-track" },
    { id: 9, category: "Subscriptions", budgeted: 50, spent: 50, remaining: 0, status: "on-track" },
    { id: 10, category: "Other", budgeted: 100, spent: 30, remaining: 70, status: "on-track" },
  ];

  // Calculate totals
  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalBudgeted) * 100);

  // Sample spending trends data
  const monthlySpendingData = [
    { name: "Jan", Housing: 1200, Food: 550, Transportation: 300, Utilities: 280, Entertainment: 180, Shopping: 220, Other: 300 },
    { name: "Feb", Housing: 1200, Food: 580, Transportation: 320, Utilities: 290, Entertainment: 190, Shopping: 200, Other: 280 },
    { name: "Mar", Housing: 1200, Food: 520, Transportation: 290, Utilities: 285, Entertainment: 170, Shopping: 240, Other: 270 },
    { name: "Apr", Housing: 1200, Food: 540, Transportation: 310, Utilities: 295, Entertainment: 160, Shopping: 230, Other: 290 },
    { name: "May", Housing: 1200, Food: 500, Transportation: 300, Utilities: 290, Entertainment: 150, Shopping: 250, Other: 260 },
  ];

  const COLORS = ["#6E59A5", "#9b87f5", "#4CAF50", "#F44336", "#2196F3", "#FFC107", "#757575"];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsNewBudgetDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Monthly budget allocation</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
                  <div className="flex items-center text-xs">
                    <span>{spentPercentage}% of total budget</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRemaining.toLocaleString()}</div>
                  <div className="flex items-center text-xs">
                    <span>{100 - spentPercentage}% of budget remaining</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget Summary</CardTitle>
                <CardDescription>Your spending progress for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Progress</span>
                    <span>${totalSpent.toLocaleString()} of ${totalBudgeted.toLocaleString()}</span>
                  </div>
                  <Progress value={spentPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {totalRemaining >= 0
                      ? `You have $${totalRemaining.toLocaleString()} remaining in your monthly budget`
                      : `You are $${Math.abs(totalRemaining).toLocaleString()} over your monthly budget`}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Top Categories</h3>
                    
                    {budgetData.slice(0, 4).map((budget) => (
                      <div key={budget.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{budget.category}</span>
                          <span>${budget.spent.toLocaleString()} of ${budget.budgeted.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(budget.spent / budget.budgeted) * 100} 
                          className={`h-2 ${budget.spent > budget.budgeted ? 'bg-rose-100' : ''}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {budget.remaining >= 0
                              ? `$${budget.remaining} remaining`
                              : `$${Math.abs(budget.remaining)} over budget`}
                          </span>
                          <span>{Math.round((budget.spent / budget.budgeted) * 100)}%</span>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("categories")}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View All Categories
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Budget Alerts</h3>
                    
                    {budgetData.filter(budget => budget.status === "over-budget").length > 0 ? (
                      <div className="space-y-4">
                        {budgetData
                          .filter(budget => budget.status === "over-budget")
                          .map(budget => (
                            <div key={budget.id} className="flex items-center p-3 bg-rose-50 border border-rose-200 rounded-md">
                              <AlertTriangle className="h-5 w-5 text-rose-500 mr-3 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium">
                                  {budget.category} is over budget by ${Math.abs(budget.remaining)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  You've spent ${budget.spent} of ${budget.budgeted} budget
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                        <TrendingUp className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            All categories are within budget
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Keep up the good work!
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Spending Tip</h4>
                      <p className="text-xs text-muted-foreground">
                        Try to keep your non-essential spending under 30% of your total income to maintain healthy finances.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>Manage all your budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="bg-muted/50">
                        <tr className="border-b transition-colors">
                          <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Budgeted</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Spent</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Remaining</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Progress</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {budgetData.map((budget) => (
                          <tr key={budget.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{budget.category}</td>
                            <td className="p-4 align-middle">${budget.budgeted.toLocaleString()}</td>
                            <td className="p-4 align-middle">${budget.spent.toLocaleString()}</td>
                            <td className={`p-4 align-middle font-medium ${budget.remaining < 0 ? 'text-rose-600' : budget.remaining === 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {budget.remaining >= 0 
                                ? `$${budget.remaining.toLocaleString()}` 
                                : `-$${Math.abs(budget.remaining).toLocaleString()}`}
                            </td>
                            <td className="p-4 align-middle w-[200px]">
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={(budget.spent / budget.budgeted) * 100} 
                                  className={`h-2 flex-grow ${budget.spent > budget.budgeted ? 'bg-rose-100' : ''}`}
                                />
                                <span className="text-xs w-[40px] text-right">
                                  {Math.round((budget.spent / budget.budgeted) * 100)}%
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Track your spending patterns over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySpendingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="Housing" stackId="a" fill={COLORS[0]} />
                    <Bar dataKey="Food" stackId="a" fill={COLORS[1]} />
                    <Bar dataKey="Transportation" stackId="a" fill={COLORS[2]} />
                    <Bar dataKey="Utilities" stackId="a" fill={COLORS[3]} />
                    <Bar dataKey="Entertainment" stackId="a" fill={COLORS[4]} />
                    <Bar dataKey="Shopping" stackId="a" fill={COLORS[5]} />
                    <Bar dataKey="Other" stackId="a" fill={COLORS[6]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Month-over-Month Change</CardTitle>
                  <CardDescription>Compare spending with previous month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Spending</span>
                      <div className="flex items-center text-emerald-600">
                        <TrendingDown className="mr-1 h-4 w-4" />
                        <span>-3.2%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {budgetData.slice(0, 5).map((budget, index) => (
                        <div key={budget.id} className="flex items-center justify-between text-sm">
                          <span>{budget.category}</span>
                          <div className={`flex items-center ${index % 2 === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {index % 2 === 0 ? (
                              <>
                                <TrendingDown className="mr-1 h-4 w-4" />
                                <span>-{(index + 1) * 2}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingUp className="mr-1 h-4 w-4" />
                                <span>+{(index) * 1.5}%</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Efficiency</CardTitle>
                  <CardDescription>How well you're using your budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold">87%</span>
                      <span className="text-sm text-muted-foreground">Budget efficiency score</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium">What this means:</span>
                      <p className="text-sm text-muted-foreground">
                        You're effectively using 87% of your budget allocation. This indicates good planning and spending discipline.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Improvement tips:</span>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Review your Shopping category which is currently over budget</li>
                        <li>Consider increasing your Entertainment budget which is consistently underspent</li>
                        <li>Track your daily expenses more closely to avoid end-of-month surprises</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Budget Dialog */}
      <Dialog open={isNewBudgetDialogOpen} onOpenChange={setIsNewBudgetDialogOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>Set up a new budget category to track your spending.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="personal">Personal Care</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="debt">Debt Payments</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="gifts">Gifts & Donations</SelectItem>
                  <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="custom-category">Or create custom category</Label>
              <Input id="custom-category" placeholder="e.g., Pet Expenses" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="budget-amount">Monthly Budget Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="budget-amount" type="number" className="pl-8" placeholder="0.00" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="budget-notes">Notes (Optional)</Label>
              <Input id="budget-notes" placeholder="Add any notes about this budget category" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBudgetDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsNewBudgetDialogOpen(false)}>Create Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Budget;
