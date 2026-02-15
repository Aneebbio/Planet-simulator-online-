var playerName = "God", isotopes = 0, lifetimeIsotopes = 0, currentDay = 1, totalSeconds = 0, celestialPower = 1.0, isDay = true;
var pSupply = 0, pDemand = 0, batteryActive = false, batteryCooldown = 0, lastClaim = 0;
var addonsOwned = 0, celestialDrives = 0, moonBases = 0, worldsRestored = 0;
var cycleInterval, currentCycleSpeed = 30000;

var planets = {
    terran: { name: "Terran", iso: 1, cost: 1, sol: 1, wind: 1, color: "#2ecc71" },
    volcanic: { name: "Volcanis", iso: 2, cost: 1, sol: 1.5, wind: 0.5, color: "#e74c3c" },
    ice: { name: "Cryos", iso: 0.5, cost: 0.5, sol: 0.2, wind: 2, color: "#74b9ff" }
};
var currentPlanet = planets.terran;

function checkIdentity() {
    let input = document.getElementById('god-input').value.trim();
    if (input) {
        playerName = input;
        if (playerName.toLowerCase() === "infinity") document.getElementById('debug-btn').style.display = 'block';
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'flex';
        initPlanetOptions();
    }
}

function initPlanetOptions() {
    const con = document.getElementById('planet-options'); con.innerHTML = "";
    Object.keys(planets).forEach(k => {
        let p = planets[k];
        con.innerHTML += `<div class="upgrade-card" style="border-color:${p.color}"><h4>${p.name}</h4><button onclick="selectPlanet('${k}')">Settle</button></div>`;
    });
}

function selectPlanet(k) {
    currentPlanet = planets[k];
    document.getElementById('world-title').innerText = "PLANET: " + currentPlanet.name;
    document.getElementById('world-title').style.color = currentPlanet.color;
    document.getElementById('galaxy-screen').style.display = 'none';
    createGrid(); startLoops();
}

function runCycle() {
    if (cycleInterval) clearInterval(cycleInterval);
    cycleInterval = setInterval(() => {
        isDay = !isDay; document.body.className = isDay ? "day" : "night";
        if (celestialDrives > 0) {
            let bonus = 10000 * celestialDrives * celestialPower;
            isotopes += bonus; lifetimeIsotopes += bonus;
            document.getElementById('news-ticker').innerText = "✨ CYCLE BONUS: +" + bonus;
        }
        updateUI();
    }, currentCycleSpeed);
}

function startLoops() {
    setInterval(() => { totalSeconds++; updateUI(); }, 1000);
    setInterval(() => { for(let i=0; i<addonsOwned; i++) advanceDay(true); }, 1000);
    runCycle();
}

function createGrid() {
    const grid = document.getElementById('grid-9x9'); grid.innerHTML = "";
    for (let i = 0; i < 81; i++) grid.innerHTML += '<div class="tile"></div>';
}

function updatePower() {
    let solar = (isDay ? generators[1].count * 8 * currentPlanet.sol : 0);
    let lunar = (!isDay ? moonBases * 40 : 0);
    pSupply = (generators[0].count * 2) + solar + (generators[2].count * 6 * currentPlanet.wind) + (generators[3].count * 50) + lunar;
    pDemand = skillsData.reduce((a, b) => a + (b.level * 4), 0);
    let ds = batteryActive ? pDemand : pSupply;
    document.getElementById('power-val').innerText = `${Math.floor(ds)}/${pDemand}`;
    document.getElementById('power-fill').style.width = Math.min(100, (ds/(pDemand+1))*100) + "%";
    document.getElementById('cycle-text').innerText = isDay ? "☀️ DAY" : "🌙 NIGHT";
}

function advanceDay(isAuto) {
    updatePower();
    let hasP = (pSupply >= pDemand) || batteryActive;
    if (isAuto && !hasP) return;
    if (currentDay < 20) currentDay++;
    else {
        let rew = (20 + (skillsData.reduce((a,b)=>a+b.level,0)*15)) * currentPlanet.iso * celestialPower;
        if (!hasP) rew *= 0.5;
        isotopes += rew; lifetimeIsotopes += rew; currentDay = 1; updateWorldVisuals();
    }
    updateUI();
}

