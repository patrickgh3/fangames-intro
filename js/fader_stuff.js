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
        var startFadeSelf = function(){startNewFade(faderElt);};
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
    $(active).fadeIn(fadeDuration, function() {
        removeFromUsedSources(inactive.src);
    });
}

// Returns random element of allSources that's not present in usedSources
function pickUnusedSource() {
    var index = -1;
    var chosenSource = "";
    var attemptsLeft = 20;
    while (true) {
        index = Math.floor(Math.random() * allSources.length);
        chosenSource = allSources[index];
        if (indexOfStringPart(usedSources, chosenSource) == -1) {
            break;
        }
        attemptsLeft -= 1;
        if (attemptsLeft <= 0) break;
    }
    return chosenSource;
}

// Checks if a string is a substring or a superstring of any element
// in a list, and returns the index, or -1 if none.
// e.g. "http://a.com/b/c.png" and "b/c.png", or vice versa.
function indexOfStringPart(list, val) {
    for (var i=0; i<list.length; i++) {
        if (val.indexOf(list[i]) != -1 || list[i].indexOf(val) != -1) {
            return i;
        }
    }
    return -1;
}

// Removes a string from usedSources which is either a substring or superstring
// of a given string.
function removeFromUsedSources(toRemove) {
    var i = indexOfStringPart(usedSources, toRemove);
    usedSources.splice(i, 1);
}

fadeDuration = 1500;  // Length of fade transition
cycleDuration = 6000; // Wait time between transitions
usedSources = [];
allSources = [
 "images/screenshots/destiny.png"
,"images/screenshots/scribble.png"
,"images/screenshots/snowmagic.png"
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

