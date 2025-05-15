"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Calendar, MapPin, Clock, Users, MoreHorizontal, CalendarClock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  image: string
  organizer: {
    name: string
    avatar: string
  }
  attendees: number
  interested: number
  status: "going" | "interested" | "invited" | "none"
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Events" },
    { id: "today", name: "Today" },
    { id: "weekend", name: "This Weekend" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "online", name: "Online Events" },
    { id: "local", name: "Local Events" },
  ]

  const events: Event[] = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "Saturday, July 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco Convention Center",
      image: "/placeholder.svg?height=200&width=400&text=Tech Conference",
      organizer: {
        name: "Tech Innovators",
        avatar: "/placeholder.svg?height=40&width=40&text=TI",
      },
      attendees: 1250,
      interested: 3500,
      status: "going",
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "July 22-24, 2023",
      time: "12:00 PM - 11:00 PM",
      location: "Golden Gate Park",
      image: "/placeholder.svg?height=200&width=400&text=Music Festival",
      organizer: {
        name: "SF Music Events",
        avatar: "/placeholder.svg?height=40&width=40&text=SF",
      },
      attendees: 5000,
      interested: 12000,
      status: "interested",
    },
    {
      id: 3,
      title: "Charity Run for Education",
      date: "Sunday, August 6, 2023",
      time: "7:00 AM - 11:00 AM",
      location: "Marina Green",
      image: "/placeholder.svg?height=200&width=400&text=Charity Run",
      organizer: {
        name: "Education First",
        avatar: "/placeholder.svg?height=40&width=40&text=EF",
      },
      attendees: 750,
      interested: 1200,
      status: "invited",
    },
    {
      id: 4,
      title: "Online Workshop: Digital Marketing Essentials",
      date: "Tuesday, July 18, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Online (Zoom)",
      image: "/placeholder.svg?height=200&width=400&text=Workshop",
      organizer: {
        name: "Digital Marketing Pros",
        avatar: "/placeholder.svg?height=40&width=40&text=DM",
      },
      attendees: 320,
      interested: 850,
      status: "none",
    },
    {
      id: 5,
      title: "Art Exhibition: Modern Perspectives",
      date: "July 10-31, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "Downtown Art Gallery",
      image: "/placeholder.svg?height=200&width=400&text=Art Exhibition",
      organizer: {
        name: "Contemporary Arts Foundation",
        avatar: "/placeholder.svg?height=40&width=40&text=CA",
      },
      attendees: 890,
      interested: 2100,
      status: "none",
    },
    {
      id: 6,
      title: "Networking Mixer for Professionals",
      date: "Thursday, July 20, 2023",
      time: "6:30 PM - 9:00 PM",
      location: "Skyline Lounge",
      image: "/placeholder.svg?height=200&width=400&text=Networking",
      organizer: {
        name: "Professional Connect",
        avatar: "/placeholder.svg?height=40&width=40&text=PC",
      },
      attendees: 150,
      interested: 320,
      status: "none",
    },
  ]

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const updateEventStatus = (eventId: number, newStatus: "going" | "interested" | "none") => {
    // In a real app, you would update this in a database
    console.log(`Updated event ${eventId} status to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create New Event</span>
          </Button>
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming Events</SelectItem>
              <SelectItem value="past">Past Events</SelectItem>
              <SelectItem value="hosting">Events You're Hosting</SelectItem>
              <SelectItem value="birthday">Birthday Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search Events"
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
            <h3 className="font-semibold mb-2">Your Calendar</h3>
            <Card>
              <CardContent className="p-3">
                <div className="text-center py-8">
                  <CalendarClock className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Your upcoming events will appear here</p>
                  <Button variant="link" className="mt-2 text-blue-600">
                    Find Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Events Grid */}
        <div className="md:col-span-3">
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="going">Going</TabsTrigger>
              <TabsTrigger value="interested">Interested</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        {event.status !== "none" && (
                          <Badge
                            className={`absolute top-3 right-3 ${
                              event.status === "going"
                                ? "bg-green-600"
                                : event.status === "interested"
                                  ? "bg-blue-600"
                                  : "bg-yellow-600"
                            }`}
                          >
                            {event.status === "going"
                              ? "Going"
                              : event.status === "interested"
                                ? "Interested"
                                : "Invited"}
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Add to calendar</DropdownMenuItem>
                              <DropdownMenuItem>Share event</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Report event</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-2 space-y-2 text-sm text-gray-500">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>
                              {event.attendees} going · {event.interested} interested
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="ml-2 text-sm">By {event.organizer.name}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant={event.status === "going" ? "default" : "outline"}
                              className={event.status === "going" ? "bg-blue-600 hover:bg-blue-700" : ""}
                              onClick={() => updateEventStatus(event.id, event.status === "going" ? "none" : "going")}
                            >
                              {event.status === "going" ? "Going" : "Go"}
                            </Button>
                            <Button
                              size="sm"
                              variant={event.status === "interested" ? "default" : "outline"}
                              className={event.status === "interested" ? "bg-blue-600 hover:bg-blue-700" : ""}
                              onClick={() =>
                                updateEventStatus(event.id, event.status === "interested" ? "none" : "interested")
                              }
                            >
                              {event.status === "interested" ? "Interested" : "Interested"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="going" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents
                  .filter((event) => event.status === "going")
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-3 right-3 bg-green-600">Going</Badge>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Add to calendar</DropdownMenuItem>
                                <DropdownMenuItem>Share event</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Report event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-2 space-y-2 text-sm text-gray-500">
                            <div className="flex items-start">
                              <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>
                                {event.attendees} going · {event.interested} interested
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                                <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="ml-2 text-sm">By {event.organizer.name}</span>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => updateEventStatus(event.id, "none")}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {filteredEvents.filter((event) => event.status === "going").length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Events</h2>
                    <p className="text-gray-500 mb-4">You haven't marked any events as going</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Find Events</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="interested" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents
                  .filter((event) => event.status === "interested")
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-3 right-3 bg-blue-600">Interested</Badge>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Add to calendar</DropdownMenuItem>
                                <DropdownMenuItem>Share event</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Report event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-2 space-y-2 text-sm text-gray-500">
                            <div className="flex items-start">
                              <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>
                                {event.attendees} going · {event.interested} interested
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                                <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="ml-2 text-sm">By {event.organizer.name}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => updateEventStatus(event.id, "going")}
                              >
                                Go
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => updateEventStatus(event.id, "none")}>
                                Not Interested
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {filteredEvents.filter((event) => event.status === "interested").length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Events</h2>
                    <p className="text-gray-500 mb-4">You haven't marked any events as interested</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Find Events</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Past Events</h2>
                <p className="text-gray-500 mb-4">Events you've attended will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
