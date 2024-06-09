const response = await fetch('./bokasafnid.json');
const books = await response.json();

// ---------------------------------------------------------

const body = document.querySelector("body");

// list of objects

var arrayOfYears = [];

// loop through each object and check year finished reading
// add object
let count = 0;

books.forEach(function(obj){
  // create and add div to an array to be displayed later
  let element = document.createElement("h1");
  arrayOfYears.push(element);

  // count how many items in the array
  count = arrayOfYears.length;
  let index = count - 1;

  // take year from date object
  let year = new Date(obj.end).getFullYear();

  // if year div doesn't exist, create it,
  // and append to body.
  var yearCheck = document.querySelector("#year" + year);
  if (yearCheck === null) {
    var bookcase = document.createElement("div");
    bookcase.className = "bookcase";
    bookcase.id = "year" + year;

    arrayOfYears[index].className = "showBooks";
    arrayOfYears[index].textContent = year;
    arrayOfYears[index].addEventListener("click", function(){
      bookcase.classList.toggle("visible");
    });

    body.append(arrayOfYears[index]);
    body.append(bookcase);
  }

  // add things to the div
  const basicBox      = document.createElement("div");
  const bookName      = document.createElement("h2");
  const bookAuthor    = document.createElement("h3");
  const bookWordCount = document.createElement("p");
  const bookRating    = document.createElement("p");
  const bookDesc      = document.createElement("p");
  const bookStart     = document.createElement("p");
  const bookEnd       = document.createElement("p");
  const bookImg       = document.createElement("img");

  basicBox.className          = "basicBox";
  bookName.textContent        = obj.name;
  bookAuthor.textContent      = obj.author;
  bookWordCount.textContent   = obj.wordCount;
  bookRating.textContent      = obj.rating;
  bookDesc.textContent        = obj.desc;
  bookStart.textContent       = obj.start;
  bookEnd.textContent         = obj.end;
  bookImg.src                 = "img/" + obj.fileName;
  
  bookcase = document.querySelector("#year" + year)
  bookcase.appendChild(basicBox);
  basicBox.appendChild(
    bookImg, bookName, bookAuthor, bookWordCount, bookRating,
    bookDesc, bookStart, bookEnd, bookImg
  );

});
