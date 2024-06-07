function expandYear(y) {
    var x = document.getElementById(y);
    if (x.style.display === "none") {
      x.style.display = "grid";
    } else {
      x.style.display = "none";
    }
};

/*
function toggleMenu() {
    var menu = document.getElementById("myMenu");
    menu.classList.toggle("visible");
}
*/


function toggleClass(x) {
    let classText = "." + x;
    const menu = document.querySelector(classText);
    menu.classList.toggle("visible");
    //console.log("Attempted to toggle " + classText);
}

/*
function switchView() {
    var[] x = document.getElementsBy("grid-container year2023");
    if (x.style.gridTemplateColumns === "1fr"){
        x.style.gridTemplateColumns = "1fr 1fr";
    }
    else if (x.style.gridTemplateColumns === "1fr 1fr"){
        x.style.gridTemplateColumns = "1fr 1fr 1fr";
    }
    else if (x.style.gridTemplateColumns === "1fr 1fr 1fr"){
        x.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    }
    else if (x.style.gridTemplateColumns === "1fr 1fr 1fr 1fr"){
        x.style.gridTemplateColumns = "1fr";
    }
}*/