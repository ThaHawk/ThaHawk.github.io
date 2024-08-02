// import html box creation
import { vidgerdirItem } from "./vidgerdirItem.js";

// fetch json library
const response = await fetch('./repairs.json');
const jsonLib = await response.json();

jsonLib.forEach(function(obj) {
  vidgerdirItem(obj.name, obj.type, obj.repair, "img/" + obj.fileName);  
});
