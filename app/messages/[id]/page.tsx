"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Phone,
  Video,
  Info,
  ImageIcon,
  Smile,
  ThumbsUp,
  Send,
  MessageCircle,
  Paperclip,
  Mic,
  GalleryHorizontalEnd,
  GiftIcon as Gif,
  Sticker,
} from "lucide-react"
import { MessagesList } from "@/components/messages-list"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: number
  sender: "user" | "contact"
  text: string
  time: string
  read: boolean
  reaction?: string
  isTyping?: boolean
}

interface Contact {
  id: number
  name: string
  avatar: string
  online: boolean
  lastActive?: string
  messages: Message[]
}

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [newMessage, setNewMessage] = useState("")
  const [contact, setContact] = useState<Contact | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // Emoji set for reactions and emoji picker
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "😡", "🎉", "👏", "🙏", "🔥"]
  const emojiCategories = [
    { name: "Recent", emojis: ["😊", "👍", "❤️", "🎉", "🔥", "😂", "🙏", "👏"] },
    { name: "Smileys", emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"] },
    { name: "People", emojis: ["👍", "👎", "👏", "🙌", "🤝", "👋", "🤙", "👌", "🤌", "👉"] },
    { name: "Nature", emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"] },
    { name: "Food", emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈"] },
    { name: "Activities", emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱"] },
  ]

  // Simulate fetching contact and messages
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const contactId = Number.parseInt(params.id)
    const contacts: Contact[] = [
      {
        id: 1,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        online: true,
        messages: [
          {
            id: 1,
            sender: "contact",
            text: "Hey, how are you?",
            time: "10:30 AM",
            read: true,
          },
          {
            id: 2,
            sender: "user",
            text: "I'm good, thanks! How about you?",
            time: "10:32 AM",
            read: true,
          },
          {
            id: 3,
            sender: "contact",
            text: "Doing well! Are we still meeting tomorrow?",
            time: "10:35 AM",
            read: true,
            reaction: "👍",
          },
          {
            id: 4,
            sender: "user",
            text: "Yes, definitely! Looking forward to it.",
            time: "10:36 AM",
            read: true,
          },
          {
            id: 5,
            sender: "contact",
            text: "Great! See you tomorrow!",
            time: "10:37 AM",
            read: true,
          },
        ],
      },
      {
        id: 2,
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=MJ",
        online: true,
        messages: [
          {
            id: 1,
            sender: "contact",
            text: "Hey, did you see the game last night?",
            time: "9:15 AM",
            read: true,
          },
          {
            id: 2,
            sender: "contact",
            text: "It was amazing!",
            time: "9:15 AM",
            read: true,
          },
          {
            id: 3,
            sender: "contact",
            text: "We should watch the next one together",
            time: "9:16 AM",
            read: true,
          },
        ],
      },
      {
        id: 3,
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40&text=SW",
        online: false,
        lastActive: "1 hour ago",
        messages: [
          {
            id: 1,
            sender: "contact",
            text: "Hey, I need some help with the project",
            time: "Tuesday",
            read: true,
          },
          {
            id: 2,
            sender: "user",
            text: "Sure, what do you need?",
            time: "Tuesday",
            read: true,
          },
          {
            id: 3,
            sender: "contact",
            text: "Can you help me with the design part?",
            time: "Tuesday",
            read: true,
          },
          {
            id: 4,
            sender: "user",
            text: "Of course! I can help you with that. Let's meet tomorrow.",
            time: "Tuesday",
            read: true,
            reaction: "❤️",
          },
          {
            id: 5,
            sender: "contact",
            text: "Thanks for the help with the project!",
            time: "Tuesday",
            read: true,
          },
        ],
      },
      {
        id: 4,
        name: "David Brown",
        avatar: "/placeholder.svg?height=40&width=40&text=DB",
        online: false,
        lastActive: "3 hours ago",
        messages: [
          {
            id: 1,
            sender: "user",
            text: "Hey David, how have you been?",
            time: "Last week",
            read: true,
          },
          {
            id: 2,
            sender: "contact",
            text: "I've been good! Just busy with work.",
            time: "Last week",
            read: true,
          },
          {
            id: 3,
            sender: "contact",
            text: "Let's catch up soon!",
            time: "Last week",
            read: true,
          },
        ],
      },
    ]

    const foundContact = contacts.find((c) => c.id === contactId)

    if (foundContact) {
      setContact(foundContact)
    } else {
      // Handle not found
      router.push("/messages")
    }
  }, [params.id, router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [contact?.messages])

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      // Simulate sending "is typing" to the server
      const typingTimeout = setTimeout(() => {
        setIsTyping(false)
      }, 3000)

      return () => clearTimeout(typingTimeout)
    }
  }, [newMessage])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !contact) return

    const newMessageObj: Message = {
      id: contact.messages.length + 1,
      sender: "user",
      text: newMessage,
      time: "Just now",
      read: true,
    }

    setContact({
      ...contact,
      messages: [...contact.messages, newMessageObj],
    })

    setNewMessage("")
    setShowEmojiPicker(false)

    // Simulate reply after 1-3 seconds
    if (Math.random() > 0.3) {
      // Show typing indicator
      setTimeout(() => {
        if (contact) {
          setContact({
            ...contact,
            messages: [
              ...contact.messages,
              newMessageObj,
              {
                id: contact.messages.length + 2,
                sender: "contact",
                text: "",
                time: "Just now",
                read: true,
                isTyping: true,
              },
            ],
          })
        }
      }, 1000)

      const replyDelay = 2000 + Math.random() * 2000

      setTimeout(() => {
        const replies = [
          "That's interesting!",
          "I see what you mean.",
          "Thanks for letting me know.",
          "I'll think about that.",
          "Good point!",
          "I agree with you.",
          "Let me get back to you on that.",
          "Sounds good to me!",
          "I appreciate your message.",
          "Let's discuss this more later.",
        ]

        const replyText = replies[Math.floor(Math.random() * replies.length)]

        setContact((prev) => {
          if (!prev) return prev

          // Remove typing indicator and add actual message
          const updatedMessages = prev.messages.filter((msg) => !msg.isTyping)

          return {
            ...prev,
            messages: [
              ...updatedMessages,
              {
                id: prev.messages.length + 2,
                sender: "contact",
                text: replyText,
                time: "Just now",
                read: true,
              },
            ],
          }
        })
      }, replyDelay)
    }
  }

  const addReaction = (messageId: number, reaction: string) => {
    if (!contact) return

    setContact({
      ...contact,
      messages: contact.messages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            reaction: message.reaction === reaction ? undefined : reaction,
          }
        }
        return message
      }),
    })
  }

  const handleAudioCall = () => {
    if (!contact) return
    router.push(`/call/audio/${contact.id}`)
  }

  const handleVideoCall = () => {
    if (!contact) return
    router.push(`/call/video/${contact.id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
  }

  if (!contact) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -mt-4 bg-background rounded-md shadow-sm overflow-hidden">
      {/* Contacts Sidebar */}
      <MessagesList />

      {/* Chat Area */}
      <div className="hidden md:flex flex-col flex-1">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 border-b bg-card">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></span>
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-xs text-muted-foreground">
                {contact.online ? "Active now" : `Active ${contact.lastActive || "recently"}`}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={handleAudioCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Audio call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={handleVideoCall}>
                    <Video className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${showInfo ? "bg-muted" : ""}`}
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Conversation info</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
            {contact.messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 group ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "contact" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="relative max-w-xs">
                  {message.isTyping ? (
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex space-x-1 items-center h-5">
                        <div
                          className="w-2 h-2 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-muted-foreground">{message.time}</p>
                        {message.reaction && (
                          <div className="ml-2 bg-background rounded-full p-0.5 shadow-sm">
                            <span className="text-xs">{message.reaction}</span>
                          </div>
                        )}
                      </div>

                      {/* Reaction menu */}
                      <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-6 w-6 rounded-full ${message.sender === "user" ? "-left-8" : "-right-8"}`}
                            >
                              <Smile className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-1" align="center">
                            <div className="flex space-x-1">
                              {emojis.map((emoji, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full hover:bg-muted"
                                  onClick={() => addReaction(message.id, emoji)}
                                >
                                  <span>{emoji}</span>
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div className="w-80 border-l bg-card p-4 overflow-y-auto">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback className="text-2xl">{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contact.online ? "Active now" : `Active ${contact.lastActive || "recently"}`}
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" onClick={handleAudioCall}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleVideoCall}>
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Chat info</h4>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Nickname</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Theme</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Change
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notifications</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        On
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Shared media</h4>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="aspect-square bg-muted rounded-md"></div>
                    <div className="aspect-square bg-muted rounded-md"></div>
                    <div className="aspect-square bg-muted rounded-md"></div>
                  </div>
                  <Button variant="link" size="sm" className="w-full mt-1 text-xs">
                    See all
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Privacy & Support</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-8">
                      Block
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-8">
                      Report
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-8">
                      Delete chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-3 border-t bg-card">
          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setShowAttachments(!showAttachments)}
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add files</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add photos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex-1 relative">
              <Input
                placeholder="Aa"
                className="rounded-full bg-muted border-none pr-10 min-h-[40px]"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-2 top-0 h-full flex items-center">
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Smile className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <Tabs defaultValue="recent">
                      <div className="border-b px-3 py-2">
                        <TabsList className="grid grid-cols-6">
                          {emojiCategories.map((category, index) => (
                            <TabsTrigger key={index} value={category.name.toLowerCase()}>
                              {category.name === "Recent"
                                ? "🕒"
                                : category.name === "Smileys"
                                  ? "😊"
                                  : category.name === "People"
                                    ? "👋"
                                    : category.name === "Nature"
                                      ? "🐶"
                                      : category.name === "Food"
                                        ? "🍎"
                                        : "⚽"}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                      {emojiCategories.map((category, index) => (
                        <TabsContent
                          key={index}
                          value={category.name.toLowerCase()}
                          className="h-[200px] overflow-y-auto p-3"
                        >
                          <div className="grid grid-cols-8 gap-1">
                            {category.emojis.map((emoji, emojiIndex) => (
                              <Button
                                key={emojiIndex}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => addEmoji(emoji)}
                              >
                                <span className="text-lg">{emoji}</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {newMessage.trim() ? (
              <Button variant="ghost" size="icon" className="ml-2 rounded-full" onClick={handleSendMessage}>
                <Send className="h-5 w-5 text-blue-600" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="ml-2 rounded-full">
                <ThumbsUp className="h-5 w-5 text-blue-600" />
              </Button>
            )}
          </div>

          {/* Attachments panel */}
          {showAttachments && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex flex-col h-auto py-2">
                  <GalleryHorizontalEnd className="h-5 w-5 mb-1" />
                  <span className="text-xs">Photos</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col h-auto py-2">
                  <Gif className="h-5 w-5 mb-1" />
                  <span className="text-xs">GIF</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col h-auto py-2">
                  <Sticker className="h-5 w-5 mb-1" />
                  <span className="text-xs">Sticker</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col h-auto py-2">
                  <Paperclip className="h-5 w-5 mb-1" />
                  <span className="text-xs">File</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile view - show a message to use desktop */}
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
