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
content.kaflar.array.forEach(element => {
    createName(element.nafn);
    createContent(element.efni);
    createVideo(element.myndband);
});

function createTitle(text) {
    // create object and set its propperties
    const textElement = document.createElement("div");
    textElement.class = "l"; // l for large text
    main.append(textElement);

    // put content into element
    textElement.content = text;
}

function createName(text) {
    // create object and set its propperties
    const textElement = document.createElement("div");
    textElement.class = "m"; // l for large text
    main.append(textElement);

    // put content into element
    textElement.content = text;
}

function createContent(text) {
    // create object and set its propperties
    const textElement = document.createElement("p");
    main.append(textElement);

    // put content into element
    textElement.content = text;
}

function createVideo(url) {
    // create object and set its propperties
    const iframe = document.createElement("iframe");
    iframe.src = url;
    main.append(iframe);
}