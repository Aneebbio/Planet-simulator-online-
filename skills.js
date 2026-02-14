// *** TEMPORARY FOR TESTING ONLY ***
// Remove this line once your main game loop is working!
// We need this so skills.js knows what 'isotopes' are if it loads before game.js
if (typeof isotopes === 'undefined') { var isotopes = 200; updateUI();}
// **********************************


// --- 1. Define the Data ---

const skillsData = [
    // Cost multiplier: Price increases by 1.5x each level
    { id: 'ozone', name: "Restore Ozone Layer", level: 0, maxLevel: 5, baseCost: 50, costMultiplier: 1.5, desc: "Protects the surface from radiation." },
    { id: 'oxygen', name: "Atmospheric Oxygen", level: 0, maxLevel: 5, baseCost: 100, costMultiplier: 1.6, desc: "Allows complex life to breathe." },
    { id: 'water', name: "Introduce Oceans", level: 0, maxLevel: 5, baseCost: 250, costMultiplier: 1.8, desc: "The cradle of life." },
    { id: 'life', name: "Seed Simple Life", level: 0, maxLevel: 5, baseCost: 500, costMultiplier: 2.0, desc: "Begin the biological era." }
];

// Addons have fixed costs and increases as you buy more in total
let addonsOwnedCount = 0;
const addonsData = [
    { id: 'auto_rain', name: "Automated Rainfall", owned: false, baseCost: 10, desc: "Slightly improves grid automatically." },
    { id: 'harvester', name: "Isotope Harvester", owned: false, baseCost: 100, desc: "Increases isotopes earned per run." },
    { id: 'auto_sun', name: "Solar Regulation", owned: false, baseCost: 500, desc: "Prevents grid drying out." }
];

// --- 2. Functions to Render the HTML ---

// Renders the Skill Tree Cards
function renderSkillsMenu() {
    const container = document.getElementById('skills-container');
    container.innerHTML = ""; // Clear current list

    skillsData.forEach((skill, index) => {
        // Calculate current cost based on level
        // Formula: baseCost * (multiplier ^ currentLevel)
        let currentCost = Math.floor(skill.baseCost * Math.pow(skill.costMultiplier, skill.level));

        let card = document.createElement('div');
        card.className = 'upgrade-card';
        
        // Determine if max level is reached
        let isMaxed = skill.level >= skill.maxLevel;
        let buttonText = isMaxed ? "Max Level" : `Buy Level ${skill.level + 1}`;
        // Disable button if too expensive OR maxed out
        let isDisabled = (isotopes < currentCost) || isMaxed ? "disabled" : "";

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.desc}</p>
            <p>Level: ${skill.level} / ${skill.maxLevel}</p>
            <p class="cost-text">Cost: ${isMaxed ? "---" : currentCost}</p>
            <button onclick="buySkill(${index})" ${isDisabled}>${buttonText}</button>
        `;
        container.appendChild(card);
    });
}

// Renders the Addons Cards
function renderAddonsMenu() {
    const container = document.getElementById('addons-list');
    container.innerHTML = "";

    // Calculate Addon Cost: 10 for 1st, 100 for 2nd, 1000 for 3rd (powers of 10)
    // Note: Math.pow(10, 1) = 10. Math.pow(10, 2) = 100.
    let currentAddonCost = Math.pow(10, addonsOwnedCount + 1);

    addonsData.forEach((addon, index) => {
        let card = document.createElement('div');
        card.className = 'upgrade-card';

        let isDisabled = (isotopes < currentAddonCost) || addon.owned ? "disabled" : "";
        let buttonStatus = addon.owned ? `<span class="owned-text">OWNED</span>` : `<button onclick="buyAddon(${index})" ${isDisabled}>Buy</button>`;
        let costStatus = addon.owned ? "" : `<p class="cost-text">Cost: ${currentAddonCost}</p>`;

        card.innerHTML = `
            <h3>${addon.name}</h3>
            <p>${addon.desc}</p>
            ${costStatus}
            ${buttonStatus}
        `;
        container.appendChild(card);
    });
    
    // Add a summary at the top of the addons menu
    let summary = document.createElement('p');
    summary.innerText = `Add-ons Owned: ${addonsOwnedCount} / 10 (Total Limit)`;
    summary.style.width = "100%";
    container.prepend(summary);
}


// --- 3. Buying Logic Functions ---

function buySkill(index) {
    let skill = skillsData[index];
    let currentCost = Math.floor(skill.baseCost * Math.pow(skill.costMultiplier, skill.level));

    if (isotopes >= currentCost && skill.level < skill.maxLevel) {
        isotopes -= currentCost; // Deduct currency
        skill.level++; // Increase level
        console.log(`Bought ${skill.name} level ${skill.level}`);

        // Update UI in game.js (assuming it exists globally)
        updateUI();
        // Re-render menus to update prices and button states
        refreshMenus();
    }
}

function buyAddon(index) {
    // Calculate current cost dynamically based on how many you already own
    let currentAddonCost = Math.pow(10, addonsOwnedCount + 1);

    if (isotopes >= currentAddonCost && !addonsData[index].owned && addonsOwnedCount < 10) {
        isotopes -= currentAddonCost;
        addonsData[index].owned = true;
        addonsOwnedCount++;
        console.log(`Bought Addon: ${addonsData[index].name}`);

        updateUI();
        refreshMenus();
    }
}

// Helper to refresh both menus at once
function refreshMenus() {
    renderSkillsMenu();
    renderAddonsMenu();
}

// Initialize menus on load
refreshMenus();
