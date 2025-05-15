import type React from "react"
import MainNav from "@/components/main-nav"

export default function MessagingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto pt-16 px-4">
        <main>{children}</main>
      </div>
    </div>
  )
}
