function expandYear(y) {
    var x = document.getElementById(y);
    if (x.style.display === "none") {
      x.style.display = "grid";
    } else {
      x.style.display = "none";
    }
}