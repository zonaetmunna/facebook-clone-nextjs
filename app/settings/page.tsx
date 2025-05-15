"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { User, Lock, Bell, Globe, Shield, HelpCircle, LogOut, Eye, EyeOff, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software developer passionate about creating user-friendly applications.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    comments: true,
    tags: true,
    friendRequests: true,
    messages: true,
    birthdays: true,
    groupActivity: false,
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to a server
    alert("Profile saved successfully!")
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // In a real app, you would send this data to a server
    alert("Password changed successfully!")
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4 border-l-2 border-blue-600">
                <User className="h-5 w-5 mr-3" />
                <span>Personal Information</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4">
                <Lock className="h-5 w-5 mr-3" />
                <span>Security</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4">
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4">
                <Globe className="h-5 w-5 mr-3" />
                <span>Privacy</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4">
                <Shield className="h-5 w-5 mr-3" />
                <span>Blocking</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-12 px-4">
                <HelpCircle className="h-5 w-5 mr-3" />
                <span>Help & Support</span>
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-none h-12 px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Log Out</span>
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="profile">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and public profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select defaultValue="friends">
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Only Me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and account security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Change Password
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-semibold mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">San Francisco, CA • Chrome on Windows</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Active Now</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-gray-500">iPhone 13 • iOS 16.5</p>
                        </div>
                        <span className="text-gray-500 text-sm">2 hours ago</span>
                      </div>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Log Out Of All Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Activity Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Comments on your posts</p>
                            <p className="text-sm text-gray-500">Get notified when someone comments on your posts</p>
                          </div>
                          <Switch
                            checked={notifications.comments}
                            onCheckedChange={() => handleNotificationChange("comments")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Tags</p>
                            <p className="text-sm text-gray-500">
                              Get notified when someone tags you in a post or comment
                            </p>
                          </div>
                          <Switch
                            checked={notifications.tags}
                            onCheckedChange={() => handleNotificationChange("tags")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Friend Requests</p>
                            <p className="text-sm text-gray-500">
                              Get notified when someone sends you a friend request
                            </p>
                          </div>
                          <Switch
                            checked={notifications.friendRequests}
                            onCheckedChange={() => handleNotificationChange("friendRequests")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Messages</p>
                            <p className="text-sm text-gray-500">Get notified when you receive a new message</p>
                          </div>
                          <Switch
                            checked={notifications.messages}
                            onCheckedChange={() => handleNotificationChange("messages")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Birthdays</p>
                            <p className="text-sm text-gray-500">Get notified about your friends' birthdays</p>
                          </div>
                          <Switch
                            checked={notifications.birthdays}
                            onCheckedChange={() => handleNotificationChange("birthdays")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Group Activity</p>
                            <p className="text-sm text-gray-500">
                              Get notified about activity in groups you're a member of
                            </p>
                          </div>
                          <Switch
                            checked={notifications.groupActivity}
                            onCheckedChange={() => handleNotificationChange("groupActivity")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold mb-4">Notification Methods</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={() => handleNotificationChange("emailNotifications")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via text message</p>
                          </div>
                          <Switch
                            checked={notifications.smsNotifications}
                            onCheckedChange={() => handleNotificationChange("smsNotifications")}
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
