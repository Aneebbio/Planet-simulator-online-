// prestige/void-shop.js - Permanent Prestige Logic
let voidData = {
    tokens: 0,
    upgrades: {
        haste: 0,    // Permanent speed
        density: 0,  // More land from start
        memory: 0    // Keep % of ISO after reset
    }
};

const voidUpgrades = {
    haste: { name: "Void Haste", desc: "Permanent 10% faster Day cycles", cost: 1 },
    density: { name: "Dimensional Density", desc: "Start every reset with Level 1 Tectonics", cost: 2 },
    memory: { name: "Stardust Memory", desc: "Keep 5% of your Isotopes after Prestige", cost: 5 }
};

// Calculation for Prestige reward
function getPendingTokens(totalIso) {
    if (totalIso < 1000000) return 0;
    // Formula: 1 token per million isotopes (Square root scaling)
    return Math.floor(Math.sqrt(totalIso / 1000000));
}

function triggerBigCrunch(currentIso) {
    let tokens = getPendingTokens(currentIso);
    if (tokens > 0) {
        voidData.tokens += tokens;
        alert("The Universe Collapses! You gained " + tokens + " Void Tokens.");
        return true; // Signal index.html to reset world
    }
    alert("You need more Isotopes to collapse the Universe!");
    return false;
}
