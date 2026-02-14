function exportSave() {
    let saveObj = {
        iso: isotopes,
        day: currentDay,
        skills: skillsData.map(s => s.level),
        addons: addonsOwned
    };
    let code = btoa(JSON.stringify(saveObj));
    prompt("YOUR DIVINE SAVE CODE:", code);
}

function importSave() {
    let code = prompt("PASTE SAVE CODE:");
    if (!code) return;
    try {
        let data = JSON.parse(atob(code));
        isotopes = data.iso;
        currentDay = data.day;
        addonsOwned = data.addons;
        data.skills.forEach((lv, i) => { if(skillsData[i]) skillsData[i].level = lv; });
        updateWorldVisuals();
        updateUI();
        alert("Universe Restored.");
    } catch(e) {
        alert("Invalid code.");
    }
}
