"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Users, Bell, Settings, MoreHorizontal, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Group {
  id: number
  name: string
  description: string
  members: number
  privacy: "public" | "private" | "closed"
  category: string
  image: string
  lastActivity: string
  joined: boolean
  notifications: boolean
  unreadPosts?: number
}

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Groups" },
    { id: "your", name: "Your Groups" },
    { id: "discover", name: "Discover" },
    { id: "tech", name: "Technology" },
    { id: "hobby", name: "Hobbies & Interests" },
    { id: "local", name: "Local Communities" },
    { id: "support", name: "Support" },
  ]

  const groups: Group[] = [
    {
      id: 1,
      name: "Web Developers Community",
      description: "A group for web developers to share knowledge, ask questions, and network.",
      members: 12500,
      privacy: "public",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400&text=Web Devs",
      lastActivity: "Active now",
      joined: true,
      notifications: true,
      unreadPosts: 5,
    },
    {
      id: 2,
      name: "Photography Enthusiasts",
      description: "Share your photos, get feedback, and discuss photography techniques.",
      members: 8750,
      privacy: "public",
      category: "Hobbies & Interests",
      image: "/placeholder.svg?height=200&width=400&text=Photography",
      lastActivity: "Active 2h ago",
      joined: true,
      notifications: false,
    },
    {
      id: 3,
      name: "San Francisco Hikers",
      description: "Local hiking group for the San Francisco Bay Area. Join us for weekend hikes!",
      members: 3200,
      privacy: "public",
      category: "Local Communities",
      image: "/placeholder.svg?height=200&width=400&text=SF Hikers",
      lastActivity: "Active 1d ago",
      joined: false,
      notifications: false,
    },
    {
      id: 4,
      name: "Startup Founders Network",
      description: "Connect with other startup founders, share experiences, and get advice.",
      members: 5600,
      privacy: "closed",
      category: "Business",
      image: "/placeholder.svg?height=200&width=400&text=Startups",
      lastActivity: "Active 5h ago",
      joined: false,
      notifications: false,
    },
    {
      id: 5,
      name: "Book Club",
      description: "Monthly book discussions and recommendations for avid readers.",
      members: 2800,
      privacy: "public",
      category: "Hobbies & Interests",
      image: "/placeholder.svg?height=200&width=400&text=Book Club",
      lastActivity: "Active yesterday",
      joined: true,
      notifications: true,
    },
    {
      id: 6,
      name: "Mental Health Support",
      description: "A safe space to discuss mental health challenges and support each other.",
      members: 4500,
      privacy: "private",
      category: "Support",
      image: "/placeholder.svg?height=200&width=400&text=Support",
      lastActivity: "Active 3h ago",
      joined: false,
      notifications: false,
    },
  ]

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "your" && group.joined) ||
      (selectedCategory === "discover" && !group.joined) ||
      group.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const toggleJoinGroup = (groupId: number) => {
    // In a real app, you would update this in a database
    console.log(`Toggled join status for group ${groupId}`)
  }

  const toggleNotifications = (groupId: number) => {
    // In a real app, you would update this in a database
    console.log(`Toggled notifications for group ${groupId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Groups</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create New Group</span>
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
              placeholder="Search Groups"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="pt-4">
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

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Your Groups</h3>
            {groups.filter((g) => g.joined).length > 0 ? (
              <div className="space-y-2">
                {groups
                  .filter((g) => g.joined)
                  .map((group) => (
                    <div key={group.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={group.image} alt={group.name} />
                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{group.name}</p>
                        <p className="text-xs text-gray-500">{group.lastActivity}</p>
                      </div>
                      {group.unreadPosts && <Badge className="bg-blue-600">{group.unreadPosts}</Badge>}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">You haven't joined any groups yet.</p>
            )}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Groups</TabsTrigger>
              <TabsTrigger value="joined">Joined</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="invites">Invites</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <Badge
                            className={`
                            ${
                              group.privacy === "public"
                                ? "bg-green-600"
                                : group.privacy === "private"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            }
                          `}
                          >
                            {group.privacy.charAt(0).toUpperCase() + group.privacy.slice(1)}
                          </Badge>
                          {group.joined && group.unreadPosts && (
                            <Badge className="bg-blue-600">{group.unreadPosts} new</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">{group.name}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {group.joined && (
                                <>
                                  <DropdownMenuItem onClick={() => toggleNotifications(group.id)}>
                                    <Bell className="mr-2 h-4 w-4" />
                                    {group.notifications ? "Turn off notifications" : "Turn on notifications"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Group settings
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Leave group</DropdownMenuItem>
                                </>
                              )}
                              {!group.joined && (
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Report group
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{group.description}</p>

                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members.toLocaleString()} members</span>
                          <span className="mx-2">•</span>
                          <span>{group.lastActivity}</span>
                        </div>

                        <div className="mt-4 pt-3 border-t flex items-center justify-between">
                          <span className="text-sm text-gray-500">{group.category}</span>
                          <Button
                            size="sm"
                            variant={group.joined ? "outline" : "default"}
                            className={!group.joined ? "bg-blue-600 hover:bg-blue-700" : ""}
                            onClick={() => toggleJoinGroup(group.id)}
                          >
                            {group.joined ? "Joined" : "Join Group"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredGroups.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Groups Found</h2>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Create New Group</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="joined" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups
                  .filter((group) => group.joined)
                  .map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={group.image || "/placeholder.svg"}
                            alt={group.name}
                            className="w-full h-40 object-cover"
                          />
                          {group.unreadPosts && (
                            <Badge className="absolute top-3 right-3 bg-blue-600">{group.unreadPosts} new</Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg line-clamp-1">{group.name}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toggleNotifications(group.id)}>
                                  <Bell className="mr-2 h-4 w-4" />
                                  {group.notifications ? "Turn off notifications" : "Turn on notifications"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Group settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Leave group</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{group.members.toLocaleString()} members</span>
                            <span className="mx-2">•</span>
                            <span>{group.lastActivity}</span>
                          </div>

                          <div className="mt-4 pt-3 border-t flex items-center justify-between">
                            <span className="text-sm text-gray-500">{group.category}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => toggleJoinGroup(group.id)}>
                                Joined
                              </Button>
                              <Button
                                size="sm"
                                variant={group.notifications ? "default" : "outline"}
                                className={group.notifications ? "bg-blue-600 hover:bg-blue-700" : ""}
                                onClick={() => toggleNotifications(group.id)}
                              >
                                {group.notifications ? "Notifications On" : "Notifications Off"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {filteredGroups.filter((group) => group.joined).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Groups Joined</h2>
                  <p className="text-gray-500 mb-4">You haven't joined any groups yet</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Discover Groups</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="discover" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups
                  .filter((group) => !group.joined)
                  .map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={group.image || "/placeholder.svg"}
                            alt={group.name}
                            className="w-full h-40 object-cover"
                          />
                          <Badge
                            className={`absolute top-3 right-3 
                          ${
                            group.privacy === "public"
                              ? "bg-green-600"
                              : group.privacy === "private"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                          }
                        `}
                          >
                            {group.privacy.charAt(0).toUpperCase() + group.privacy.slice(1)}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg line-clamp-1">{group.name}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Report group
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{group.description}</p>

                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{group.members.toLocaleString()} members</span>
                            <span className="mx-2">•</span>
                            <span>{group.lastActivity}</span>
                          </div>

                          <div className="mt-4 pt-3 border-t flex items-center justify-between">
                            <span className="text-sm text-gray-500">{group.category}</span>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => toggleJoinGroup(group.id)}
                            >
                              Join Group
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="invites" className="mt-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Group Invites</h2>
                <p className="text-gray-500 mb-4">You don't have any pending group invites</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
