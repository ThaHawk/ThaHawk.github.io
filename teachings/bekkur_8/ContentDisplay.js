console.log("I'm here!");

// fetch json library
const response = await fetch('./content.json');
const content = await response.json();

// fetch main element to link other elements
const main = document.querySelector("main");

// title
// -- Nafn á kafla
// -- Efni
// Loop
// -- Nafn á kafla
// -- Efni
// Loop
// -- Nafn á kafla
// -- Efni


// add content to html (main)
createTitle(content.titill);

// loop through each chapter append element
content.kaflar.forEach(element => {
    createList(element.nafn, element.id);
    createName(element.nafn, element.id);
    createContent(element.efni);
    createVideo(element.myndband);
});


//
// functions to make elemtns
//


function createTitle(text) {
    // create object and set its propperties
    const textElement = document.querySelector(".title");

    // put content into element
    textElement.textContent = text;

    // set website title
    document.title = text;
}

function createList(text, id) {
    // create list object
    const listElement = document.createElement("li");
    const listLink = document.createElement("a");
    listElement.append(listLink);
    listLink.text = text;
    listLink.href = "#" + id;
    const ul = document.querySelector("ul");
    ul.append(listElement);

}

function createName(text, id) {
    // create object and set its propperties
    const textElement = document.createElement("div");
    textElement.className = "m"; // l for large text
    main.append(textElement);

    //set id to jump to
    textElement.id = id;

    // put content into element
    textElement.textContent = text;
}

function createContent(text) {
    // create object and set its propperties
    const textElement = document.createElement("p");
    main.append(textElement);

    // put content into element
    textElement.textContent = text;
}

function createVideo(url) {
    // create object and set its propperties
    const iframe = document.createElement("iframe");
    iframe.src = url;
    main.append(iframe);
}