"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, Users, ImageIcon, PlayCircle, ShoppingBag, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResult {
  id: number
  type: "people" | "post" | "photo" | "video" | "marketplace" | "page" | "event" | "group"
  title?: string
  description?: string
  image?: string
  user?: {
    name: string
    avatar: string
  }
  location?: string
  date?: string
  price?: string
  members?: number
  attendees?: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setSearchQuery(query)

    // Simulate API call with delay
    setIsLoading(true)
    const timer = setTimeout(() => {
      // Generate mock results based on the query
      const mockResults: SearchResult[] = [
        {
          id: 1,
          type: "people",
          user: {
            name: `${query} Smith`,
            avatar: `/placeholder.svg?height=40&width=40&text=${query.charAt(0)}S`,
          },
          description: "Works at Tech Company",
        },
        {
          id: 2,
          type: "people",
          user: {
            name: `Jane ${query}`,
            avatar: `/placeholder.svg?height=40&width=40&text=J${query.charAt(0)}`,
          },
          description: "Lives in San Francisco",
        },
        {
          id: 3,
          type: "post",
          title: `Post about ${query}`,
          description: `This is a post that mentions ${query} multiple times. It's very relevant to your search for ${query}.`,
          user: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40&text=MJ",
          },
          image: `/placeholder.svg?height=200&width=400&text=Post about ${query}`,
        },
        {
          id: 4,
          type: "photo",
          title: `Photo of ${query}`,
          user: {
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40&text=SW",
          },
          image: `/placeholder.svg?height=200&width=400&text=Photo of ${query}`,
        },
        {
          id: 5,
          type: "video",
          title: `Video: How to understand ${query}`,
          description: `A comprehensive guide to ${query} for beginners.`,
          user: {
            name: "David Brown",
            avatar: "/placeholder.svg?height=40&width=40&text=DB",
          },
          image: `/placeholder.svg?height=200&width=400&text=Video about ${query}`,
        },
        {
          id: 6,
          type: "marketplace",
          title: `${query} for sale`,
          price: "$199",
          location: "San Francisco, CA",
          image: `/placeholder.svg?height=200&width=200&text=${query} item`,
        },
        {
          id: 7,
          type: "page",
          title: `${query} Fan Club`,
          description: `The official page for fans of ${query}`,
          image: `/placeholder.svg?height=100&width=100&text=${query} FC`,
          members: 12500,
        },
        {
          id: 8,
          type: "event",
          title: `${query} Conference 2023`,
          date: "July 15-17, 2023",
          location: "San Francisco Convention Center",
          image: `/placeholder.svg?height=200&width=400&text=${query} Conference`,
          attendees: 1250,
        },
        {
          id: 9,
          type: "group",
          title: `${query} Enthusiasts`,
          description: `A group for people who love ${query}`,
          image: `/placeholder.svg?height=100&width=100&text=${query} Group`,
          members: 8750,
        },
      ]

      setResults(mockResults)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, you would update the URL and trigger a new search
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
      // For this demo, we'll just simulate the loading state
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 1500)
    }
  }

  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true
    return result.type === activeTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <form onSubmit={handleSearch} className="relative w-full md:w-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-10 w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="post">Posts</TabsTrigger>
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="page">Pages</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="group">Groups</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {query && filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <SearchResultItem key={result.id} result={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No results found</h2>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any results for "{query}". Try another search term.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Tabs>
    </div>
  )
}

function SearchResultItem({ result }: { result: SearchResult }) {
  const getIcon = () => {
    switch (result.type) {
      case "people":
        return <Users className="h-4 w-4 text-blue-600" />
      case "post":
        return <SearchIcon className="h-4 w-4 text-green-600" />
      case "photo":
        return <ImageIcon className="h-4 w-4 text-purple-600" />
      case "video":
        return <PlayCircle className="h-4 w-4 text-red-600" />
      case "marketplace":
        return <ShoppingBag className="h-4 w-4 text-orange-600" />
      case "page":
        return <SearchIcon className="h-4 w-4 text-yellow-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-pink-600" />
      case "group":
        return <Users className="h-4 w-4 text-indigo-600" />
      default:
        return <SearchIcon className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        {result.type === "people" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={result.user?.avatar || "/placeholder.svg"} alt={result.user?.name} />
                <AvatarFallback>{result.user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{result.user?.name}</h3>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </div>
            </div>
            <Button>Add Friend</Button>
          </div>
        )}

        {result.type === "post" && (
          <div>
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={result.user?.avatar || "/placeholder.svg"} alt={result.user?.name} />
                <AvatarFallback>{result.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{result.user?.name}</h3>
                <p className="text-xs text-muted-foreground">Posted about {result.title}</p>
              </div>
            </div>
            <p className="mb-3">{result.description}</p>
            {result.image && (
              <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full rounded-md" />
            )}
          </div>
        )}

        {result.type === "photo" && (
          <div>
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={result.user?.avatar || "/placeholder.svg"} alt={result.user?.name} />
                <AvatarFallback>{result.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{result.user?.name}</h3>
                <p className="text-xs text-muted-foreground">Shared a photo: {result.title}</p>
              </div>
            </div>
            {result.image && (
              <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full rounded-md" />
            )}
          </div>
        )}

        {result.type === "video" && (
          <div>
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={result.user?.avatar || "/placeholder.svg"} alt={result.user?.name} />
                <AvatarFallback>{result.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{result.user?.name}</h3>
                <p className="text-xs text-muted-foreground">Shared a video</p>
              </div>
            </div>
            <h4 className="font-medium mb-2">{result.title}</h4>
            <p className="text-sm mb-3">{result.description}</p>
            {result.image && (
              <div className="relative">
                <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full rounded-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <PlayCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {result.type === "marketplace" && (
          <div className="flex">
            {result.image && (
              <img
                src={result.image || "/placeholder.svg"}
                alt={result.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
            )}
            <div>
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-lg font-medium">{result.price}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{result.location}</span>
              </div>
            </div>
          </div>
        )}

        {result.type === "page" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {result.image && (
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.title}
                  className="w-12 h-12 object-cover rounded-md mr-4"
                />
              )}
              <div>
                <h3 className="font-semibold">{result.title}</h3>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <p className="text-xs text-muted-foreground">{result.members?.toLocaleString()} likes</p>
              </div>
            </div>
            <Button>Like</Button>
          </div>
        )}

        {result.type === "event" && (
          <div>
            <div className="flex">
              {result.image && (
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
              )}
              <div>
                <h3 className="font-semibold">{result.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{result.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{result.location}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{result.attendees?.toLocaleString()} attending</p>
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button size="sm">Interested</Button>
              <Button size="sm" variant="outline">
                Going
              </Button>
            </div>
          </div>
        )}

        {result.type === "group" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {result.image && (
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.title}
                  className="w-12 h-12 object-cover rounded-md mr-4"
                />
              )}
              <div>
                <h3 className="font-semibold">{result.title}</h3>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <p className="text-xs text-muted-foreground">{result.members?.toLocaleString()} members</p>
              </div>
            </div>
            <Button>Join</Button>
          </div>
        )}

        <div className="flex items-center mt-3 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center">
            {getIcon()}
            <span className="ml-1 capitalize">{result.type}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
