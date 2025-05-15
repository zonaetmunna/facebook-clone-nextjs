"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Share2, MoreHorizontal, Send, ThumbsUp, Smile } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  username: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface Post {
  id: string
  username: string
  userAvatar: string
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
  shares: number
  isLiked: boolean
  isSaved: boolean
}

interface PostListProps {
  username?: string
}

export function PostList({ username }: PostListProps) {
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "johndoe",
      userAvatar: "/placeholder.svg?height=40&width=40&text=JD",
      timestamp: "2 hours ago",
      content: "Just finished a great hike! The views were amazing. #nature #outdoors",
      image: "/placeholder.svg?height=500&width=800&text=Beautiful Mountain View",
      likes: 42,
      comments: [
        {
          id: "c1",
          username: "sarahsmith",
          avatar: "/placeholder.svg?height=32&width=32&text=SS",
          content: "Looks amazing! Where is this?",
          timestamp: "1 hour ago",
          likes: 5,
          isLiked: false,
          replies: [
            {
              id: "r1",
              username: "johndoe",
              avatar: "/placeholder.svg?height=32&width=32&text=JD",
              content: "It's at Mount Rainier National Park!",
              timestamp: "45 minutes ago",
              likes: 2,
              isLiked: false,
            },
          ],
        },
      ],
      shares: 7,
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      username: "sarahsmith",
      userAvatar: "/placeholder.svg?height=40&width=40&text=SS",
      timestamp: "5 hours ago",
      content: "Just got my new camera! Can't wait to try it out this weekend. #photography #hobby",
      image: "/placeholder.svg?height=500&width=800&text=New Camera",
      likes: 78,
      comments: [],
      shares: 3,
      isLiked: false,
      isSaved: false,
    },
    {
      id: "3",
      username: "mikebrown",
      userAvatar: "/placeholder.svg?height=40&width=40&text=MB",
      timestamp: "Yesterday",
      content: "Had an amazing dinner at the new restaurant downtown. The food was incredible! #foodie #dining",
      image: "/placeholder.svg?height=500&width=800&text=Delicious Food",
      likes: 112,
      comments: [
        {
          id: "c2",
          username: "johndoe",
          avatar: "/placeholder.svg?height=32&width=32&text=JD",
          content: "I need to try this place! What did you order?",
          timestamp: "20 hours ago",
          likes: 3,
          isLiked: false,
        },
      ],
      shares: 15,
      isLiked: false,
      isSaved: false,
    },
  ])

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({})
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({})

  // Filter posts if username is provided
  const filteredPosts = username ? posts.filter((post) => post.username === username) : posts

  const toggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked
          return {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )

    toast({
      description: "Post liked successfully!",
      duration: 2000,
    })
  }

  const toggleSave = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isSaved: !post.isSaved,
          }
        }
        return post
      }),
    )

    toast({
      description: "Post saved to your collection!",
      duration: 2000,
    })
  }

  const toggleCommentLike = (postId: string, commentId: string, isReply = false, parentCommentId?: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (isReply && parentCommentId) {
            // Handle reply like
            const updatedComments = post.comments.map((comment) => {
              if (comment.id === parentCommentId && comment.replies) {
                const updatedReplies = comment.replies.map((reply) => {
                  if (reply.id === commentId) {
                    const newIsLiked = !reply.isLiked
                    return {
                      ...reply,
                      isLiked: newIsLiked,
                      likes: newIsLiked ? reply.likes + 1 : reply.likes - 1,
                    }
                  }
                  return reply
                })
                return { ...comment, replies: updatedReplies }
              }
              return comment
            })
            return { ...post, comments: updatedComments }
          } else {
            // Handle comment like
            const updatedComments = post.comments.map((comment) => {
              if (comment.id === commentId) {
                const newIsLiked = !comment.isLiked
                return {
                  ...comment,
                  isLiked: newIsLiked,
                  likes: newIsLiked ? comment.likes + 1 : comment.likes - 1,
                }
              }
              return comment
            })
            return { ...post, comments: updatedComments }
          }
        }
        return post
      }),
    )
  }

  const addComment = (postId: string) => {
    if (!commentInputs[postId]?.trim()) return

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `c${Date.now()}`,
            username: "johndoe", // Current user
            avatar: "/placeholder.svg?height=32&width=32&text=JD",
            content: commentInputs[postId],
            timestamp: "Just now",
            likes: 0,
            isLiked: false,
          }
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    // Clear input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))

    toast({
      description: "Comment added successfully!",
      duration: 2000,
    })
  }

  const addReply = (postId: string, commentId: string) => {
    if (!replyInputs[commentId]?.trim()) return

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const newReply: Comment = {
                id: `r${Date.now()}`,
                username: "johndoe", // Current user
                avatar: "/placeholder.svg?height=32&width=32&text=JD",
                content: replyInputs[commentId],
                timestamp: "Just now",
                likes: 0,
                isLiked: false,
              }
              return {
                ...comment,
                replies: comment.replies ? [...comment.replies, newReply] : [newReply],
              }
            }
            return comment
          })
          return { ...post, comments: updatedComments }
        }
        return post
      }),
    )

    // Clear input
    setReplyInputs((prev) => ({ ...prev, [commentId]: "" }))

    toast({
      description: "Reply added successfully!",
      duration: 2000,
    })
  }

  const sharePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1,
          }
        }
        return post
      }),
    )

    toast({
      description: "Post shared successfully!",
      duration: 2000,
    })
  }

  return (
    <div className="space-y-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.username} />
                    <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {post.username === "johndoe"
                        ? "John Doe"
                        : post.username === "sarahsmith"
                          ? "Sarah Smith"
                          : post.username === "mikebrown"
                            ? "Mike Brown"
                            : post.username}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Save Post</DropdownMenuItem>
                    <DropdownMenuItem>Hide Post</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <div className="rounded-md overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                </div>
              )}
            </CardContent>
            <CardFooter className="p-0 border-t dark:border-gray-700">
              <div className="w-full">
                <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  <div>{post.likes > 0 && `${post.likes} likes`}</div>
                  <div>
                    {post.comments.length > 0 && `${post.comments.length} comments`}
                    {post.comments.length > 0 && post.shares > 0 && " • "}
                    {post.shares > 0 && `${post.shares} shares`}
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t dark:border-gray-700">
                  <Button
                    variant="ghost"
                    className={`rounded-none h-10 ${post.isLiked ? "text-blue-600 dark:text-blue-400" : ""}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-none h-10"
                    onClick={() => setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                  <Button variant="ghost" className="rounded-none h-10" onClick={() => sharePost(post.id)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Comments section */}
                {(expandedComments[post.id] || post.comments.length > 0) && (
                  <div className="p-4 border-t dark:border-gray-700">
                    {/* Comment input */}
                    <div className="flex items-start mb-4">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="Your Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Write a comment..."
                          className="min-h-[40px] py-2 pr-10 resize-none"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              addComment(post.id)
                            }
                          }}
                        />
                        <div className="absolute right-2 bottom-2 flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => addComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Comments list */}
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="mb-3">
                        <div className="flex items-start group">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.username} />
                            <AvatarFallback>{comment.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                              <h4 className="font-semibold text-sm">
                                {comment.username === "johndoe"
                                  ? "John Doe"
                                  : comment.username === "sarahsmith"
                                    ? "Sarah Smith"
                                    : comment.username === "mikebrown"
                                      ? "Mike Brown"
                                      : comment.username}
                              </h4>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                            <div className="flex items-center mt-1 text-xs space-x-3">
                              <button
                                className={`font-medium ${comment.isLiked ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                                onClick={() => toggleCommentLike(post.id, comment.id)}
                              >
                                Like
                              </button>
                              <button
                                className="font-medium text-gray-500 dark:text-gray-400"
                                onClick={() => setShowReplies((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                              >
                                Reply
                              </button>
                              <span className="text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                              {comment.likes > 0 && (
                                <span className="text-gray-500 dark:text-gray-400">{comment.likes} likes</span>
                              )}
                            </div>

                            {/* Reply input */}
                            {showReplies[comment.id] && (
                              <div className="flex items-start mt-2">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src="/placeholder.svg?height=24&width=24&text=JD" alt="Your Avatar" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                  <Textarea
                                    placeholder="Write a reply..."
                                    className="min-h-[36px] py-1.5 pr-8 text-sm resize-none"
                                    value={replyInputs[comment.id] || ""}
                                    onChange={(e) =>
                                      setReplyInputs((prev) => ({ ...prev, [comment.id]: e.target.value }))
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        addReply(post.id, comment.id)
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full absolute right-1 bottom-1"
                                    onClick={() => addReply(post.id, comment.id)}
                                    disabled={!replyInputs[comment.id]?.trim()}
                                  >
                                    <Send className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-6 mt-2 space-y-2">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start group">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.username} />
                                      <AvatarFallback>{reply.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                                        <h4 className="font-semibold text-sm">
                                          {reply.username === "johndoe"
                                            ? "John Doe"
                                            : reply.username === "sarahsmith"
                                              ? "Sarah Smith"
                                              : reply.username === "mikebrown"
                                                ? "Mike Brown"
                                                : reply.username}
                                        </h4>
                                        <p className="text-sm">{reply.content}</p>
                                      </div>
                                      <div className="flex items-center mt-1 text-xs space-x-3">
                                        <button
                                          className={`font-medium ${reply.isLiked ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                                          onClick={() => toggleCommentLike(post.id, reply.id, true, comment.id)}
                                        >
                                          Like
                                        </button>
                                        <span className="text-gray-500 dark:text-gray-400">{reply.timestamp}</span>
                                        {reply.likes > 0 && (
                                          <span className="text-gray-500 dark:text-gray-400">{reply.likes} likes</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No posts to display.</p>
        </Card>
      )}
    </div>
  )
}
