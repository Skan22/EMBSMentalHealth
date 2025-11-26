'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react'
import { useGameStore } from '@/lib/store'

// Mock data for other pets
const MOCK_PETS = [
    { id: 1, name: 'Luna', stage: 'CHILD', color: 'bg-purple-400', accessory: '👓' },
    { id: 2, name: 'Sunny', stage: 'BABY', color: 'bg-yellow-400', accessory: '🎀' },
    { id: 3, name: 'Rocky', stage: 'ADULT', color: 'bg-slate-400', accessory: '🤠' },
    { id: 4, name: 'Leafy', stage: 'CHILD', color: 'bg-green-400', accessory: '🌱' },
]

export default function GardenPage() {
    const { pet } = useGameStore()
    const [interactions, setInteractions] = useState<number[]>([])

    const handleInteract = (id: number) => {
        if (!interactions.includes(id)) {
            setInteractions([...interactions, id])
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-200 p-6 overflow-hidden relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-700">Community Garden</h1>
                    <Link href="/">
                        <Button variant="ghost" className="bg-white/50 hover:bg-white/70">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sanctuary
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                    {MOCK_PETS.map((otherPet) => (
                        <div key={otherPet.id} className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer" onClick={() => handleInteract(otherPet.id)}>
                                <motion.div
                                    className={`w-32 h-32 rounded-full ${otherPet.color} shadow-lg backdrop-blur-sm flex items-center justify-center relative`}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random(),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: Math.random() * 2
                                    }}
                                >
                                    <div className="flex space-x-4">
                                        <div className="w-3 h-3 bg-black/50 rounded-full" />
                                        <div className="w-3 h-3 bg-black/50 rounded-full" />
                                    </div>
                                    <div className="absolute -top-4 text-4xl">{otherPet.accessory}</div>
                                </motion.div>

                                {/* Interaction Bubble */}
                                {interactions.includes(otherPet.id) && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute -top-12 right-0 bg-white p-2 rounded-full shadow-md"
                                    >
                                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                    </motion.div>
                                )}
                            </div>

                            <div className="text-center">
                                <div className="font-bold text-slate-700">{otherPet.name}</div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="mt-1 h-8 text-xs bg-white/30 hover:bg-white/50"
                                    onClick={() => handleInteract(otherPet.id)}
                                    disabled={interactions.includes(otherPet.id)}
                                >
                                    {interactions.includes(otherPet.id) ? 'Sent Love!' : 'Send Love'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-300/50 to-transparent pointer-events-none" />
        </div>
    )
}
