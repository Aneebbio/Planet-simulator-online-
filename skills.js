var skillsData = [
    { id: 0, name: "Oxygenation", level: 0, base: 50, req: -1 },
    { id: 1, name: "Ozone Shield", level: 0, base: 250, req: 0 },
    { id: 2, name: "Hydration", level: 0, base: 1000, req: 1 },
    { id: 3, name: "Microbial Seed", level: 0, base: 5000, req: 2 }
];
var addonsOwned = 0;

function refreshMenus() {
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "<h2>Divine Skills</h2>";
    skillsData.forEach(s => {
        let unlocked = s.req === -1 || skillsData[s.req].level > 0;
        if (unlocked) {
            let cost = Math.floor(s.base * Math.pow(1.8, s.level));
            sCon.innerHTML += `<div class="upgrade-card"><h3>${s.name}</h3><p>Level: ${s.level}/5</p>
            <button onclick="buySkill(${s.id})" ${isotopes < cost || s.level >= 5 ? 'disabled' : ''}>${s.level >= 5 ? 'MAX' : 'Buy: '+cost}</button></div>`;
        } else {
            sCon.innerHTML += `<div class="upgrade-card" style="opacity:0.4;"><h3>???</h3><p>Locked</p></div>`;
        }
    });

    const aCon = document.getElementById('addons-list');
    let aCost = Math.pow(10, addonsOwned + 1);
    aCon.innerHTML = `<h2>Add-ons</h2><div class="upgrade-card"><h3>Auto-Ticks</h3><p>Ticks/s: ${addonsOwned}</p>
    <button onclick="buyAddon()" ${isotopes < aCost || addonsOwned >= 10 ? 'disabled' : ''}>${addonsOwned >= 10 ? 'MAX' : 'Cost: '+aCost}</button></div>`;
}

function buySkill(id) {
    let s = skillsData[id];
    let cost = Math.floor(s.base * Math.pow(1.8, s.level));
    if (isotopes >= cost && s.level < 5) { isotopes -= cost; s.level++; updateWorldVisuals(); updateUI(); }
}

function buyAddon() {
    let cost = Math.pow(10, addonsOwned + 1);
    if (isotopes >= cost && addonsOwned < 10) { isotopes -= cost; addonsOwned++; updateUI(); }
                       }
