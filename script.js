let currentLang = 'nl';

// Functie om herbruikbare componenten te laden
async function loadComponent(id, file) {
    const res = await fetch(`components/${file}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    updateTranslations(); // Zorg dat de tekst in de nav direct vertaald wordt
}

function toggleMenu() {
    const menu = document.getElementById('main-menu');
    menu.classList.toggle('active');
}

// Zorg dat in loadPage() het menu ook sluit na een klik:
async function loadPage(pageName) {
    document.body.setAttribute('data-current-page', pageName);
    
    // Sluit menu (indien open op mobiel)
    const menu = document.getElementById('main-menu');
    if(menu) menu.classList.remove('active');

    try {
        const res = await fetch(`content/${currentLang}/${pageName}.md`);
        const markdown = await res.text();
        document.getElementById('content-area').innerHTML = marked.parse(markdown);
    } catch (err) {
        document.getElementById('content-area').innerHTML = "Pagina niet gevonden.";
    }
}

// Thema wisselen
function toggleTheme() {
    const doc = document.documentElement;
    const newTheme = doc.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    doc.setAttribute('data-theme', newTheme);
}

// Initialisatie
window.onload = () => {
    loadComponent('nav-placeholder', 'nav.html');
    loadComponent('footer-placeholder', 'footer.html');
    loadPage('home'); // Standaard home laden
};

const translations = {
    'nl': {
        'nav-home': 'Welkom',
        'nav-mesh': 'Mesh',
        'nav-meedoen': 'Meedoen',
        'nav-contact': 'Contact',
        'footer-line1': '© 2026 GoudaMesh',
        'footer-line2': 'Een lokaal initiatief dat uitnodigt tot experimenteren met mesh-netwerken in en rond Gouda'
    },
    'en': {
        'nav-home': 'Welcome',
        'nav-mesh': 'Mesh',
        'nav-meedoen': 'Join',
        'nav-contact': 'Contact Us',
        'footer-line1': '© 2026 GoudaMesh.',
        'footer-line2': 'A local initiative encouraging experimentation with mesh networks in and around Gouda'
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    updateTranslations();
    // Herlaad de huidige pagina content in de nieuwe taal
    const currentPage = document.body.getAttribute('data-current-page') || 'home';
    loadPage(currentPage);
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLang][key];
    });
}
