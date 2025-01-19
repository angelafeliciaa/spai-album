'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Photo {
  id: number
  src: string
  title: string
  description: string
}

export default function MasonryGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from('photos')
        .select<'*', Photo>('*')
      if (error) {
        console.error('Error fetching photos:', error)
      } else if (data) {
        setPhotos(data)
      }
      setLoading(false)
    }
    fetchPhotos()
  }, [supabase])

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Flowbite Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="grid gap-4">
            <div
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="h-auto max-w-full rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                <h3 className="text-white text-sm font-medium truncate">
                  {photo.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for Selected Photo */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>{selectedPhoto.title}</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-auto">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-gray-700 mt-2">
              {selectedPhoto.description}
            </p>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
