//Need to clear the raindrops percisley so other animations have time to play out
	//Will need to do this with every drawn object
	//Also have them run on their own timer
//Need user controls




//Global variables
var canvas;
var context;
var timer;
//var player;

//Helper functions
function degreesToRadians(degrees){
	return (degrees * Math.PI)/180;
}




//When the HTML file is opened this function will run.
window.onload = function(){
	//Create canvas and context variables to write to the canvas.
	canvas = document.getElementById('canvasGround');
	context = canvas.getContext('2d');
	
/*Title image if desired
	//var titleImage will be the background image of the title screen.
	//Create a new image with titleImage assigned to it.
	var titleImage = new Image();
	//get the image src and assifn it to titleImage.
	titleImage.src = 'spImage.jpg';
	/draw the image onto the canvas.
	//unsure as to why context.drawImage needs to be in .onload = function but it does.
	//If not no errors occur but the image won't appear.
	titleImage.onload = function(){
		context.drawImage(titleImage, 0, 0, canvas.width, canvas.height);
		//Function call to generate particles
		//this function call must be placed inside the titleImage.onload in order
		//to be displayed in front of the titleImage
	}
*/
	
	makeLinesAndCircles();
	timerRaindrops = setInterval(drawLinesAndCircles, 50);

	//var playButton will be the button that when clicked initializes the game.
	//In this case use the playButton element from the HTML.
	var playButton = document.getElementById('playButton');
	
	//when the var playButton is clicked the runGame function is called.
	//Cannot pass titleImages as a parameter. runGame(titleImage) doesn't work.
	//Instead clear the canvas in the next function to clear the title image.
	playButton.onclick = clearScreen;
}




//This function's name explains it all.
function clearScreen(){
	console.log('clearScreen'); // debugging purposes.
	//hide the playButton.  Must refference the HTML element as the playButton var is out of scope.
	document.getElementById('playButton').style.visibility = 'hidden';
	//clear the HTML creator element.  Text that appears in the bottom right.
	document.getElementById('creator').style.visibility = 'hidden';
	//context.clearRect will remove everything that is in the canvas.
	//This way it is cleared for the game.
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//function call to runGame.
	runGame();
}



//Loop through animations
function runGame(){
	console.log('runGame');
	timer = setTimeout(particleAnimation,4800);
}

function particleAnimation(){
	console.log('next animation');
	clearInterval(timerRaindrops);
	clearTimeout(timer);
	makeParticles();
	timerParticles = setInterval(drawParticles, 50);
	timer = setTimeout(raindropAnimation, 4800);
}

function raindropAnimation(){
	console.log('raindrop animation');
	clearInterval(timerParticles);
	clearTimeout(timer);
	makeLinesAndCircles();
	timerRaindrops = setInterval(drawLinesAndCircles, 50);
	runGame();
}
//End looping functions




//Begin Line and Circle functions
//function makeLinesAndCircles will populate the linesAndCircles array with values from the constructor function.
//The drawn results will be a rain drop
function makeLinesAndCircles(){
	console.log('makeLinesAndCircles');
	//This array will house each triangle and semi-circle to be drawn
	linesAndCircles = [];
	
	//Fill the array calling the constructor function constructLineAndCircle
	//Make i < # of how many rain drops desired
	for (var i = 0; i < 50; i++){
		console.log('Push LAC');
		linesAndCircles.push(new constructLineAndCircle());
	}
}

//This function draws the lines and semi-circles to create a raindrops
function drawLinesAndCircles(){
	//Clear the screen so there are no lingering rain drops
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//Draw each triangle and semi-circle in the linesAndCircles array
	for (var i = 0; i < linesAndCircles.length; i++){
		console.log('Draw');
		//LAC stands for line and circle
		var LAC = linesAndCircles[i];
		
		//Draw the triangles
		context.linewidth = LAC.width;
		context.beginPath();
		context.moveTo(LAC.x, LAC.y);
		context.lineTo(LAC.x2, LAC.y2);
		context.lineTo(LAC.x3, LAC.y);
		context.lineTo(LAC.x, LAC.y);
		context.lineJoin = 'round';
		context.strokeStyle = LAC.color;
		context.fillStyle = LAC.color;
		context.stroke();
		context.fill();
		
		//Draw the semi-circles
		context.beginPath();
		context.arc(LAC.x2, LAC.yCirc, LAC.radius, 0, LAC.angle, false);
		context.fillStyle = LAC.color;
		context.strokeStyle = LAC.color;
		context.fill();
		context.stroke();
		
		//Move both the semi-circle and triangle
		LAC.y += LAC.fallingSpeed;
		LAC.y2 += LAC.fallingSpeed;
		LAC.yCirc += LAC.fallingSpeed;
		
		//When the raindrop reaches the bottom of the screen it resets to the top
		if (LAC.y > canvas.height){
			//Create text when the rain hits the floor
			drawRainText(LAC);
			LAC.y  = 0;
			LAC.y2 = LAC.y - 10;
			LAC.yCirc = LAC.y;
		}
	}
}

