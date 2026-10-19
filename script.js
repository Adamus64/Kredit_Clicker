// Adam "Adamus" Fiala 2026

const nacist = (klic, vychozi) => {
    const v = parseFloat(localStorage.getItem('hra_' + klic));
    return isNaN(v) ? vychozi : v;
};

let pocet     = nacist('pocet', 0);
let silaKliku = nacist('silaKliku', 1);
let upgrade   = nacist('upgrade', 0);
let iterace   = nacist('iterace', 0);

const upgrady = [
    { id: 'up1', nazev: 'Úvod do diskrétních struktur', zaklad: 15,       cena: 0, prirustek: 0.1  },
    { id: 'up2', nazev: 'Struktura počítačů',           zaklad: 100,      cena: 0, prirustek: 1    },
    { id: 'up3', nazev: 'Algoritmizace',                zaklad: 1100,     cena: 0, prirustek: 8    },
    { id: 'up4', nazev: 'Základy programování',         zaklad: 12000,    cena: 0, prirustek: 47   },
    { id: 'up5', nazev: 'Unixové systémy',              zaklad: 130000,   cena: 0, prirustek: 260  },
    { id: 'up6', nazev: 'Matematické repetitorium',     zaklad: 1400000,  cena: 0, prirustek: 1400 },
    { id: 'up7', nazev: 'Paradigma programování',       zaklad: 20000000, cena: 0, prirustek: 7800 },
];
upgrady.forEach((u, i) => u.cena = nacist('cena' + (i + 1), u.zaklad));

// Myš: cena a efekt jednotlivých úrovní
const mysi = [
    { nazev: 'Plastová myš',   cena: 100,      popis: '+1',    efekt: s => s + 1 },
    { nazev: 'Železná myš',    cena: 500,      popis: '+1',    efekt: s => s + 1 },
    { nazev: 'Titánová myš',   cena: 10000,    popis: '+10',   efekt: s => s + 10 },
    { nazev: 'Platinová myš',  cena: 100000,   popis: '+100',  efekt: s => s + 100 },
    { nazev: 'Smaragdová myš', cena: 1000000,  popis: '*2',    efekt: s => s * 2 },
    { nazev: 'Jaderná myš',    cena: 5000000,  popis: '*5',    efekt: s => s * 5 },
    { nazev: 'Kvantová myš',   cena: 10000000, popis: '*1024', efekt: s => s * 1024 },
];

// ---------- Zvuky ----------
const cinkSound   = new Audio('sounds/cink.mp3');
const kreditSound = new Audio('sounds/kredit.mp3');
const wrongSound  = new Audio('sounds/wrong.mp3');
const menuHudba   = new Audio('sounds/menuTheme.mp3');

function prehrat(zvuk, hlasitost) {
    zvuk.pause();
    zvuk.currentTime = 0;
    if (hlasitost !== undefined) zvuk.volume = hlasitost;
    zvuk.play().catch(() => {});
}

function aktualizovatPocitadlo() {
    document.getElementById('pocitadlo').innerText = "Počet kreditů: " + pocet.toFixed(1);
}

function aktualizovatUI() {
    aktualizovatPocitadlo();
    document.getElementById('upgradePocitadlo').innerText = "Automatické kredity: " + upgrade.toFixed(1) + "/s";
    document.getElementById('silaPocitadlo').innerText = "Síla kliku: " + silaKliku;

    upgrady.forEach(u => {
        document.getElementById(u.id).innerText =
            `${u.nazev} (${u.cena.toFixed(0)} kreditů) | +${u.prirustek}/s`;
    });

    const m = mysi[iterace];
    document.getElementById('upMys').innerHTML = m
        ? `<img src="img/mouse.png" height="20px"> ${m.nazev} (${m.cena} kreditů) | ${m.popis}`
        : '<img src="img/mouse.png" height="20px"> Už jsi dosáhnul max. úrovně!';
}

// ---------- Ukládání ----------
function ulozitHru() {
    localStorage.setItem('hra_pocet', pocet);
    localStorage.setItem('hra_silaKliku', silaKliku);
    localStorage.setItem('hra_upgrade', upgrade);
    localStorage.setItem('hra_iterace', iterace);
    upgrady.forEach((u, i) => localStorage.setItem('hra_cena' + (i + 1), u.cena));
}

setInterval(ulozitHru, 5000);
window.addEventListener('beforeunload', ulozitHru);

function spustitHudbu() {
    menuHudba.volume = 0.1;
    menuHudba.loop = true;
    menuHudba.play().catch(() => {});
}
window.addEventListener('DOMContentLoaded', () => {
    aktualizovatUI();
    document.addEventListener('click', spustitHudbu, { once: true });
});

// ---------- Klikání ----------
function btnClick() {
    prehrat(kreditSound, 0.2);
    pocet += silaKliku;
    aktualizovatPocitadlo();
}

// ---------- Autoclicker ----------
setInterval(() => {
    pocet += upgrade;
    aktualizovatPocitadlo();
}, 1000);

// ---------- Nákup upgradu ----------
function koupitUpgrade(index) {
    const u = upgrady[index];
    if (pocet >= u.cena) {
        prehrat(cinkSound);
        pocet -= u.cena;
        upgrade += u.prirustek;
        u.cena *= 1.15;
        aktualizovatUI();
        ulozitHru();
    } else {
        prehrat(wrongSound);
        alert("Nedostatek kreditů!");
    }
}
// Zachování původních názvů pro onclick v HTML
const up1f = () => koupitUpgrade(0);
const up2f = () => koupitUpgrade(1);
const up3f = () => koupitUpgrade(2);
const up4f = () => koupitUpgrade(3);
const up5f = () => koupitUpgrade(4);
const up6f = () => koupitUpgrade(5);
const up7f = () => koupitUpgrade(6);

// ---------- Myš ----------
function mouseUpgrade() {
    const m = mysi[iterace];
    if (!m) {
        alert("Myš je vylepšená na maximum!");
        return;
    }
    if (pocet >= m.cena) {
        pocet -= m.cena;
        silaKliku = m.efekt(silaKliku);
        iterace++;
        aktualizovatUI();
        ulozitHru();
    } else {
        prehrat(wrongSound);
        alert("Nedostatek kreditů!");
    }
}

// ---------- Reset ----------
function resetovat() {
    if (!confirm("Opravdu chcete resetovat svůj postup? Tento krok je nevratný.")) return;
    localStorage.clear();

    pocet = 0;
    silaKliku = 1;
    upgrade = 0;
    iterace = 0;
    upgrady.forEach(u => u.cena = u.zaklad);

    aktualizovatUI();
    ulozitHru();
}

// Adam "Adamus" Fiala 2026