var planets = {
    terran: { name: "Terran Prime", desc: "Balanced Growth", isoMult: 1, costMult: 1, solar: 1, wind: 1, color: "#2ecc71" },
    volcanic: { name: "Volcanis", desc: "2x Isotopes | 1.5x Solar", isoMult: 2, costMult: 1, solar: 1.5, wind: 0.5, color: "#e74c3c" },
    ice: { name: "Cryos", desc: "50% Cost | 2x Wind", isoMult: 0.5, costMult: 0.5, solar: 0.2, wind: 2, color: "#74b9ff" }
};

var currentPlanet = planets.terran;

function initPlanetSelection() {
    const container = document.getElementById('planet-options');
    container.innerHTML = "";
    Object.keys(planets).forEach(key => {
        let p = planets[key];
        container.innerHTML += `
            <div class="upgrade-card" style="border: 2px solid ${p.color}; width:200px;">
                <h3 style="color:${p.color}">${p.name}</h3>
                <p style="font-size:0.8rem;">${p.desc}</p>
                <button onclick="selectPlanet('${key}')">Choose World</button>
            </div>`;
    });
}

function selectPlanet(key) {
    currentPlanet = planets[key];
    document.getElementById('world-title').innerText = "PLANET: " + currentPlanet.name;
    document.getElementById('world-title').style.color = currentPlanet.color;
    document.getElementById('galaxy-screen').style.display = 'none';
    startEngine();
}
