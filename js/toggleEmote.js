// Toggle image source between yoyoYo and cornBlack
function toggleEmote(imgElt) {
    if (imgElt.src.search("yoyoYo.png") != -1) {
        imgElt.src = "images/cornBlack.png";
    }
    else {
        imgElt.src = "images/yoyoYo.png";
    }
}
