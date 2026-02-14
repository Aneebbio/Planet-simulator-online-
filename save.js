// --- 1. Export Function ---
// Converts all your game data into a "Save Code"
function exportSave() {
    const saveData = {
        isotopes: isotopes,
        currentDay: currentDay,
        skills: skillsData,
        addons: addonsData,
        addonsCount: addonsOwnedCount
    };
    
    // Convert to a JSON string and then to Base64 (to make it look like a code)
    const encodedSave = btoa(JSON.stringify(saveData));
    
    // Show the code to the player
    prompt("Copy this code and save it somewhere safe to load your game later:", encodedSave);
}

// --- 2. Import Function ---
// Takes a code and turns it back into game progress
function importSave() {
    const saveCode = prompt("Paste your save code here:");
    
    if (saveCode) {
        try {
            const decodedData = JSON.parse(atob(saveCode));
            
            // Update the variables
            isotopes = decodedData.isotopes;
            currentDay = decodedData.currentDay;
            
            // Update Skill Tree levels
            decodedData.skills.forEach((savedSkill, index) => {
                skillsData[index].level = savedSkill.level;
            });

            // Update Addons
            addonsData.forEach((savedAddon, index) => {
                addonsData[index].owned = decodedData.addons[index].owned;
            });
            addonsOwnedCount = decodedData.addonsCount;

            // Refresh everything
            updateUI();
            refreshMenus();
            alert("Game Loaded Successfully!");
            
        } catch (e) {
            alert("Invalid Save Code! Please try again.");
            console.error(e);
        }
    }
}

// --- 3. Local Auto-Save (The "Quality of Life" feature) ---
// This saves to the browser every 30 seconds automatically
function autoSave() {
    const saveData = {
        isotopes: isotopes,
        currentDay: currentDay,
        skills: skillsData,
        addons: addonsData,
        addonsCount: addonsOwnedCount
    };
    localStorage.setItem('godSimSave', JSON.stringify(saveData));
}

// Check for an auto-save when the page loads
window.onload = function() {
    const localSave = localStorage.getItem('godSimSave');
    if (localSave) {
        const data = JSON.parse(localSave);
        // Load data logic similar to importSave (omitted for brevity)
        console.log("Auto-save loaded.");
    }
    // Set timer to auto-save every 30 seconds
    setInterval(autoSave, 30000);
};
