// AUTO-SAVE SYSTEM
function saveGame() {
    let d = { 
        n: playerName, i: isotopes, li: lifetimeIsotopes, p: celestialPower, day: currentDay, add: addonsOwned,
        sk: skillsData.map(s => s.level), gen: generators.map(g => g.count),
        lc: lastClaim, cd: celestialDrives, mb: moonBases, wr: worldsRestored 
    };
    localStorage.setItem('godSimSaveV2', JSON.stringify(d));
    
    // Visual Feedback
    let s = document.getElementById('save-status');
    if(s) {
        s.innerText = "Saving...";
        setTimeout(() => s.innerText = "Saved", 1000);
    }
}

function loadGame() {
    let raw = localStorage.getItem('godSimSaveV2');
    if (!raw) return false;
    
    try {
        let d = JSON.parse(raw);
        // Load Variables
        if(d.n) playerName=d.n; 
        if(d.i) isotopes=d.i; 
        if(d.li) lifetimeIsotopes=d.li; 
        if(d.p) celestialPower=d.p; 
        if(d.day) currentDay=d.day; 
        if(d.add) addonsOwned=d.add; 
        if(d.lc) lastClaim=d.lc; 
        if(d.cd) celestialDrives=d.cd; 
        if(d.mb) moonBases=d.mb; 
        if(d.wr) worldsRestored=d.wr;
        
        // Load Arrays
        if(d.sk) d.sk.forEach((l, i) => { if(skillsData[i]) skillsData[i].level = l; });
        if(d.gen) d.gen.forEach((c, i) => { if(generators[i]) generators[i].count = c; });
        return true;
    } catch(e) { 
        console.error("Save Corrupt");
        return false;
    }
}

function manualSave() {
    saveGame();
    alert("Game Saved!");
}

function hardReset() {
    if(confirm("ARE YOU SURE? This will wipe your save file forever.")) {
        localStorage.removeItem('godSimSaveV2');
        location.reload();
    }
            }
