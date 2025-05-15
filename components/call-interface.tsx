"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  MoreVertical,
  Volume2,
  MonitorSmartphone,
  Maximize2,
  Minimize2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CallInterfaceProps {
  contactName: string
  contactAvatar: string
  isVideoCall: boolean
  onEndCall: () => void
}

export function CallInterface({ contactName, contactAvatar, isVideoCall, onEndCall }: CallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(isVideoCall)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  // Format call duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return

    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [showControls])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-black" onMouseMove={() => setShowControls(true)}>
      {/* Video Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isVideoCall ? (
          <>
            {/* Remote Video (Full Screen) */}
            <div className="absolute inset-0">
              {isVideoCall && (
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  poster={`/placeholder.svg?height=720&width=1280&text=${contactName}`}
                />
              )}
            </div>

            {/* Local Video (Picture-in-Picture) */}
            {isVideoOn && (
              <div className="absolute bottom-24 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  poster="/placeholder.svg?height=180&width=240&text=You"
                />
              </div>
            )}
          </>
        ) : (
          // Audio Call View
          <div className="text-center">
            <Avatar className="h-32 w-32 mx-auto mb-4">
              <AvatarImage src={contactAvatar || "/placeholder.svg"} alt={contactName} />
              <AvatarFallback className="text-4xl">{contactName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-white mb-2">{contactName}</h2>
            <p className="text-gray-300">{formatDuration(callDuration)}</p>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="text-white mb-6">
            <p className="text-center">{formatDuration(callDuration)}</p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            {isVideoCall && (
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-red-600 text-white hover:bg-red-700"
              onClick={onEndCall}
            >
              <PhoneOff className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-gray-800 text-white hover:bg-gray-700"
            >
              <Volume2 className="h-6 w-6" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  <MoreVertical className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => toggleFullscreen()}>
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      <span>Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="mr-2 h-4 w-4" />
                      <span>Enter Fullscreen</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MonitorSmartphone className="mr-2 h-4 w-4" />
                  <span>Switch Device</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Open Chat</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Add Participant</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
