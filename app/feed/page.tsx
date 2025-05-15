import { CreatePost } from "@/components/create-post"
import { PostList } from "@/components/post-list"
import { StoriesList } from "@/components/stories-list"

export default function FeedPage() {
  return (
    <div className="space-y-4">
      <StoriesList />
      <CreatePost />
      <PostList />
    </div>
  )
}
