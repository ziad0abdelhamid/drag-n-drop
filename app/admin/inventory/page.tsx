"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  sku: string
  stock_quantity: number
  price: number
  category: string
}

export default function AdminInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStock = async (itemId: string, newQuantity: number) => {
    try {
      const response = await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: itemId, quantity: newQuantity }),
      })
      if (response.ok) {
        fetchInventory()
        setEditingId(null)
      }
    } catch (error) {
      console.error("Failed to update inventory:", error)
    }
  }

  const getLowStockColor = (quantity: number) => {
    if (quantity === 0) return "bg-red-100"
    if (quantity < 10) return "bg-yellow-100"
    return "bg-green-100"
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-mono">{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number.parseInt(e.target.value))}
                            className="w-20"
                          />
                          <Button size="sm" onClick={() => handleUpdateStock(item.id, editValue)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Badge className={getLowStockColor(item.stock_quantity)}>{item.stock_quantity} units</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(item.id)
                          setEditValue(item.stock_quantity)
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
