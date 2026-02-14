let isotopes = 0;
let currentDay = 1;
const gridElement = document.getElementById('grid-9x9');

// Generate 9x9 Grid of Dried Earth
function createGrid() {
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.className = 'tile dried-earth';
        gridElement.appendChild(cell);
    }
}

function advanceDay() {
    if (currentDay < 20) {
        currentDay++;
    } else {
        // End of 20-day run
        const reward = calculateIsotopes();
        isotopes += reward;
        alert(`Run complete! You earned ${reward} Isotopes.`);
        currentDay = 1; // Reset cycle
    }
    updateUI();
}

function updateUI() {
    document.getElementById('isotope-count').innerText = isotopes;
    document.getElementById('day-count').innerText = currentDay;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}

createGrid();
