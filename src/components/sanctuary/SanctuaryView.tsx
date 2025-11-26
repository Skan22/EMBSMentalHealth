'use client'

import { useState } from 'react'
import { BloomPet } from './BloomPet'
import { InteractionMenu } from './InteractionMenu'
import { LevelDisplay } from './LevelDisplay'
import { ShopModal } from '@/components/shop/ShopModal'
import { HabitatEditor } from '@/components/sanctuary/HabitatEditor'
import { SafetyPlan } from '@/components/safety/SafetyPlan'
import { useGameStore } from '@/lib/store'
import { HABITATS } from '@/lib/constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ShieldAlert } from 'lucide-react'

export function SanctuaryView() {
    const { pet, habitat } = useGameStore()
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [isHabitatOpen, setIsHabitatOpen] = useState(false)
    const [isSafetyOpen, setIsSafetyOpen] = useState(false)

    const currentHabitat = HABITATS.find(h => h.id === habitat) || HABITATS[0]

    return (
        <div className={`min-h-screen w-full ${currentHabitat.background} flex flex-col items-center justify-between py-8 overflow-hidden transition-colors duration-1000`}>
            <header className="w-full px-6 flex justify-between items-center z-10">
                <LevelDisplay />

                <div className="flex items-center gap-3">
                    <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-full shadow-md bg-red-500 hover:bg-red-600"
                        onClick={() => setIsSafetyOpen(true)}
                    >
                        <ShieldAlert className="h-4 w-4 mr-1" /> SOS
                    </Button>
                    <Link href="/stats">
                        <div className="bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:bg-white/40 transition-all cursor-pointer">
                            {pet.name}
                        </div>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full relative">
                {/* Background ambient elements could go here */}
                <BloomPet />
            </main>

            <footer className="w-full pb-8 z-10 space-y-4">
                <div className="flex justify-center">
                    <Link href="/quests">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Start a Quest
                        </Button>
                    </Link>
                    <Link href="/garden">
                        <Button variant="outline" className="bg-white/50 hover:bg-white/70 text-slate-700 px-6 py-3 rounded-full shadow-sm ml-4">
                            Visit Garden
                        </Button>
                    </Link>
                </div>
                <InteractionMenu
                    onShopOpen={() => setIsShopOpen(true)}
                    onHabitatOpen={() => setIsHabitatOpen(true)}
                />
            </footer>

            <ShopModal open={isShopOpen} onOpenChange={setIsShopOpen} />
            <HabitatEditor open={isHabitatOpen} onOpenChange={setIsHabitatOpen} />
            <SafetyPlan open={isSafetyOpen} onOpenChange={setIsSafetyOpen} />
        </div >
    )
}
