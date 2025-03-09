/*
<header>
  <a class="title">
    <img src="../img/watermark-white.png">
  </a>
  <a class="menu-toggle" onclick="toggleClass('myMenu')">
    <img src="../img/Hamburger_White.png">
  </a>
</header>
*/


/*
<nav id="myMenu" class="myMenu">
  <ul>
    <li>
      <a class="navButton" href="../minecraft">
        Server --|
      </a>
    </li>
  </ul>
</nav>
*/




newHeader();

function newHeader()  {
  // create HTML elements
  const header = document.createElement("header");
  const body = document.querySelector("body");
  const topDiv = document.createElement("div");
  const title = document.createElement("a");
  const menuToggle = document.createElement("a");
  const watermark = document.createElement("img");
  const hamburger = document.createElement("img");
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  // assign class names and id so that css can find them
  topDiv.className = "top";
  title.className = "title";
  menuToggle.className = "menu-toggle";
  nav.id = "myMenu";

  // causes the navigation on and off. See below list of items
  menuToggle.addEventListener("click", function () {
    const menu = document.querySelector("nav");
    menu.classList.toggle("visible");
  });

  // pressing the logo sends you to the homepage
  title.href = "../home";

  watermark.src = "../img/watermark-white.png";
  hamburger.src = "../img/Hamburger_White.png";

  // top div is the parent div and needs to be first in body. thus prepend
  body.prepend(topDiv); 

  topDiv.append(header);
  header.append(title);
  header.append(menuToggle);
  title.append(watermark);
  menuToggle.append(hamburger);
  header.after(nav);
  nav.append(ul);


  // I could maybe move this to a json but for now its here.
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
      path:"../minecraft/UltimateBodyPart"
    },
    {
      site:"Ljósmyndun",
      path:"../ljosmyndun"
    },
    {
      site:"Viðgerðir",
      path:"../vidgerdir"
    },
    {
      site:"Teachings",
      path:"../teachings"
    }
  ];

  listOfSites.forEach(function(obj){

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.text = obj.site;
    a.text += " --|"; // the is just for flare and can be removed.
    a.href = obj.path;

    ul.append(li);
    li.append(a);
  });
 
}