// upgrades/skills.js - Updated with Cheap Starter Skills
const skillTree = {
    sunMoon: { 
        name: "Sun & Moon", 
        desc: "Automates time. Skips 1 day every (16 - Level) seconds.", 
        baseCost: 25, 
        max: 15,
        type: "auto"
    },
    stardust: { 
        name: "Starlight Dust", 
        desc: "Adds +10 to every Isotope harvest.", 
        baseCost: 10, 
        max: 50,
        type: "passive"
    },
    gravity: { 
        name: "Gravity Pull", 
        desc: "Reduces cost of other skills by 2% per level.", 
        baseCost: 100, 
        max: 20,
        type: "meta"
    },
    coreMining: { 
        name: "Core Mining", 
        desc: "Increases Rock tile output by 5.", 
        baseCost: 150, 
        max: 25,
        type: "visual"
    }
};

function calculateSkillCost(key, lvl) {
    let s = skillTree[key];
    // Cheap scaling: 1.4x increase instead of 2.5x
    return Math.floor(s.baseCost * Math.pow(1.45, lvl));
}
