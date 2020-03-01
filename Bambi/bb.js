


		var canvas = document.querySelector('canvas');
		var ctx = canvas.getContext('2d');
		
		canvas.width = window.innerWidth - 10;
		canvas.height = window.innerHeight - 20;

		var score = 0;
		var endGame = false;
		var displayScore = document.querySelector('#best');

		var currentScore = document.querySelector('#current');

		var pause = false;
		var StartButton = document.querySelector('#playStop');
		StartButton.style.marginLeft = (40 - window.innerWidth) + 'px';
		StartButton.style.marginTop = (window.innerHeight - 80) + 'px';

		var moveThis = document.querySelector('#bar');
		moveThis.style.marginLeft = '300px';


		moveThis.ontouchmove = function (e){
			e.preventDefault();
		if (e.pageX <= 350){
				moveThis.style.marginLeft = e.pageX + 'px';
			}	
		}
		
		
		
		//play and stop game
		
		
		StartButton.onclick = function(){
			
			if(!endGame){
				if (pause){
				StartButton.setAttribute('src', 'Stop.png');
				pause = false;
				play();
			} else {
				StartButton.setAttribute('src', 'Play.png');
				pause = true;
			}
			}
			
		}


		
		//display best score



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



		//display current score

function displayCurrentScore(num){
	
	
		var displayCurrent;
			
			if(num < 10){
			displayCurrent = '00' + num;
		} else if (num < 100){
			displayCurrent = '0' + num;
		} else {
			displayCurrent = num.toString();
		}
	
			currentScore.textContent = displayCurrent;
			
		}
		

		displayCurrentScore(score);

		
//storing best score

function storeBestScore(num){
	
		var bestScore = localStorage.getItem('bestScore');
		var newScore;
			
		if(num < 10){
			newScore = '00' + num;
		} else if (num < 100){
			newScore = '0' + num;
		} else {
			newScore = num.toString();
		}
				
		
				if(bestScore[0] === 0){
					
					if(bestScore[1] === 0){
						
						if(Number(bestScore[2]) > num){
							newScore = bestScore;
						}
						
					} else {
						
						if(Number(bestScore.slice(1)) > num){
							newScore = bestScore;
						}
						
					}
					
				} else {
					
					if(Number(bestScore) > num){
							newScore = bestScore;
						}
				}
			
	
		localStorage.setItem('bestScore', newScore);
}
		



//Summary


	function summary(){
		
		
		var portal = document.createElement('section');
		portal.setAttribute('id', 'congrad');
		
		var bg = document.createElement('img');
		bg.setAttribute('id', 'transparent');
		bg.setAttribute('src', 'Transparent.png');
		bg.setAttribute('alt', '');
		bg.style.maxWidth = window.innerWidth;
		bg.style.maxHeight = window.innerHeight;
		bg.style.marginLeft = (10 - window.innerWidth) + 'px';
		
		var base = document.createElement('img');
		base.setAttribute('src', 'base.png');
		base.setAttribute('id', 'base');
		base.setAttribute('alt', '');
		
		var final = document.createElement('h1');
		final.setAttribute('id', 'finalScore');
		var finalScore;
						if(score < 10){
							finalScore = '00' + score;
						} else if (score < 100){
							finalScore = '0' + score;
						} else {
							finalScore = score.toString();
						}
		final.textContent = finalScore + ' !';
		
		var sugar = document.createElement('img');
		sugar.setAttribute('src', 'sugar.png');
		sugar.setAttribute('id', 'sugar');
		sugar.setAttribute('alt', '');
		
		var back = document.createElement('h1');
		back.setAttribute('id', 'back');
		var backText = document.createElement('a');
		backText.textContent = 'BACK';
		backText.setAttribute('href', 'index.html');
		back.appendChild(backText);
		
		
		var replay = document.createElement('h1');
		replay.setAttribute('id', 'again');
		replay.textContent = 'AGAIN';
		
		
		
		portal.appendChild(base);
		portal.appendChild(final);
		portal.appendChild(sugar);
		portal.appendChild(back);
		portal.appendChild(replay);
		
		var body = document.querySelector('body');
		body.appendChild(bg);
		body.appendChild(portal);
		
		
		replay.onclick = function again(){
			
			body.removeChild(bg);
			body.removeChild(portal);
			
					endGame = false;
					score = 0;
					displayBestScore();
					pause = false;
					StartButton.setAttribute('src', 'Stop.png');
					
					for (var i = 0; i < bbArray.length; i++){
						bbArray[i].x = Math.floor(Math.random() * window.innerWidth);
						bbArray[i].y = 0 - Math.floor(Math.random() * 2 * window.innerHeight);
						if(bbArray[i].color === 'peachpuff'){
							bbArray[i].exist = true;
						}
					}
					
					organize();
					play();
				} 
		
		
	}









