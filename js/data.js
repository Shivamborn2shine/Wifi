/**
 * data.js
 * Master Store Data for WIRELESS with LocalStorage Persistence & CMS Sync.
 */

const DEFAULT_STORE_DATA = {
    brand: {
        id: 'wireless',
        name: 'WIRELESS',
        shortName: 'Wireless',
        initials: 'W',
        tagline: 'Mobiles, Lamination, Repairing, Second Hand Phones & Accessories at Subhash Nagar, Dehradun',
        categorySubtitle: 'Mobiles, Repairs & Accessories',
        rating: 5.0,
        ratingStars: '★★★★★',
        ratingCountText: '(3 reviews)',
        badgeText: 'Trusted Cell Phone Store',
        heroImage: './assets/images/wireless/storefront.jpg',
        phoneBadge: '9837044095'
    },
    theme: {
        primary: '#F59E0B',
        primaryHover: '#D97706',
        primaryLight: '#FFFBEB',
        accent: '#F59E0B'
    },
    services: [
        { key: 'MOBILES', title: 'New & Second Hand Phones', subtitle: 'Verified condition & best value', icon: 'phone' },
        { key: 'REPAIR', title: 'Repairs & Services', subtitle: 'Same day screen & battery fixes', icon: 'tools' },
        { key: 'ACCESSORIES', title: 'Accessories', subtitle: 'Cases, chargers & headphones', icon: 'headphones' },
        { key: 'LAMINATION', title: 'Lamination', subtitle: '360° precision wraps & skins', icon: 'lamination' }
    ],
    about: {
        quote: 'Your trusted destination for mobiles, second hand phones, accessories, lamination and expert repairs. Genuine products, honest service and the latest accessories — all under one roof at WIRELESS.',
        highlights: [
            { icon: '🔧', title: 'Expert Phone Repairs', subtitle: 'Same-day screen replacement, battery repair & motherboard fixes' },
            { icon: '🛡️', title: 'Precision Lamination & Skins', subtitle: 'Zero bubble wrap, premium matte/gloss finishes for all smartphone models' },
            { icon: '💰', title: 'Best Prices Guaranteed', subtitle: 'Competitive pricing on new phones, accessories & reliable 2nd hand devices' },
            { icon: '🤝', title: 'Honest & Transparent', subtitle: 'Clear upfront quotes with genuine parts and customer satisfaction' }
        ]
    },
    gallery: [
        { id: '1', title: 'WIRELESS Storefront', badge: 'Our Store', desc: 'Lit neon signage on Post Office Road, Subhash Nagar.', image: './assets/images/wireless/storefront.jpg' },
        { id: '2', title: 'Premium Accessories Wall', badge: 'Cases & Skins', desc: 'Huge selection of designer skins, covers and screen guards.', image: './assets/images/wireless/accessories.jpg' },
        { id: '3', title: 'Inside WIRELESS', badge: 'Store Interior', desc: 'Well-organized counters with expert service technicians.', image: './assets/images/wireless/interior.jpg' },
        { id: '4', title: 'Grand Opening Celebration', badge: 'Our Journey', desc: 'Festive grand opening celebrating quality mobile care.', image: './assets/images/wireless/wireless-grand-opening.jpg' }
    ]
};

const STORAGE_KEY = 'wireless_store_data_v1';

function getStoreData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_STORE_DATA;
}

function saveStoreData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
}

function resetStoreData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return DEFAULT_STORE_DATA;
}

if (typeof window !== 'undefined') {
    window.DEFAULT_STORE_DATA = DEFAULT_STORE_DATA;
    window.getStoreData = getStoreData;
    window.saveStoreData = saveStoreData;
    window.resetStoreData = resetStoreData;
}
