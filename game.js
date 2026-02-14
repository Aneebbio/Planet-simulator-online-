var isotopes = 0;
var lifetimeIsotopes = 0;
var totalSeconds = 0;
var ascensions = 0;
var currentDay = 1;
var autoInterval = null;
var celestialPower = 1.0;

function checkIdentity() {
    if (document.getElementById('god-input').value.toLowerCase() === "god") {
        document.getElementById('login-screen').style.display = 'none';
        startAutomation();
        startTimers();
        updateUI();
    }
}

function startTimers() {
    setInterval(() => {
        totalSeconds++;
        document.getElementById('stat-time').innerText = totalSeconds + "s";
    }, 1000);
}

function startAutomation() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        for (let i = 0; i < addonsOwned; i++) { advanceDay(); }
    }, 1000);
}

function advanceDay() {
    if (currentDay < 20) {
        currentDay++;
    } else {
        let skillBonus = skillsData.reduce((a, b) => a + b.level, 0) * 10;
        let earned = (20 + skillBonus) * celestialPower;
        isotopes += earned;
        lifetimeIsotopes += earned;
        currentDay = 1;
        updateWorldVisuals();
    }
    updateUI();
}

function updateWorldVisuals() {
    const tiles = document.querySelectorAll('.tile');
    const levels = skillsData.map(s => s.level);
    tiles.forEach((t, i) => {
        t.className = 'tile';
        if (i < levels[3] * 16) t.classList.add('stage-flowers');
        else if (i < levels[2] * 16) t.classList.add('stage-ocean');
        else if (i < levels[1] * 16) t.classList.add('stage-red');
        else if (i < levels[0] * 16) t.classList.add('stage-rock');
    });
    let progress = Math.min(100, Math.floor((levels.reduce((a,b)=>a+b,0)/20)*100));
    document.getElementById('progress-bar').style.width = progress + "%";
    document.getElementById('progress-percent').innerText = progress + "%";
    document.getElementById('prestige-btn').style.display = progress >= 100 ? 'inline-block' : 'none';
}

function ascend() {
    if (confirm("Reset world for +0.5x Power?")) {
        celestialPower += 0.5;
        ascensions++;
        isotopes = 0;
        currentDay = 1;
        addonsOwned = 0;
        skillsData.forEach(s => s.level = 0);
        updateWorldVisuals();
        updateUI();
    }
}

function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes);
    document.getElementById('day-count').innerText = currentDay;
    document.getElementById('stat-lifetime').innerText = Math.floor(lifetimeIsotopes);
    document.getElementById('stat-ascends').innerText = ascensions;
    document.getElementById('ascension-multiplier').innerText = "Power: " + celestialPower.toFixed(1) + "x";
    if (window.refreshMenus) refreshMenus();
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

window.onload = () => {
    const grid = document.getElementById('grid-9x9');
    for (let i = 0; i < 81; i++) grid.innerHTML += '<div class="tile"></div>';
};
