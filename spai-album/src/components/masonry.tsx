'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface UserInteraction {
  id: number
  user_id: string
  name: string
  conversation_summary: string
  image_url: string
  created_at: string
}

interface InteractionCardProps {
  interaction: UserInteraction
  onSelect: (interaction: UserInteraction) => void
}

function InteractionCard({ interaction, onSelect }: InteractionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => onSelect(interaction)}>
      <img
        src={interaction.image_url}
        alt={interaction.name}
        className="h-48 w-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
        <h3 className="text-white text-md font-medium truncate">
          {interaction.name}
        </h3>
      </div>
    </div>
  )
}

export default function MasonryGallery() {
  const [interactions, setInteractions] = useState<UserInteraction[]>([])
  const [filteredInteractions, setFilteredInteractions] = useState<UserInteraction[]>([])
  const [selectedInteraction, setSelectedInteraction] = useState<UserInteraction | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchInteractions() {
      const { data, error } = await supabase
        .from('user_interactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching interactions:', error)
      } else if (data) {
        setInteractions(data)
        setFilteredInteractions(data)
      }
      setLoading(false)
    }
    fetchInteractions()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    const filtered = interactions.filter((interaction) =>
      interaction.name.toLowerCase().includes(query) ||
      interaction.conversation_summary.toLowerCase().includes(query)
    )
    setFilteredInteractions(filtered)
  }

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or conversation..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredInteractions.map((interaction) => (
          <InteractionCard
            key={interaction.id}
            interaction={interaction}
            onSelect={setSelectedInteraction}
          />
        ))}
      </div>

      <Dialog
        open={!!selectedInteraction}
        onOpenChange={() => setSelectedInteraction(null)}
      >
        {selectedInteraction && (
          <DialogContent className="max-w-2xl bg-white rounded-xl">
            <DialogHeader>
              <DialogTitle>{selectedInteraction.name}</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-auto">
              <img
                src={selectedInteraction.image_url}
                alt={selectedInteraction.name}
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-gray-700 mt-2">
              Conversation Summary: {selectedInteraction.conversation_summary}
            </p>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
