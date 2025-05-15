"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Video, Smile, MapPin, X, Camera, FileVideo } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function CreatePost() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [postText, setPostText] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("post")
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll create URLs for the selected files
      const newImages = Array.from(e.target.files).map((file) => {
        // Create a blob URL for the file
        return URL.createObjectURL(file)
      })
      setSelectedImages([...selectedImages, ...newImages])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a placeholder video
      const newVideos = Array.from(e.target.files).map(() => "https://www.w3schools.com/html/mov_bbb.mp4")
      setSelectedVideos([...selectedVideos, ...newVideos])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setSelectedVideos(selectedVideos.filter((_, i) => i !== index))
  }

  const handleCreatePost = () => {
    // In a real app, you would send the post data to a server
    toast({
      title: "Post created!",
      description: "Your post has been published successfully.",
    })
    setPostText("")
    setSelectedImages([])
    setSelectedVideos([])
    setIsDialogOpen(false)
  }

  const openCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.click()
    }
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full h-10"
              >
                What's on your mind, John?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-center">Create Post</DialogTitle>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="post">Post</TabsTrigger>
                  <TabsTrigger value="reels">Reels</TabsTrigger>
                </TabsList>

                <TabsContent value="post" className="space-y-4">
                  <div className="flex items-center space-x-2 py-4">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        Public
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    placeholder="What's on your mind, John?"
                    className="min-h-[100px] border-none focus-visible:ring-0 text-lg resize-none"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />

                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-[150px] object-cover rounded-md"
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-800/60 hover:bg-gray-800"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedVideos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedVideos.map((video, index) => (
                        <div key={index} className="relative">
                          <video src={video} className="w-full h-[150px] object-cover rounded-md" controls />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-800/60 hover:bg-gray-800"
                            onClick={() => removeVideo(index)}
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center border rounded-md p-3">
                    <span className="font-medium">Add to your post</span>
                    <div className="flex space-x-2">
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        multiple
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                      <input
                        ref={cameraRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <button onClick={() => imageInputRef.current?.click()}>
                        <ImageIcon className="h-6 w-6 text-green-500" />
                      </button>
                      <button onClick={() => videoInputRef.current?.click()}>
                        <Video className="h-6 w-6 text-blue-500" />
                      </button>
                      <button onClick={openCamera}>
                        <Camera className="h-6 w-6 text-red-500" />
                      </button>
                      <Smile className="h-6 w-6 text-yellow-500 cursor-pointer" />
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!postText.trim() && selectedImages.length === 0 && selectedVideos.length === 0}
                    onClick={handleCreatePost}
                  >
                    Post
                  </Button>
                </TabsContent>

                <TabsContent value="reels" className="space-y-4">
                  <div className="flex items-center space-x-2 py-4">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        Public
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                    {selectedVideos.length > 0 ? (
                      <div className="w-full">
                        <video
                          src={selectedVideos[0]}
                          className="w-full max-h-[300px] object-contain rounded-md"
                          controls
                        />
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedVideos([])}>
                          <X className="h-4 w-4 mr-2" />
                          Remove video
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileVideo className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">Upload a video for your reel</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Videos should be vertical, up to 90 seconds
                        </p>
                        <Button variant="outline" onClick={() => videoInputRef.current?.click()}>
                          Upload from device
                        </Button>
                      </>
                    )}
                  </div>

                  <Textarea
                    placeholder="Describe your reel..."
                    className="min-h-[80px] resize-none"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={selectedVideos.length === 0}
                    onClick={handleCreatePost}
                  >
                    Share Reel
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <div className="grid grid-cols-3 w-full">
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            onClick={() => {
              setIsDialogOpen(true)
              setActiveTab("post")
              setTimeout(() => videoInputRef.current?.click(), 100)
            }}
          >
            <Video className="h-5 w-5 mr-2 text-red-500" />
            <span>Live video</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            onClick={() => {
              setIsDialogOpen(true)
              setActiveTab("post")
              setTimeout(() => imageInputRef.current?.click(), 100)
            }}
          >
            <ImageIcon className="h-5 w-5 mr-2 text-green-500" />
            <span>Photo/video</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            onClick={() => {
              setIsDialogOpen(true)
              setActiveTab("post")
            }}
          >
            <Smile className="h-5 w-5 mr-2 text-yellow-500" />
            <span>Feeling/activity</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
