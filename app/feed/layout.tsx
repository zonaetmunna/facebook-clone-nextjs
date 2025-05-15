import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Sidebar } from "@/components/sidebar"
import { RightSidebar } from "@/components/right-sidebar"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <MainNav />
      <div className="container mx-auto px-4 pt-16 pb-8 flex gap-4">
        <Sidebar className="hidden md:block w-1/5" />
        <main className="flex-1">{children}</main>
        <RightSidebar className="hidden lg:block w-1/4" />
      </div>
    </div>
  )
}
