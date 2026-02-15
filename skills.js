// DATA STRUCTURE
var skillsData = [
    { id: 0, name: "Tectonic Shift", level: 0, base: 50, req: -1 },
    { id: 1, name: "Atmosphere", level: 0, base: 250, req: 0 },
    { id: 2, name: "Hydration", level: 0, base: 1000, req: 1 },
    { id: 3, name: "Life Seeding", level: 0, base: 5000, req: 2 }
];

function refreshMenus() {
    // 1. RENDER SKILLS
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "<h2>Sequential Upgrades</h2>";
    
    skillsData.forEach(s => {
        // Check if unlocked (req is -1 OR previous skill has level > 0)
        let isUnlocked = (s.req === -1) || (skillsData[s.req].level > 0);
        
        if (isUnlocked) {
            let cost = Math.floor(s.base * Math.pow(1.8, s.level));
            let btnText = s.level >= 5 ? "MAXED" : "Buy: " + cost;
            let btnClass = (isotopes < cost || s.level >= 5) ? "disabled" : "";
            
            sCon.innerHTML += `
                <div class="upgrade-card">
                    <h3>${s.name}</h3>
                    <p>Level: ${s.level}/5</p>
                    <button onclick="buySkill(${s.id})" ${btnClass ? 'disabled' : ''}>${btnText}</button>
                </div>`;
        } else {
            // Locked State
            sCon.innerHTML += `
                <div class="upgrade-card" style="opacity:0.5; border:1px dashed #555;">
                    <h3>???</h3>
                    <p>Locked</p>
                    <button disabled>Requires Prev. Skill</button>
                </div>`;
        }
    });

    // 2. RENDER ADD-ONS
    const aCon = document.getElementById('addons-list');
    let aCost = Math.pow(10, addonsOwned + 1); // Cost: 10, 100, 1000...
    let aText = addonsOwned >= 10 ? "MAXED" : "Buy: " + aCost;
    
    aCon.innerHTML = `
        <h2>Automation</h2>
        <div class="upgrade-card">
            <h3>Auto-Clicker</h3>
            <p>Owned: ${addonsOwned}/10</p>
            <p style="font-size:0.8rem; color:#aaa;">Advances 1 day/sec per unit.</p>
            <button onclick="buyAddon()" ${isotopes < aCost || addonsOwned >= 10 ? 'disabled' : ''}>${aText}</button>
        </div>`;
}

// LOGIC
function buySkill(id) {
    let s = skillsData[id];
    let cost = Math.floor(s.base * Math.pow(1.8, s.level));
    
    if (isotopes >= cost && s.level < 5) {
        isotopes -= cost;
        s.level++;
        updateWorldVisuals();
        updateUI();
    }
}

function buyAddon() {
    let cost = Math.pow(10, addonsOwned + 1);
    
    if (isotopes >= cost && addonsOwned < 10) {
        isotopes -= cost;
        addonsOwned++;
        startAutomation(); // Update the timer speed/count
        updateUI();
    }
    }
