/**
 * ===========================================================================
 * WIRELESS — MASTER SITE CONFIGURATION
 * Mobiles, Lamination, Repairing, Second Hand Phones & Accessories
 * Post Office Road, Subhash Nagar, Dehradun
 * ===========================================================================
 */

const SITE_LINKS = {
    phone: '+919837044095',
    phoneDisplay: '9837044095',
    whatsappNumber: '919837044095',
    whatsappMessage: 'Hi%20WIRELESS%2C%20I%20am%20interested%20in%20your%20services%20(Mobiles%2C%20Repairs%2C%20Lamination)!',
    googleMapsUrl: 'https://www.google.com/maps?cid=13211634425347864029',
    googleShortMapsUrl: 'https://maps.app.goo.gl/oJhAJPuwUEkkn55b8',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.0!2d77.9959916!3d30.2705399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b9bd1c976e3%3A0xb7592782f92e75dd!2sWIRELESS!5e0!3m2!1sen!2sin!4v1697900000000!5m2!1sen!2sin',
    googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ43bJ0ZsrCTkR3XUu-YInWbc',
    googlePlaceId: 'ChIJ43bJ0ZsrCTkR3XUu-YInWbc',
    googleCid: '13211634425347864029',
    instagramUrl: 'https://www.instagram.com/wireless_95',
    onescanInstagram: 'https://www.instagram.com/onescan360',
    onescanEmail: 'onescan360@gmail.com',
};

const BUSINESS_CONFIG = {
    id: 'wireless',
    name: 'WIRELESS',
    tagline: 'Mobiles, Lamination, Repairing, Second Hand Phones & Accessories at Subhash Nagar, Dehradun',
    categorySubtitle: 'Mobiles, Repairs & Accessories',
    address: 'Post Office Rd, Subhash Nagar, Dehradun, Bharu Wala Grant, Uttarakhand 248002',
    shortAddress: 'Post Office Rd, Subhash Nagar, Dehradun',
    coordinates: {
        latitude: 30.2705399,
        longitude: 77.9959916
    },
    hoursDisplay: 'Monday - Sunday: 10:00 AM - 9:00 PM',
    hoursStatus: 'Open Now • Closes 9:00 PM',
    phone: SITE_LINKS.phone,
    whatsapp: SITE_LINKS.whatsappNumber,
    googlePlaceId: SITE_LINKS.googlePlaceId,
    googleReviewUrl: SITE_LINKS.googleReviewUrl,
    googleMapsUrl: SITE_LINKS.googleMapsUrl,
    mapsEmbedUrl: SITE_LINKS.mapEmbedUrl,
    instagramUrl: SITE_LINKS.instagramUrl,
    dashboardSync: true
};

function applyLinks() {
    const map = {
        call: 'tel:' + SITE_LINKS.phone,
        whatsapp: 'https://wa.me/' + SITE_LINKS.whatsappNumber + '?text=' + SITE_LINKS.whatsappMessage,
        directions: SITE_LINKS.googleMapsUrl,
        mapEmbed: SITE_LINKS.mapEmbedUrl,
        instagram: SITE_LINKS.instagramUrl,
        review: SITE_LINKS.googleReviewUrl
    };

    document.querySelectorAll('[data-link]').forEach(el => {
        const key = el.dataset.link;
        const url = map[key];
        if (!url) return;
        if (el.tagName === 'IFRAME') {
            el.src = url;
        } else {
            el.href = url;
        }
    });
}

if (typeof window !== 'undefined') {
    window.SITE_LINKS = SITE_LINKS;
    window.BUSINESS_CONFIG = BUSINESS_CONFIG;
    window.applyLinks = applyLinks;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLinks);
    } else {
        applyLinks();
    }
}
