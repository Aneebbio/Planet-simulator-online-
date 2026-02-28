// upgrades/skills.js - The COMPLETE merged tree
const skillTree = {
    // --- CATEGORY: PLANET EVOLUTION (Classic Upgrades) ---
    tectonics: { name: "Tectonics", desc: "Creates Rock tiles. Increases harvest.", baseCost: 50, max: 10, cat: "evolution" },
    atmosphere: { name: "Atmosphere", desc: "Creates Soil. Unlocks Water.", baseCost: 200, max: 10, cat: "evolution" },
    hydration: { name: "Hydration", desc: "Fills basins with Water.", baseCost: 1000, max: 10, cat: "evolution" },
    biosphere: { name: "Biosphere", desc: "Sprouts Flora and life.", baseCost: 5000, max: 10, cat: "evolution" },
    civilization: { name: "Civilization", desc: "Builds MegaCities.", baseCost: 20000, max: 10, cat: "evolution" },

    // --- CATEGORY: COSMIC SKILLS (New Cheap Upgrades) ---
    sunMoon: { name: "Sun & Moon", desc: "Skips 1 day every (16-Lv) seconds.", baseCost: 25, max: 15, cat: "skill" },
    starlight: { name: "Starlight Dust", desc: "+10 ISO to every harvest.", baseCost: 10, max: 50, cat: "skill" },
    gravity: { name: "Gravity Pull", desc: "Reduces costs by 2% per level.", baseCost: 100, max: 20, cat: "skill" },
    coreMining: { name: "Core Mining", desc: "Increases Rock tile output by 5.", baseCost: 150, max: 25, cat: "skill" }
};

function calculateSkillCost(key, lvl) {
    let s = skillTree[key];
    // Use lower scaling for "skill" category to keep them cheap
    let factor = (s.cat === "skill") ? 1.45 : 2.2;
    return Math.floor(s.baseCost * Math.pow(factor, lvl));
}
