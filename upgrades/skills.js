// upgrades/skills.js
const skillTree = {
    // --- CATEGORY: EVOLUTION (Classic Upgrades) ---
    tectonics: { name: "Tectonics", desc: "Creates Rock. Increases harvest power.", baseCost: 50, max: 25, cat: "evo" },
    atmosphere: { name: "Atmosphere", desc: "Creates Soil. Unlocks Water.", baseCost: 200, max: 20, cat: "evo" },
    hydration: { name: "Hydration", desc: "Fills basins with Water.", baseCost: 1000, max: 20, cat: "evo" },
    biosphere: { name: "Biosphere", desc: "Sprouts Flora and life.", baseCost: 5000, max: 20, cat: "evo" },
    civilization: { name: "Civilization", desc: "Builds MegaCities.", baseCost: 25000, max: 15, cat: "evo" },

    // --- CATEGORY: COSMIC SKILLS (New Cheap Upgrades) ---
    sunMoon: { name: "Sun & Moon", desc: "Auto-skips 1 day every (16-Lv)s.", baseCost: 25, max: 15, cat: "skill" },
    starlight: { name: "Starlight Dust", desc: "+10 ISO to every base harvest.", baseCost: 10, max: 50, cat: "skill" },
    deepMemory: { name: "Deep Memory", desc: "Auto-saves game every 5 seconds.", baseCost: 150, max: 1, cat: "skill" },
    fastBuy: { name: "Rapid Growth", desc: "Hold buttons to buy fast.", baseCost: 500, max: 1, cat: "skill" }
};

function calculateSkillCost(key, lvl) {
    let s = skillTree[key];
    let factor = (s.cat === "skill") ? 1.45 : 2.1;
    return Math.floor(s.baseCost * Math.pow(factor, lvl));
}
