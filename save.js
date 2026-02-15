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
    document.getElementById('save-box').select();
}

function processImport() {
    try {
        let d = JSON.parse(atob(document.getElementById('save-box').value));
        playerName = d.n; isotopes = d.i; lifetimeIsotopes = d.li; totalSeconds = d.t; ascensions = d.a; celestialPower = d.p; currentDay = d.day; addonsOwned = d.add;
        d.sk.forEach((l, i) => skillsData[i].level = l);
        d.gen.forEach((c, i) => generators[i].count = c);
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('galaxy-screen').style.display = 'none';
        startEngine(); updateUI(); toggleSaveMenu();
    } catch(e) { alert("Invalid Code"); }
}
