function toggleClass() {
  let classText = "." + "myMenu";
  const menu = document.querySelector(classText);
  menu.classList.toggle("visible");
  //console.log("Attempted to toggle " + classText);
}

/*<header>
  <a class="title">
    <img src="../img/watermark-white.png">
  </a>
  <a class="menu-toggle" onclick="toggleClass('myMenu')">
    <img src="../img/Hamburger_White.png">
  </a>
</header>*/

const body = document.querySelector("body");
const topDiv = document.createElement("div");
const header = document.createElement("header");
const title = document.createElement("a");
const menuToggle = document.createElement("a");
const watermark = document.createElement("img");
const hamburger = document.createElement("img");

topDiv.className = "top";

title.className = "title";

menuToggle.className = "menu-toggle";
menuToggle.addEventListener("click", toggleClass);

watermark.src = "../img/watermark-white.png";
hamburger.src = "../img/Hamburger_White.png";

body.prepend(topDiv);
topDiv.append(header);
header.append(title);
header.append(menuToggle);
title.append(watermark);
menuToggle.append(hamburger);



/*<nav id="myMenu" class="myMenu">
  <ul>
    <li>
      <a class="navButton" href="../minecraft">
        Server --|
      </a>
    </li>
  </ul>
</nav>*/

const nav = document.createElement("nav");
const unOrderedList = document.createElement("ul");

nav.id = "myMenu";
nav.className = "myMenu";

header.after(nav);
nav.append(unOrderedList);

var listOfSites = [
  {
    site:"Heim",
    path:"../home"
  },
  {
    site:"Bókasafnið",
    path:"../bokasafnid"
  },
  {
    site:"PSVita",
    path:"../PSVita"
  },
  {
    site:"Minecraft",
    path:"../minecraft"
  },
  {
    site:"Ljósmyndun",
    path:"../ljosmyndun"
  },
  {
    site:"Viðgerðir",
    path:"../vidgerdir"
  }
];

listOfSites.forEach(function(obj){
  console.log(obj)
  const tempListItem = document.createElement("li");
  const tempA = document.createElement("a");

  tempA.text = obj.site + " --|";
  tempA.href = obj.path;

  unOrderedList.append(tempListItem);
  tempListItem.append(tempA);
});
