"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Share, MoreHorizontal, ThumbsUp, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Memory {
  id: number
  type: "on-this-day" | "friendship" | "photo" | "video"
  title: string
  description: string
  date: string
  yearsAgo: number
  image?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      type: "on-this-day",
      title: "Your post from 3 years ago",
      description: "Just finished my new painting! What do you think? 🎨 #art #creativity",
      date: "May 8, 2020",
      yearsAgo: 3,
      image: "/placeholder.svg?height=500&width=800&text=Painting",
      likes: 24,
      comments: 5,
      shares: 2,
      liked: false,
    },
    {
      id: 2,
      type: "friendship",
      title: "Friendship anniversary with Jane Smith",
      description: "You've been friends with Jane for 5 years!",
      date: "May 8, 2018",
      yearsAgo: 5,
      image: "/placeholder.svg?height=500&width=800&text=Friendship",
      likes: 56,
      comments: 8,
      shares: 3,
      liked: true,
    },
    {
      id: 3,
      type: "photo",
      title: "Your photo from 2 years ago",
      description: "Beautiful sunset at the beach! #vacation #sunset",
      date: "May 8, 2021",
      yearsAgo: 2,
      image: "/placeholder.svg?height=500&width=800&text=Sunset",
      likes: 42,
      comments: 7,
      shares: 1,
      liked: false,
    },
    {
      id: 4,
      type: "video",
      title: "Your video from 4 years ago",
      description: "Concert night with friends! #music #livemusic",
      date: "May 8, 2019",
      yearsAgo: 4,
      image: "/placeholder.svg?height=500&width=800&text=Concert",
      likes: 38,
      comments: 12,
      shares: 5,
      liked: true,
    },
  ])

  const toggleLike = (memoryId: number) => {
    setMemories(
      memories.map((memory) => {
        if (memory.id === memoryId) {
          const newLikedState = !memory.liked
          return {
            ...memory,
            liked: newLikedState,
            likes: newLikedState ? memory.likes + 1 : memory.likes - 1,
          }
        }
        return memory
      }),
    )
  }

  const shareMemory = (memoryId: number) => {
    setMemories(
      memories.map((memory) => {
        if (memory.id === memoryId) {
          return {
            ...memory,
            shares: memory.shares + 1,
          }
        }
        return memory
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Memories</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Archive</span>
          </Button>
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Memories</TabsTrigger>
          <TabsTrigger value="on-this-day">On This Day</TabsTrigger>
          <TabsTrigger value="friendships">Friendships</TabsTrigger>
          <TabsTrigger value="recaps">Recaps</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-8 w-8 mr-3" />
                    <h2 className="text-2xl font-bold">Your memories on Facebook</h2>
                  </div>
                  <p className="text-lg mb-4">
                    We'll show you photos, posts, and other memories to help you look back on meaningful moments.
                  </p>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                    Manage Memories
                  </Button>
                </CardContent>
              </Card>
            </div>

            {memories.map((memory) => (
              <Card key={memory.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          {memory.type === "on-this-day" ? (
                            <Clock className="h-5 w-5 text-blue-600" />
                          ) : memory.type === "friendship" ? (
                            <Users className="h-5 w-5 text-blue-600" />
                          ) : memory.type === "photo" ? (
                            <Image className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Video className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{memory.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {memory.date} · {memory.yearsAgo} years ago
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Hide from timeline</DropdownMenuItem>
                          <DropdownMenuItem>Edit memory</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete memory</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="mb-4">{memory.description}</p>
                    {memory.image && (
                      <img src={memory.image || "/placeholder.svg"} alt={memory.title} className="w-full rounded-md" />
                    )}
                  </div>

                  <div className="px-4 py-2 border-t">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{memory.likes}</span>
                      </div>
                      <div className="flex space-x-3">
                        <span>{memory.comments} comments</span>
                        <span>{memory.shares} shares</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-t pt-2">
                      <Button
                        variant="ghost"
                        className={`flex items-center justify-center rounded-none ${
                          memory.liked ? "text-blue-600" : ""
                        }`}
                        onClick={() => toggleLike(memory.id)}
                      >
                        <ThumbsUp className="h-5 w-5 mr-2" />
                        <span>Like</span>
                      </Button>
                      <Button variant="ghost" className="flex items-center justify-center rounded-none">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        <span>Comment</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex items-center justify-center rounded-none"
                        onClick={() => shareMemory(memory.id)}
                      >
                        <Share className="h-5 w-5 mr-2" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="on-this-day" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memories
              .filter((memory) => memory.type === "on-this-day")
              .map((memory) => (
                <Card key={memory.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{memory.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {memory.date} · {memory.yearsAgo} years ago
                            </p>
                          </div>
                        </div>
                        <Badge>On This Day</Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="mb-4">{memory.description}</p>
                      {memory.image && (
                        <img
                          src={memory.image || "/placeholder.svg"}
                          alt={memory.title}
                          className="w-full rounded-md"
                        />
                      )}
                    </div>

                    <div className="px-4 py-2 border-t">
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{memory.likes}</span>
                        </div>
                        <div className="flex space-x-3">
                          <span>{memory.comments} comments</span>
                          <span>{memory.shares} shares</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 border-t pt-2">
                        <Button
                          variant="ghost"
                          className={`flex items-center justify-center rounded-none ${
                            memory.liked ? "text-blue-600" : ""
                          }`}
                          onClick={() => toggleLike(memory.id)}
                        >
                          <ThumbsUp className="h-5 w-5 mr-2" />
                          <span>Like</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center justify-center rounded-none">
                          <MessageSquare className="h-5 w-5 mr-2" />
                          <span>Comment</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex items-center justify-center rounded-none"
                          onClick={() => shareMemory(memory.id)}
                        >
                          <Share className="h-5 w-5 mr-2" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="friendships" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memories
              .filter((memory) => memory.type === "friendship")
              .map((memory) => (
                <Card key={memory.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{memory.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {memory.date} · {memory.yearsAgo} years ago
                            </p>
                          </div>
                        </div>
                        <Badge>Friendship</Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="mb-4">{memory.description}</p>
                      {memory.image && (
                        <img
                          src={memory.image || "/placeholder.svg"}
                          alt={memory.title}
                          className="w-full rounded-md"
                        />
                      )}
                    </div>

                    <div className="px-4 py-2 border-t">
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{memory.likes}</span>
                        </div>
                        <div className="flex space-x-3">
                          <span>{memory.comments} comments</span>
                          <span>{memory.shares} shares</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 border-t pt-2">
                        <Button
                          variant="ghost"
                          className={`flex items-center justify-center rounded-none ${
                            memory.liked ? "text-blue-600" : ""
                          }`}
                          onClick={() => toggleLike(memory.id)}
                        >
                          <ThumbsUp className="h-5 w-5 mr-2" />
                          <span>Like</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center justify-center rounded-none">
                          <MessageSquare className="h-5 w-5 mr-2" />
                          <span>Comment</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex items-center justify-center rounded-none"
                          onClick={() => shareMemory(memory.id)}
                        >
                          <Share className="h-5 w-5 mr-2" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recaps" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Recaps Available</h2>
            <p className="text-muted-foreground mb-4">We'll create personalized recaps of your memories over time.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Users({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Image({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function Video({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}
