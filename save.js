function processExport() {
    let d = { 
        n: playerName, i: isotopes, li: lifetimeIsotopes, p: celestialPower, day: currentDay, add: addonsOwned,
        sk: skillsData.map(s => s.level), gen: generators.map(g => g.count),
        lc: lastClaim, cd: celestialDrives, mb: moonBases, wr: worldsRestored 
    };
    window.prompt("COPY THIS SAVE CODE:", btoa(JSON.stringify(d)));
}

function processImport() {
    let input = window.prompt("PASTE YOUR SAVE CODE:");
    if (!input) return;
    try {
        let d = JSON.parse(atob(input));
        playerName=d.n; isotopes=d.i; lifetimeIsotopes=d.li; celestialPower=d.p; currentDay=d.day; 
        addonsOwned=d.add; lastClaim=d.lc; celestialDrives=d.cd; moonBases=d.mb; worldsRestored=d.wr;
        d.sk.forEach((l, i) => { if(skillsData[i]) skillsData[i].level = l; });
        d.gen.forEach((c, i) => { if(generators[i]) generators[i].count = c; });
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'none';
        startLoops(); updateWorldVisuals(); updateUI();
    } catch(e) { alert("Invalid Code!"); }
}
