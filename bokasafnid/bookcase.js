// fetch json library
const response = await fetch('./bokasafnid.json');
const books = await response.json();

// ---------------------------------------------------------

const body = document.querySelector("body");

// list of objects
var arrayOfYears = [];

// global variable
let count = 0;
let index

// reverse array so most recently read books are on the top
books.reverse();


books.forEach(function(obj){
  // create and add div to an array to be displayed later
  // example a text that says "2024"
  let element = document.createElement("h1");
  arrayOfYears.push(element);

  // count how many items in the array
  count = arrayOfYears.length;
  index = count - 1;

  let year = "";

  // if there is no end date. The book 
  // is assumed to be in progres.
  if (obj.end === null){
    year = "NowReading";
  }
  else {
    year = new Date(obj.end).getFullYear();
  }

  // if year div doesn't exist, create it,
  // and append to body.
  var yearCheck = document.querySelector("#year" + year);
  if (yearCheck === null) {
    var bookcase = document.createElement("div");
    bookcase.className = "bookcase";
    bookcase.id = "year" + year;

    arrayOfYears[index].className = "showBooks";
    arrayOfYears[index].id = "h1-" + year;
    arrayOfYears[index].textContent = year;
    arrayOfYears[index].addEventListener("click", function(){
      bookcase.classList.toggle("visible");
    });

    body.append(arrayOfYears[index]);
    body.append(bookcase);
  }

  // add things to the div
  const basicBox      = document.createElement("div");
  const textBox       = document.createElement("div");
  const imgBox        = document.createElement("div");
  const bookName      = document.createElement("h2");
  const bookAuthor    = document.createElement("h3");
  const bookWordCount = document.createElement("p");
  const bookRating    = document.createElement("p");
  const bookDesc      = document.createElement("p");
  const bookStart     = document.createElement("p");
  const bookEnd       = document.createElement("p");
  const bookImg       = document.createElement("img");

  basicBox.className          = "basicBox";
  textBox.className           = "textBox";
  imgBox.className            = "imgBox";
  bookName.textContent        = obj.name;
  bookAuthor.textContent      = "Höfundur: "    + obj.author;
  bookWordCount.textContent   = "Orðafjöldi: "  + obj.wordCount;
  bookRating.textContent      = "Stig: "        + obj.rating + "/5";
  bookDesc.textContent        = "Lýsing: "      + obj.desc;
  bookStart.textContent       = "Byrjaði: "     + obj.start;
  bookEnd.textContent         = "Kláraði: "     + obj.end;
  bookImg.src                 = "img/"          + obj.fileName;
  
  
  bookcase = document.querySelector("#year" + year);
  bookcase.append( basicBox );
  basicBox.append( imgBox , textBox );
  imgBox.append(bookImg);
  textBox.append(
    bookName, bookAuthor, bookWordCount, bookRating,
    bookDesc, bookStart, bookEnd
  );
  

});

// fix now reading section
document.querySelector("#h1-NowReading").textContent = "Currently Reading";
