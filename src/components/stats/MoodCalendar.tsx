'use client'

import { useGameStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Star, Zap, TrendingUp } from "lucide-react"

export function MoodCalendar() {
    const { assessmentHistory } = useGameStore()

    // Get days for current month
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const getHistoryForDay = (day: number) => {
        return assessmentHistory.filter(h => {
            const d = new Date(h.date)
            return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear
        })
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'sparkle': return <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            case 'energy': return <Zap className="h-3 w-3 text-blue-500 fill-blue-500" />
            case 'mood': return <TrendingUp className="h-3 w-3 text-purple-500" />
            default: return null
        }
    }

    return (
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg">
            <h3 className="text-xl font-bold text-slate-700 mb-4">Mood History ({today.toLocaleString('default', { month: 'long' })})</h3>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-center text-xs font-medium text-slate-500">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {blanks.map(b => <div key={`blank-${b}`} className="h-12" />)}

                {days.map(day => {
                    const history = getHistoryForDay(day)
                    const hasData = history.length > 0

                    return (
                        <div key={day} title={hasData ? history.map(h => `${h.type}: ${h.score}`).join('\n') : ''}>
                            <div className={`h-12 rounded-lg border flex flex-col items-center justify-center transition-all hover:scale-105 ${hasData ? 'bg-white border-purple-200 shadow-sm' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                                <span className="text-xs mb-1">{day}</span>
                                <div className="flex gap-0.5">
                                    {history.slice(0, 3).map((h, i) => (
                                        <div key={i}>{getIcon(h.type)}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
