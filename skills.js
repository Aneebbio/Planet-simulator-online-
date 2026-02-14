var skillsData = [
    { id: 0, name: "Oxygen", level: 0, base: 50 },
    { id: 1, name: "Ozone", level: 0, base: 200 },
    { id: 2, name: "Ocean", level: 0, base: 500 },
    { id: 3, name: "Microbes", level: 0, base: 1200 }
];
var addonsOwned = 0;

function refreshMenus() {
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "<h2>Skills</h2>";
    skillsData.forEach(s => {
        let cost = Math.floor(s.base * Math.pow(1.7, s.level));
        sCon.innerHTML += `<div class="upgrade-card"><h4>${s.name}</h4><p>Lv: ${s.level}/5</p>
            <button onclick="buySkill(${s.id})" ${isotopes < cost || s.level >= 5 ? 'disabled' : ''}>${s.level >= 5 ? 'MAX' : 'Cost: '+cost}</button></div>`;
    });

    const aCon = document.getElementById('addons-list');
    let aCost = Math.pow(10, addonsOwned + 1);
    aCon.innerHTML = `<h2>Add-ons</h2><div class="upgrade-card"><h4>Auto-Tiller</h4><p>Ticks/Sec: ${addonsOwned}</p>
        <button onclick="buyAddon()" ${isotopes < aCost || addonsOwned >= 10 ? 'disabled' : ''}>${addonsOwned >= 10 ? 'MAX' : 'Buy: '+aCost}</button></div>`;
}

function buySkill(id) {
    let s = skillsData[id];
    let cost = Math.floor(s.base * Math.pow(1.7, s.level));
    if (isotopes >= cost && s.level < 5) { isotopes -= cost; s.level++; updateWorldVisuals(); updateUI(); }
}

function buyAddon() {
    let cost = Math.pow(10, addonsOwned + 1);
    if (isotopes >= cost && addonsOwned < 10) { isotopes -= cost; addonsOwned++; updateUI(); }
}
