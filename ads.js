// ads.js
function loadBottomAd() {
    const adContainer = document.getElementById('ad-slot-bottom');
    if (!adContainer) return;

    // Create the script element dynamically
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = "https://pl28773503.effectivegatecpm.com/900a963ba8053c59fa04ff02450d4e12/invoke.js";
    
    // Create the unique ad container required by the provider
    const innerContainer = document.createElement('div');
    innerContainer.id = "container-900a963ba8053c59fa04ff02450d4e12";
    
    adContainer.appendChild(innerContainer);
    adContainer.appendChild(script);
}

// Call this when the window loads
window.addEventListener('load', loadBottomAd);
