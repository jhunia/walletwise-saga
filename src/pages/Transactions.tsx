import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Filter, Plus, Download, ArrowUpDown, CreditCard, Wallet, DollarSign, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Transactions = () => {
  const [transactionType, setTransactionType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState("expense");
  const { toast } = useToast();

  // Sample transaction data
  const transactions = [
    { id: 1, name: "Grocery Store", amount: -125.30, date: "2023-05-15", category: "Groceries", type: "expense", account: "Chase Credit Card" },
    { id: 2, name: "Salary Deposit", amount: 2600.00, date: "2023-05-14", category: "Income", type: "income", account: "Checking Account" },
    { id: 3, name: "Electric Bill", amount: -89.99, date: "2023-05-12", category: "Utilities", type: "expense", account: "Wells Fargo" },
    { id: 4, name: "Coffee Shop", amount: -4.50, date: "2023-05-11", category: "Dining", type: "expense", account: "Debit Card" },
    { id: 5, name: "Freelance Payment", amount: 450.00, date: "2023-05-10", category: "Income", type: "income", account: "Checking Account" },
    { id: 6, name: "Internet Bill", amount: -79.99, date: "2023-05-09", category: "Utilities", type: "expense", account: "Bank of America" },
    { id: 7, name: "Movie Tickets", amount: -32.50, date: "2023-05-07", category: "Entertainment", type: "expense", account: "Amex Gold" },
    { id: 8, name: "Gas Station", amount: -45.67, date: "2023-05-06", category: "Transportation", type: "expense", account: "Chase Credit Card" },
    { id: 9, name: "Side Project", amount: 350.00, date: "2023-05-05", category: "Income", type: "income", account: "Checking Account" },
    { id: 10, name: "Restaurant", amount: -87.45, date: "2023-05-03", category: "Dining", type: "expense", account: "Visa Card" },
    { id: 11, name: "Mobile Phone", amount: -65.00, date: "2023-05-02", category: "Utilities", type: "expense", account: "Bank of America" },
    { id: 12, name: "Interest Payment", amount: 12.50, date: "2023-05-01", category: "Income", type: "income", account: "Savings Account" },
  ];

  const filteredTransactions = transactionType === "all" 
    ? transactions 
    : transactions.filter(transaction => transaction.type === transactionType);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Transaction Report", 14, 22);
    
    // Add current date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add filtered type information
    doc.setFontSize(11);
    doc.text(`Type: ${transactionType === 'all' ? 'All Transactions' : 
      transactionType === 'income' ? 'Income Only' : 'Expenses Only'}`, 14, 36);
    
    // Format data for the table
    const tableData = filteredTransactions.map(transaction => [
      transaction.name,
      transaction.category,
      transaction.account,
      transaction.date,
      `${transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
    ]);
    
    // Add table
    autoTable(doc, {
      head: [['Description', 'Category', 'Account', 'Date', 'Amount']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [110, 89, 165] }
    });
    
    // Save with filename
    doc.save(`transactions-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Export successful",
      description: "Your transactions have been exported to PDF",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsDialogOpen(true)} className="flex-shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <Button variant="outline" className="flex-shrink-0" onClick={exportToPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-4">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>View and manage your transaction history</CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex items-center">
                    <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8 w-full sm:w-[200px] lg:w-[300px]" />
                  </div>
                  
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="All Transactions" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="income">Income Only</SelectItem>
                      <SelectItem value="expense">Expenses Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b transition-colors">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Description</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Category</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Account</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Date</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <span>Amount</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-full mr-3 ${transaction.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {transaction.amount > 0 
                                  ? <DollarSign className="h-4 w-4" /> 
                                  : <CreditCard className="h-4 w-4" />}
                              </div>
                              <span>{transaction.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td className="p-4 align-middle">{transaction.account}</td>
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className={`p-4 align-middle text-right font-medium ${transaction.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>Enter the details of your transaction below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup value={newTransactionType} onValueChange={setNewTransactionType} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                <Label
                  htmlFor="expense"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Expense
                </Label>
              </div>
              <div>
                <RadioGroupItem value="income" id="income" className="peer sr-only" />
                <Label
                  htmlFor="income"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Wallet className="mb-3 h-6 w-6" />
                  Income
                </Label>
              </div>
            </RadioGroup>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter a description" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="amount" type="number" className="pl-8" placeholder="0.00" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="account">Account</Label>
              <Select>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="credit-chase">Chase Credit Card</SelectItem>
                  <SelectItem value="credit-amex">Amex Gold</SelectItem>
                  <SelectItem value="credit-visa">Visa Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Transactions;
