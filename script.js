//Adam "Adamus" Fiala 2026

// Globální proměnné
let pocet = parseFloat(localStorage.getItem('hra_pocet')) || 0;
let silaKliku = parseFloat(localStorage.getItem('hra_silaKliku')) || 1;
let upgrade = parseFloat(localStorage.getItem('hra_upgrade')) || 0;
let cena1 = parseFloat(localStorage.getItem('hra_cena1')) || 15;
let cena2 = parseFloat(localStorage.getItem('hra_cena2')) || 100;
let cena3 = parseFloat(localStorage.getItem('hra_cena3')) || 1100;
let cena4 = parseFloat(localStorage.getItem('hra_cena4')) || 12000;
let cena5 = parseFloat(localStorage.getItem('hra_cena5')) || 130000;
let cena6 = parseFloat(localStorage.getItem('hra_cena6')) || 1400000;
let cena7 = parseFloat(localStorage.getItem('hra_cena7')) || 20000000;
let iterace = parseInt(localStorage.getItem('hra_iterace')) || 0;

// Zvuky
const cinkSound = new Audio('sounds/cink.mp3');
const kreditSound = new Audio('sounds/kredit.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const menuHudba = new Audio('sounds/menuTheme.mp3')


// Funkce pro aktualizaci UI
function aktualizovatUI() {
    document.getElementById('pocitadlo').innerText = "Počet kreditů: " + pocet.toFixed(1);
    document.getElementById('upgradePocitadlo').innerText = "Automatické kredity: " + upgrade.toFixed(1) + "/s";
    document.getElementById('up1').innerText = "Úvod do diskrétních struktur (" + cena1.toFixed(0) + " kreditů) | +0.1/s";
    document.getElementById('up2').innerText = "Struktura počítačů (" + cena2.toFixed(0) + " kreditů) | +1/s"
    document.getElementById('up3').innerText = "Algoritmizace (" + cena3.toFixed(0) + " kreditů) | +8/s"
    document.getElementById('up4').innerText = "Základy programování (" + cena4.toFixed(0) + " kreditů) | +47/s"
    document.getElementById('up5').innerText = "Unixové systémy (" + cena5.toFixed(0) + " kreditů) | +260/s"
    document.getElementById('up6').innerText = "Matematické repetitorium (" + cena6.toFixed(0) + " kreditů) | +1400/s"
    document.getElementById('up7').innerText = "Paradigma programování (" + cena7.toFixed(0) + " kreditů) | +7800/s" //
    //
    document.getElementById('silaPocitadlo').innerText = "Síla kliku: " + silaKliku;
    switch(iterace){
        case 0:
            document.getElementById('upMys').innerHTML =  '<img src="img/mouse.png" height="20px"> Plastová myš (100 kreditů) | +1';
            break
        case 1:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Železná myš (500 kreditů) | +1';
            break
         case 2:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Titánová myš (10000 kreditů) | +10';
            break
        case 3:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Platinová myš (100000 kreditů) | +100';
            break
        case 4:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Smaragdová myš (1000000 kreditů) | *2';
            break
        case 5:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Jaderná myš (5000000 kreditů) | *5';
            break
        case 6:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Kvantová myš (10000000 kreditů) | *1024';
            break
        case 7:
            document.getElementById('upMys').innerHTML = '<img src="img/mouse.png" height="20px"> Už jsi dosáhnul max. úrovně!';


    } }

//Ukládání dat
function ulozitHru() {
    localStorage.setItem('hra_pocet', pocet);
    localStorage.setItem('hra_silaKliku', silaKliku);
    localStorage.setItem('hra_upgrade', upgrade);
    localStorage.setItem('hra_cena1', cena1);
    localStorage.setItem('hra_cena2',cena2)
    localStorage.setItem('hra_cena3', cena3)
    localStorage.setItem('hra_cena4', cena4)
    localStorage.setItem('hra_cena5', cena5)
    localStorage.setItem('hra_cena6', cena6)
    localStorage.setItem('hra_cena7', cena7)
    localStorage.setItem('hra_iterace', iterace)
}

//Načtení savedata
window.addEventListener('DOMContentLoaded', () => {
    menuHudba.volume = 0.1;
    menuHudba.loop = true;
    menuHudba.play();
    aktualizovatUI();
});

//Ukládání hry
const saveLoop = setInterval(() => {
    ulozitHru();
}, 5000);

// Uložení při zavření nebo obnovení okna
window.addEventListener('beforeunload', () => {
    ulozitHru();
});

// Zvuk klikání
function klikZvuk() {
    kreditSound.pause();
    kreditSound.currentTime = 0;
    kreditSound.volume = 0.2;
    kreditSound.play();
}

// Klikání
function btnClick() {
    klikZvuk();
    pocet = pocet + silaKliku;
    document.getElementById('pocitadlo').innerText = "Počet kreditů: " + pocet.toFixed(1);
}

//AUTOCLIKCER UPGRADY//

// Autoclicker
const gameLoop = setInterval(() => {
    pocet = pocet + upgrade;
    document.getElementById('pocitadlo').innerText = "Počet kreditů: " + pocet.toFixed(1);
}, 1000);

// Upgrade 1
function up1f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena1) {
        cinkSound.play();
        pocet = pocet - cena1;
        upgrade = upgrade + 0.1;
        cena1 = cena1 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
} }
// Upgrade 2
function up2f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena2) {
        cinkSound.play();
        pocet = pocet - cena2;
        upgrade = upgrade + 1;
        cena2 = cena2 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }
