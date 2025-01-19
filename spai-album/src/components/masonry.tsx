'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Photo {
  id: number
  src: string
  title: string
  description: string
}

export default function MasonryGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase.from('photos').select<'*', Photo>('*')
      if (error) {
        console.error('Error fetching photos:', error)
      } else if (data) {
        setPhotos(data)
        setFilteredPhotos(data)
      }
      setLoading(false)
    }
    fetchPhotos()
  }, []) 

  // Filter photos based on search query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(query)
    )
    setFilteredPhotos(filtered)
  }

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
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
          <DialogContent className="max-w-2xl bg-white rounded-xl"> {/* Added rounded-xl */}
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
            <p className="text-gray-700 mt-2">{selectedPhoto.description}</p>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
