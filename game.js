var playerName = "God", isotopes = 0, lifetimeIsotopes = 0, currentDay = 1, totalSeconds = 0, ascensions = 0, celestialPower = 1.0, isDay = true, addonsOwned = 0;
var pSupply = 0, pDemand = 0;

function checkIdentity() {
    let input = document.getElementById('god-input').value.trim();
    if (input) {
        playerName = input;
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'flex';
        initPlanetSelection();
    }
}

function startEngine() {
    createGrid();
    setInterval(() => { totalSeconds++; updateUI(); }, 1000);
    setInterval(() => { isDay = !isDay; document.body.className = isDay ? "day" : "night"; }, 15000); // 15s Cycle
    setInterval(() => { for(let i=0; i<addonsOwned; i++) advanceDay(); }, 1000);
    updateWorldVisuals();
}

function createGrid() {
    const grid = document.getElementById('grid-9x9');
    grid.innerHTML = "";
    for (let i = 0; i < 81; i++) grid.innerHTML += '<div class="tile"></div>';
}

function updatePower() {
    pSupply = Math.floor((generators[0].count * 2) + 
              (isDay ? generators[1].count * 8 * currentPlanet.solar : 0) + 
              (generators[2].count * 6 * currentPlanet.wind) + 
              (generators[3].count * 45));
    pDemand = skillsData.reduce((a, b) => a + (b.level * 4), 0);
    
    document.getElementById('power-val').innerText = `${pSupply}/${pDemand} Pwr`;
    document.getElementById('power-fill').style.width = Math.min(100, (pSupply/(pDemand+1))*100) + "%";
    document.getElementById('cycle-text').innerText = isDay ? "☀️ DAY" : "🌙 NIGHT";
}

function advanceDay() {
    updatePower();
    if (pDemand > pSupply && pDemand > 0) {
        document.getElementById('news-ticker').innerText = "⚡ GRID OFFLINE";
        document.getElementById('news-ticker').style.color = "red";
        return;
    }
    document.getElementById('news-ticker').innerText = "Grid Stable";
    document.getElementById('news-ticker').style.color = "#00f2ff";

    if (currentDay < 20) { currentDay++; } 
    else {
        let base = (20 + (skillsData.reduce((a,b)=>a+b.level,0)*15)) * currentPlanet.isoMult;
        isotopes += base * celestialPower; lifetimeIsotopes += base * celestialPower;
        currentDay = 1; updateWorldVisuals();
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
    document.getElementById('prestige-btn').style.display = prog >= 100 ? 'block' : 'none';
}

function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes);
    document.getElementById('day-count').innerText = currentDay;
    document.getElementById('stat-lifetime').innerText = Math.floor(lifetimeIsotopes);
    document.getElementById('stat-pwr').innerText = celestialPower.toFixed(1) + "x";
    updatePower();
    if (window.refreshMenus) refreshMenus();
}

function ascend() {
    if (confirm("Reset world for +0.5x Multiplier?")) {
        celestialPower += 0.5; isotopes = 0; currentDay = 1; addonsOwned = 0;
        skillsData.forEach(s => s.level = 0); generators.forEach(g => g.count = 0);
        showScreen('play-screen'); document.getElementById('galaxy-screen').style.display = 'flex';
        updateWorldVisuals(); updateUI();
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
        }
