'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store"
import { SHOP_ITEMS } from "@/lib/constants"
import { ShoppingBag, Check, Lock } from "lucide-react"

export function ShopModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { sunlight, inventory, purchaseItem, equipItem, equippedItems } = useGameStore()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-slate-700">
                        <ShoppingBag className="h-6 w-6 text-orange-500" />
                        Garden Shop
                        <span className="ml-auto text-sm font-normal bg-orange-100 text-orange-600 px-3 py-1 rounded-full border border-orange-200">
                            ☀️ {sunlight} Sunlight
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4 max-h-[60vh] overflow-y-auto p-1">
                    {SHOP_ITEMS.map((item) => {
                        const isOwned = inventory.includes(item.id) || item.cost === 0
                        const isEquipped = equippedItems[item.type as 'hat' | 'accessory'] === item.id
                        const canAfford = sunlight >= item.cost

                        return (
                            <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-2 relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform drop-shadow-sm">{item.icon}</div>
                                <h3 className="font-semibold text-slate-700">{item.name}</h3>

                                {isOwned ? (
                                    <Button
                                        variant={isEquipped ? "secondary" : "outline"}
                                        className={`w-full ${isEquipped ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 'hover:bg-slate-100'}`}
                                        onClick={() => equipItem(item.type as any, item.id)}
                                    >
                                        {isEquipped ? <><Check className="w-4 h-4 mr-1" /> Equipped</> : "Equip"}
                                    </Button>
                                ) : (
                                    <Button
                                        className={`w-full ${canAfford ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                        disabled={!canAfford}
                                        onClick={() => purchaseItem(item.id, item.cost)}
                                    >
                                        {canAfford ? `${item.cost} ☀️` : <><Lock className="w-3 h-3 mr-1" /> {item.cost}</>}
                                    </Button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
