var playerName = "God", isotopes = 0, lifetimeIsotopes = 0, currentDay = 1, totalSeconds = 0, ascensions = 0, celestialPower = 1.0, isDay = true, addonsOwned = 0;
var pSupply = 0, pDemand = 0, batteryActive = false, batteryCooldown = 0;

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
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'flex';
        initPlanetOptions();
    }
}

function initPlanetOptions() {
    const con = document.getElementById('planet-options');
    con.innerHTML = "";
    Object.keys(planets).forEach(k => {
        let p = planets[k];
        con.innerHTML += `<div class="upgrade-card" style="border:1px solid ${p.color}">
            <h4 style="color:${p.color}">${p.name}</h4><button onclick="selectPlanet('${k}')">Genesis</button></div>`;
    });
}

function selectPlanet(k) {
    currentPlanet = planets[k];
    document.getElementById('world-title').innerText = currentPlanet.name;
    document.getElementById('world-title').style.color = currentPlanet.color;
    document.getElementById('galaxy-screen').style.display = 'none';
    createGrid();
    startLoops();
}

function startLoops() {
    setInterval(() => { totalSeconds++; updateUI(); }, 1000);
    setInterval(() => { isDay = !isDay; document.body.className = isDay ? "day" : "night"; }, 15000);
    setInterval(() => { for(let i=0; i<addonsOwned; i++) advanceDay(true); }, 1000);
}

function createGrid() {
    const grid = document.getElementById('grid-9x9');
    grid.innerHTML = "";
    for (let i = 0; i < 81; i++) grid.innerHTML += '<div class="tile"></div>';
}

function useBattery() {
    if (batteryCooldown > 0 || batteryActive) return;
    batteryActive = true;
    batteryCooldown = 60;
    document.getElementById('battery-btn').className = "battery-active";
    document.getElementById('battery-btn').innerText = "🔋 DISCHARGING...";
    setTimeout(() => {
        batteryActive = false;
        document.getElementById('battery-btn').className = "battery-cooldown";
        let cd = setInterval(() => {
            batteryCooldown--;
            document.getElementById('battery-btn').innerText = `🔋 RECHARGE (${batteryCooldown}s)`;
            if (batteryCooldown <= 0) {
                clearInterval(cd);
                document.getElementById('battery-btn').className = "battery-ready";
                document.getElementById('battery-btn').innerText = "🔋 BATTERY: READY";
            }
        }, 1000);
    }, 10000);
}

function updatePower() {
    pSupply = (generators[0].count * 2) + 
               (isDay ? generators[1].count * 8 * currentPlanet.sol : 0) + 
               (generators[2].count * 6 * currentPlanet.wind) + 
               (generators[3].count * 50);
    pDemand = skillsData.reduce((a, b) => a + (b.level * 4), 0);
    
    let displaySupply = batteryActive ? pDemand : pSupply;
    document.getElementById('power-val').innerText = `${Math.floor(displaySupply)}/${pDemand}`;
    document.getElementById('power-fill').style.width = Math.min(100, (displaySupply/(pDemand+1))*100) + "%";
    document.getElementById('cycle-text').innerText = isDay ? "☀️ DAY" : "🌙 NIGHT";
}

function advanceDay(isAuto) {
    updatePower();
    let hasPower = (pSupply >= pDemand) || batteryActive;
    if (isAuto && !hasPower) return;

    if (currentDay < 20) {
        currentDay++;
    } else {
        let reward = (20 + (skillsData.reduce((a,b)=>a+b.level,0)*15)) * currentPlanet.iso * celestialPower;
        if (!hasPower) reward *= 0.5;
        isotopes += reward; lifetimeIsotopes += reward;
        currentDay = 1;
        updateWorldVisuals();
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
    document.getElementById('progress-percent').innerText = prog + "%";
    document.getElementById('prestige-btn').style.display = prog >= 100 ? 'block' : 'none';
}

function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes).toLocaleString();
    document.getElementById('day-count').innerText = currentDay;
    document.getElementById('stat-lifetime').innerText = Math.floor(lifetimeIsotopes).toLocaleString();
    document.getElementById('stat-pwr').innerText = celestialPower.toFixed(1) + "x";
    updatePower();
    if (window.refreshMenus) refreshMenus();
}

function ascend() {
    if (confirm("Ascend? Get +0.5x Power.")) {
        celestialPower += 0.5; isotopes = 0; currentDay = 1; addonsOwned = 0;
        skillsData.forEach(s => s.level = 0); generators.forEach((g,i) => g.count = (i===0?1:0));
        document.getElementById('galaxy-screen').style.display = 'flex';
        updateWorldVisuals(); updateUI();
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
                }