//Both lines and circles will share the same constructor function as they share some coordinates
function constructLineAndCircle(){
	console.log('constructLinesAndCircles');
	//Line Use
	this.width = 1;
	this.x = Math.floor(Math.random() * canvas.width);
	this.y = Math.random() * canvas.height;
	//x2 is also the starting x location for each semi-circle
	this.x2 = this.x + 4;
	this.y2 = this.y - 10;
	this.x3 = this.x + 8;
	//this.y3 = this.y;
	//this.x4 = this.x;
	//this.y4 = this.y;
	this.color = '#33CCFF';
	
	//Circle Use
	//this.xCirc = this.x2;
	this.yCirc = this.y;
	this.radius = 4;
	this.angle = degreesToRadians(180);
	
	//motion
	this.fallingSpeed = 8;
}
//End Line and Circle functions




//Begin Particle functions
//This function will create and fill an array called particles
//It will also draw them to the canvas
function makeParticles(){
	console.log('Make particles');
	particles = [];
	
	//This for loop fills the particles array
	for(var i = 0; i < 150; i++){
		particles.push(new constructParticle());
	}
}

//For some reason there is an error that particles is undefined
//As such moved the for loop into the makeParticles function
function drawParticles(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	console.log('drawParticles');
	//This for loop draws the particles in the particles array
	for(var i = 0; i < particles.length; i++){
		console.log('draw');
		var particle = particles[i];
		context.beginPath();
		context.arc(particle.x, particle.y, particle.radius, 0, degreesToRadians(360), true);
		context.fillStyle = particle.color;
		context.fill();
		
		colors = ['#00FFFF','#7FFFD4','#F0FFFF','#8A2BE2','#00008B','#9932CC','#8B0000','#FF1493','#FFD700','#ADFF2F','#FF69B4','#7CFC00','#FF0000','#87CEEB','#00FF7F','#FFFF00','#7FFFD4'];
		particle.radius += 1;
		if (particle.radius == 30){
			drawBoomText(particle);
			particle.radius = Math.floor(Math.random()*15);
			particle.color = colors[Math.floor(Math.random() * colors.length)];
			particle.x = Math.random()*canvas.width;
			particle.y = Math.random()*canvas.height;
		}
	}
}

//This constructor function will define a particle's attributes.
function constructParticle(){
	console.log('constructParticles');
	colors = ['#B80000','#C80000','#D80000','#E80000','#F80000','#33FFFF','#33FF66','#6600FF','#CC33FF','#FFFF66','#FFFF00','#FF66FF','#66FFFF','#66FF66','#8C66FF',];
	
	this.x = Math.random()*canvas.width;
	this.y = Math.random()*canvas.height;
	this.radius = Math.floor(Math.random() * 20);
	this.color = colors[Math.floor(Math.random() * colors.length)];
	//velocity
}
//End particle functions




//Text functions
function drawRainText(LAC){
	console.log('drawText');
	//Words drawn when rain hits bottom
	//Would like text to last longer than the 50 milliseconds
	//ranNumber ensures the word selected is random
	var ranNumber = Math.floor(Math.random()*2);
	//Might need to add in && LAC.y > canvas.height
	if (ranNumber == 1){
		context.font = '40px Helvetica';
		//context.strokeText('Pitter', LAC.x, LAC.y);
		context.textAlign = 'center';
		context.fillStyle = '#33CCFF';
		context.fillText('Pitter', LAC.x, LAC.y);
	}
	else if (ranNumber == 0){
		context.font = '25px Helvetica';
		//context.strokeText('Pitter', LAC.x, LAC.y);
		context.fillStyle = '#33CCFF';
		context.fillText('Patter', LAC.x, LAC.y);
	}
	else{
		console.log('waiting to run');
	}
}

//Draws boom when particle explodes
function drawBoomText(particle){
	console.log('draw boom');
	context.font = '30px Helvetica';
	context.textAlign = 'center';
	context.fillStyle = 'red';
	context.fillText('BOOM!', particle.x, particle.y);
}
//End text functions














