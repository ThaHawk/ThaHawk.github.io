function toggleMenu() {
    var menu = document.getElementById("myMenu");
    var currentDisplay = window.getComputedStyle(menu, null).getPropertyValue("display");

    if (currentDisplay === "none") {
        fadeIn(menu);
    } else {
        fadeOut(menu);
    }
}

function fadeIn(element) {
    var opacity = 0;
    element.style.display = "block";

    var fadeEffect = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}

function fadeOut(element) {
    var opacity = 1;

    var fadeEffect = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeEffect);
            element.style.display = "none";
        }
    }, 50);
}
