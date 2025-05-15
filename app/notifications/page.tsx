"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, ThumbsUp, MessageSquare, UserPlus, Calendar, Bell, BellOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  type: "like" | "comment" | "friend" | "event" | "group" | "mention" | "birthday"
  content: string
  time: string
  read: boolean
  user: {
    name: string
    avatar: string
  }
  link: string
  image?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "like",
      content: "liked your post",
      time: "2 minutes ago",
      read: false,
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
      },
      link: "/post/123",
      image: "/placeholder.svg?height=60&width=60&text=Post",
    },
    {
      id: 2,
      type: "comment",
      content: 'commented on your post: "This is amazing! Love the colors."',
      time: "1 hour ago",
      read: false,
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      },
      link: "/post/123",
    },
    {
      id: 3,
      type: "friend",
      content: "accepted your friend request",
      time: "3 hours ago",
      read: true,
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40&text=SW",
      },
      link: "/profile/sarah",
    },
    {
      id: 4,
      type: "event",
      content: "invited you to an event: Tech Conference 2023",
      time: "Yesterday",
      read: true,
      user: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=40&width=40&text=DB",
      },
      link: "/events/456",
      image: "/placeholder.svg?height=60&width=60&text=Event",
    },
    {
      id: 5,
      type: "group",
      content: "added you to the group: Web Developers Community",
      time: "2 days ago",
      read: true,
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40&text=ED",
      },
      link: "/groups/789",
    },
    {
      id: 6,
      type: "mention",
      content: 'mentioned you in a comment: "@John what do you think about this?"',
      time: "3 days ago",
      read: true,
      user: {
        name: "Chris Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=CW",
      },
      link: "/post/234",
    },
    {
      id: 7,
      type: "birthday",
      content: "It's Mike Johnson's birthday today!",
      time: "Today",
      read: false,
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      },
      link: "/profile/mike",
    },
  ])

  const markAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== notificationId))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="h-4 w-4 text-blue-600" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case "friend":
        return <UserPlus className="h-4 w-4 text-purple-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-yellow-600" />
      case "group":
        return <Users className="h-4 w-4 text-pink-600" />
      case "mention":
        return <AtSymbol className="h-4 w-4 text-orange-600" />
      case "birthday":
        return <Cake className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
          <Button variant="outline">
            <BellOff className="h-4 w-4 mr-2" />
            <span>Mute Notifications</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start hover:bg-gray-50 ${
                        !notification.read ? "bg-blue-50 hover:bg-blue-50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="relative mr-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-white">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">{notification.user.name}</span> {notification.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                {notification.read ? "Mark as unread" : "Mark as read"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>Remove this notification</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Turn off notifications for this</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        {notification.image && (
                          <div className="mt-2">
                            <img
                              src={notification.image || "/placeholder.svg"}
                              alt="Notification content"
                              className="h-12 w-12 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Notifications</h2>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {notifications.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y">
                  {notifications
                    .filter((notification) => !notification.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 flex items-start bg-blue-50 hover:bg-blue-50"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="relative mr-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-white">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm">
                                <span className="font-semibold">{notification.user.name}</span> {notification.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </DropdownMenuItem>
                                <DropdownMenuItem>Remove this notification</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Turn off notifications for this</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          {notification.image && (
                            <div className="mt-2">
                              <img
                                src={notification.image || "/placeholder.svg"}
                                alt="Notification content"
                                className="h-12 w-12 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Unread Notifications</h2>
                  <p className="text-gray-500">You've read all your notifications!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {notifications.filter((n) => n.type === "mention").length > 0 ? (
                <div className="divide-y">
                  {notifications
                    .filter((notification) => notification.type === "mention")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 flex items-start hover:bg-gray-50 ${
                          !notification.read ? "bg-blue-50 hover:bg-blue-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="relative mr-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-white">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm">
                                <span className="font-semibold">{notification.user.name}</span> {notification.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  {notification.read ? "Mark as unread" : "Mark as read"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>Remove this notification</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Turn off notifications for this</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AtSymbol className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Mentions</h2>
                  <p className="text-gray-500">You haven't been mentioned in any posts or comments</p>
                </div>
              )}
            </CardContent>
          </Card>
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

function AtSymbol({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  )
}

function Cake({ className }: { className?: string }) {
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
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v2" />
      <path d="M12 8v2" />
      <path d="M17 8v2" />
      <path d="M7 4h.01" />
      <path d="M12 4h.01" />
      <path d="M17 4h.01" />
    </svg>
  )
}
