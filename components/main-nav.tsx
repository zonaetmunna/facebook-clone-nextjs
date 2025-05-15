"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Users,
  PlayCircle,
  ShoppingBag,
  Bell,
  MessageCircle,
  Search,
  User,
  LogOut,
  Menu,
  Calendar,
  Bookmark,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MainNav() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(5)
  const [messages, setMessages] = useState(3)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { icon: Home, label: "Home", href: "/feed", active: false },
    { icon: Users, label: "Friends", href: "/friends", active: false },
    { icon: PlayCircle, label: "Watch", href: "/watch", active: false },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", active: false },
    { icon: Calendar, label: "Events", href: "/events", active: false },
    { icon: Bookmark, label: "Saved", href: "/saved", active: false },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/feed" className="mr-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">f</span>
            </div>
          </Link>
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search Facebook"
              className="w-60 pl-10 rounded-full bg-muted border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <nav className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <Button key={index} variant="ghost" size="icon" className="h-12 w-12 rounded-md hover:bg-muted" asChild>
                <Link href={item.href}>
                  <item.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full bg-muted hover:bg-muted/80">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <div className="py-4">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-2xl font-bold">f</span>
                  </div>
                  <h2 className="text-xl font-bold">Facebook</h2>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-foreground hover:bg-muted"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Link
                    href="/settings"
                    className="flex items-center px-3 py-2 rounded-md text-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-foreground hover:bg-muted"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span>Profile</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-muted hover:bg-muted/80 relative"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500"
                variant="destructive"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-muted hover:bg-muted/80 relative"
            onClick={() => router.push("/messages")}
          >
            <MessageCircle className="h-5 w-5" />
            {messages > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500"
                variant="destructive"
              >
                {messages}
              </Badge>
            )}
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
