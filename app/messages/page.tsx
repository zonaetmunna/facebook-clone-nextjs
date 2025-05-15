"use client"

import { MessagesList } from "@/components/messages-list"
import { MessageCircle } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] -mt-4 bg-white rounded-md shadow-sm overflow-hidden">
      {/* Contacts Sidebar */}
      <MessagesList />

      {/* Empty State for Chat Area */}
      <div className="hidden md:flex flex-col flex-1 items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
          <p className="text-gray-500 mb-4">Select a chat to start messaging</p>
        </div>
      </div>

      {/* Mobile view - show a message to select chat on desktop */}
      <div className="flex md:hidden flex-col flex-1 items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
          <p className="text-gray-500 mb-4">Please use a larger screen to view your messages and chat</p>
        </div>
      </div>
    </div>
  )
}
