"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AuthForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/feed")
    }, 1000)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      router.push("/feed")
    }, 1000)
  }

  return (
    <Card className="w-full shadow-lg">
      <Tabs defaultValue="login">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <Input type="email" placeholder="Email or Phone Number" required />
                <Input type="password" placeholder="Password" required />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" required />
                  <Input placeholder="Last name" required />
                </div>
                <Input type="email" placeholder="Email or Phone Number" required />
                <Input type="password" placeholder="New Password" required />
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Birthday</p>
                  <div className="grid grid-cols-3 gap-2">
                    <select className="border rounded p-2 text-sm">
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select className="border rounded p-2 text-sm">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (month, i) => (
                          <option key={i} value={i + 1}>
                            {month}
                          </option>
                        ),
                      )}
                    </select>
                    <select className="border rounded p-2 text-sm">
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i} value={2023 - i}>
                          {2023 - i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Gender</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center border rounded p-2">
                      <input type="radio" name="gender" id="female" />
                      <label htmlFor="female" className="ml-2 text-sm">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center border rounded p-2">
                      <input type="radio" name="gender" id="male" />
                      <label htmlFor="male" className="ml-2 text-sm">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center border rounded p-2">
                      <input type="radio" name="gender" id="custom" />
                      <label htmlFor="custom" className="ml-2 text-sm">
                        Custom
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
