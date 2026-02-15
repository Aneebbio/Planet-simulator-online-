// GLOBAL VARIABLES
var playerName = "Anonymous";
var isotopes = 0;
var lifetimeIsotopes = 0;
var currentDay = 1;
var totalSeconds = 0;
var ascensions = 0;
var celestialPower = 1.0;
var addonsOwned = 0;
var autoInterval = null;
var eventActive = false;

// 1. INITIALIZATION & LOGIN
function checkIdentity() {
    let input = document.getElementById('god-input').value.trim();
    if (input.length > 0) {
        playerName = input;
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        
        startAutomation(); // Start Add-ons
        startTimers();     // Start Clock & Events
        updateUI();        // Refresh View
    } else {
        alert("Please enter a name to begin.");
    }
}

function createGrid() {
    const grid = document.getElementById('grid-9x9');
    grid.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        let d = document.createElement('div');
        d.className = 'tile';
        grid.appendChild(d);
    }
}

// 2. GAME LOOP & TICKS
function startAutomation() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        // Run Add-ons (1 click per addon)
        for(let i=0; i<addonsOwned; i++) {
            advanceDay(true); // true = automated
        }
    }, 1000);
}

function startTimers() {
    // Game Time Timer
    setInterval(() => {
        totalSeconds++;
        document.getElementById('stat-time').innerText = totalSeconds + "s";
    }, 1000);

    // Random Event Timer (Every 45 seconds)
    setInterval(() => {
        if (!eventActive && Math.random() > 0.5) triggerEvent();
    }, 45000);
}

function advanceDay(isAuto = false) {
    if (currentDay < 20) {
        currentDay++;
    } else {
        // CYCLE COMPLETE: REWARD LOGIC
        let skillBonus = skillsData.reduce((a, b) => a + b.level, 0) * 10;
        let baseReward = 20 + skillBonus;
        
        // Apply Ascension Multiplier
        let finalReward = baseReward * celestialPower;
        
        isotopes += finalReward;
        lifetimeIsotopes += finalReward;
        currentDay = 1; // Reset Day
        
        // Visual Update only on day reset to save performance
        updateWorldVisuals();
    }
    updateUI();
}

// 3. VISUALS & PROGRESSION
function updateWorldVisuals() {
    const tiles = document.querySelectorAll('.tile');
    const levels = skillsData.map(s => s.level);
    
    // Determine how many tiles are colored based on skills
    // Logic: Each skill level fills ~16 tiles (4 skills * 5 levels * 4 tiles = 80 tiles)
    
    let flowerCount = levels[3] * 16;
    let oceanCount = levels[2] * 16;
    let redCount = levels[1] * 16;
    let rockCount = levels[0] * 16;

    tiles.forEach((t, i) => {
        t.className = 'tile'; // Reset
        if (i < flowerCount) t.classList.add('stage-flowers');
        else if (i < flowerCount + oceanCount) t.classList.add('stage-ocean');
        else if (i < flowerCount + oceanCount + redCount) t.classList.add('stage-red');
        else if (i < flowerCount + oceanCount + redCount + rockCount) t.classList.add('stage-rock');
    });

    // Mission Progress Bar
    let totalLevels = levels.reduce((a, b) => a + b, 0);
    let percent = Math.min(100, Math.floor((totalLevels / 20) * 100));
    document.getElementById('progress-bar').style.width = percent + "%";
    document.getElementById('progress-percent').innerText = percent + "% Restored";

    // Show Ascension Button if 100%
    if (percent >= 100) {
        document.getElementById('prestige-btn').style.display = 'inline-block';
    } else {
        document.getElementById('prestige-btn').style.display = 'none';
    }
}

// 4. RANDOM EVENTS
function triggerEvent() {
    eventActive = true;
    const ticker = document.getElementById('news-ticker');
    const rewards = [500, 1000, 250];
    let amt = rewards[Math.floor(Math.random()*rewards.length)];
    
    ticker.innerText = "EVENT: Meteor Shower! +" + amt + " Iso";
    ticker.style.color = "#00f2ff";
    isotopes += amt;
    lifetimeIsotopes += amt;
    
    setTimeout(() => {
        ticker.innerText = "Monitoring Galaxy...";
        ticker.style.color = "#ff00ff";
        eventActive = false;
    }, 5000);
}

// 5. ASCENSION
function ascend() {
    if (confirm("Reset World? You will gain +0.5x Permanent Power.")) {
        celestialPower += 0.5;
        ascensions++;
        isotopes = 0;
        currentDay = 1;
        addonsOwned = 0;
        skillsData.forEach(s => s.level = 0);
        updateWorldVisuals();
        updateUI();
        alert("ASCENSION SUCCESSFUL. Power is now " + celestialPower + "x");
    }
}

// 6. UI & LEADERBOARD
function updateUI() {
    document.getElementById('isotope-count').innerText = Math.floor(isotopes);
    document.getElementById('day-count').innerText = currentDay;
    document.getElementById('stat-lifetime').innerText = Math.floor(lifetimeIsotopes);
    document.getElementById('stat-ascends').innerText = ascensions;
    document.getElementById('ascension-text').innerText = "Power: " + celestialPower.toFixed(1) + "x";
    
    updateLeaderboard();
    
    if (window.refreshMenus) refreshMenus();
}

function updateLeaderboard() {
    // Simulated Static High Scores
    let scores = [
        { name: "The Ancient", val: 1000000 },
        { name: "StarChild", val: 500000 },
        { name: "VoidWalker", val: 100000 }
    ];
    
    // Add Player
    scores.push({ name: playerName, val: Math.floor(lifetimeIsotopes) });
    
    // Sort Highest to Lowest
    scores.sort((a, b) => b.val - a.val);
    
    // Render Table
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = "";
    
    // Show Top 4 (so player can see if they are 4th)
    for(let i=0; i<Math.min(4, scores.length); i++) {
        let s = scores[i];
        let color = (s.name === playerName) ? "#00f2ff" : "white";
        if (i === 0 && s.name !== playerName) color = "gold";
        
        tbody.innerHTML += `
            <tr style="color:${color}">
                <td>#${i+1}</td>
                <td>${s.name}</td>
                <td>${s.val.toLocaleString()}</td>
            </tr>`;
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// STARTUP
window.onload = () => { createGrid(); };
