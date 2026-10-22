/**
 * app.js
 * WIRELESS Master Client Application Logic
 */

let selectedCategory = 'ALL';
let currentLanguage = 'ENGLISH';
let selectedServices = [];
let reviewIndex = 0;

function showToast(msg, icon = '✨') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    if (toastIcon) toastIcon.textContent = icon;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, 2500);
}

function selectCategoryChip(catKey, btn) {
    selectedCategory = catKey;
    document.querySelectorAll('.category-chip').forEach(b => b.classList.remove('chip-active'));
    if (btn) {
        btn.classList.add('chip-active');
    } else {
        const matchingBtn = document.querySelector(`.category-chip[data-cat="${catKey}"]`);
        if (matchingBtn) matchingBtn.classList.add('chip-active');
    }
    regenerateReviewDraft();
    if (window.OnescanTelemetry) {
        window.OnescanTelemetry.track('category_change', { category: catKey });
    }
}

function quickSelectCategory(catKey, serviceTitle) {
    selectCategoryChip(catKey);
    if (serviceTitle) {
        selectedServices = [serviceTitle];
        const summary = document.getElementById('selectedMenuSummary');
        const summaryText = document.getElementById('selectedMenuSummaryText');
        if (summary && summaryText) {
            summaryText.textContent = serviceTitle;
            summary.classList.remove('hidden');
        }
    }
    regenerateReviewDraft();
    const aiSec = document.getElementById('aiSection');
    if (aiSec) aiSec.scrollIntoView({ behavior: 'smooth' });
}

function focusReviewGenerator() {
    const aiSec = document.getElementById('aiSection');
    if (aiSec) {
        aiSec.scrollIntoView({ behavior: 'smooth' });
        const textarea = document.getElementById('aiReviewOutput');
        if (textarea) {
            textarea.focus();
            textarea.classList.add('ring-2', 'ring-amber-400');
            setTimeout(() => textarea.classList.remove('ring-2', 'ring-amber-400'), 1200);
        }
    }
    regenerateReviewDraft();
    if (window.OnescanTelemetry) {
        window.OnescanTelemetry.track('cta_generate_click', {});
    }
}

function setLanguage(lang, btn) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
        b.classList.add('text-slate-500');
    });
    if (btn) {
        btn.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
        btn.classList.remove('text-slate-500');
    }
    regenerateReviewDraft();
}

function regenerateReviewDraft() {
    const db = window.REVIEWS_DB || {};
    const langLib = db[currentLanguage] || db.ENGLISH || {};
    const catList = langLib[selectedCategory] || langLib.ALL || [];
    if (catList.length === 0) return;

    let review = catList[reviewIndex % catList.length];
    reviewIndex++;

    if (selectedServices.length > 0) {
        const item = selectedServices[0];
        if (currentLanguage === 'HINGLISH') {
            review += " Especially inka " + item + " service bohot hi shaandaar tha!";
        } else if (currentLanguage === 'HINDI') {
            review += " विशेष रूप से " + item + " का काम बहुत ही बढ़िया और तसल्लीबख्श रहा!";
        } else {
            review += " Their " + item + " service in particular was top-notch!";
        }
    }

    const textarea = document.getElementById('aiReviewOutput');
    if (textarea) textarea.value = review;
}

function copyAndRedirectReview() {
    const textarea = document.getElementById('aiReviewOutput');
    const text = textarea ? textarea.value : '';
    const reviewUrl = (window.SITE_LINKS && window.SITE_LINKS.googleReviewUrl) || 'https://search.google.com/local/writereview?placeid=ChIJ43bJ0ZsrCTkR3XUu-YInWbc';

    if (window.OnescanTelemetry) {
        window.OnescanTelemetry.track('review_copied', { length: text.length, category: selectedCategory, language: currentLanguage });
    }

    navigator.clipboard.writeText(text).then(() => {
        showToast('Review copied! Opening Google Maps...', '📋');
        setTimeout(() => {
            window.open(reviewUrl, '_blank');
        }, 900);
    }).catch(() => {
        window.open(reviewUrl, '_blank');
    });
}

// Welcome Modal
function openWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) modal.classList.remove('hidden');
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) modal.classList.add('hidden');
}

function toggleWelcomeItem(btn, key, categoryKey) {
    btn.classList.toggle('is-selected');
    const selected = document.querySelectorAll('.modal-service-item.is-selected');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    if (selected.length > 0) {
        confirmBtn.removeAttribute('disabled');
        confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        confirmBtn.setAttribute('disabled', 'true');
        confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function confirmWelcomeModal() {
    const selected = document.querySelectorAll('.modal-service-item.is-selected');
    selectedServices = [];
    selected.forEach(el => {
        const label = el.querySelector('span');
        if (label) selectedServices.push(label.textContent.trim());
    });
    closeWelcomeModal();
    if (selectedServices.length > 0) {
        const summary = document.getElementById('selectedMenuSummary');
        const summaryText = document.getElementById('selectedMenuSummaryText');
        if (summary && summaryText) {
            summaryText.textContent = selectedServices.join(', ');
            summary.classList.remove('hidden');
        }
    }
    regenerateReviewDraft();
    const aiSec = document.getElementById('aiSection');
    if (aiSec) aiSec.scrollIntoView({ behavior: 'smooth' });
}

// Gallery Lightbox
function openGalleryModal(img, title, badge, desc) {
    document.getElementById('galleryModalImg').src = img;
    document.getElementById('galleryModalTitle').textContent = title;
    document.getElementById('galleryModalBadge').textContent = badge;
    document.getElementById('galleryModalDesc').textContent = desc;
    document.getElementById('galleryModal').classList.remove('hidden');
}

function closeGalleryModal() {
    document.getElementById('galleryModal').classList.add('hidden');
}

// Init on load
window.addEventListener('DOMContentLoaded', () => {
    regenerateReviewDraft();
});
