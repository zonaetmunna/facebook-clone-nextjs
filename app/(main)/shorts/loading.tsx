import { Skeleton } from "@/components/ui/skeleton"

export default function ShortsLoading() {
  return (
    <div className="h-[calc(100vh-56px)] bg-black flex items-center justify-center">
      <div className="w-full max-w-md aspect-[9/16] relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-4 left-4 right-16 flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-3 flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
