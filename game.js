var isotopes = 0;
var currentDay = 1;

function checkIdentity() {
    const val = document.getElementById('god-input').value.toLowerCase();
    if (val === "god") {
        document.getElementById('login-screen').style.display = 'none';
        updateUI();
    } else {
        alert("Identify yourself as 'god' to proceed.");
    }
}

function createGrid() {
    const grid = document.getElementById('grid-9x9');
    grid.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const d = document.createElement('div');
        d.className = 'tile';
        grid.appendChild(d);
    }
}

function advanceDay() {
    if (currentDay < 20) {
        currentDay++;
    } else {
        // Calculate Reward
        let skillPoints = skillsData.reduce((a, b) => a + b.level, 0);
        let bonus = (addonsOwned * 50) + (skillPoints * 10);
        let total = 20 + bonus;
        
        isotopes += total;
        alert("Run Finished! Reward: " + total + " Isotopes");
        currentDay = 1;
        updateWorldVisuals();
    }
    updateUI();
}

function updateWorldVisuals() {
    const tiles = document.querySelectorAll('.tile');
    let totalLevel = skillsData.reduce((a, b) => a + b.level, 0);
    let greenCount = Math.min(totalLevel * 5, 81); // 5 tiles per skill level
    
    tiles.forEach((t, i) => {
        if (i < greenCount) t.className = 'tile green-world';
    });

    // Update Mission Box
    let percent = Math.floor((greenCount / 81) * 100);
    document.getElementById('progress-bar').style.width = percent + "%";
    document.getElementById('progress-percent').innerText = percent + "% Green";
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

window.onload = () => { createGrid(); };
