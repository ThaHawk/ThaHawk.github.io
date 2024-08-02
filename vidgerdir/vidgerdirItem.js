
/**
 * 
 * @param {string} itemName  
 * @param {string} itemType 
 * @param {string} repairType 
 * @param {string} imgPath 
 */

export function vidgerdirItem(itemName, itemType, repairType, imgPath) {

  // Create elements
  const body = document.querySelector("body");
  const box = document.createElement("div");
  const imgBox = document.createElement("div");
  const textBox = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("h2");
  const type = document.createElement("h3");
  const repair = document.createElement("p");

  // set up elements in document
  body.append(box);
  box.append(imgBox, textBox);
  imgBox.append(img);
  textBox.append(name, type, repair);

  // add text and path
  img.src = imgPath;
  name.textContent = itemName;
  type.textContent = itemType;
  repair.textContent = repairType;
  
}