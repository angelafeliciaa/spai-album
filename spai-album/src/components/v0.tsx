'use client'

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface Photo {
  id: number
  src: string
  title: string
  description: string
}

const photos: Photo[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=400",
    title: "Conference Day 1",
    description: "Opening ceremony and welcome speeches at the annual tech conference."
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=400",
    title: "Workshop Session",
    description: "Interactive workshop session with industry experts."
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=400",
    title: "Networking Break",
    description: "Attendees connecting during the afternoon networking session."
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=400",
    title: "Panel Discussion",
    description: "Expert panel discussing the future of technology."
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=400",
    title: "Product Demo",
    description: "Live demonstration of new innovative products."
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=400",
    title: "Closing Ceremony",
    description: "Final remarks and celebration of a successful event."
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=400",
    title: "Team Building",
    description: "Fun team building activities and exercises."
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=400",
    title: "Awards Ceremony",
    description: "Recognition of outstanding achievements and contributions."
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=400",
    title: "After Party",
    description: "Casual networking and celebrations after the main event."
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedPhoto(photo)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-sm font-medium truncate">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPhoto.title}</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-square w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-muted-foreground mt-2">
              {selectedPhoto.description}
            </p>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