function updateWorldVisuals() {
    const tiles = document.querySelectorAll('.tile');
    const lvls = skillsData.map(s => s.level);
    tiles.forEach((t, i) => {
        t.className = 'tile';
        if (i < lvls[7]*10) t.classList.add('stage-city');
        else if (i < lvls[5]*15) t.classList.add('stage-flowers');
        else if (i < lvls[3]*15) t.classList.add('stage-ocean');
        else if (i < lvls[1]*15) t.classList.add('stage-red');
        else if (i < lvls[0]*15) t.classList.add('stage-rock');
    });
    let prog = Math.min(100, Math.floor((lvls.reduce((a,b)=>a+b,0)/40)*100));
    document.getElementById('progress-bar').style.width = prog + "%";
    document.getElementById('progress-percent').innerText = prog + "% Restored";
    document.getElementById('galaxy-portal').style.display = prog >= 100 ? 'block' : 'none';
}

function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes).toLocaleString();
    document.getElementById('day-count').innerText = currentDay;
    document.getElementById('stat-lifetime').innerText = Math.floor(lifetimeIsotopes).toLocaleString();
    document.getElementById('stat-pwr').innerText = celestialPower.toFixed(1) + "x";
    updatePower(); refreshMenus();
}

function useBattery() {
    if (batteryCooldown > 0 || batteryActive) return;
    batteryActive = true; batteryCooldown = 60;
    document.getElementById('battery-btn').className = "battery-active";
    setTimeout(() => {
        batteryActive = false; document.getElementById('battery-btn').className = "battery-cooldown";
        let cd = setInterval(() => {
            batteryCooldown--; document.getElementById('battery-btn').innerText = `RECHARGE (${batteryCooldown}s)`;
            if (batteryCooldown <= 0) { clearInterval(cd); document.getElementById('battery-btn').className = "battery-ready"; document.getElementById('battery-btn').innerText = "🔋 EMERGENCY BATTERY"; }
        }, 1000);
    }, 10000);
}

function claimDailyReward() {
    let now = Date.now();
    if (now - lastClaim > 86400000) { isotopes += 5000 * celestialPower; lastClaim = now; alert("5,000 Isotopes Claimed!"); updateUI(); }
    else alert("Next reward in " + Math.floor((86400000-(now-lastClaim))/3600000) + "h");
}

function openGalaxyMap() {
    if(confirm("New Planet?")) { worldsRestored++; skillsData.forEach(s=>s.level=0); currentDay=1; document.getElementById('galaxy-screen').style.display='flex'; initPlanetOptions(); updateWorldVisuals(); updateUI(); }
}

function debugWarpSpeed() { currentCycleSpeed = 1000; runCycle(); }
function toggleDebug() { let m = document.getElementById('debug-menu'); m.style.display = m.style.display==='none'?'block':'none'; }
function showScreen(id) { document.querySelectorAll('.screen').forEach(s=>s.style.display='none'); document.getElementById(id).style.display='block'; }

// BUY FUNCTIONS
function buySkill(id) { let s = skillsData[id]; let cost = Math.floor(s.base * Math.pow(2.2, s.level)); if(isotopes>=cost){isotopes-=cost; s.level++; updateWorldVisuals(); updateUI();} }
function buyGen(id) { let g = generators[id]; let cost = Math.floor(g.base * Math.pow(1.6, g.count)); if(isotopes>=cost){isotopes-=cost; g.count++; updateUI();} }
function buyAddon() { let c = Math.pow(10, addonsOwned+1); if(isotopes>=c&&addonsOwned<10){isotopes-=c; addonsOwned++; updateUI();} }
function buyCelestialDrive() { let c = 50000*Math.pow(4, celestialDrives); if(isotopes>=c&&celestialDrives<5){isotopes-=c; celestialDrives++; updateUI();} }
function buyMoonBase() { let c = 15000*Math.pow(2.5, moonBases); if(isotopes>=c){isotopes-=c; moonBases++; updateUI();} }
