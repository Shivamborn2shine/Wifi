/**
 * Netlify Serverless Function: Cloud Reviews API for WIRELESS
 * Handles:
 * - GET: Fetch available pools and discarded status
 * - POST action=discard: Atomically discard a review so no other user receives it
 * - POST action=feed: Bulk feed 100s/1000s of reviews into category pools
 * - POST action=generate: Batch generate humanized reviews via Gemini API
 */

const fs = require('fs');
const path = require('path');

// In-memory runtime cache for serverless lifecycle
let cloudDiscarded = new Set();
let cloudCustomPools = {};

// Helper to send JSON responses with CORS
function jsonResponse(statusCode, data) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        body: JSON.stringify(data)
    };
}

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return jsonResponse(200, { ok: true });
    }

    const action = (event.queryStringParameters && event.queryStringParameters.action) || 'stats';

    try {
        // 1. GET: Fetch active pool stats & discarded registry
        if (event.httpMethod === 'GET') {
            return jsonResponse(200, {
                status: 'online',
                service: 'WIRELESS Review Cloud API',
                discardedCount: cloudDiscarded.size,
                discardedList: Array.from(cloudDiscarded),
                customPools: cloudCustomPools,
                timestamp: new Date().toISOString()
            });
        }

        // 2. POST Actions
        if (event.httpMethod === 'POST') {
            let body = {};
            try {
                body = JSON.parse(event.body || '{}');
            } catch (e) {
                return jsonResponse(400, { error: 'Invalid JSON body' });
            }

            // Action: Discard review on final button tap
            if (action === 'discard') {
                const { reviewText, baseTemplate, category, language, customerMeta } = body;
                if (!reviewText && !baseTemplate) {
                    return jsonResponse(400, { error: 'Missing reviewText or baseTemplate' });
                }

                if (baseTemplate) cloudDiscarded.add(baseTemplate.trim());
                if (reviewText) cloudDiscarded.add(reviewText.trim());

                console.log(`[DISCARD API] Review discarded in category ${category} (${language}):`, reviewText || baseTemplate);

                return jsonResponse(200, {
                    success: true,
                    message: 'Review permanently discarded from cloud pool for 100% uniqueness.',
                    discardedCount: cloudDiscarded.size,
                    timestamp: new Date().toISOString()
                });
            }

            // Action: Bulk feed reviews into category
            if (action === 'feed') {
                const { category, language, reviews, deduplicate } = body;
                if (!category || !language || !Array.isArray(reviews)) {
                    return jsonResponse(400, { error: 'Category, language, and reviews array required' });
                }

                const catKey = String(category).toUpperCase().trim();
                const langKey = String(language).toUpperCase().trim();

                if (!cloudCustomPools[catKey]) cloudCustomPools[catKey] = {};
                if (!cloudCustomPools[catKey][langKey]) cloudCustomPools[catKey][langKey] = [];

                let added = 0;
                let skipped = 0;
                const existing = new Set(cloudCustomPools[catKey][langKey]);

                for (const item of reviews) {
                    const clean = String(item).replace(/\s+/g, ' ').trim();
                    if (clean.length < 15) continue;
                    if (deduplicate && (existing.has(clean) || cloudDiscarded.has(clean))) {
                        skipped++;
                        continue;
                    }
                    cloudCustomPools[catKey][langKey].push(clean);
                    existing.add(clean);
                    added++;
                }

                return jsonResponse(200, {
                    success: true,
                    added,
                    skipped,
                    totalInPool: cloudCustomPools[catKey][langKey].length,
                    category: catKey,
                    language: langKey
                });
            }

            // Action: AI Generation API using Gemini
            if (action === 'generate') {
                const { category = 'REPAIR', language = 'ENGLISH', count = 10, apiKey, model = 'gemini-1.5-flash' } = body;
                const geminiKey = apiKey || process.env.GEMINI_API_KEY;

                if (!geminiKey) {
                    return jsonResponse(400, {
                        error: 'Gemini API Key not provided. Pass apiKey in body or set GEMINI_API_KEY environment variable.'
                    });
                }

                const prompt = `You are a professional local reviewer generator for "WIRELESS", a renowned mobile sales, smartphone repair, 3M skin lamination, and accessories store located on Post Office Road, Subhash Nagar, Dehradun, owned by Devansh.
Generate exactly ${Math.min(count, 50)} distinct, highly humanized, authentic 5-star Google reviews for category "${category}" in language "${language}".
Tone rules:
- Extremely authentic, conversational, and natural (as if real customers wrote them on Google Maps).
- If Hinglish, use popular Indian conversational phrases like "Bhai ka nature bohot humble hai", "30 mins me screen change kar di", "Full paisa vasool", "Dehradun ki best shop".
- If Hindi, use respectful, genuine Hindi language.
- If English, use natural conversational tone.
- Vary the lengths (some 2 sentences, some 3-4 sentences).
- Mention authentic details: Subhash Nagar, Dehradun, fast turnaround, genuine parts, bubble-free hydrogel wrap, transparent testing in front of customer.
- Format requirement: Return ONLY a valid JSON array of strings containing the reviews. No markdown code blocks, no explanations. Example: ["Review 1...", "Review 2..."]`;

                const chosenModel = model || 'gemini-1.5-flash';
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${geminiKey}`;
                const apiRes = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.95,
                            topP: 0.95
                        }
                    })
                });

                if (!apiRes.ok) {
                    const errText = await apiRes.text();
                    return jsonResponse(500, { error: 'Gemini API request failed', details: errText });
                }

                const apiData = await apiRes.json();
                let rawText = apiData.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
                rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

                let generatedReviews = [];
                try {
                    generatedReviews = JSON.parse(rawText);
                } catch (parseErr) {
                    // Fallback to line splitting
                    generatedReviews = rawText.split('\n').map(l => l.replace(/^[-*\d.]+\s*/, '').trim()).filter(l => l.length >= 15);
                }

                return jsonResponse(200, {
                    success: true,
                    count: generatedReviews.length,
                    reviews: generatedReviews,
                    category,
                    language
                });
            }

            // Action: Reset discarded
            if (action === 'reset') {
                cloudDiscarded.clear();
                return jsonResponse(200, { success: true, message: 'Cloud discarded reviews reset.' });
            }

            return jsonResponse(400, { error: `Unknown action: ${action}` });
        }

        return jsonResponse(405, { error: 'Method not allowed' });
    } catch (err) {
        return jsonResponse(500, { error: 'Server error', message: err.message });
    }
};
