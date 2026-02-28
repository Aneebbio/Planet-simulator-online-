// upgrades/skills.js - Combined Evolution & Automation
const skillTree = {
    // --- CLASSIC EVOLUTION (The "Old" Upgrades) ---
    tectonics: { name: "Tectonics", desc: "Creates Rock tiles. Increases Isotope harvest.", baseCost: 50, max: 10, type: "phys" },
    atmosphere: { name: "Atmosphere", desc: "Creates habitable air. Unlocks Water.", baseCost: 200, max: 10, type: "phys" },
    hydration: { name: "Hydration", desc: "Fills basins with Water.", baseCost: 1000, max: 10, type: "phys" },
    biosphere: { name: "Biosphere", desc: "Sprouts Flora and life.", baseCost: 5000, max: 10, type: "phys" },
    civilization: { name: "Civilization", desc: "Builds MegaCities.", baseCost: 20000, max: 10, type: "phys" },

    // --- NEW CHEAP SKILLS ---
    sunMoon: { name: "Sun & Moon", desc: "Skips 1 day automatically every (16-Lv) secs.", baseCost: 25, max: 15, type: "auto" },
    stardust: { name: "Starlight Dust", desc: "+10 base Isotope per harvest.", baseCost: 10, max: 50, type: "passive" }
};

function calculateSkillCost(key, lvl) {
    let s = skillTree[key];
    // Different scaling for physical vs cheap skills
    let multiplier = (s.type === "phys") ? 2.2 : 1.45;
    return Math.floor(s.baseCost * Math.pow(multiplier, lvl));
}
