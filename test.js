
/*
Create a list of these modules

<h1>Click me to hide div bellow</h1>
<div>
  here is content
</div>

*/

const body = document.querySelector("body");



const h1 = document.createElement("h1");
const box = document.createElement("div");

h1.textContent = "Clicking this should hide text bellow"
box.textContent = "This is a text that should be toggled"
box.className = "box";

h1.addEventListener("click",function(){
  box.classList.toggle("visible");
});

body.append(h1);
body.append(box);

const h12 = document.createElement("h1");
const box2 = document.createElement("div");

h12.textContent = "Clicking this should hide text bellow"
box2.textContent = "This is a text that should be toggled"
box2.className = "box";

h12.addEventListener("click",function(){
  box2.classList.toggle("visible");
});

body.append(h12);
body.append(box2);