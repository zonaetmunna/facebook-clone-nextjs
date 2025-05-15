"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, X, Camera, ImageIcon, Type, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface Story {
  id: number
  user: {
    name: string
    avatar: string
  }
  image: string
  isVideo?: boolean
  videoUrl?: string
  time: string
  viewed: boolean
}

export function StoriesList() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      user: {
        name: "Your Story",
        avatar: "/placeholder.svg?height=40&width=40&text=You",
      },
      image: "/placeholder.svg?height=200&width=120&text=Add+Story",
      time: "Add Story",
      viewed: false,
    },
    {
      id: 2,
      user: {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      time: "2h",
      viewed: false,
    },
    {
      id: 3,
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      image: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f",
      time: "5h",
      viewed: true,
    },
    {
      id: 4,
      user: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      },
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      time: "8h",
      viewed: false,
      isVideo: true,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 5,
      user: {
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      time: "12h",
      viewed: false,
    },
    {
      id: 6,
      user: {
        name: "David Wilson",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      },
      image: "https://images.unsplash.com/photo-1492681290082-e932832941e6",
      time: "1d",
      viewed: true,
    },
  ])

  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [createStoryOpen, setCreateStoryOpen] = useState(false)
  const [storyType, setStoryType] = useState<"photo" | "text">("photo")
  const [storyCaption, setStoryCaption] = useState("")
  const [storyBackground, setStoryBackground] = useState("#3b82f6")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStoryClick = (story: Story) => {
    if (story.id === 1) {
      // This is "Your Story" / "Add Story"
      setCreateStoryOpen(true)
    } else {
      setSelectedStory(story)

      // Mark as viewed
      setStories(stories.map((s) => (s.id === story.id ? { ...s, viewed: true } : s)))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateStory = () => {
    toast({
      title: "Story created!",
      description: "Your story has been published",
    })
    setCreateStoryOpen(false)
    setPreviewImage(null)
    setStoryCaption("")
    setStoryType("photo")
  }

  const backgrounds = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#000000", // black
    "#6b7280", // gray
  ]

  return (
    <div className="relative">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="relative flex-shrink-0 cursor-pointer" onClick={() => handleStoryClick(story)}>
            <div
              className={`w-28 h-48 rounded-xl overflow-hidden border-2 ${
                story.viewed ? "border-gray-300" : "border-blue-500"
              }`}
            >
              {story.isVideo ? (
                <video src={story.videoUrl} className="w-full h-full object-cover" muted loop />
              ) : (
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.user.name}
                  className="w-full h-full object-cover"
                />
              )}
              {story.id === 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <PlusCircle className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
            <div className="absolute top-2 left-2 ring-4 ring-blue-600 rounded-full">
              <Avatar className="h-9 w-9 border-2 border-white">
                <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                <AvatarFallback>{story.user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-1 text-xs text-center font-medium truncate w-28">{story.user.name}</div>
            {story.id !== 1 && <div className="text-xs text-center text-gray-500">{story.time}</div>}
          </div>
        ))}
      </div>

      {/* Story Viewer Dialog */}
      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-3xl p-0 h-[80vh] overflow-hidden">
          {selectedStory && (
            <div className="relative h-full bg-black">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white bg-black/30 hover:bg-black/50"
                onClick={() => setSelectedStory(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black/30 hover:bg-black/50"
                  onClick={() => {
                    const currentIndex = stories.findIndex((s) => s.id === selectedStory.id)
                    if (currentIndex > 1) {
                      // Skip "Your Story"
                      setSelectedStory(stories[currentIndex - 1])
                    }
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black/30 hover:bg-black/50"
                  onClick={() => {
                    const currentIndex = stories.findIndex((s) => s.id === selectedStory.id)
                    if (currentIndex < stories.length - 1) {
                      setSelectedStory(stories[currentIndex + 1])
                    }
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 bg-gradient-to-b from-black/60 to-transparent">
                {stories
                  .filter((s) => s.id !== 1)
                  .map((story) => (
                    <div
                      key={story.id}
                      className={`h-1 rounded-full flex-1 ${
                        story.id === selectedStory.id
                          ? "bg-white"
                          : story.id < selectedStory.id
                            ? "bg-white/60"
                            : "bg-white/30"
                      }`}
                    ></div>
                  ))}
              </div>

              {/* User info */}
              <div className="absolute top-6 left-4 flex items-center space-x-2 z-10">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={selectedStory.user.avatar || "/placeholder.svg"} alt={selectedStory.user.name} />
                  <AvatarFallback>{selectedStory.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">{selectedStory.user.name}</div>
                  <div className="text-white/70 text-xs">{selectedStory.time}</div>
                </div>
              </div>

              {/* Story content */}
              <div className="h-full flex items-center justify-center">
                {selectedStory.isVideo ? (
                  <video src={selectedStory.videoUrl} className="max-h-full max-w-full" autoPlay controls />
                ) : (
                  <img
                    src={selectedStory.image || "/placeholder.svg"}
                    alt={selectedStory.user.name}
                    className="max-h-full max-w-full"
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Story Dialog */}
      <Dialog open={createStoryOpen} onOpenChange={setCreateStoryOpen}>
        <DialogContent className="max-w-md">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Create Story</h2>

            <div className="flex space-x-2">
              <Button
                variant={storyType === "photo" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setStoryType("photo")}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button
                variant={storyType === "text" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setStoryType("text")}
              >
                <Type className="h-4 w-4 mr-2" />
                Text
              </Button>
            </div>

            {storyType === "photo" ? (
              <div className="space-y-4">
                {previewImage ? (
                  <div className="relative w-full aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => setPreviewImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full aspect-[9/16] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4">
                    <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Upload a photo for your story</p>
                    <div className="flex space-x-2">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                <Textarea
                  placeholder="Add a caption to your story..."
                  value={storyCaption}
                  onChange={(e) => setStoryCaption(e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className="w-full aspect-[9/16] rounded-lg flex items-center justify-center p-4"
                  style={{ backgroundColor: storyBackground }}
                >
                  <Textarea
                    placeholder="Type your story text here..."
                    value={storyCaption}
                    onChange={(e) => setStoryCaption(e.target.value)}
                    className="bg-transparent border-none text-white text-xl text-center resize-none h-full flex items-center"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Background Color</p>
                  <div className="flex flex-wrap gap-2">
                    {backgrounds.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${
                          storyBackground === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setStoryBackground(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCreateStoryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateStory}>Share to Story</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
