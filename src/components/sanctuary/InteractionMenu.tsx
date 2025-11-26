'use client'

import { Button } from '@/components/ui/button'
import { Heart, Utensils, Wind, ShoppingBag, Paintbrush } from 'lucide-react'
import { useGameStore } from '@/lib/store'

export function InteractionMenu({ onShopOpen, onHabitatOpen }: { onShopOpen: () => void; onHabitatOpen: () => void }) {
    const { updatePetStats, pet } = useGameStore()

    const handleFeed = () => {
        updatePetStats({ happiness: Math.min(100, pet.happiness + 10), health: Math.min(100, pet.health + 5) })
    }

    return (
        <div className="flex justify-center gap-4 p-4">
            <Button variant="outline" size="icon" onClick={handleFeed} className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <Utensils className="h-8 w-8 text-white" />
            </Button>
            <Button variant="outline" size="icon" onClick={onShopOpen} className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <ShoppingBag className="h-8 w-8 text-orange-300" />
            </Button>
            <Button variant="outline" size="icon" onClick={onHabitatOpen} className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <Paintbrush className="h-8 w-8 text-purple-300" />
            </Button>
        </div>
    )
}
