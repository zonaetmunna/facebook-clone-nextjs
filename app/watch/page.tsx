"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, ThumbsUp, MessageSquare, Share, MoreHorizontal, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Video {
  id: number
  title: string
  creator: {
    name: string
    avatar: string
  }
  views: string
  postedTime: string
  duration: string
  thumbnail: string
  likes: number
  comments: number
  shares: number
}

export default function WatchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const videos: Video[] = [
    {
      id: 1,
      title: "Amazing sunset at the beach - Nature's beauty",
      creator: {
        name: "Nature Channel",
        avatar: "/placeholder.svg?height=40&width=40&text=NC",
      },
      views: "1.2M views",
      postedTime: "2 days ago",
      duration: "3:45",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Sunset",
      likes: 45000,
      comments: 1200,
      shares: 3500,
    },
    {
      id: 2,
      title: "How to make the perfect chocolate cake - Easy recipe",
      creator: {
        name: "Cooking Masters",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
      },
      views: "850K views",
      postedTime: "1 week ago",
      duration: "12:30",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Cake",
      likes: 32000,
      comments: 2800,
      shares: 1500,
    },
    {
      id: 3,
      title: "Top 10 travel destinations for 2023 - Budget friendly",
      creator: {
        name: "Travel Guide",
        avatar: "/placeholder.svg?height=40&width=40&text=TG",
      },
      views: "2.5M views",
      postedTime: "3 weeks ago",
      duration: "18:20",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Travel",
      likes: 78000,
      comments: 5400,
      shares: 12000,
    },
    {
      id: 4,
      title: "Morning workout routine - 15 minutes for beginners",
      creator: {
        name: "Fitness Pro",
        avatar: "/placeholder.svg?height=40&width=40&text=FP",
      },
      views: "3.7M views",
      postedTime: "1 month ago",
      duration: "15:45",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Workout",
      likes: 125000,
      comments: 8700,
      shares: 45000,
    },
    {
      id: 5,
      title: "DIY home decoration ideas - Transform your space",
      creator: {
        name: "Home & Design",
        avatar: "/placeholder.svg?height=40&width=40&text=HD",
      },
      views: "980K views",
      postedTime: "5 days ago",
      duration: "22:10",
      thumbnail: "/placeholder.svg?height=200&width=350&text=DIY",
      likes: 42000,
      comments: 3100,
      shares: 7800,
    },
    {
      id: 6,
      title: "Learn JavaScript in 30 minutes - Beginner's guide",
      creator: {
        name: "Code Academy",
        avatar: "/placeholder.svg?height=40&width=40&text=CA",
      },
      views: "1.5M views",
      postedTime: "2 months ago",
      duration: "30:00",
      thumbnail: "/placeholder.svg?height=200&width=350&text=JavaScript",
      likes: 67000,
      comments: 4200,
      shares: 15000,
    },
  ]

  const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Watch</h1>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search videos"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="foryou">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                      <Button variant="secondary" size="icon" className="rounded-full bg-white/90 h-12 w-12">
                        <Play className="h-6 w-6 text-gray-900" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
                        <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Save video</DropdownMenuItem>
                              <DropdownMenuItem>Add to Watch Later</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Hide video</DropdownMenuItem>
                              <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm text-gray-500">{video.creator.name}</p>
                        <div className="flex text-xs text-gray-500 mt-1">
                          <span>{video.views}</span>
                          <span className="mx-1">•</span>
                          <span>{video.postedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 pt-3 border-t">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        <span>{formatNumber(video.likes)}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>{formatNumber(video.comments)}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Share className="h-4 w-4 mr-2" />
                        <span>{formatNumber(video.shares)}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Live Videos</h2>
            <p className="text-gray-500">Watch live videos from your friends and pages you follow.</p>
          </div>
        </TabsContent>

        <TabsContent value="gaming" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Gaming Videos</h2>
            <p className="text-gray-500">Watch gaming videos from creators you follow.</p>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Saved Videos</h2>
            <p className="text-gray-500">Videos you save will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}
