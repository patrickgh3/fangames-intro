// Controls periodically fading unique images

// Init all images in our document
function main() {
    initImage(document.getElementById("fader1"), 1);
    initImage(document.getElementById("fader2"), 2);
    initImage(document.getElementById("fader3"), 3);
}

home_images = [
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

used_images = [];
fadeDuration = 1500;  // Length of fade transition
cycleDuration = 6000; // Wait time between transitions

function initImage(top_elt, timerOffset) {
    var active_img = document.createElement("img");
    active_img.setAttribute("class", "active");
    active_img.setAttribute("alt", "Cycling fangame screenshot");
    var inactive_img = document.createElement("img");
    inactive_img.setAttribute("class", "inactive");
    inactive_img.setAttribute("alt", "Cycling fangame screenshot");

    var i = getNewImage();
    used_images.push(i)
    active_img.setAttribute("src", i);

    top_elt.appendChild(active_img);
    top_elt.appendChild(inactive_img);

    setTimeout(
        function() {
            var updateImgCallback = function(){topImageUpdate(top_elt)};
            updateImgCallback();
            setInterval(updateImgCallback, cycleDuration);
        }, cycleDuration * timerOffset / 3
    );
}

function topImageUpdate(top_elt) {
    var $active = $(top_elt).find(".active");
    var $inactive = $(top_elt).find(".inactive");

    $inactive.attr("src", $active.attr("src"));
    var i = getNewImage();
    used_images.push(i);
    $active.attr("src", i);

    $active.hide();
    $active.fadeIn(fadeDuration, function() {
        removeImageFromUsed($inactive.attr("src"))
    });
}

function getNewImage() {
    var index = -1;
    while (index == -1 || used_images.indexOf(home_images[index]) != -1) {
        index = Math.floor(Math.random() * home_images.length);
    }
    return home_images[index];
}

function removeImageFromUsed(image) {
    used_images.splice(used_images.indexOf(image), 1);
}

main();

