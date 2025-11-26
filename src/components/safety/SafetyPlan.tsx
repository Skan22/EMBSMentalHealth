'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useGameStore } from "@/lib/store"
import { Shield, Phone, Heart, Edit2, Save, Plus, Trash2 } from "lucide-react"

export function SafetyPlan({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { safetyPlan, updateSafetyPlan } = useGameStore()
    const [isEditing, setIsEditing] = useState(false)
    const [tempPlan, setTempPlan] = useState(safetyPlan)

    const handleSave = () => {
        updateSafetyPlan(tempPlan)
        setIsEditing(false)
    }

    const addStrategy = () => {
        setTempPlan({ ...tempPlan, strategies: [...tempPlan.strategies, ''] })
    }

    const updateStrategy = (index: number, value: string) => {
        const newStrategies = [...tempPlan.strategies]
        newStrategies[index] = value
        setTempPlan({ ...tempPlan, strategies: newStrategies })
    }

    const removeStrategy = (index: number) => {
        const newStrategies = tempPlan.strategies.filter((_, i) => i !== index)
        setTempPlan({ ...tempPlan, strategies: newStrategies })
    }

    const addContact = () => {
        setTempPlan({ ...tempPlan, contacts: [...tempPlan.contacts, { name: '', phone: '' }] })
    }

    const updateContact = (index: number, field: 'name' | 'phone', value: string) => {
        const newContacts = [...tempPlan.contacts]
        newContacts[index] = { ...newContacts[index], [field]: value }
        setTempPlan({ ...tempPlan, contacts: newContacts })
    }

    const removeContact = (index: number) => {
        const newContacts = tempPlan.contacts.filter((_, i) => i !== index)
        setTempPlan({ ...tempPlan, contacts: newContacts })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-xl border-none shadow-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between text-2xl text-slate-700">
                        <div className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-red-500" />
                            My Safety Plan
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => {
                            if (isEditing) handleSave()
                            else {
                                setTempPlan(safetyPlan)
                                setIsEditing(true)
                            }
                        }}>
                            {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit2 className="h-4 w-4 mr-1" />}
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Comfort Message */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4" /> Message to Myself
                        </h3>
                        {isEditing ? (
                            <Textarea
                                value={tempPlan.message}
                                onChange={(e) => setTempPlan({ ...tempPlan, message: e.target.value })}
                                className="bg-white"
                            />
                        ) : (
                            <p className="text-slate-700 italic">"{safetyPlan.message}"</p>
                        )}
                    </div>

                    {/* Coping Strategies */}
                    <div>
                        <h3 className="font-semibold text-slate-700 mb-3">Coping Strategies</h3>
                        <div className="space-y-2">
                            {(isEditing ? tempPlan.strategies : safetyPlan.strategies).map((strategy, idx) => (
                                <div key={idx} className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <Input
                                                value={strategy}
                                                onChange={(e) => updateStrategy(idx, e.target.value)}
                                                placeholder="e.g. Listen to music"
                                            />
                                            <Button variant="ghost" size="icon" onClick={() => removeStrategy(idx)}>
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="w-full p-3 bg-slate-50 rounded-lg text-slate-700 border border-slate-100">
                                            {strategy}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <Button variant="outline" size="sm" onClick={addStrategy} className="w-full mt-2">
                                    <Plus className="h-4 w-4 mr-1" /> Add Strategy
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div>
                        <h3 className="font-semibold text-slate-700 mb-3">Emergency Contacts</h3>
                        <div className="space-y-3">
                            {(isEditing ? tempPlan.contacts : safetyPlan.contacts).map((contact, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    {isEditing ? (
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <Input
                                                value={contact.name}
                                                onChange={(e) => updateContact(idx, 'name', e.target.value)}
                                                placeholder="Name"
                                            />
                                            <Input
                                                value={contact.phone}
                                                onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                                                placeholder="Phone"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full p-3 bg-red-50 rounded-lg border border-red-100 flex justify-between items-center">
                                            <span className="font-medium text-slate-700">{contact.name}</span>
                                            <a href={`tel:${contact.phone}`} className="flex items-center text-red-600 hover:underline">
                                                <Phone className="h-3 w-3 mr-1" /> {contact.phone}
                                            </a>
                                        </div>
                                    )}
                                    {isEditing && (
                                        <Button variant="ghost" size="icon" onClick={() => removeContact(idx)}>
                                            <Trash2 className="h-4 w-4 text-red-400" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <Button variant="outline" size="sm" onClick={addContact} className="w-full mt-2">
                                    <Plus className="h-4 w-4 mr-1" /> Add Contact
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