// Upgrade 3
function up3f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena3) {
        cinkSound.play();
        pocet = pocet - cena3;
        upgrade = upgrade + 8;
        cena3 = cena3 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }
// Upgrade 4
function up4f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena4) {
        cinkSound.play();
        pocet = pocet - cena4;
        upgrade = upgrade + 47;
        cena4 = cena4 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }
// Upgrade 5
function up5f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena5) {
        cinkSound.play();
        pocet = pocet - cena5;
        upgrade = upgrade + 260;
        cena5 = cena5 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }
// Upgrade 6
function up6f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena6) {
        cinkSound.play();
        pocet = pocet - cena6;
        upgrade = upgrade + 1400;
        cena6 = cena6 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }
// Upgrade 7
function up7f() {
    cinkSound.pause();
    cinkSound.currentTime = 0;
    if (pocet >= cena7) {
        cinkSound.play();
        pocet = pocet - cena7;
        upgrade = upgrade + 7800;
        cena7 = cena7 * 1.15;
        
        aktualizovatUI();
        ulozitHru(); // Uložíme ihned po nákupu
    } else {
        wrongSound.pause()
        wrongSound.currentTime = 0;
        wrongSound.play();
        alert("Nedostatek kreditů!");
    } }

//Myš upgrade
function mouseUpgrade () {
    switch (iterace){
        case 0:
            if (pocet >= 100){
                silaKliku = silaKliku + 1
                iterace++
                aktualizovatUI();
                ulozitHru();
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0;
                wrongSound.play();
                alert("Nedostatek kreditů!")
            }
        break
        case 1:
            if (pocet >= 500){
                silaKliku = silaKliku + 1
                iterace++
                aktualizovatUI();
                ulozitHru();
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0;
                wrongSound.play();
                alert("Nedostatek kreditů!")
            }
        break
        case 2:
            if (pocet >= 10000){
                silaKliku = silaKliku + 10
                iterace++
                aktualizovatUI()
                ulozitHru()
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0
                wrongSound.play()
                alert("Nedostatek kreditů!")
            }
        break
        case 3:
            if (pocet >= 100000){
                silaKliku = silaKliku + 100
                iterace++
                aktualizovatUI()
                ulozitHru()
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0
                wrongSound.play()
                alert("Nedostatek kreditů!")
            }
        break
        case 4:
            if (pocet >= 1000000){
                silaKliku = silaKliku * 2
                iterace++
                aktualizovatUI()
                ulozitHru()
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0
                wrongSound.play()
                alert("Nedostatek kreditů!")
            }     
        break
        case 5:
            if (pocet >= 5000000){
                silaKliku = silaKliku * 5
                iterace++
                aktualizovatUI()
                ulozitHru()
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0
                wrongSound.play()
                alert("Nedostatek kreditů!")
            }
        break
        case 6:
            if (pocet>=10000000){
                silaKliku = silaKliku * 1024
                iterace++
                aktualizovatUI()
                ulozitHru()
            }
            else{
                wrongSound.pause()
                wrongSound.currentTime = 0
                wrongSound.play()
                alert("Nedostatek kreditů!")
            }
        break
        case 7:
            alert("Myš je vylepšená na maximum!")
                

    } }

function resetovat (){
    if(confirm("Opravdu chcete resetovat svůj postup? Tento krok je nevratný."))
    {
    localStorage.clear();
    
        
        pocet = 0;
        silaKliku = 1;
        upgrade = 0;
        cena1 = 15;
        cena2 = 100;
        cena3 = 1100;
        cena4 = 12000;
        cena5 = 130000;
        cena6 = 1400000;
        cena7 = 20000000;
        iterace = 0;

        aktualizovatUI();
        ulozitHru();}}

//Adam "Adamus" Fiala 2026