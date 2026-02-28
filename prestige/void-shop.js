// prestige/void-shop.js
function getPendingTokens(totalIso) {
    // Requires 1,000,000 ISO to start earning tokens
    if (totalIso < 10000) return 0;
    return Math.floor(Math.sqrt(totalIso / 10000));
}

function triggerBigCrunch(currentIso) {
    let earned = getPendingTokens(currentIso);
    // Instant prestige if at least 1 token is available
    return earned >= 1;
}
