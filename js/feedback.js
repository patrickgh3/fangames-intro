// Sends feedback PHP request when button is clicked, displays result
function doFeedbackRequest() {
    // Grab needed elements
    var form = document.getElementById("feedbackForm");
    var resultElt= document.getElementById("feedbackFormResultText");
    var feedback = document.getElementById("feedbackFormFeedback").value;
    var contact = document.getElementById("feedbackFormContact").value;

    // Immediately show loading text and disable input elements
    resultElt.innerHTML = "Sending...";
    setDisabledAllChildren(form, true);

    // Request protocol
    var url = "feedback_submit.php";
    var params = "feedback=" + feedback + "&contact=" + contact;
    function readyStateChangeCallback() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Success - pass text and stay disabled
                resultElt.innerHTML = this.responseText;
            }
            else if (this.status == 400) {
                // Input error - pass text and re-enable
                resultElt.innerHTML = this.responseText;
                setDisabledAllChildren(form, false);
            }
            else {
                // Something else - show contact text and re-enable
                resultElt.innerHTML =
                        "Something went wrong, HTTP code "
                        + this.status.toString()
                        + ", please tell Patrickgh3!"
                setDisabledAllChildren(form, false);
            }
        }
    }

    // Make the request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = readyStateChangeCallback;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
    xhttp.send(params);

    // Return false to stay on the same page
    // (also need onsubmit="return jsFunc()" in HTML)
    return false;
}

// Set "disabled" field of all children of an element
function setDisabledAllChildren(elt, disabled) {
    for (var i=0; i<elt.children.length; i++) {
        elt.children[i].disabled = disabled;
    }
}
