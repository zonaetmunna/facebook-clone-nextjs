import { StoriesList } from "@/components/stories-list"
import { CreatePost } from "@/components/create-post"
import { PostList } from "@/components/post-list"

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <StoriesList />
      <CreatePost />
      <PostList />
    </div>
  )
}
