/**
   FlightPin
   main.js
   Alexander Elman
**/

function hideElement(toggleElem,blowElem) {
    var elem = toggleElem;
    var blowElem = blowElem;
    blowElem.value = 'Select'; //blow value away
    toggleElem.style.display = 'none';
}

function showElement(toggleElem) {
    var toggleElem = toggleElem;
    toggleElem.style.display = '';
}

function toggleElementOnCheck(toggleID, chbox, blowID) {
    var toggleElem = document.getElementById(toggleID);
    var blowElem = document.getElementById(blowID);
    var boxxy = chbox;
    if (boxxy.checked) {
	hideElement(toggleElem, blowElem);
    }
    else {
	showElement(toggleElem);
    }
}