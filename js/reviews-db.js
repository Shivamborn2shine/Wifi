/**
 * reviews-db.js
 * Comprehensive Multi-Lingual AI Review Database for WIRELESS
 * Categorized by Service, Quality, Products, Staff, and Value.
 */

const REVIEWS_DB = {
    ENGLISH: {
        ALL: [
            "Had an amazing experience at WIRELESS in Subhash Nagar! Outstanding service, genuine products, and very fair pricing. Highly recommended for any mobile phone needs!",
            "One of the best cell phone stores in Dehradun! Got my phone screen replaced and it looks and works like brand new. They also have a fantastic collection of skins and accessories.",
            "Loved the prompt service at WIRELESS! Wide range of new & 2nd hand phones, expert repair technicians, and precise lamination. 5 stars all the way!",
            "Super satisfied with the service! The staff is very polite and helpful. Best place in Dehradun for phone wraps, cases, and quick repairs.",
            "Transparent pricing and 100% genuine accessories. Got a full body lamination done with zero bubbles. Excellent work by the WIRELESS team!"
        ],
        REPAIR: [
            "Got my smartphone display repaired at WIRELESS and was blown away by their quick turnaround and professional work. Screen touch and colors feel like brand original!",
            "Excellent repair service! My phone had charging and battery issues, and the technician fixed it within an hour at a very genuine cost. Trustworthy shop in Subhash Nagar.",
            "Had motherboard and speaker issues on my phone. The team at WIRELESS diagnosed it accurately and repaired it without any hidden charges. 10/10 service!",
            "Fast, reliable, and honest phone repairs. They use authentic parts and test everything thoroughly before handing the phone back. Highly satisfied!"
        ],
        LAMINATION: [
            "Best shop for phone lamination and custom skins in Dehradun! Super precise application, zero air bubbles, and premium quality matte finish.",
            "Got full body 360° lamination done on my new iPhone at WIRELESS. The edges and cutouts are razor-sharp. Truly expert lamination work!",
            "They have an unbelievable collection of designer skins and wraps. The protective film gives great grip and looks ultra stylish. Best in town!",
            "Top-notch precision lamination! The screen guard and camera lens protectors were applied with zero dust or bubbles. Highly recommend!"
        ],
        MOBILES: [
            "Purchased a verified second-hand phone from WIRELESS. Condition was completely scratchless, 100% battery health, and best price in Dehradun!",
            "Great place to buy new phones as well as quality pre-owned devices. Honest condition check, verified IMEI, and transparent exchange value.",
            "Exchanged my old phone here and got the best resale valuation compared to anywhere else on Post Office Road. Very smooth transaction!"
        ],
        ACCESSORIES: [
            "Massive collection of trendy back covers, heavy-duty drop cases, fast chargers, and premium earphones. 100% genuine products!",
            "Whenever I need screen protectors, cables, or stylish phone covers, WIRELESS is my go-to store. Great variety and reasonable rates.",
            "Best collection of accessories for all phone brands — Apple, Samsung, OnePlus, Xiaomi, and Vivo. Quality is unmatched!"
        ],
        SERVICE: [
            "The staff at WIRELESS is extremely humble, patient, and knowledgeable. They guide you genuinely without overselling or unnecessary upsells. 5 stars!",
            "Customer service here is next level! Very welcoming atmosphere, quick response, and they stand behind their work. Subhash Nagar's most reliable phone store."
        ]
    },

    HINGLISH: {
        ALL: [
            "WIRELESS Subhash Nagar ka experience ekdum zabardast tha! Professional repair work, genuine products aur staff bohot cooperative hai. Dehradun me mobile needs ke liye best shop!",
            "Bohot hi badhiya store hai! Screen repair karwaya tha, ekdum original quality aur rate bhi reasonable. Skins aur covers ka collection bhi lajawab hai.",
            "WIRELESS se second-hand phone liya tha, condition bilkul new jaisi mili aur proper checking ke saath diya. Truly dependable and honest service!",
            "Lamination aur wraps ka kaam inka no. 1 hai Dehradun me. Bubble-free finish aur stylish designs. Zaroor visit karein!",
            "Bhaiya ka behaviour bohot polite tha aur fast repair karke diya. Genuine accessories aur mast discounts. 5 stars!"
        ],
        REPAIR: [
            "Phone repair ke liye best shop! Same day screen replacement karwaya, ekdum original feel hai aur rates bhi pocket-friendly hain.",
            "Mera phone charge nahi ho raha tha, inhone 30 minutes me fix karke de diya. Bohot hi honest technicians hain WIRELESS pe!",
            "Expert phone repair service! Display aur battery change karwayi, phone bilkul naye jaisa smoothly chal raha hai."
        ],
        LAMINATION: [
            "Phone par lamination aur custom skin lagwayi, finish ekdum flawless hai! Bubble-free application aur designer collection lajawab hai.",
            "Subhash Nagar me best lamination shop! 360 degree wrap lagwaya, phone ko scratch se 100% protection mil gayi.",
            "Skins ka collection bohot unique hai. Ekdum precise cutting aur premium matte texture."
        ],
        MOBILES: [
            "Second hand phone purchase kiya tha, condition ekdum scratchless mili aur properly verified device tha. Full value for money!",
            "Phone exchange ka rate sabse best mila yahan. Honest valuation aur badhiya deal!",
            "Naye aur second hand phones ki wide range hai. Bilkul genuine shop hai."
        ],
        ACCESSORIES: [
            "Accessories ka collection bohot mast hai. Cases, tempered glass aur earphones sab genuine rates pe milte hain.",
            "Original chargers aur branded cables best price pe milte hain. Super durable products!"
        ],
        SERVICE: [
            "Bhaiya ka behaviour bohot polite aur genuine tha. Koi faltu charge nahi, ekdum honest service! 5 stars!",
            "Fast service aur transparent dealings. Dehradun me sabse trusted mobile shop."
        ]
    },

    HINDI: {
        ALL: [
            "WIRELESS (सुभाष नगर) में बहुत ही शानदार अनुभव रहा! फोन रिपेयर बिल्कुल प्रोफेशनल था, पार्ट्स ओरिजिनल हैं और स्टाफ़ का व्यवहार बहुत विनम्र है। देहरादून में सबसे भरोसेमंद मोबाइल शॉप!",
            "यहाँ की सर्विस और प्रोडक्ट रेंज दोनों ही लाजवाब हैं! स्क्रीन बदलवाई और बिल्कुल नए जैसी लग रही है। उचित दाम और बेहतरीन काम। 5 स्टार अनुभव!",
            "फोन रिपेयर, लैमिनेशन और एक्सेसरीज़ के लिए सबसे बेहतरीन जगह। बिना किसी एयर बबल के एकदम परफेक्ट लैमिनेशन किया।",
            "नया और सेकंड हैंड फोन लेने के लिए बेस्ट दुकान। यहाँ पूरी ईमानदारी और पारदर्शिता के साथ काम होता है।",
            "स्टाफ बहुत ही मददगार है और सभी काम समय पर पूरा करते हैं। मोबाइल की किसी भी समस्या के लिए ज़रूर विजिट करें!"
        ],
        REPAIR: [
            "फोन रिपेयर के लिए सबसे अच्छी जगह। स्क्रीन रिप्लेसमेंट बहुत ही सफाई और ओरिजिनल पार्ट्स के साथ किया गया। शानदार काम!",
            "मेरी फोन की बैटरी और चार्जिंग समस्या को सिर्फ एक घंटे में ठीक कर दिया। बहुत ही ईमानदार और कुशल कारीगर हैं।",
            "मदरबोर्ड और हार्डवेयर रिपेयर बहुत ही जिम्मेदारी से करते हैं। उचित कीमत और बेहतरीन सर्विस!"
        ],
        LAMINATION: [
            "मोबाइल लैमिनेशन और स्किन्स का काम बेहद शानदार है। बिना किसी एयर बबल के एकदम परफेक्ट फिनिशिंग दी गई!",
            "360 डिग्री लैमिनेशन बहुत ही बारीकी से किया। फोन एकदम नया और सुरक्षित दिखता है।",
            "डिज़ाइनर फोन कवर्स और स्किन्स की बहुत बड़ी वैरायटी उपलब्ध है।"
        ],
        MOBILES: [
            "नया और सेकंड हैंड फोन लेने के लिए बेहतरीन शॉप। सही दाम और पूरी ईमानदारी के साथ जांच करके फोन देते हैं।",
            "पुराने फोन का एक्सचेंज रेट बहुत ही अच्छा मिला। विश्वसनीय और पारदर्शी व्यवहार।"
        ],
        ACCESSORIES: [
            "यहाँ फोन कवर्स, टेम्पर्ड ग्लास और अन्य एक्सेसरीज़ की बहुत बड़ी वैरायटी उपलब्ध है। क्वालिटी एकदम बढ़िया है!",
            "ओरिजिनल चार्जर और मजबूत केबल्स वाजिब दाम पर मिलते हैं।"
        ],
        SERVICE: [
            "स्टाफ बहुत ही मददगार, धैर्यवान और ईमानदार है। पूरी संतुष्टि के साथ काम करते हैं। 5 स्टार रेटिंग!",
            "सुभाष नगर में मोबाइल की सबसे भरोसेमंद दुकान। बेहतरीन अनुभव रहा।"
        ]
    }
};

if (typeof window !== 'undefined') {
    window.REVIEWS_DB = REVIEWS_DB;
}
