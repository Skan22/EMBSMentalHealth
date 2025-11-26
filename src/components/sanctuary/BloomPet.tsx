'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/lib/store'
import { SHOP_ITEMS } from '@/lib/constants'

export function BloomPet() {
    const { pet, equippedItems } = useGameStore()

    // Find item icons
    const hatIcon = SHOP_ITEMS.find(i => i.id === equippedItems.hat)?.icon
    const accessoryIcon = SHOP_ITEMS.find(i => i.id === equippedItems.accessory)?.icon

    // Determine color based on track
    const getColor = () => {
        switch (pet.evolutionTrack) {
            case 'SERENE': return 'bg-blue-400 shadow-blue-400'
            case 'WISE': return 'bg-purple-400 shadow-purple-400'
            case 'ENERGETIC': return 'bg-orange-400 shadow-orange-400'
            default: return 'bg-yellow-200 shadow-yellow-200'
        }
    }

    // Determine size/shape based on stage
    const getSize = () => {
        switch (pet.stage) {
            case 'EGG': return 'w-32 h-40 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]'
            case 'BABY': return 'w-32 h-32 rounded-full'
            case 'CHILD': return 'w-48 h-48 rounded-full'
            case 'ADULT': return 'w-64 h-64 rounded-full'
            default: return 'w-32 h-32'
        }
    }

    return (
        <div className="relative flex items-center justify-center h-96 w-full">
            <motion.div
                className={`${getSize()} ${getColor()} shadow-[0_0_60px_20px_rgba(255,255,255,0.5)] backdrop-blur-md relative`}
                animate={{
                    scale: [1, 1.05, 1],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Face or details could go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {pet.stage !== 'EGG' && (
                        <div className="flex space-x-8 relative">
                            <motion.div className="w-4 h-4 bg-black/50 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, delay: 2, repeatDelay: 3, duration: 0.2 }} />
                            <motion.div className="w-4 h-4 bg-black/50 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, delay: 2, repeatDelay: 3, duration: 0.2 }} />

                            {/* Accessory (Glasses/Scarf) */}
                            {accessoryIcon && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none" style={{ marginTop: '10px' }}>
                                    {accessoryIcon}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Hat */}
                {hatIcon && (
                    <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl pointer-events-none"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        {hatIcon}
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}
