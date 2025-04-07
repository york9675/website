// ai technology now is so good good that i didn't even write one line of code on this script
// btw, i know how to write js :)
// fun fact: i'm learning japanese recently

// Language resources will be stored here after loading
let resources = {};
let currentLanguage = 'en';

// Load language resources
async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${lang}`);
        }
        resources[lang] = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading language file:', error);
        return false;
    }
}

// Get translation for a key (supports nested keys like "home.title")
function getTranslation(key, lang) {
    if (!resources[lang]) {
        return key;
    }

    const keys = key.split('.');
    let result = resources[lang];
    
    for (const k of keys) {
        if (result && result[k] !== undefined) {
            result = result[k];
        } else {
            return key; // Key not found
        }
    }
    
    return result;
}

// Update all elements with the data-i18n attribute
function updateContent(lang) {
    if (!resources[lang]) {
        return;
    }
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        
        if (element.tagName === 'META') {
            element.content = translation;
        } else if (element.tagName === 'INPUT' && element.type === 'placeholder') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update the document language attribute
    document.documentElement.lang = lang;
}

// Detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('zh')) {
        // For Chinese variants, check if it's specifically zh-TW
        if (browserLang.toLowerCase().includes('tw')) {
            return 'zh_TW';
        }
    }
    return 'en'; // Default to English for other languages
}

// Initialize localization
async function initLocalization() {
    // Load default English language
    await loadLanguage('en');
    
    // First check stored preference
    let preferredLang = localStorage.getItem('preferredLanguage');
    
    // If no stored preference, check browser language
    if (!preferredLang) {
        preferredLang = detectBrowserLanguage();
    }
    
    // Set current language if it's one we support
    if (preferredLang && (preferredLang === 'en' || preferredLang === 'zh_TW')) {
        currentLanguage = preferredLang;
        await loadLanguage(preferredLang);
        document.getElementById('language-select').value = preferredLang;
    }
    
    // Update content with current language
    updateContent(currentLanguage);
    
    // Set up language selector
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', async (event) => {
        const newLang = event.target.value;
        if (newLang !== currentLanguage) {
            if (!resources[newLang]) {
                await loadLanguage(newLang);
            }
            currentLanguage = newLang;
            localStorage.setItem('preferredLanguage', newLang);
            updateContent(newLang);
        }
    });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initLocalization);