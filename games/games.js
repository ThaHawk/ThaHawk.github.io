// fetch json library
const response = await fetch('./games.json');
const games = await response.json();

// ---------------------------------------------------------

const body = document.querySelector("body");


