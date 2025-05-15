import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Users, Clock, UserCheck } from "lucide-react"

export default function FriendsPage() {
  const friendRequests = [
    { id: 1, name: "Alex Johnson", mutualFriends: 5, time: "3d" },
    { id: 2, name: "Maria Garcia", mutualFriends: 2, time: "1w" },
    { id: 3, name: "James Wilson", mutualFriends: 8, time: "2w" },
  ]

  const suggestions = [
    { id: 1, name: "Emma Thompson", mutualFriends: 3 },
    { id: 2, name: "Noah Martinez", mutualFriends: 7 },
    { id: 3, name: "Olivia Brown", mutualFriends: 4 },
    { id: 4, name: "William Davis", mutualFriends: 2 },
    { id: 5, name: "Sophia Miller", mutualFriends: 6 },
    { id: 6, name: "Liam Wilson", mutualFriends: 1 },
    { id: 7, name: "Ava Jones", mutualFriends: 5 },
    { id: 8, name: "Lucas Taylor", mutualFriends: 3 },
  ]

  const allFriends = [
    { id: 1, name: "Jane Smith", mutualFriends: 15 },
    { id: 2, name: "Mike Johnson", mutualFriends: 8 },
    { id: 3, name: "Sarah Williams", mutualFriends: 12 },
    { id: 4, name: "David Brown", mutualFriends: 5 },
    { id: 5, name: "Emily Davis", mutualFriends: 10 },
    { id: 6, name: "Chris Wilson", mutualFriends: 7 },
    { id: 7, name: "Alex Taylor", mutualFriends: 9 },
    { id: 8, name: "Jessica Anderson", mutualFriends: 6 },
    { id: 9, name: "Ryan Thomas", mutualFriends: 11 },
    { id: 10, name: "Lisa Martinez", mutualFriends: 4 },
    { id: 11, name: "Kevin Lewis", mutualFriends: 13 },
    { id: 12, name: "Amanda Clark", mutualFriends: 7 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Friends</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            <span>Friend Requests</span>
            {friendRequests.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {friendRequests.length}
              </span>
            )}
          </Button>
          <Button variant="outline" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>Find Friends</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all" className="flex-1 md:flex-none">
            <Users className="h-4 w-4 mr-2" />
            <span>All Friends</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex-1 md:flex-none">
            <UserPlus className="h-4 w-4 mr-2" />
            <span>Requests</span>
            {friendRequests.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {friendRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1 md:flex-none">
            <UserCheck className="h-4 w-4 mr-2" />
            <span>Suggestions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allFriends.map((friend) => (
              <Card key={friend.id}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`/placeholder.svg?height=64&width=64&text=${friend.name.charAt(0)}`}
                        alt={friend.name}
                      />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {friendRequests.length > 0 ? (
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={`/placeholder.svg?height=64&width=64&text=${request.name.charAt(0)}`}
                          alt={request.name}
                        />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.name}</h3>
                            <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                            <p className="text-xs text-gray-400">Sent {request.time} ago</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Confirm
                            </Button>
                            <Button size="sm" variant="outline">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Friend Requests</h2>
              <p className="text-gray-500">When someone sends you a friend request, you'll see it here.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage
                        src={`/placeholder.svg?height=96&width=96&text=${suggestion.name.charAt(0)}`}
                        alt={suggestion.name}
                      />
                      <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{suggestion.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{suggestion.mutualFriends} mutual friends</p>
                    <div className="flex flex-col space-y-2 w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Friend</Button>
                      <Button variant="outline" className="w-full">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
