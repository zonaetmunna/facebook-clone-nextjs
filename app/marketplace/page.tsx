"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MapPin, ChevronDown, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  title: string
  price: number
  location: string
  distance: string
  image: string
  postedTime: string
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "vehicles", name: "Vehicles" },
    { id: "property", name: "Property Rentals" },
    { id: "furniture", name: "Furniture" },
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "toys", name: "Toys & Games" },
    { id: "garden", name: "Garden & Outdoors" },
  ]

  const products: Product[] = [
    {
      id: 1,
      title: "iPhone 13 Pro - Excellent Condition",
      price: 699,
      location: "San Francisco, CA",
      distance: "5 miles away",
      image: "/placeholder.svg?height=200&width=200&text=iPhone",
      postedTime: "Just now",
    },
    {
      id: 2,
      title: "Modern Sofa - Like New",
      price: 450,
      location: "Oakland, CA",
      distance: "12 miles away",
      image: "/placeholder.svg?height=200&width=200&text=Sofa",
      postedTime: "2 hours ago",
    },
    {
      id: 3,
      title: "Mountain Bike - Trek",
      price: 350,
      location: "Berkeley, CA",
      distance: "8 miles away",
      image: "/placeholder.svg?height=200&width=200&text=Bike",
      postedTime: "Yesterday",
    },
    {
      id: 4,
      title: "Coffee Table - Solid Wood",
      price: 120,
      location: "San Jose, CA",
      distance: "20 miles away",
      image: "/placeholder.svg?height=200&width=200&text=Table",
      postedTime: "2 days ago",
    },
    {
      id: 5,
      title: "Sony PlayStation 5",
      price: 450,
      location: "Palo Alto, CA",
      distance: "15 miles away",
      image: "/placeholder.svg?height=200&width=200&text=PS5",
      postedTime: "3 days ago",
    },
    {
      id: 6,
      title: "Dining Table with 4 Chairs",
      price: 280,
      location: "San Mateo, CA",
      distance: "10 miles away",
      image: "/placeholder.svg?height=200&width=200&text=Dining",
      postedTime: "4 days ago",
    },
    {
      id: 7,
      title: 'MacBook Pro 16" 2021',
      price: 1200,
      location: "San Francisco, CA",
      distance: "3 miles away",
      image: "/placeholder.svg?height=200&width=200&text=MacBook",
      postedTime: "5 days ago",
    },
    {
      id: 8,
      title: "Leather Jacket - Size L",
      price: 85,
      location: "Daly City, CA",
      distance: "7 miles away",
      image: "/placeholder.svg?height=200&width=200&text=Jacket",
      postedTime: "1 week ago",
    },
  ]

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create New Listing</span>
          </Button>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search Marketplace"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-medium">San Francisco, CA</span>
            <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Within 40 miles</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`w-full justify-start ${selectedCategory === category.id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <Tabs defaultValue="browse">
            <TabsList>
              <TabsTrigger value="browse">Browse All</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="selling">Selling</TabsTrigger>
            </TabsList>

            <div className="flex justify-between items-center my-4">
              <h2 className="font-semibold">Today's picks</h2>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Distance: Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="browse" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">${product.price}</h3>
                          <span className="text-xs text-gray-500">{product.postedTime}</span>
                        </div>
                        <p className="line-clamp-1">{product.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{product.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Saved Items</h2>
                <p className="text-gray-500">Items you save will appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="selling" className="mt-0">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Start Selling</h2>
                <p className="text-gray-500 mb-4">It's quick and easy to post an item for sale.</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Create New Listing</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
