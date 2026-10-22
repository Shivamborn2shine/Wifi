/**
 * dev-editor.js
 * IN-BROWSER VISUAL CMS & DEVELOPER CONTROL CENTER FOR WIRELESS
 * Shortcut: Ctrl + Alt + E (or ?dev=true)
 */
(function() {
    let isDevMode = false;

    function initDevEditor() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('dev') === 'true' || urlParams.get('edit') === 'true') {
            openEditorModal();
        }

        // Register Keyboard Shortcut: Ctrl + Alt + E
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                toggleEditorModal();
            }
        });

        injectFloatingDevTrigger();
    }

    function injectFloatingDevTrigger() {
        if (document.getElementById('devTriggerBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'devTriggerBtn';
        btn.type = 'button';
        btn.title = 'Open Live CMS Editor (Ctrl+Alt+E)';
        btn.innerHTML = '⚙️ CMS';
        btn.className = 'fixed bottom-20 right-3 z-50 px-2.5 py-1.5 rounded-full bg-slate-900/90 text-amber-400 font-black text-[10px] uppercase tracking-wider border border-amber-400/50 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all opacity-40 hover:opacity-100';
        btn.onclick = toggleEditorModal;
        document.body.appendChild(btn);
    }

    function toggleEditorModal() {
        const modal = document.getElementById('devEditorModal');
        if (modal && !modal.classList.contains('hidden')) {
            closeEditorModal();
        } else {
            openEditorModal();
        }
    }

    function openEditorModal() {
        let modal = document.getElementById('devEditorModal');
        if (!modal) {
            modal = createEditorModalElement();
            document.body.appendChild(modal);
        }
        populateEditorFields();
        modal.classList.remove('hidden');
    }

    function closeEditorModal() {
        const modal = document.getElementById('devEditorModal');
        if (modal) modal.classList.add('hidden');
    }

    function createEditorModalElement() {
        const modal = document.createElement('div');
        modal.id = 'devEditorModal';
        modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 hidden';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" onclick="event.stopPropagation()">
                <!-- Header -->
                <div class="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
                        <h3 class="text-sm font-black text-white uppercase tracking-wider">WIRELESS Live CMS</h3>
                    </div>
                    <button type="button" onclick="window.closeDevEditorModal()" class="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold">✕</button>
                </div>

                <!-- Tabs -->
                <div class="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
                    <div>
                        <label class="block font-bold text-slate-400 mb-1">Store Name</label>
                        <input id="editStoreName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">Phone Number (Calling)</label>
                        <input id="editStorePhone" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">Phone Number Badge (Header)</label>
                        <input id="editPhoneBadge" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">WhatsApp Number (with country code e.g. 919837044095)</label>
                        <input id="editStoreWhatsApp" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">Google Maps CID Link</label>
                        <input id="editGoogleMapsUrl" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">Google Write Review URL</label>
                        <input id="editGoogleReviewUrl" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none">
                    </div>

                    <div>
                        <label class="block font-bold text-slate-400 mb-1">About Quote Blurb</label>
                        <textarea id="editAboutQuote" rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-medium focus:border-amber-400 focus:outline-none leading-relaxed"></textarea>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button type="button" onclick="window.resetStoreDataDefaults()" class="px-3 py-2 rounded-xl text-slate-400 hover:text-white font-bold text-xs">Reset</button>
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="window.exportStoreConfigJSON()" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">Export JSON</button>
                        <button type="button" onclick="window.saveDevEditorChanges()" class="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md">Save & Apply</button>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    function populateEditorFields() {
        const links = window.SITE_LINKS || {};
        const data = window.getStoreData ? window.getStoreData() : {};
        document.getElementById('editStoreName').value = data.brand?.name || 'WIRELESS';
        document.getElementById('editStorePhone').value = links.phone || '+919837044095';
        document.getElementById('editPhoneBadge').value = links.phoneDisplay || '9837044095';
        document.getElementById('editStoreWhatsApp').value = links.whatsappNumber || '919837044095';
        document.getElementById('editGoogleMapsUrl').value = links.googleMapsUrl || '';
        document.getElementById('editGoogleReviewUrl').value = links.googleReviewUrl || '';
        document.getElementById('editAboutQuote').value = data.about?.quote || '';
    }

    window.closeDevEditorModal = closeEditorModal;

    window.saveDevEditorChanges = function() {
        const data = window.getStoreData ? window.getStoreData() : {};
        data.brand.name = document.getElementById('editStoreName').value;
        data.about.quote = document.getElementById('editAboutQuote').value;
        if (window.saveStoreData) window.saveStoreData(data);

        if (window.SITE_LINKS) {
            window.SITE_LINKS.phone = document.getElementById('editStorePhone').value;
            window.SITE_LINKS.phoneDisplay = document.getElementById('editPhoneBadge').value;
            window.SITE_LINKS.whatsappNumber = document.getElementById('editStoreWhatsApp').value;
            window.SITE_LINKS.googleMapsUrl = document.getElementById('editGoogleMapsUrl').value;
            window.SITE_LINKS.googleReviewUrl = document.getElementById('editGoogleReviewUrl').value;
            if (window.applyLinks) window.applyLinks();
        }

        closeEditorModal();
        if (window.showToast) window.showToast('Changes saved & applied live!', '✅');
        setTimeout(() => window.location.reload(), 600);
    };

    window.resetStoreDataDefaults = function() {
        if (confirm('Reset all customizations to default?')) {
            if (window.resetStoreData) window.resetStoreData();
            window.location.reload();
        }
    };

    window.exportStoreConfigJSON = function() {
        const data = window.getStoreData ? window.getStoreData() : {};
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'wireless-config.json';
        a.click();
    };

    window.addEventListener('DOMContentLoaded', initDevEditor);
})();
