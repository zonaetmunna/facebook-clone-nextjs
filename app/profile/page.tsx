import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePost } from "@/components/create-post"
import { PostList } from "@/components/post-list"
import { Camera, Pencil, Plus } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="bg-white rounded-md shadow-sm -mt-4">
      {/* Cover Photo */}
      <div className="relative h-[200px] md:h-[350px] rounded-t-md overflow-hidden bg-gray-200">
        <img
          src="/placeholder.svg?height=350&width=1200&text=Cover Photo"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button variant="secondary" size="sm" className="absolute bottom-4 right-4 flex items-center">
          <Camera className="h-4 w-4 mr-2" />
          <span>Edit Cover Photo</span>
        </Button>
      </div>

      {/* Profile Info */}
      <div className="relative px-4 md:px-8 pb-4 pt-5 md:pt-0">
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="absolute md:relative -top-16 md:-top-24 left-4 md:left-0">
            <div className="relative">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white rounded-full">
                <AvatarImage src="/placeholder.svg?height=160&width=160&text=JD" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-gray-200"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="ml-0 md:ml-44 mt-16 md:mt-0 flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-blue-600 font-medium">1.2K friends</p>
                <div className="flex -space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map((friend) => (
                    <Avatar key={friend} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=F${friend}`} />
                      <AvatarFallback>F{friend}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add to Story</span>
                </Button>
                <Button variant="secondary">
                  <Pencil className="h-4 w-4 mr-2" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Tabs defaultValue="posts">
            <TabsList className="w-full justify-start bg-transparent border-b h-auto p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-3 px-4"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-3 px-4"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-3 px-4"
              >
                Friends
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-3 px-4"
              >
                Photos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <div className="bg-white rounded-md shadow-sm p-4 mb-4">
                    <h2 className="font-bold text-xl mb-3">Intro</h2>
                    <Button variant="outline" className="w-full mb-3">
                      Add Bio
                    </Button>
                    <Button variant="outline" className="w-full mb-3">
                      Edit Details
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add Hobbies
                    </Button>
                  </div>
                  <div className="bg-white rounded-md shadow-sm p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-bold text-xl">Photos</h2>
                      <Button variant="link" className="text-blue-600 p-0 h-auto">
                        See All Photos
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((photo) => (
                        <img
                          key={photo}
                          src={`/placeholder.svg?height=100&width=100&text=Photo ${photo}`}
                          alt={`Photo ${photo}`}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-md shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-bold text-xl">Friends</h2>
                      <Button variant="link" className="text-blue-600 p-0 h-auto">
                        See All Friends
                      </Button>
                    </div>
                    <p className="text-gray-500 mb-3">1,234 friends</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((friend) => (
                        <div key={friend} className="text-center">
                          <Avatar className="h-full w-full rounded-md">
                            <AvatarImage
                              src={`/placeholder.svg?height=100&width=100&text=F${friend}`}
                              alt={`Friend ${friend}`}
                              className="object-cover"
                            />
                            <AvatarFallback>F{friend}</AvatarFallback>
                          </Avatar>
                          <p className="text-xs mt-1 truncate">Friend {friend}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <CreatePost />
                  <PostList />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="about">
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold mb-2">About John Doe</h2>
                <p className="text-gray-500">This section would contain information about the user.</p>
              </div>
            </TabsContent>
            <TabsContent value="friends">
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Friends</h2>
                <p className="text-gray-500">This section would display all of the user's friends.</p>
              </div>
            </TabsContent>
            <TabsContent value="photos">
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Photos</h2>
                <p className="text-gray-500">This section would display all of the user's photos.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
