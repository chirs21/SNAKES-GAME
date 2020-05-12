var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

const box=26;

let snake = [];
// Head Element Initial Position
snake[0] ={
	x: 9*box,
	y: 10*box
}
// Food Element Position
let food={
	x: Math.floor(Math.random()*17+1)* box,
	y: Math.floor(Math.random()*15+3)* box
}	
// Function for sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.style.display = "none";
    this.play = function(){
        this.sound.play();
    }    
}
var eat= new sound("audio/eat.mp3");  		//eat sound
var dead= new sound("audio/dead.mp3");		//game over sound

let score=0;
var d,i; 

document.addEventListener("keydown", direction);   //event for keypress

// check direction of pressed key
function direction(){
	if(event.keyCode == 37 && d!="RIGHT"){
		d="LEFT";
		move.play();
	}
	else if(event.keyCode == 38 && d!="DOWN"){
		d="UP";
		move.play();
	}
	else if(event.keyCode == 39  && d!="LEFT"){
		d="RIGHT";
		move.play();
	}
	else if(event.keyCode == 40  && d!="UP"){
		d="DOWN";
		move.play();
	}
}

function draw(){
	c.clearRect(0,0,window.innerWidth, window.innerHeight);
	//Storing snake blocks in array
	for(i=0;i<snake.length;i++){
		if(i%2==0)
		{
			c.fillStyle ="indigo";
		}
		else
		{
			c.fillStyle= "yellow";
		}

		c.fillRect(snake[i].x, snake[i].y, box, box);
		c.strokeStyle = "white";
        c.strokeRect(snake[i].x,snake[i].y,box,box);

	}
	c.fillStyle ="red";
	c.fillRect(food.x, food.y, box, box);

	//storing initial head coordinates
	let snakeX= snake[0].x;
	let snakeY= snake[0].y;

	
	if(d=="LEFT")
	{
		snakeX-=box;
	}
	else if(d=="UP")
	{
		snakeY-=box;
	}
	else if(d=="RIGHT")
	{
		snakeX+=box;
	}
	else if(d=="DOWN")
	{
		snakeY+=box;
	}

	//Check for Self Collision
	function collision(newHead, snake){
		for(i=0;i<snake.length;i++)
		{
			if(newHead.x==snake[i].x && newHead.y==snake[i].y)
			{
				return true;
			}
		}
		return false;
	}

	//Check for food eat
	if(snakeX==food.x && snakeY==food.y)
	{
		eat.play();
		score+=1;
		food=
		{
			x: Math.floor(Math.random()*17+1)* box,
			y: Math.floor(Math.random()*15+3)* box
		}
	}
	else
	{
		//Removing a block from snake array
		snake.pop();
	}
	let newHead={
		x: snakeX,
		y: snakeY
	}	
	//Check for GameOver
	if(snakeX<0 || snakeX>=(window.innerWidth-20) || snakeY<0 || snakeY>= 29*box || collision(newHead, snake)){
		dead.play();
		clearInterval(game);
		c.beginPath();
		c.fillStyle = "black";
		c.font = "30px CHANGA ONE";
		c.fillText("GAME OVER!" , (window.innerWidth-20)/2 - 55 , (window.innerHeight-20)/2 - 30);
		c.fillText("Score : " + score , (window.innerWidth-20)/2 - 15 , (window.innerHeight-20)/2 );
	}
	//Adding a block in snake array
	snake.unshift(newHead);
}

let game=setInterval(draw,100);