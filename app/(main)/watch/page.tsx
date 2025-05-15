"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Play,
  ThumbsUp,
  MessageSquare,
  Share,
  MoreHorizontal,
  Clock,
  Volume2,
  VolumeX,
  Maximize,
  Pause,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useInView } from "react-intersection-observer"

interface Video {
  id: number
  title: string
  creator: {
    name: string
    avatar: string
  }
  views: string
  postedTime: string
  duration: string
  thumbnail: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
}

export default function WatchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({})
  const [isMuted, setIsMuted] = useState(true)
  const [videoProgress, setVideoProgress] = useState<Record<number, number>>({})
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const { toast } = useToast()

  const videos: Video[] = [
    {
      id: 1,
      title: "Amazing sunset at the beach - Nature's beauty",
      creator: {
        name: "Nature Channel",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      views: "1.2M views",
      postedTime: "2 days ago",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1616036740257-9449ea1f6605",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 45000,
      comments: 1200,
      shares: 3500,
    },
    {
      id: 2,
      title: "How to make the perfect chocolate cake - Easy recipe",
      creator: {
        name: "Cooking Masters",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      views: "850K views",
      postedTime: "1 week ago",
      duration: "12:30",
      thumbnail: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 32000,
      comments: 2800,
      shares: 1500,
    },
    {
      id: 3,
      title: "Top 10 travel destinations for 2023 - Budget friendly",
      creator: {
        name: "Travel Guide",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      views: "2.5M views",
      postedTime: "3 weeks ago",
      duration: "18:20",
      thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 78000,
      comments: 5400,
      shares: 12000,
    },
    {
      id: 4,
      title: "Morning workout routine - 15 minutes for beginners",
      creator: {
        name: "Fitness Pro",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      views: "3.7M views",
      postedTime: "1 month ago",
      duration: "15:45",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 125000,
      comments: 8700,
      shares: 45000,
    },
    {
      id: 5,
      title: "DIY home decoration ideas - Transform your space",
      creator: {
        name: "Home & Design",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      },
      views: "980K views",
      postedTime: "5 days ago",
      duration: "22:10",
      thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 42000,
      comments: 3100,
      shares: 7800,
    },
    {
      id: 6,
      title: "Learn JavaScript in 30 minutes - Beginner's guide",
      creator: {
        name: "Code Academy",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      views: "1.5M views",
      postedTime: "2 months ago",
      duration: "30:00",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 67000,
      comments: 4200,
      shares: 15000,
    },
  ]

  const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
  }

  const handleLike = (videoId: number) => {
    toast({
      title: "Liked!",
      description: "You liked this video",
    })
  }

  const handleComment = (videoId: number) => {
    toast({
      title: "Comment added!",
      description: "Your comment has been added",
    })
  }

  const handleShare = (videoId: number) => {
    toast({
      title: "Shared!",
      description: "Video has been shared",
    })
  }

  const togglePlay = (videoId: number) => {
    const videoElement = videoRefs.current[videoId]
    if (!videoElement) return

    if (videoElement.paused) {
      videoElement.play()
      setIsPlaying((prev) => ({ ...prev, [videoId]: true }))
    } else {
      videoElement.pause()
      setIsPlaying((prev) => ({ ...prev, [videoId]: false }))
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    // Apply mute/unmute to all video elements
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) {
        videoEl.muted = !isMuted
      }
    })
  }

  const updateProgress = (videoId: number) => {
    const videoElement = videoRefs.current[videoId]
    if (!videoElement) return

    const progress = (videoElement.currentTime / videoElement.duration) * 100
    setVideoProgress((prev) => ({ ...prev, [videoId]: progress }))
  }

  const VideoCard = ({ video, inView }: { video: Video; inView?: boolean }) => {
    const { ref, inView: isVisible } = useInView({
      threshold: 0.5,
      triggerOnce: false,
    })

    useEffect(() => {
      if (isVisible && videoRefs.current[video.id]) {
        // Autoplay when in view
        const videoElement = videoRefs.current[video.id]
        if (videoElement) {
          videoElement
            .play()
            .then(() => {
              setIsPlaying((prev) => ({ ...prev, [video.id]: true }))
            })
            .catch((error) => {
              console.error("Autoplay failed:", error)
            })
        }
      } else if (!isVisible && videoRefs.current[video.id]) {
        // Pause when out of view
        const videoElement = videoRefs.current[video.id]
        if (videoElement) {
          videoElement.pause()
          setIsPlaying((prev) => ({ ...prev, [video.id]: false }))
        }
      }
    }, [isVisible, video.id])

    return (
      <Card ref={ref} className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {inView ? (
              <div className="relative aspect-video">
                <video
                  ref={(el) => (videoRefs.current[video.id] = el)}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={() => updateProgress(video.id)}
                  onClick={() => togglePlay(video.id)}
                />

                {/* Video controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  {/* Progress bar */}
                  <div className="h-1 w-full bg-gray-500/50 rounded-full mb-2">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: `${videoProgress[video.id] || 0}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlay(video.id)
                        }}
                      >
                        {isPlaying[video.id] ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute()
                        }}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVideoClick(video)
                      }}
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full aspect-video object-cover cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/90 h-12 w-12"
                    onClick={() => handleVideoClick(video)}
                  >
                    <Play className="h-6 w-6 text-gray-900" />
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="p-3">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Save video</DropdownMenuItem>
                      <DropdownMenuItem>Add to Watch Later</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Hide video</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-gray-500">{video.creator.name}</p>
                <div className="flex text-xs text-gray-500 mt-1">
                  <span>{video.views}</span>
                  <span className="mx-1">•</span>
                  <span>{video.postedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleLike(video.id)}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span>{formatNumber(video.likes)}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleComment(video.id)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>{formatNumber(video.comments)}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleShare(video.id)}>
                <Share className="h-4 w-4 mr-2" />
                <span>{formatNumber(video.shares)}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Watch</h1>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search videos"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="foryou">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                inView={index < 2} // Only the first two videos will autoplay initially
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Live Videos</h2>
            <p className="text-gray-500">Watch live videos from your friends and pages you follow.</p>
          </div>
        </TabsContent>

        <TabsContent value="gaming" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Gaming Videos</h2>
            <p className="text-gray-500">Watch gaming videos from creators you follow.</p>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Saved Videos</h2>
            <p className="text-gray-500">Videos you save will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedVideo && (
            <div className="flex flex-col">
              <div className="relative bg-black">
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnail}
                  className="w-full aspect-video"
                  controls
                  autoPlay
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{selectedVideo.title}</h2>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={selectedVideo.creator.avatar || "/placeholder.svg"}
                        alt={selectedVideo.creator.name}
                      />
                      <AvatarFallback>{selectedVideo.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedVideo.creator.name}</p>
                      <p className="text-sm text-gray-500">
                        {selectedVideo.views} • {selectedVideo.postedTime}
                      </p>
                    </div>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>

                <div className="flex space-x-2 border-t border-b py-3 mb-4">
                  <Button variant="ghost" className="flex-1" onClick={() => handleLike(selectedVideo.id)}>
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    <span>{formatNumber(selectedVideo.likes)}</span>
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => handleComment(selectedVideo.id)}>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>{formatNumber(selectedVideo.comments)}</span>
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => handleShare(selectedVideo.id)}>
                    <Share className="h-5 w-5 mr-2" />
                    <span>Share</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Comments ({formatNumber(selectedVideo.comments)})</h3>

                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Write a comment..." className="flex-1" />
                  </div>

                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {[1, 2, 3].map((comment) => (
                      <div key={comment} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://randomuser.me/api/portraits/${comment % 2 ? "women" : "men"}/${comment * 10}.jpg`}
                          />
                          <AvatarFallback>U{comment}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">User {comment}</p>
                          <p className="text-sm">Great video! I really enjoyed watching this.</p>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                            <span>2d ago</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              Like
                            </Button>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}
