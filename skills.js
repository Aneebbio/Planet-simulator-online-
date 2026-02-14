var skillsData = [
    { id: 0, name: "Oxygenation", level: 0, base: 50, desc: "Seals the atmosphere." },
    { id: 1, name: "Ozone Layer", level: 0, base: 150, desc: "Blocks radiation." },
    { id: 2, name: "Introduction of Water", level: 0, base: 400, desc: "Creates oceans." },
    { id: 3, name: "Seed Microbes", level: 0, base: 1000, desc: "Life begins." }
];

var addonsOwned = 0;

function refreshMenus() {
    const sCon = document.getElementById('skills-container');
    sCon.innerHTML = "";
    skillsData.forEach(s => {
        let cost = Math.floor(s.base * Math.pow(1.8, s.level));
        sCon.innerHTML += `
            <div class="upgrade-card">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <p>Lv: ${s.level}/5</p>
                <button onclick="buySkill(${s.id})" ${isotopes < cost || s.level >= 5 ? 'disabled' : ''}>
                    ${s.level >= 5 ? 'MAXED' : 'Buy: ' + cost}
                </button>
            </div>`;
    });

    const aCon = document.getElementById('addons-list');
    let aCost = Math.pow(10, addonsOwned + 1);
    aCon.innerHTML = `
        <div class="upgrade-card">
            <h3>Automation Module</h3>
            <p>Owned: ${addonsOwned}/10</p>
            <p>Cost: ${aCost}</p>
            <button onclick="buyAddon()" ${isotopes < aCost || addonsOwned >= 10 ? 'disabled' : ''}>
                ${addonsOwned >= 10 ? 'FULL' : 'Buy Addon'}
            </button>
        </div>`;
}

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
        updateUI();
    }
        }
