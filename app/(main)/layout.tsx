import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Sidebar } from "@/components/sidebar"
import { RightSidebar } from "@/components/right-sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto pt-16 px-4">
        <div className="flex">
          <div className="hidden md:block w-1/5 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <Sidebar />
          </div>
          <main className="flex-1 py-4 md:px-4">{children}</main>
          <div className="hidden lg:block w-1/4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
