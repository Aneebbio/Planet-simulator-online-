var skillsData = [
    { id: 0, name: "Tectonics", level: 0, base: 50, req: -1 },
    { id: 1, name: "Atmosphere", level: 0, base: 250, req: 0 },
    { id: 2, name: "Ozone", level: 0, base: 1000, req: 1 },
    { id: 3, name: "Hydration", level: 0, base: 4000, req: 2 },
    { id: 4, name: "Biosphere", level: 0, base: 15000, req: 3 },
    { id: 5, name: "Flora", level: 0, base: 60000, req: 4 },
    { id: 6, name: "Civilization", level: 0, base: 250000, req: 5 },
    { id: 7, name: "MegaCities", level: 0, base: 1000000, req: 6 }
];

var generators = [
    { id: 0, name: "Steam", count: 1, base: 100 },
    { id: 1, name: "Solar", count: 0, base: 500 },
    { id: 2, name: "Wind", count: 0, base: 2500 },
    { id: 3, name: "Nuclear", count: 0, base: 20000 }
];

function refreshMenus() {
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "<h3>Restoration</h3>";
    skillsData.forEach(s => {
        let open = s.req === -1 || skillsData[s.req].level > 0;
        let cost = Math.floor((s.base * Math.pow(2.2, s.level)) * currentPlanet.cost);
        sCon.innerHTML += `<div class="upgrade-card" style="opacity:${open?1:0.4}">
            <b>${open?s.name:'Locked'}</b><br>Lv ${s.level}/5<br>
            <button onclick="buySkill(${s.id})" ${isotopes<cost||s.level>=5||!open?'disabled':''}>${s.level>=5?'MAX':cost}</button></div>`;
    });

    const gCon = document.getElementById('generators-container');
    gCon.innerHTML = "<h3>Power Grid</h3>";
    generators.forEach(g => {
        let cost = Math.floor(g.base * Math.pow(1.6, g.count));
        gCon.innerHTML += `<div class="upgrade-card"><b>${g.name}</b><br>Qty: ${g.count}<br>
            <button onclick="buyGen(${g.id})" ${isotopes<cost?'disabled':''}>${cost}</button></div>`;
    });

    const aCon = document.getElementById('addons-list');
    let aCost = Math.pow(10, addonsOwned + 1);
    aCon.innerHTML = `<h3>Auto-Days</h3><div class="upgrade-card"><b>Drones</b><br>Qty: ${addonsOwned}<br>
        <button onclick="buyAddon()" ${isotopes<aCost||addonsOwned>=10?'disabled':''}>${aCost}</button></div>`;
}

function buySkill(id) {
    let s = skillsData[id]; let cost = Math.floor((s.base * Math.pow(2.2, s.level)) * currentPlanet.cost);
    if (isotopes >= cost && s.level < 5) { isotopes -= cost; s.level++; updateWorldVisuals(); updateUI(); }
}

function buyGen(id) {
    let g = generators[id]; let cost = Math.floor(g.base * Math.pow(1.6, g.count));
    if (isotopes >= cost) { isotopes -= cost; g.count++; updateUI(); }
}

function buyAddon() {
    let cost = Math.pow(10, addonsOwned + 1);
    if (isotopes >= cost) { isotopes -= cost; addonsOwned++; updateUI(); }
    }
