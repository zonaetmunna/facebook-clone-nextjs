import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Video } from "lucide-react"

interface RightSidebarProps {
  className?: string
}

export function RightSidebar({ className }: RightSidebarProps) {
  const contacts = [
    { id: 1, name: "Jane Smith", online: true },
    { id: 2, name: "Mike Johnson", online: true },
    { id: 3, name: "Sarah Williams", online: false },
    { id: 4, name: "David Brown", online: true },
    { id: 5, name: "Emily Davis", online: false },
    { id: 6, name: "Chris Wilson", online: true },
    { id: 7, name: "Alex Taylor", online: false },
  ]

  const birthdays = [{ id: 1, name: "Mike Johnson" }]

  return (
    <aside className={cn("py-4", className)}>
      {birthdays.length > 0 && (
        <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
          <h3 className="font-semibold mb-2">Birthdays</h3>
          {birthdays.map((person) => (
            <div key={person.id} className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-500 text-sm">🎂</span>
              </div>
              <p className="text-sm">
                <span className="font-semibold">{person.name}</span>
                {"'"}s birthday is today
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 bg-white rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Contacts</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center px-2 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32&text=${contact.name.charAt(0)}`}
                    alt={contact.name}
                  />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="ml-2 text-sm">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
