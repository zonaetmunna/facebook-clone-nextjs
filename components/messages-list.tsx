"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function MessagesList() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const contacts = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      lastMessage: "Great! See you tomorrow!",
      time: "10:37 AM",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      lastMessage: "We should watch the next one together",
      time: "9:16 AM",
      unread: 2,
      online: true,
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      lastMessage: "Thanks for the help with the project!",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      lastMessage: "Let's catch up soon!",
      time: "Last week",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
      lastMessage: "Did you see the new movie?",
      time: "2 days ago",
      unread: 1,
      online: false,
    },
    {
      id: 6,
      name: "Alex Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=AW",
      lastMessage: "I'll send you the details later",
      time: "3 days ago",
      unread: 0,
      online: true,
    },
    {
      id: 7,
      name: "Jessica Taylor",
      avatar: "/placeholder.svg?height=40&width=40&text=JT",
      lastMessage: "Happy birthday!",
      time: "1 week ago",
      unread: 0,
      online: false,
    },
    {
      id: 8,
      name: "Ryan Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=RM",
      lastMessage: "Are you coming to the meeting?",
      time: "2 days ago",
      unread: 3,
      online: true,
    },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleContactClick = (contactId: number) => {
    router.push(`/messages/${contactId}`)
  }

  const isActive = (contactId: number) => {
    return pathname === `/messages/${contactId}`
  }

  return (
    <div className="w-80 border-r bg-card overflow-hidden flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Chats</h2>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search messages"
            className="pl-10 bg-muted border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center p-3 cursor-pointer hover:bg-muted transition-colors",
              isActive(contact.id) && "bg-muted",
            )}
            onClick={() => handleContactClick(contact.id)}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
              )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                {contact.unread > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/messages")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Messages
        </Button>
      </div>
    </div>
  )
}
