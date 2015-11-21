//Global variables
var canvas;
var context;
var linesAndCircles;
var timer;

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

	//var playButton will be the button that when clicked initializes the game.
	//In this case use the playButton element from the HTML.
	var playButton = document.getElementById('playButton');
	
	//when the var playButton is clicked the runGame function is called.
	//Cannot pass titleImages as a parameter. runGame(titleImage) doesn't work.
	//Instead clear the canvas in the next function to clear the title image.
	playButton.onclick = clearScreen;	
}




//Begin Line and Circle functions
//function makeLinesAndCircles will, as the name implies, make lines and circles
//Both lines and circles must share the same function as to share the same values from the constructor function constructLineAndCircle
//The drawn results will be a rain drop
function makeLinesAndCircles(){
	//This array will house each triangle and semi-circle to be drawn
	linesAndCircles = [];
	
	//Fill the array calling the constructor function constructLineAndCircle
	//Make i < # of how many rain drops desired
	for (var i = 0; i < 20; i++){
		console.log('Push');
		linesAndCircles.push(new constructLineAndCircle());
	}
}

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
			LAC.y  = 0;
			LAC.y2 = LAC.y - 5;
			LAC.yCirc = LAC.y - 1;
		} 
	}
	
/*Line and Circle reference
	Line
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(148,55);
	context.lineTo(150,50);
	context.lineTo(152,55);
	context.lineTo(148,55);
	context.lineJoin = 'round';
	context.strokeStyle = '#33CCFF';
	context.fillStyle = '#33CCFF';
	context.stroke();
	context.fill();
		
	Circle
	context.beginPath();
	context.arc(150,54,2,0,degreesToRadians(180),false);
	context.fillStyle = '#33CCFF';
	context.strokeStyle = '#33CCFF';
	context.fill();
	context.stroke();
*/
}

//Both lines and circles will share the same constructor function as they share some coordinates
function constructLineAndCircle(){
	//Line Use
	this.width = 1;
	this.x = Math.floor(Math.random() * canvas.width);
	this.y = Math.random() * canvas.height;
	//x2 is also the starting x location for each semi-circle
	this.x2 = this.x + 2;
	this.y2 = this.y - 5;
	this.x3 = this.x + 4;
	//this.y3 = this.y;
	//this.x4 = this.x;
	//this.y4 = this.y;
	this.color = '#33CCFF';
	
	//Circle Use
	//this.xCirc = this.x2;
	this.yCirc = this.y - 1;
	this.radius = 2;
	this.angle = degreesToRadians(180);
	
	//motion
	this.fallingSpeed = 4;
}
//End Line and Circle functions




//Begin Particle functions
//This function will create and fill an array called particles
//It will also draw them to the canvas
function makeParticles(){
	var particles = [];
	
	//This for loop fills the particles array
	for(var i = 0; i < 50; i++){
		particles.push(new constructParticle());
	}
	
	//This for loop draws the particles in the particles array
	for(var i = 0; i < particles.length; i++){
		var particle = particles[i];
		context.beginPath();
		context.arc(particle.x, particle.y, particle.radius, 0, degreesToRadians(360), true);
		context.fillStyle = particle.color;
		context.fill();
	}
}

//This constructor function will define a particle's attributes.
function constructParticle(){
	this.x = Math.random()*canvas.width;
	this.y = Math.random()*canvas.height;
	this.radius = 2;
	this.color = '#33CCFF';
}
//End particle functions



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




function runGame(){
	console.log('runGame');
	//makeParticles();
	makeLinesAndCircles();
	timer = setInterval(drawLinesAndCircles, 50);
}

















