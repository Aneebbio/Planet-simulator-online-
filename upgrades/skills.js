// upgrades/skills.js - Modular Skill Tree Logic
const skillTree = {
    // PATH 1: BIOLOGY (Green - Efficiency)
    photosynthesis: { 
        name: "Photosynthesis", 
        desc: "Each Flora tile reduces Day length by 1%", 
        baseCost: 500, 
        max: 10,
        apply: (lv) => { /* Logic to reduce timer */ }
    },
    mutation: { 
        name: "Rapid Mutation", 
        desc: "5% chance a tile evolves 2 stages at once", 
        baseCost: 2500, 
        max: 5 
    },

    // PATH 2: INDUSTRY (Grey - Raw Power)
    coreMining: { 
        name: "Deep Core Mining", 
        desc: "Rock tiles produce +5 Isotopes per day", 
        baseCost: 1000, 
        max: 10 
    },
    automation: { 
        name: "Auto-Foundry", 
        desc: "Automatically clicks 'Advance Day' every 10s", 
        baseCost: 10000, 
        max: 1 
    },

    // PATH 3: STRATEGY (Gold - Synergy)
    urbanPlanning: { 
        name: "Urban Planning", 
        desc: "Cities next to each other give 20% more ISO", 
        baseCost: 5000, 
        max: 5 
    }
};

function calculateSkillCost(skillKey, currentLevel) {
    let skill = skillTree[skillKey];
    return Math.floor(skill.baseCost * Math.pow(2.5, currentLevel));
}

console.log("Skill Tree Module Loaded: Optimized for low-power browsers.");
