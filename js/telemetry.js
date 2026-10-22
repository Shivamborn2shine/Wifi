/**
 * telemetry.js
 * ONESCAN AI QR Reviews Platform — Client Telemetry & Live Dashboard Sync
 * Connects this review landing page back to central ONESCAN Studio Dashboard.
 */
(function() {
    const config = window.BUSINESS_CONFIG || {
        id: 'wireless',
        name: 'WIRELESS'
    };

    const businessId = config.id || 'wireless';
    let channel = null;

    try {
        if (typeof BroadcastChannel !== 'undefined') {
            channel = new BroadcastChannel('onescan_telemetry_channel');
        }
    } catch (e) {
        console.warn('BroadcastChannel not available:', e);
    }

    const OnescanTelemetry = {
        track: function(type, data) {
            const payload = {
                businessId: businessId,
                type: type, // 'scan' | 'review_generated' | 'review_copied' | 'category_change' | 'action_click'
                data: data || {},
                timestamp: Date.now(),
                url: window.location.href,
                referrer: document.referrer || ''
            };

            // 1. Real-Time Sync via BroadcastChannel
            try {
                if (channel) {
                    channel.postMessage(payload);
                }
            } catch (e) {}

            // 2. Cross-tab LocalStorage Bridge
            try {
                localStorage.setItem('onescan_telemetry_ping', JSON.stringify(payload));
                const storeKey = 'onescan_businesses_v1';
                const raw = localStorage.getItem(storeKey);
                if (raw) {
                    const list = JSON.parse(raw);
                    const biz = list.find(item => item.id === businessId);
                    if (biz) {
                        biz.stats = biz.stats || {};
                        if (type === 'scan') biz.stats.scans = (biz.stats.scans || 0) + 1;
                        if (type === 'review_copied') {
                            biz.stats.copiedToGoogle = (biz.stats.copiedToGoogle || 0) + 1;
                            biz.stats.reviewsGenerated = (biz.stats.reviewsGenerated || 0) + 1;
                        }
                        localStorage.setItem(storeKey, JSON.stringify(list));
                    }
                }
            } catch (e) {}

            // 3. PostMessage for iframe / preview embeds
            try {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ onescanTelemetry: payload }, '*');
                }
            } catch (e) {}
        }
    };

    window.OnescanTelemetry = OnescanTelemetry;

    // Track initial page view / QR scan
    window.addEventListener('DOMContentLoaded', function() {
        OnescanTelemetry.track('scan', { timestamp: new Date().toISOString() });
    });
})();
