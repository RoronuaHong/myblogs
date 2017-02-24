//1.怎么绑定点击事件？
//2.物体碰撞检测的完美代码
//3.怎么设置图片？
var canvasEle = document.getElementById("canvass");
var context = canvasEle.getContext("2d");


var moveBoxPosX = 0;
var moveBoxPosY = 580;
var moveBoxSpeed = 40;
var ballIsStart = false;

var ballPosX = 50;
var ballPosY = 570;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballDirection = -1;
var timer = 0;

var fixedBoxPosX = [];
var fixedBoxPosY = [];
var fixedBoxMoveX = 5;
var fixedBoxMoveY = 0;
var isTouch = [];
var score = 0;
for(var i = 0; i < 50; i++) {
	isTouch[i] = false;
}

// //设置固定块的位置
// for(var i = 0; i < 50; i++) {
// 	fixedBoxPosX[i] = fixedBoxMoveX;
// 	fixedBoxPosY[i] = fixedBoxMoveY;

// 	fixedBoxMoveX += 120;
// 	if(fixedBoxMoveX >= 550) {
// 		fixedBoxMoveY += 30;
// 		fixedBoxMoveX = 5;
// 	}
// 	context.fillStyle = "skyblue";
// 	context.beginPath();
// 	context.fillRect(fixedBoxPosX[i], fixedBoxPosY[i], 110, 20);
// 	context.closePath();
// }

