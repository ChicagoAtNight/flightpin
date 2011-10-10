/**
   FlightPin
   main.js
   Alexander Elman
**/

function hideElement(elem) {
    var elem = elem;
    elem.style.display = 'none';
}

function showElement(elem) {
    var elem = elem;
    elem.style.display = '';
}

function toggleElementOnCheck(elem, chbox) {
    var elem = elem;
    var boxxy = chbox;
    if (boxxy.checked) {
	hideElement(elem);
    }
    else {
	showElement(elem);
    }
}