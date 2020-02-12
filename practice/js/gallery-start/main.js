var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */

  
//  newImage.setAttribute('src', 'xxx');
  

  for ( var i = 1; i < 6; i++) {
var name = 'images/pic' + i + '.jpg';
var newImage = document.createElement('img');
newImage.setAttribute('class', 'tb'+ i);
newImage.setAttribute('src', name); 
newImage.setAttribute('alt', i); 
thumbBar.appendChild(newImage);
newImage.onclick = function (e){
		displayedImage.setAttribute('src', e.target.getAttribute('src'));

}

  }









/* Wiring up the Darken/Lighten button */

btn.onclick = function mode () {
	
	var theme = btn.getAttribute('class');

if (theme === 'dark') {
	
	btn.setAttribute('class', 'light');
	btn.textContent = 'Lighten';
	overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
} else {
	
	btn.setAttribute('class', 'dark');
	btn.textContent = 'Darken';
	overlay.style.backgroundColor = 'rgba(0,0,0,0)';
}

	
}









