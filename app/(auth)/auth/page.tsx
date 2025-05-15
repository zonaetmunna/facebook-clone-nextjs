import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="container relative flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-blue-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-2">
            <span className="text-blue-600 text-3xl font-bold">f</span>
          </div>
          facebook
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"Facebook helps you connect and share with the people in your life."</p>
            <footer className="text-sm">Mark Zuckerberg</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to login to your account
            </p>
          </div>
          <AuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
