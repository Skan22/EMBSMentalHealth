'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store"
import { HABITATS } from "@/lib/constants"
import { Paintbrush, Check } from "lucide-react"

export function HabitatEditor({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { habitat, setHabitat } = useGameStore()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-slate-700">
                        <Paintbrush className="h-6 w-6 text-purple-500" />
                        Decorate Sanctuary
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {HABITATS.map((h) => {
                        const isActive = habitat === h.id

                        return (
                            <div
                                key={h.id}
                                className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 ${isActive ? 'border-purple-500 bg-purple-50' : 'border-slate-100 bg-slate-50 hover:shadow-md'}`}
                                onClick={() => setHabitat(h.id)}
                            >
                                <div className={`h-24 rounded-lg mb-3 ${h.background} flex items-center justify-center text-4xl shadow-inner`}>
                                    {h.icon}
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-700">{h.name}</h3>
                                    {isActive && <Check className="h-5 w-5 text-purple-600" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
