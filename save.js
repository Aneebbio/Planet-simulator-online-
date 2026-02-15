function toggleSaveMenu() {
    let m = document.getElementById('save-menu');
    m.style.display = m.style.display === 'none' ? 'block' : 'none';
}

function processExport() {
    let d = { 
        n: playerName, i: isotopes, li: lifetimeIsotopes, t: totalSeconds, a: ascensions, p: celestialPower, 
        day: currentDay, add: addonsOwned, sk: skillsData.map(s => s.level), gen: generators.map(g => g.count) 
    };
    document.getElementById('save-box').value = btoa(JSON.stringify(d));
}

function copySaveCode() {
    let box = document.getElementById('save-box');
    if (!box.value) { alert("Export code first!"); return; }
    box.select();
    box.setSelectionRange(0, 99999); 
    try {
        navigator.clipboard.writeText(box.value);
        alert("Code Copied! Save it in a notepad.");
    } catch (err) {
        alert("Manual copy required: Press Ctrl+C");
    }
}

function processImport() {
    let input = document.getElementById('import-box').value.trim();
    if (!input) { alert("Paste your code in the box first!"); return; }
    try {
        let d = JSON.parse(atob(input));
        playerName = d.n; isotopes = d.i; lifetimeIsotopes = d.li; totalSeconds = d.t; ascensions = d.a; celestialPower = d.p; currentDay = d.day; addonsOwned = d.add;
        d.sk.forEach((l, i) => { if(skillsData[i]) skillsData[i].level = l; });
        d.gen.forEach((c, i) => { if(generators[i]) generators[i].count = c; });
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'none';
        startLoops(); updateWorldVisuals(); updateUI(); toggleSaveMenu();
    } catch(e) { alert("Error: Invalid Code."); }
}
