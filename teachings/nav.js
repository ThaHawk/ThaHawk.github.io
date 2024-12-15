// Allow nav to be hidden or not
const hideNavButton = document.querySelector(".hideNav");
hideNavButton.addEventListener("click", function (e) {
    
    const flex = document.querySelector(".flex");
    const nav = document.querySelector("nav");
    
    // save original styles
    let orgFlex = flex.style.gridTemplateColumns;

    if (nav.style.visibility != "hidden"){
        flex.style.gridTemplateColumns = "0% 100%";
        nav.style.visibility = "hidden";
    }
    else {
        flex.style.gridTemplateColumns = "20% 80%";
        nav.style.visibility = "visible";
    }
    
});