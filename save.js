function exportSave() {
    let d = { iso: isotopes, liso: lifetimeIsotopes, time: totalSeconds, asc: ascensions, day: currentDay, sk: skillsData.map(s => s.level), add: addonsOwned, pwr: celestialPower };
    prompt("Save Code:", btoa(JSON.stringify(d)));
}

function importSave() {
    let code = prompt("Paste Save Code:");
    if (!code) return;
    try {
        let d = JSON.parse(atob(code));
        isotopes = d.iso; lifetimeIsotopes = d.liso || 0; totalSeconds = d.time || 0; ascensions = d.asc || 0;
        currentDay = d.day; addonsOwned = d.add; celestialPower = d.pwr || 1.0;
        d.sk.forEach((lv, i) => { if(skillsData[i]) skillsData[i].level = lv; });
        updateWorldVisuals(); updateUI();
    } catch(e) { alert("Invalid Save"); }
}
