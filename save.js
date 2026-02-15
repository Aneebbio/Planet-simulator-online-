// MENU CONTROL
function toggleSaveMenu() {
    const menu = document.getElementById('save-menu');
    const box = document.getElementById('save-box');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        box.value = ""; // Clear box on open
    } else {
        menu.style.display = 'none';
    }
}

// EXPORT LOGIC
function processExport() {
    // Create Data Object
    let data = {
        name: playerName,
        iso: isotopes,
        liso: lifetimeIsotopes,
        time: totalSeconds,
        asc: ascensions,
        pwr: celestialPower,
        day: currentDay,
        add: addonsOwned,
        sk: skillsData.map(s => s.level) // Save only the levels array
    };
    
    // Convert to Base64 String
    try {
        let json = JSON.stringify(data);
        let code = btoa(json);
        
        let box = document.getElementById('save-box');
        box.value = code;
        box.select();
        alert("Code generated! Copy the text in the box.");
    } catch (e) {
        console.error(e);
        alert("Error generating save.");
    }
}

// IMPORT LOGIC
function processImport() {
    let box = document.getElementById('save-box');
    let code = box.value.trim();
    
    if (!code) {
        alert("Paste a save code first!");
        return;
    }
    
    try {
        let json = atob(code);
        let data = JSON.parse(json);
        
        // Restore Variables
        playerName = data.name || "Anonymous";
        isotopes = data.iso || 0;
        lifetimeIsotopes = data.liso || 0;
        totalSeconds = data.time || 0;
        ascensions = data.asc || 0;
        celestialPower = data.pwr || 1.0;
        currentDay = data.day || 1;
        addonsOwned = data.add || 0;
        
        // Restore Skills
        if (data.sk && Array.isArray(data.sk)) {
            data.sk.forEach((lvl, index) => {
                if (skillsData[index]) skillsData[index].level = lvl;
            });
        }
        
        // Refresh Everything
        document.getElementById('stat-name').innerText = playerName;
        document.getElementById('login-screen').style.display = 'none';
        
        startAutomation();
        startTimers();
        updateWorldVisuals();
        updateUI();
        toggleSaveMenu();
        
        alert("Welcome back, " + playerName);
        
    } catch (e) {
        console.error(e);
        alert("Invalid Save Code. Please try again.");
    }
}
