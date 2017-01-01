// Controls periodically fading unique images from a pool

function main() {
    initImage(document.getElementById("fader1"), 1);
    initImage(document.getElementById("fader2"), 2);
    initImage(document.getElementById("fader3"), 3);
}

function initImage(faderElt, timerOffset) {
    // Register initial source as used
    var active = faderElt.querySelector(".active");
    usedSources.push(active.src);

    // Start off timings
    function initialFadeAndSetInterval() {
        var startFadeSelf = function() {
            startNewFade(faderElt);
        };
        startFadeSelf();
        setInterval(startFadeSelf, cycleDuration);
    }
    setTimeout(initialFadeAndSetInterval, cycleDuration * timerOffset / 3);
}

// Starts a new transition of a fader
function startNewFade(faderElt) {
    // Grab image children and propagate new source
    var active = faderElt.querySelector(".active");
    var inactive = faderElt.querySelector(".inactive");
    var newSrc = pickUnusedSource();
    usedSources.push(newSrc);
    inactive.src = active.src;
    active.src = newSrc;

    // Start fade in
    active.style.display = "none";
    fadeIn(active, fadeDuration, function() {
        removeFromUsedSources(inactive.src);
    });
}

// Returns random element of allSources that's not present in usedSources
function pickUnusedSource() {
    var index = -1;
    var attemptsLeft = 20;
    while (index == -1 || usedSources.indexOf(allSources[index]) != -1) {
        index = Math.floor(Math.random() * allSources.length);
        attemptsLeft -= 1;
        if (attemptsLeft <= 0) break;
    }
    return allSources[index];
}

// Removes a source from usedSources which is contained in a given string.
// e.g. remove("http://a.com/b/c.png") will remove "b/c.png"
function removeFromUsedSources(toRemove) {
    for (var i=0; i<usedSources.length; i++) {
        if (toRemove.indexOf(usedSources[i]) != -1) {
            usedSources.splice(i, 1);
            break;
        }
    }
}



fadeDuration = 1500;  // Length of fade transition
cycleDuration = 6000; // Wait time between transitions
usedSources = [];
allSources = [
 "images/screenshots/crimson.png"
,"images/screenshots/destiny.png"
,"images/screenshots/hurtfulpain.png"
,"images/screenshots/orion.png"
,"images/screenshots/snowmagic.png"
,"images/screenshots/bread.png"
,"images/screenshots/idk1.png"
,"images/screenshots/25level.png"
,"images/screenshots/idk2.png"
,"images/screenshots/sillyne3.png"
,"images/screenshots/kermit.png"
,"images/screenshots/idk3.png"
,"images/screenshots/idk4.png"
,"images/screenshots/marathon.png"
,"images/screenshots/coop.png"
,"images/screenshots/magictower.png"
,"images/screenshots/hanamogeta.png"
,"images/screenshots/chaton.png"
,"images/screenshots/sek.png"
,"images/screenshots/god.png"
,"images/screenshots/cultured2.png"
,"images/screenshots/spookjam.png"
,"images/screenshots/safespace.png"
,"images/screenshots/abducted.png"
,"images/screenshots/scribble.png"
,"images/screenshots/stumble.png"
,"images/screenshots/writtenchal.png"
,"images/screenshots/idk5.png"
,"images/screenshots/nang.png"
];

main();

