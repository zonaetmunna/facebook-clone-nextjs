import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function Home() {
  // In a real app, check if user is authenticated
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/feed")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-blue-600 text-5xl font-bold mb-4">facebook</h1>
          <p className="text-xl text-gray-700">Connect with friends and the world around you on Facebook.</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
