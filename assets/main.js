function waitForPageLoad() {
  return new Promise((resolve) => {
    window.onload = resolve;
  });
}
waitForPageLoad().then(() => {
  setLang(localStorage.getItem('lang') || 'nl');
  unhideDelayed();
  lucide.createIcons();
});

fetch("_navigation.html")
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.querySelector("nav").innerHTML = data;
    navigationStyle()
  });

fetch("_footer.html")
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
    setLang(localStorage.getItem('lang') || 'nl');
  });

/// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  console.log("Hello world!");
  hamburger.addEventListener('click', () => {
    console.log("Hello world!");
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');

    hamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Language
function setLang(lang) {
  document.querySelectorAll('.lang').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.lang-switch button').forEach(btn => btn.classList.remove('active'));

  var textId = "[id*='-" + lang + "']";
  document.querySelectorAll(textId).forEach(el => el.classList.add('active'));

  document.querySelector(`.lang-switch button[onclick="setLang('${lang}')"]`).classList.add('active');
  localStorage.setItem('lang', lang);
}

// Init language
//setLang(localStorage.getItem('lang') || 'nl');

// Dark mode
const body = document.body;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  body.classList.toggle('dark', theme === 'dark');
}

applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

function toggleTheme() {
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  applyTheme(isDark ? 'light' : 'dark');
}



function navigationStyle() {
  const page = location.pathname.split('/').pop();
  if (page.includes('index')) document.querySelectorAll('.nav-welkom').forEach(el => el.classList.add('active'));
  if (page.includes('mesh')) document.querySelectorAll('.nav-mesh').forEach(el => el.classList.add('active'));
  if (page.includes('meedoen')) document.querySelectorAll('.nav-meedoen').forEach(el => el.classList.add('active'));
  if (page.includes('contact')) document.querySelectorAll('.nav-contact').forEach(el => el.classList.add('active'));
}

function unhideDelayed() {
  [].forEach.call(document.querySelectorAll('.delayed'), function (el) {
    el.style.visibility = 'visible';
  });
}



function myFunction() {
  console.log("MF");

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');

  hamburger.setAttribute('aria-expanded', isOpen);
}