//bb constructor

		function puff(x, y, color, exist){this.x = x; this.y = y; this.color = color; this.exist = exist}




		var bbArray = [];

//builder

		function builder(){
			
			for(var i = 0; i < 30; i++){
			
				if ( i < 9 ){
				
			var bb = new puff(Math.floor(Math.random() * window.innerWidth), 0 - Math.floor(Math.random() * 2 * window.innerHeight), '#B8F5EE', true);
			bbArray.push(bb);		
				
			} else {
				
			var bBb = new puff(Math.floor(Math.random() * window.innerWidth), 0 - Math.floor(Math.random() * 2 * window.innerHeight), '#F7C66A', true);
			bbArray.push(bBb);	
				
			}
				
			}
			
		}

//organizer, ((bbArray[j].y + 20) >= (bbArray[i].y - 20)) && ((bbArray[j].y - 20) <= (bbArray[i].y + 20)), ((bbArray[j].x + 20) >= (bbArray[i].x - 20)) && ((bbArray[j].x - 20) <= (bbArray[i].x + 20))

		function organize(){
			for ( var i = 0; i < bbArray.length; i++){
			for ( var j = 0; j < bbArray.length; j++){
			if (bbArray[i].exist && bbArray[j].exist){
				if (bbArray[j].x != bbArray[i].x){
						if (Math.abs(bbArray[j].y - bbArray[i].y) <= 40){
							if (Math.abs(bbArray[j].x - bbArray[i].x) <= 40){
								if (bbArray[j].x > bbArray[i].x){
									bbArray[j].x += (40 - Math.abs(bbArray[j].x - bbArray[i].x));
								} else {
									bbArray[i].x += (40 - Math.abs(bbArray[j].x - bbArray[i].x));
								}
							}
						}
					}
				
				if ((bbArray[i].x + 20) >= canvas.width){
					bbArray[i].x -= (bbArray[i].x + 20 - canvas.width);
				}
				
				if ((bbArray[i].x - 20) <= 0){
					bbArray[i].x += (20 - bbArray[i].x);
				}
				
				if (bbArray[j].x != bbArray[i].x){
						if (Math.abs(bbArray[j].y - bbArray[i].y) <= 40){
							if (Math.abs(bbArray[j].x - bbArray[i].x) <= 40){
								if (bbArray[j].y > bbArray[i].y){
									bbArray[j].y += (40 - Math.abs(bbArray[j].y - bbArray[i].y));
								} else {
									bbArray[i].y += (40 - Math.abs(bbArray[j].y - bbArray[i].y));
								}
							}
						}
					}
			}	
			
			}
					
				}
			
		}


		builder();
		organize();


