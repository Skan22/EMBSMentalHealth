export const SHOP_ITEMS = [
    { id: 'hat_sprout', name: 'Sprout', type: 'hat', cost: 0, icon: '🌱' },
    { id: 'hat_party', name: 'Party Hat', type: 'hat', cost: 50, icon: '🎉' },
    { id: 'hat_crown', name: 'Crown', type: 'hat', cost: 500, icon: '👑' },
    { id: 'hat_cowboy', name: 'Cowboy', type: 'hat', cost: 150, icon: '🤠' },
    { id: 'acc_glasses', name: 'Glasses', type: 'accessory', cost: 100, icon: '👓' },
    { id: 'acc_scarf', name: 'Scarf', type: 'accessory', cost: 150, icon: '🧣' },
    { id: 'acc_bowtie', name: 'Bowtie', type: 'accessory', cost: 75, icon: '🎀' },
] as const;

export const HABITATS = [
    { id: 'default', name: 'Cloudy Sky', background: 'bg-gradient-to-b from-blue-100 to-purple-200', icon: '☁️' },
    { id: 'forest', name: 'Magic Forest', background: 'bg-gradient-to-b from-green-100 to-emerald-200', icon: '🌲' },
    { id: 'sunset', name: 'Golden Hour', background: 'bg-gradient-to-b from-orange-100 to-pink-200', icon: '🌅' },
    { id: 'night', name: 'Starry Night', background: 'bg-gradient-to-b from-slate-900 to-indigo-900', icon: '🌌' },
] as const;
