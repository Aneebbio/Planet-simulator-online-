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
    { id: 0, name: "Steam Gen", count: 1, base: 100 },
    { id: 1, name: "Solar Panel", count: 0, base: 500 },
    { id: 2, name: "Wind Turbine", count: 0, base: 2500 },
    { id: 3, name: "Nuclear Plant", count: 0, base: 20000 }
];

function refreshMenus() {
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "<h3>Restoration</h3>";
    skillsData.forEach(s => {
        let open = s.req === -1 || skillsData[s.req].level > 0;
        let cost = Math.floor(s.base * Math.pow(2.2, s.level));
        sCon.innerHTML += `<div class="upgrade-card" style="opacity:${open?1:0.4}">
            <b>${open?s.name:'Locked'}</b> [Lv ${s.level}/5]<br>
            <button onclick="buySkill(${s.id})" ${isotopes<cost||s.level>=5||!open?'disabled':''}>${s.level>=5?'MAX':cost}</button></div>`;
    });

    const gCon = document.getElementById('generators-container');
    gCon.innerHTML = "<h3>Power Grid</h3>";
    generators.forEach(g => {
        let cost = Math.floor(g.base * Math.pow(1.6, g.count));
        gCon.innerHTML += `<div class="upgrade-card"><b>${g.name}</b> (Qty: ${g.count})<br>
            <button onclick="buyGen(${g.id})" ${isotopes<cost?'disabled':''}>${cost}</button></div>`;
    });

    const aCon = document.getElementById('addons-list');
    let dCost = Math.pow(10, addonsOwned + 1);
    let cCost = 50000 * Math.pow(4, celestialDrives);
    let mCost = 15000 * Math.pow(2.5, moonBases);
    
    aCon.innerHTML = `<h3>Universal Automation</h3>
        <div class="upgrade-card"><b>Drones (Auto-Day)</b> [${addonsOwned}/10]<br><button onclick="buyAddon()" ${isotopes<dCost||addonsOwned>=10?'disabled':''}>${dCost}</button></div>
        <div class="upgrade-card"><b>Celestial Drive</b> [${celestialDrives}/5]<br><button onclick="buyCelestialDrive()" ${isotopes<cCost||celestialDrives>=5?'disabled':''}>${cCost}</button></div>
        <div class="upgrade-card"><b>Moon Base (Night Power)</b> [${moonBases}]<br><button onclick="buyMoonBase()" ${isotopes<mCost?'disabled':''}>${mCost}</button></div>`;
                                        }
