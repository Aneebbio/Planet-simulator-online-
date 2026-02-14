var isotopes = 0;
var currentDay = 1;
var autoInterval = null;

function checkIdentity() {
    if (document.getElementById('god-input').value.toLowerCase() === "god") {
        document.getElementById('login-screen').style.display = 'none';
        startAutomation();
        updateUI();
    }
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
        let skillBonus = skillsData.reduce((a, b) => a + b.level, 0) * 15;
        isotopes += (20 + skillBonus);
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
        else if (i < (levels[2] * 16)) t.classList.add('stage-ocean');
        else if (i < (levels[1] * 16)) t.classList.add('stage-red');
        else if (i < (levels[0] * 16)) t.classList.add('stage-rock');
    });
    let progress = Math.min(100, Math.floor((levels.reduce((a,b)=>a+b,0)/20)*100));
    document.getElementById('progress-bar').style.width = progress + "%";
    document.getElementById('progress-percent').innerText = progress + "%";
}

function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes);
    document.getElementById('day-count').innerText = currentDay;
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
