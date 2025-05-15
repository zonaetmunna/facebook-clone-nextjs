"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, Users, Clock, Bookmark, Flag, Calendar, ShoppingBag, PlayCircle, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const sidebarItems = [
    { 
      icon: <User className="h-5 w-5 mr-3" />, 
      label: "John Doe", 
      href: "/profile", 
      active: pathname === "/profile",
      avatar: true
    },
    { 
      icon: <Users className="h-5 w-5 mr-3" />, 
      label: "Friends", 
      href: "/friends", 
      active: pathname === "/friends" 
    },
    {
      icon: <Clock className="h-5 w-5 mr-3" />,
      label: "Memories",
      href: "/memories",
      active: pathname === "/memories",
    },
    { 
      icon: <Bookmark className="h-5 w-5 mr-3" />, 
      label: "Saved", 
      href: "/saved", 
      active: pathname === "/saved" 
    },
    { 
      icon: <Flag className="h-5 w-5 mr-3" />, 
      label: "Pages", 
      href: "/pages", 
      active: pathname === "/pages" 
    },
    { 
      icon: <Calendar className="h-5 w-5 mr-3" />, 
      label: "Events", 
      href: "/events", 
      active: pathname === "/events" 
    },
    {
      icon: <ShoppingBag className="h-5 w-5 mr-3" />,
      label: "Marketplace",
      href: "/marketplace",
      active: pathname === "/marketplace",
    },
    { 
      icon: <PlayCircle className="h-5 w-5 mr-3" />, 
      label: "Watch", 
      href: "/watch", 
      active: pathname === "/watch" 
    },
  ]

  return (
    <aside className={cn("py-4", className)}>
      <nav className="space-y-1">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-foreground hover:bg-muted rounded-md transition-colors",
              item.active && "bg-muted font-medium",
            )}
          >
            {item.avatar ? (
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            ) : (
              item.icon
            )}
            <span>{item.label}</span>
          </Link>
        ))}
        <Button variant="ghost" className="w-full justify-start px-3 py-2 text-foreground hover:bg-muted rounded-md">
          <ChevronDown className="h-5 w-5 mr-3" />
          <span>See more</span>
        </Button>
      </nav>
      <div className="mt-4 pt-4 border-t">
        <h3 className="px-3 text-sm text-muted-foreground font-medium mb-2">Your shortcuts</h3>
        <div className="space-y-1">
          {[1, 2, 3].map((group) => (
            <Link
              key={group}
              href="#"
              className="flex items-center px-3 py-2 text-foreground hover:bg-muted rounded-md"
            >
              <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
              <span>Group {group}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
