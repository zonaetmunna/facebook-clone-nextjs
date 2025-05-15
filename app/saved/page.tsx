"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Bookmark, MoreHorizontal, ThumbsUp, MessageSquare, Share, Globe, Link2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SavedItem {
  id: number
  type: "post" | "article" | "video" | "product"
  title?: string
  content: string
  source: {
    name: string
    avatar: string
    url: string
  }
  time: string
  image?: string
  likes?: number
  comments?: number
  shares?: number
  savedTime: string
  savedCollection: string
}

export default function SavedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("all")

  const collections = [
    { id: "all", name: "All Items" },
    { id: "articles", name: "Articles" },
    { id: "videos", name: "Videos" },
    { id: "products", name: "Products" },
    { id: "recipes", name: "Recipes" },
    { id: "travel", name: "Travel Ideas" },
  ]

  const savedItems: SavedItem[] = [
    {
      id: 1,
      type: "post",
      content: "Just finished my new painting! What do you think? 🎨 #art #creativity",
      source: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        url: "/profile/jane",
      },
      time: "3 days ago",
      image: "/placeholder.svg?height=500&width=800&text=Painting",
      likes: 24,
      comments: 5,
      shares: 2,
      savedTime: "2 days ago",
      savedCollection: "articles",
    },
    {
      id: 2,
      type: "article",
      title: "10 Tips for Better Productivity While Working from Home",
      content:
        "Working from home can be challenging. Here are 10 tips to help you stay productive and maintain a healthy work-life balance...",
      source: {
        name: "Productivity Hub",
        avatar: "/placeholder.svg?height=40&width=40&text=PH",
        url: "https://productivityhub.com",
      },
      time: "1 week ago",
      image: "/placeholder.svg?height=300&width=600&text=Productivity",
      savedTime: "5 days ago",
      savedCollection: "articles",
    },
    {
      id: 3,
      type: "video",
      title: "How to Make the Perfect Chocolate Cake",
      content: "Learn how to bake a delicious chocolate cake from scratch with this easy-to-follow recipe...",
      source: {
        name: "Cooking Masters",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
        url: "https://cookingmasters.com",
      },
      time: "2 weeks ago",
      image: "/placeholder.svg?height=300&width=600&text=Chocolate Cake",
      savedTime: "1 week ago",
      savedCollection: "recipes",
    },
    {
      id: 4,
      type: "product",
      title: "Wireless Noise-Cancelling Headphones",
      content:
        "Experience premium sound quality with these wireless noise-cancelling headphones. Perfect for work, travel, or everyday use...",
      source: {
        name: "Tech Gadgets",
        avatar: "/placeholder.svg?height=40&width=40&text=TG",
        url: "https://techgadgets.com",
      },
      time: "1 month ago",
      image: "/placeholder.svg?height=300&width=600&text=Headphones",
      savedTime: "3 weeks ago",
      savedCollection: "products",
    },
    {
      id: 5,
      type: "article",
      title: "Top 10 Places to Visit in 2023",
      content:
        "Planning your next vacation? Check out these amazing destinations that should be on your travel list this year...",
      source: {
        name: "Travel Guide",
        avatar: "/placeholder.svg?height=40&width=40&text=TG",
        url: "https://travelguide.com",
      },
      time: "2 months ago",
      image: "/placeholder.svg?height=300&width=600&text=Travel",
      savedTime: "1 month ago",
      savedCollection: "travel",
    },
  ]

  const filteredItems = savedItems.filter((item) => {
    const matchesSearch =
      (item.title || item.content).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCollection = selectedCollection === "all" || item.savedCollection === selectedCollection
    return matchesSearch && matchesCollection
  })

  const unsaveItem = (itemId: number) => {
    // In a real app, you would update this in a database
    console.log(`Unsaved item ${itemId}`)
  }

  const moveToCollection = (itemId: number, collection: string) => {
    // In a real app, you would update this in a database
    console.log(`Moved item ${itemId} to collection ${collection}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Saved Items</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Create Collection</span>
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
              placeholder="Search saved items"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-semibold mb-2">Collections</h3>
            <div className="space-y-1">
              {collections.map((collection) => (
                <Button
                  key={collection.id}
                  variant="ghost"
                  className={`w-full justify-start ${selectedCollection === collection.id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  {collection.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Items Grid */}
        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src={item.source.avatar} alt={item.source.name} />
                              <AvatarFallback>{item.source.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{item.source.name}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{item.time}</span>
                                <span className="mx-1">•</span>
                                <Globe className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => unsaveItem(item.id)}>Unsave</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link2 className="mr-2 h-4 w-4" />
                                Copy link
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Move to...</DropdownMenuItem>
                              {collections
                                .filter((c) => c.id !== "all" && c.id !== item.savedCollection)
                                .map((collection) => (
                                  <DropdownMenuItem
                                    key={collection.id}
                                    className="pl-6"
                                    onClick={() => moveToCollection(item.id, collection.id)}
                                  >
                                    {collection.name}
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-3">
                          {item.title && <h3 className="font-semibold text-lg mb-2">{item.title}</h3>}
                          <p className="text-sm text-gray-700">{item.content}</p>
                        </div>

                        {item.image && (
                          <div className="mt-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title || "Saved content"}
                              className="w-full rounded-md"
                            />
                          </div>
                        )}

                        {item.type === "post" && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{item.likes}</span>
                              </div>
                              <div className="flex space-x-3">
                                <span>{item.comments} comments</span>
                                <span>{item.shares} shares</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 mt-2">
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <ThumbsUp className="h-5 w-5 mr-2" />
                                <span>Like</span>
                              </Button>
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <MessageSquare className="h-5 w-5 mr-2" />
                                <span>Comment</span>
                              </Button>
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <Share className="h-5 w-5 mr-2" />
                                <span>Share</span>
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                          <span>Saved {item.savedTime}</span>
                          <span>
                            Collection:{" "}
                            {collections.find((c) => c.id === item.savedCollection)?.name || "Uncategorized"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Saved Items</h2>
                    <p className="text-gray-500 mb-4">Items you save will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-4">
                {filteredItems.filter((item) => item.type === "post").length > 0 ? (
                  filteredItems
                    .filter((item) => item.type === "post")
                    .map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={item.source.avatar} alt={item.source.name} />
                                <AvatarFallback>{item.source.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{item.source.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{item.time}</span>
                                  <span className="mx-1">•</span>
                                  <Globe className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => unsaveItem(item.id)}>Unsave</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Link2 className="mr-2 h-4 w-4" />
                                  Copy link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Move to...</DropdownMenuItem>
                                {collections
                                  .filter((c) => c.id !== "all" && c.id !== item.savedCollection)
                                  .map((collection) => (
                                    <DropdownMenuItem
                                      key={collection.id}
                                      className="pl-6"
                                      onClick={() => moveToCollection(item.id, collection.id)}
                                    >
                                      {collection.name}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-gray-700">{item.content}</p>
                          </div>

                          {item.image && (
                            <div className="mt-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt="Post content"
                                className="w-full rounded-md"
                              />
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{item.likes}</span>
                              </div>
                              <div className="flex space-x-3">
                                <span>{item.comments} comments</span>
                                <span>{item.shares} shares</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 mt-2">
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <ThumbsUp className="h-5 w-5 mr-2" />
                                <span>Like</span>
                              </Button>
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <MessageSquare className="h-5 w-5 mr-2" />
                                <span>Comment</span>
                              </Button>
                              <Button variant="ghost" className="flex items-center justify-center rounded-none">
                                <Share className="h-5 w-5 mr-2" />
                                <span>Share</span>
                              </Button>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>Saved {item.savedTime}</span>
                            <span>
                              Collection:{" "}
                              {collections.find((c) => c.id === item.savedCollection)?.name || "Uncategorized"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Saved Posts</h2>
                    <p className="text-gray-500 mb-4">Posts you save will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-6">
              <div className="space-y-4">
                {filteredItems.filter((item) => item.type === "article").length > 0 ? (
                  filteredItems
                    .filter((item) => item.type === "article")
                    .map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={item.source.avatar} alt={item.source.name} />
                                <AvatarFallback>{item.source.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{item.source.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => unsaveItem(item.id)}>Unsave</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Link2 className="mr-2 h-4 w-4" />
                                  Copy link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Move to...</DropdownMenuItem>
                                {collections
                                  .filter((c) => c.id !== "all" && c.id !== item.savedCollection)
                                  .map((collection) => (
                                    <DropdownMenuItem
                                      key={collection.id}
                                      className="pl-6"
                                      onClick={() => moveToCollection(item.id, collection.id)}
                                    >
                                      {collection.name}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3">
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-700">{item.content}</p>
                          </div>

                          {item.image && (
                            <div className="mt-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title || "Article thumbnail"}
                                className="w-full rounded-md"
                              />
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>Saved {item.savedTime}</span>
                            <span>
                              Collection:{" "}
                              {collections.find((c) => c.id === item.savedCollection)?.name || "Uncategorized"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Saved Articles</h2>
                    <p className="text-gray-500 mb-4">Articles you save will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="space-y-4">
                {filteredItems.filter((item) => item.type === "video").length > 0 ? (
                  filteredItems
                    .filter((item) => item.type === "video")
                    .map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={item.source.avatar} alt={item.source.name} />
                                <AvatarFallback>{item.source.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{item.source.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => unsaveItem(item.id)}>Unsave</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Link2 className="mr-2 h-4 w-4" />
                                  Copy link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Move to...</DropdownMenuItem>
                                {collections
                                  .filter((c) => c.id !== "all" && c.id !== item.savedCollection)
                                  .map((collection) => (
                                    <DropdownMenuItem
                                      key={collection.id}
                                      className="pl-6"
                                      onClick={() => moveToCollection(item.id, collection.id)}
                                    >
                                      {collection.name}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3">
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-700">{item.content}</p>
                          </div>

                          {item.image && (
                            <div className="mt-3 relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title || "Video thumbnail"}
                                className="w-full rounded-md"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white h-6 w-6"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>Saved {item.savedTime}</span>
                            <span>
                              Collection:{" "}
                              {collections.find((c) => c.id === item.savedCollection)?.name || "Uncategorized"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Saved Videos</h2>
                    <p className="text-gray-500 mb-4">Videos you save will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <div className="space-y-4">
                {filteredItems.filter((item) => item.type === "product").length > 0 ? (
                  filteredItems
                    .filter((item) => item.type === "product")
                    .map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={item.source.avatar} alt={item.source.name} />
                                <AvatarFallback>{item.source.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{item.source.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => unsaveItem(item.id)}>Unsave</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Link2 className="mr-2 h-4 w-4" />
                                  Copy link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Move to...</DropdownMenuItem>
                                {collections
                                  .filter((c) => c.id !== "all" && c.id !== item.savedCollection)
                                  .map((collection) => (
                                    <DropdownMenuItem
                                      key={collection.id}
                                      className="pl-6"
                                      onClick={() => moveToCollection(item.id, collection.id)}
                                    >
                                      {collection.name}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3">
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-700">{item.content}</p>
                          </div>

                          {item.image && (
                            <div className="mt-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title || "Product image"}
                                className="w-full rounded-md"
                              />
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>Saved {item.savedTime}</span>
                            <span>
                              Collection:{" "}
                              {collections.find((c) => c.id === item.savedCollection)?.name || "Uncategorized"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Saved Products</h2>
                    <p className="text-gray-500 mb-4">Products you save will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
