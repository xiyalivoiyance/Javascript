// JavaScript Document

var displayScore = document.querySelector('h1');

function displayBestScore(){
			
			var bestScore = localStorage.getItem('bestScore');
			
			if (bestScore === null){
				localStorage.setItem('bestScore', '000');
				displayScore.textContent = '000';
			} else {
				displayScore.textContent = bestScore;
			}
			
			
		}
		

		displayBestScore();


var reset = document.querySelector('#reset');

reset.onclick = function(){
	localStorage.setItem('bestScore', '000');
	displayBestScore();
}