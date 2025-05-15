"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react"
import { useInView } from "react-intersection-observer"

interface Short {
  id: string
  username: string
  userAvatar: string
  caption: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

export default function ShortsPage() {
  const [shorts, setShorts] = useState<Short[]>([
    {
      id: "1",
      username: "alex_adventures",
      userAvatar: "/placeholder.svg?height=40&width=40&text=AA",
      caption: "Exploring the mountains! #adventure #travel",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      likes: 1245,
      comments: 89,
      shares: 32,
      isLiked: false,
    },
    {
      id: "2",
      username: "fitness_with_sarah",
      userAvatar: "/placeholder.svg?height=40&width=40&text=FS",
      caption: "Quick 30-second workout you can do anywhere! #fitness #health",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-exercises-at-home-1456-large.mp4",
      likes: 3782,
      comments: 156,
      shares: 245,
      isLiked: false,
    },
    {
      id: "3",
      username: "cooking_master",
      userAvatar: "/placeholder.svg?height=40&width=40&text=CM",
      caption: "Easy pasta recipe that takes only 10 minutes! #cooking #food",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cooking-with-a-pan-on-a-stove-2436-large.mp4",
      likes: 5621,
      comments: 342,
      shares: 178,
      isLiked: false,
    },
    {
      id: "4",
      username: "travel_with_mike",
      userAvatar: "/placeholder.svg?height=40&width=40&text=TM",
      caption: "Beautiful sunset at the beach! #travel #beach #sunset",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
      likes: 8943,
      comments: 421,
      shares: 367,
      isLiked: false,
    },
    {
      id: "5",
      username: "pet_lover",
      userAvatar: "/placeholder.svg?height=40&width=40&text=PL",
      caption: "My dog learning a new trick! #pets #dogs #cute",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dog-catches-a-ball-in-the-snow-1221-large.mp4",
      likes: 12453,
      comments: 876,
      shares: 543,
      isLiked: false,
    },
  ])

  const [currentShortIndex, setCurrentShortIndex] = useState(0)
  const [muted, setMuted] = useState(true)

  const toggleLike = (id: string) => {
    setShorts((prevShorts) =>
      prevShorts.map((short) => {
        if (short.id === id) {
          return {
            ...short,
            isLiked: !short.isLiked,
            likes: short.isLiked ? short.likes - 1 : short.likes + 1,
          }
        }
        return short
      }),
    )
  }

  const ShortVideo = ({ short, index }: { short: Short; index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { ref, inView } = useInView({
      threshold: 0.7,
    })

    useEffect(() => {
      if (inView) {
        setCurrentShortIndex(index)
        videoRef.current?.play()
      } else {
        videoRef.current?.pause()
      }
    }, [inView, index])

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = muted
      }
    }, [muted])

    return (
      <div ref={ref} className="relative h-[calc(100vh-56px)] snap-start flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={short.videoUrl}
          className="h-full w-full object-contain"
          loop
          playsInline
          onClick={() => setMuted(!muted)}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-start">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={short.userAvatar || "/placeholder.svg"} alt={short.username} />
              <AvatarFallback>{short.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1">
              <p className="font-bold">{short.username}</p>
              <p className="text-sm">{short.caption}</p>
            </div>
          </div>
        </div>

        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
            onClick={() => toggleLike(short.id)}
          >
            <Heart className={`h-7 w-7 ${short.isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs font-semibold mt-1">{short.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="text-xs font-semibold mt-1">{short.comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
          >
            <Share2 className="h-7 w-7" />
            <span className="text-xs font-semibold mt-1">{short.shares}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX className="h-7 w-7" /> : <Volume2 className="h-7 w-7" />}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-56px)] overflow-y-auto snap-y snap-mandatory">
      {shorts.map((short, index) => (
        <ShortVideo key={short.id} short={short} index={index} />
      ))}
    </div>
  )
}
