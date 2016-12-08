home_images = [
 "http://delicious-fruit.com/ratings/screenshots/10636_000001ee"
,"http://delicious-fruit.com/ratings/screenshots/12534_00000326"
,"http://delicious-fruit.com/ratings/screenshots/12322_0000032c"
,"http://delicious-fruit.com/ratings/screenshots/14947_0000076c"
,"http://delicious-fruit.com/ratings/screenshots/15660_00000d71"
,"http://delicious-fruit.com/ratings/screenshots/11739_00000351"
,"http://delicious-fruit.com/ratings/screenshots/12243_00000765"
,"http://delicious-fruit.com/ratings/screenshots/11042_00000d05"
,"http://delicious-fruit.com/ratings/screenshots/10527_00000a48"
,"http://delicious-fruit.com/ratings/screenshots/11108_00000aad"
,"http://delicious-fruit.com/ratings/screenshots/15350_00000b80"
,"http://delicious-fruit.com/ratings/screenshots/14816_00000a84"
,"http://delicious-fruit.com/ratings/screenshots/12376_00000d2e"
,"http://delicious-fruit.com/ratings/screenshots/11624_000004dc"
,"http://delicious-fruit.com/ratings/screenshots/14701_000006ed"
,"http://delicious-fruit.com/ratings/screenshots/11336_00000668"
];

used_images = [];

function createImage(top_elt) {
    var active_img = document.createElement("img");
    active_img.setAttribute("class", "active")
    var inactive_img = document.createElement("img");
    inactive_img.setAttribute("class", "inactive")

    var i = getNewImage();
    used_images.push(i)
    active_img.setAttribute("src", i);

    top_elt.appendChild(active_img);
    top_elt.appendChild(inactive_img);
}

function topImageUpdate(top_elt) {
    var $active = $(top_elt).find(".active");
    var $inactive = $(top_elt).find(".inactive");

    $inactive.attr("src", $active.attr("src"));
    var i = getNewImage();
    used_images.push(i);
    $active.attr("src", i);

    $active.hide();
    $active.fadeIn(1500, function(){removeImageFromUsed($inactive.attr("src"))});
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