"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CallInterface } from "@/components/call-interface"

interface CallPageProps {
  params: {
    type: string
    id: string
  }
}

export default function CallPage({ params }: CallPageProps) {
  const router = useRouter()
  const { type, id } = params
  const isVideoCall = type === "video"

  const [isCallConnected, setIsCallConnected] = useState(false)
  const [isCallAccepted, setIsCallAccepted] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    name: "Loading...",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  // Simulate fetching contact info
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const contacts = [
      { id: "1", name: "Jane Smith", avatar: "/placeholder.svg?height=100&width=100&text=JS" },
      { id: "2", name: "Mike Johnson", avatar: "/placeholder.svg?height=100&width=100&text=MJ" },
      { id: "3", name: "Sarah Williams", avatar: "/placeholder.svg?height=100&width=100&text=SW" },
      { id: "4", name: "David Brown", avatar: "/placeholder.svg?height=100&width=100&text=DB" },
    ]

    const contact = contacts.find((c) => c.id === id) || {
      id,
      name: `Contact ${id}`,
      avatar: `/placeholder.svg?height=100&width=100&text=C${id}`,
    }

    setContactInfo(contact)

    // Simulate call connecting
    const connectTimer = setTimeout(() => {
      setIsCallConnected(true)

      // Simulate call being accepted after a delay
      const acceptTimer = setTimeout(() => {
        setIsCallAccepted(true)
      }, 2000)

      return () => clearTimeout(acceptTimer)
    }, 1500)

    return () => clearTimeout(connectTimer)
  }, [id])

  const handleEndCall = () => {
    router.push("/messages")
  }

  const handleAcceptCall = () => {
    setIsCallAccepted(true)
  }

  const handleRejectCall = () => {
    router.push("/messages")
  }

  // Call connecting screen
  if (!isCallConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gray-100">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-blue-300"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Connecting...</h2>
          <p className="text-gray-500">
            {isVideoCall ? "Video call" : "Audio call"} to {contactInfo.name}
          </p>
        </div>
      </div>
    )
  }

  // Incoming call screen (waiting for acceptance)
  if (isCallConnected && !isCallAccepted) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gray-100">
        <div className="text-center mb-8">
          <img
            src={contactInfo.avatar || "/placeholder.svg"}
            alt={contactInfo.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-2">{contactInfo.name}</h2>
          <p className="text-gray-500 mb-2">{isVideoCall ? "Video call" : "Audio call"} incoming...</p>
          <div className="flex justify-center items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="flex space-x-6">
          <button
            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
            onClick={handleRejectCall}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg"
            onClick={handleAcceptCall}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // Active call screen
  return (
    <CallInterface
      contactName={contactInfo.name}
      contactAvatar={contactInfo.avatar}
      isVideoCall={isVideoCall}
      onEndCall={handleEndCall}
    />
  )
}