function start() {
	var fixedBoxMoveX = 5;
	var fixedBoxMoveY = 0;

	//控制移动块的位置
	document.onkeydown = function(e) {
		switch(e.keyCode) {
			case 65: case 37:
				moveBoxPosX -= moveBoxSpeed;
				if(!ballIsStart) {
					ballPosX -= moveBoxSpeed;
				}
				break;
			case 68: case 39:
				moveBoxPosX += moveBoxSpeed;
				if(!ballIsStart) {
					ballPosX += moveBoxSpeed;
				}
				break;
			case 32:
				ballIsStart = true;
				break;
		}
	}

	//判断是否超出边界
	if(moveBoxPosX <= 0) {
		moveBoxPosX = 0;
		if(!ballIsStart) {
			ballPosX = 50;
		}
	}
	if(moveBoxPosX + 100 >= 600) {
		moveBoxPosX = 500;
		if(!ballIsStart) {
			ballPosX = 550;
		}
	}
	context.clearRect(0, 0, 600, 700);

	//绘制分数区
	context.fillStyle = "#f8f";
	context.font = "30px Microsoft YaHei";
	context.beginPath();
	context.fillText("分数：" + score, 230, 670);
	context.closePath();

	//绘制小球
	context.fillStyle = "#f93";
	context.beginPath();
	context.arc(ballPosX, ballPosY, 10, 0, Math.PI * 2, true);
	context.fill();
	context.closePath();

	//绘制移动块
	context.fillStyle = "#70f";
	context.beginPath();
	context.fillRect(moveBoxPosX, moveBoxPosY, 100, 20);
	context.closePath();


	//设置固定块的位置 
	for(var i = 0; i < 30; i++) {
		if(!isTouch[i]) {
			if(fixedBoxPosX[i] != -100 && fixedBoxPosY[i] != -100) {
			fixedBoxPosX[i] = fixedBoxMoveX;
			fixedBoxPosY[i] = fixedBoxMoveY;
				
			}

			fixedBoxMoveX += 120;
			if(fixedBoxMoveX >= 550) {
				fixedBoxMoveY += 50;
				fixedBoxMoveX = 5;
				if(fixedBoxMoveY >= 250) {
					fixedBoxMoveY = 250;
				}
			}
			context.fillStyle = "skyblue";
			context.beginPath();
			context.fillRect(fixedBoxPosX[i], fixedBoxPosY[i], 110, 20);
			context.closePath();
		}
	}

	if(ballIsStart) {

		// 判断小球是否触碰到移动块
		if(ballPosX >= moveBoxPosX && ballPosX <= moveBoxPosX + 100) {
			if(ballPosY + 10 >= moveBoxPosY) {
				ballSpeedY = ballSpeedY * ballDirection; 
			}
		}
		if(ballPosY + 10 >= moveBoxPosY && ballPosY + 10 <= moveBoxPosY + 20) {
			if((ballPosX <= moveBoxPosX && ballPosX >= moveBoxPosX - 5) || (ballPosX >= moveBoxPosX + 100 && ballPosX <= moveBoxPosX + 105))
				ballSpeedX = ballSpeedX * ballDirection; 
		}
		if(ballPosX <= 10 || ballPosX >= 590) {
			ballSpeedX = ballSpeedX * ballDirection;
		}
		if(ballPosY <= 10) {
			ballSpeedY = ballSpeedY * ballDirection;
		}
		ballPosX -=  ballSpeedX;
		ballPosY += ballSpeedY;

		//判断小球是否触碰到固定块
		for(var i = 0; i < 30; i++) {
			if(ballPosX >= fixedBoxPosX[i] && ballPosX <= fixedBoxPosX[i] + 100) {
				if((ballPosY - 10 <= fixedBoxPosY[i] + 20 && ballPosY - 10 >= fixedBoxPosY[i]) || (ballPosY + 10 >= fixedBoxPosY[i] && ballPosY + 10 <= fixedBoxPosY[i] + 20)) {
					ballSpeedY = ballSpeedY * ballDirection; 
					context.clearRect(fixedBoxPosX[i], fixedBoxPosY[i], 110, 20);

					//把固定块的位置坐标移到外面（不知道怎么移除位置）
					fixedBoxPosX[i] = -100;
					fixedBoxPosY[i] = -100;

					//增加小球速度
					if(ballSpeedX >= 0) {
						ballSpeedX += 0.3;
					} else {
						ballSpeedX -= 0.3;
					}
					if(ballSpeedY >= 0) {
						ballSpeedY += 0.3;
					} else {
						ballSpeedY -= 0.3;
					}
					isTouch = true;
					score++;
					if(score == 30) {
						clearInterval(timer);
						context.fillStyle = "skyblue";
						context.beginPath();
						context.fillRect(0, 0, 600, 700);
						context.closePath();

						context.fillStyle = "#fff";
						context.font = "80px Microsoft YaHei";
						context.beginPath();
						context.fillText("YOU WIN!!!", 100, 350);
						context.closePath();
					}
				}
			}
		}

		//判断小球是否出界
		if(ballPosY + 10 > 620) {
			clearInterval(timer);
			context.fillStyle = "#f93";
			context.beginPath();
			context.fillRect(0, 0, 600, 700);
			context.closePath();

			//绘制分数区
			context.fillStyle = "#fff";
			context.font = "50px Microsoft YaHei";
			context.beginPath();
			context.fillText("GAME OVER", 160, 200);
			context.fillText("分数：" + score, 200, 400);
			context.closePath();

			context.strokeStyle = "#fff";
			context.beginPath();
			context.rect(170, 550, 240, 65);
			context.fillText("重新开始", 190, 600);
			context.stroke();
			context.closePath();

			document.onclick = function(e) {
				if(e.offsetX >= 170 && e.offsetX <= 410) {
					if(e.offsetY >= 550 && e.offsetY <= 615) {
						context.clearRect(0, 0, 600, 700);
						moveBoxPosX = 0;
						moveBoxPosY = 580;
						moveBoxSpeed = 40;
						ballIsStart = false;

						ballPosX = 50;
						ballPosY = 570;
						ballSpeedX = 5;
						ballSpeedY = 5;
						ballDirection = -1;
						timer = 0;

						fixedBoxPosX = [];
						fixedBoxPosY = [];
						fixedBoxMoveX = 5;
						fixedBoxMoveY = 0;
						isTouch = [];
						score = 0;
						for(var i = 0; i < 50; i++) {
							isTouch[i] = false;
						}
						timer = setInterval(start, 16);
					}
				}

				// timer = setInterval(start, 16);
			}
		}
	}
}
timer = setInterval(start, 16);