//move puff




		function move(bb){
			
			
			if(bb.exist){
			ctx.beginPath();
			ctx.fillStyle = bb.color;
			ctx.arc(bb.x, bb.y, 20, 0, 2 * Math.PI, false);
			ctx.fill();
			}
			
			

			if (bb.y >= window.innerHeight + 20){
				bb.y = 0 - Math.floor(Math.random() * 2 * window.innerHeight);
				bb.x = Math.floor(Math.random() * window.innerWidth);
			
				
				for ( var l = 0; l < bbArray.length; l++){
					if (bbArray[l].exist){
						if (bb.x != bbArray[l].x){
						if (Math.abs(bb.y - bbArray[l].y) <= 40){
							if (Math.abs(bb.x - bbArray[l].x) <= 40){
								
							bb.x -= (40 - Math.abs(bb.x - bbArray[l].x));
								
							}
						}
					}
					}
				}
				
				if ((bb.x + 20) >= canvas.width){
					bb.x -= (bb.x + 20 - canvas.width);
					
				}
				
				if ((bb.x - 20) <= 0){
					bb.x += (20 - bb.x);
				}
				
				for ( var o = 0; l < bbArray.length; o++){
					if (bbArray[o].exist){
						if (bb.x != bbArray[o].x){
						if (Math.abs(bb.y - bbArray[o].y) <= 40){
							if (Math.abs(bb.x - bbArray[o].x) <= 40){
							if(bb.y < bbArray[o].y){
							bb.y -= (40 - Math.abs(bb.y - bbArray[o].y));
							} else {
								bb.y += (40 - Math.abs(bb.y - bbArray[o].y));
							}
								
							}
						}
					}
					}
				}
				
				bb.exist = true;
			} else {
				
				if (bb.y <= (window.innerHeight / 5)){
					bb.y += 4;
					
					for ( var i = 0; i < bbArray.length; i++){
					if (bbArray[i].exist){
						if (bb.x != bbArray[i].x){
						if (Math.abs(bb.y - bbArray[i].y) <= 40){
							if (Math.abs(bb.x - bbArray[i].x) <= 40){
								
							bb.y -= (40 - Math.abs(bb.y - bbArray[i].y));
								
							}
						}
					}
					}
				}
					
				} else if (bb.y <= (window.innerHeight / 4)) {
					bb.y += 3.5;
					
					for ( var j = 0; j < bbArray.length; j++){
					if(bbArray[j].exist){
						if (bb.x != bbArray[j].x){
						if (Math.abs(bb.y - bbArray[j].y) <= 40){
							if (Math.abs(bb.x - bbArray[j].x) <= 40){
								
							bb.y -= (40 - Math.abs(bb.y - bbArray[j].y));
								
							}
						}
					}
					}
				}
					
				} else {
					bb.y += 2.8;
					
					for ( var k = 0; k < bbArray.length; k++){
					if(bbArray[k].exist){
						if (bb.x != bbArray[k].x){
						if (Math.abs(bb.y - bbArray[k].y) <= 40){
							if (Math.abs(bb.x - bbArray[k].x) <= 40){
								
							bb.y -= (40 - Math.abs(bb.y - bbArray[k].y));
								
							}
						}
					}
					}
				}
					
				}
				
				
				
				
				
				
			}
				
				
		}



//check collected puffs


		function check(bb){
			
			var barX = moveThis.style.marginLeft + '.';
			var location = Number(barX.slice(0, barX.indexOf('px')));
			
			
			if(((bb.y + 20) >= (window.innerHeight - 210)) && ((bb.y + 20) <= (window.innerHeight - 190))){
				
				if((bb.x >= location) && (bb.x <= (location + 50)) && bb.exist){
					if(bb.color === '#F7C66A'){
						bb.exist = false;
						score++;
						currentScore.textContent = score;
					} else {
						
						endGame = true;
						
						
//						var finalScore;
//						
//						if(score < 10){
//							finalScore = '00' + score;
//						} else if (score < 100){
//							finalScore = '0' + score;
//						} else {
//							finalScore = score.toString();
//						}
//						
//						
//						final.textContent = finalScore;
			
						
						
						storeBestScore(score);
						
						
					}
				}
			}
		}





//play



		function play(){
			ctx.fillStyle = '#F4D9D9';
			ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			
			
			for(var i = 0; i < bbArray.length; i++){
					move(bbArray[i]);
					check(bbArray[i]);
			}
			
			
			if((!endGame) && (!pause)){
				requestAnimationFrame(play);
				displayCurrentScore(score);
			} else {
				
				summary();
				
			}
			
		}



		play();



















