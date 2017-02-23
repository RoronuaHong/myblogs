	//1.由于GameMain只执行一次，无法停止GameMain，导致无法重新开始(在Beta0.7版本中已经完美解决，但是结构从Beta0.8开始已经重新搭建过了)
	//2.碰撞问题十分严重
	//3.无法分离各种敌机子弹的速度
	//4.移除子弹会产生莫名其妙的错误
	//5.运行时间一长会变得非常卡顿
	//6.点击重新开始会有残留之前的计时器的BUG
	var worldEle = document.getElementById("worlds");
	var planeEle = document.getElementById("thunderPlanes");
	var thunderBulletEle = document.getElementById("thunderBullets");
	var enemyPlaneEle = document.getElementById("enemyPlanes");
	var enemyBulletEle = document.getElementById("enemyBullets");
	var gamestartEle = document.getElementById("gamestarts");
	var spanstartEle = document.getElementById("start");
	var spanrestarEle = document.getElementById("restart");
	var gamegoalsEle = document.getElementById("goals");
	var gameoverEle = document.getElementById("gameovers");
	var scoreEle = document.getElementById("score");

	var bgPosY = 0;  												   			//设置背景图片初始位置
	var maxX = worldEle.offsetWidth - planeEle.clientWidth;						//获取最大宽度
	var maxY = worldEle.offsetHeight - planeEle.clientHeight;					//获取最大高度
	var myPlaneBullet = [];														//设置雷霆战机子弹的数组
	var myPlaneNum = 0;															//设置雷霆战机的子弹
	var firstEnemyPlanes = [];													//设置原始敌机
	var normalEnemyPlanes = [];													//设置改进版敌机
	var fastEnemyPlanes = [];													//设置直升机	
	var firstEnemyPlanesNum = 1;												//设置原始敌机的数量
	var normalEnemyPlanesNum = 1;												//设置改进版敌机的数量
	var fastEnemyPlanesNum = 1;													//设置直升机的数量
	var enemyBullets = [];														//设置子弹的数组
	var enemyPlaneChangeDirection = -1;											//改变敌机的方向
	var isGamestart = false;													//设置游戏是否开始
	var score = 0;																//设置分数											
	var startTimer = 0;
	var gameOverTimer = 0;

	//设置雷霆战机的基本值
	function ThunderPlane() {
		var thunderPlane_this = this;
		this.thunderPlaneEle = document.getElementById("thunderPlanes");

		this.thunderPlaneWidth = this.thunderPlaneEle.offsetWidth;				//获取雷霆战机的宽度
		this.thunderPlaneHeight = this.thunderPlaneEle.offsetHeight;			//获取雷霆战机的高度
		this.thunderHP = 3;														//设置雷霆战机的生命值
		this.thunderBomb = 3;													//设置雷霆战机的炸弹数量
		this.speedX = 0;														//初始雷霆战机的X轴速度
		this.speedY = 0;														//初始雷霆战机的Y轴速度

		//获取雷霆战机的初始位置 
		this.thunderPosX = parseInt(getStyle(thunderPlane_this.thunderPlaneEle, "left"));
		this.thunderPosY = parseInt(getStyle(thunderPlane_this.thunderPlaneEle, "top"));

		//设置雷霆战机的生命值
		setThunderHP(this.thunderHP);

		//控制战机的移动
		document.onkeydown = function(e) {
			thunderPlane_this.thunderPlaneDirection(e);
		}
		//使战机持续运动
		this.thunderTimer = setInterval(function() {
			thunderPlane_this.thunderPlaneMove();
		}, 16);
	}

	//设置雷霆战机的方向
	ThunderPlane.prototype.thunderPlaneDirection = function(e) {
		this.thunderDirection = -1;                                 			//改变雷霆战机的方向

		if(e.keyCode == 65 || e.keyCode == 37) {
			this.speedX = 3;
			this.speedY = 0;
			if(this.speedX > 0) {
				this.speedX = this.speedX * this.thunderDirection;
			}
		}
		if(e.keyCode == 68 || e.keyCode == 39) {
			this.speedX = 3;
			this.speedY = 0;
			if(this.speedX < 0) {
				this.speedX = this.speedX * this.thunderDirection;
			}
		}
		if(e.keyCode == 87 || e.keyCode == 38) {
			this.speedX = 0;
			this.speedY = 3;
			if(this.speedY > 0) {
				this.speedY = this.speedY * this.thunderDirection;
			}
		}
		if(e.keyCode == 83 || e.keyCode == 40) {
			this.speedX = 0;
			this.speedY = 3;
			if(this.speedY < 0) {
				this.speedY = this.speedY * this.thunderDirection;
			}
		}
	}

	//设置雷霆战机的移动
	ThunderPlane.prototype.thunderPlaneMove = function() {
		this.thunderPosX += this.speedX;
		this.thunderPosY += this.speedY;
		if(this.thunderPosX <= 0) {
			this.thunderPosX = 0;
		}
		if(this.thunderPosX >= maxX) {
			this.thunderPosX = maxX;
		}
		if(this.thunderPosY <= 0) {
			this.thunderPosY = 0;
		} else if(this.thunderPosY >= maxY) {
			this.thunderPosY = maxY;
		}
		this.thunderPlaneEle.style.left = this.thunderPosX + "px";
		this.thunderPlaneEle.style.top = this.thunderPosY + "px";
	}

	//设置雷霆战机的生命值
	function setThunderHP(length) {
		this.thunderUl = document.getElementById("hps");
		this.thunderHPEle = this.thunderUl.getElementsByTagName("li");
		for(var j = 0; j < 5; j++) {
			thunderHPEle[j].style.display = "none";
		}
		for(var i = 0; i < length; i++) {
			thunderHPEle[i].style.display = "block";
		}
	}
	
	//设置雷霆战机子弹的基本值
	function Bullet() {
		var Bullet_this = this;
		this.bulletSum = document.createElement("span");
		thunderBulletEle.appendChild(this.bulletSum);
		this.bulletSpeed = 5;

		//设置雷霆战机子弹的初始位置
		this.bulletPosX = planeEle.offsetLeft + 25;
		this.bulletPosY = planeEle.offsetTop;

		//使每个雷霆战机子弹持续运动
		this.thunderBulletTimer = setInterval(function() {
			Bullet_this.bulletMove();
		}, 16);
	}

	//设置雷霆战机子弹的移动
	Bullet.prototype.bulletMove = function() {
		this.bulletPosY -= this.bulletSpeed;
		this.bulletSum.style.left = this.bulletPosX + "px";
		this.bulletSum.style.top = this.bulletPosY + "px";
		if(parseInt(getStyle(this.bulletSum, "top")) <= 0) {
			thunderBulletEle.removeChild(this.bulletSum);
		}	
	}

	//设置敌机的基本值
	function EnemyPlane(element, enemyHP, bulletSpeed) {
		var EnemyPlane_this = this;
		this.bulletSpeed = bulletSpeed;
		this.enemyPlaneEles = document.createElement(element);
		enemyPlaneEle.appendChild(this.enemyPlaneEles);
		this.enemyBulletNum = 0;

		this.enemyPlaneDirection = Math.pow(-1, Math.floor(Math.random() * 100));			//设置敌机移动的方向
		this.enemySpeedX = Math.floor(Math.random() * 5) * this.enemyPlaneDirection;		//设置敌机X轴的速度
		this.enemySpeedY = Math.floor(Math.random() * 3 + 2);								//设置敌机Y轴的速度
		this.enemyHP = enemyHP;																//设置敌机的生命值
		this.enemyWidth = this.enemyPlaneEles.offsetWidth;									//获取敌机的宽度
		this.enemyHeight = this.enemyPlaneEles.offsetHeight;								//获取敌机的高度

		//设置新的敌机位置
		this.enemyPosX = Math.floor(Math.random() * 541);
		this.enemyPosY = Math.floor(Math.random() * -1000 - 100);
		// this.enemyPosX = parseInt(getStyle(this.enemyPlaneEle, "left"));
		// this.enemyPosY = parseInt(getStyle(this.enemyPlaneEle, "top"));
		
		//使敌机持续运动
		this.enemyPlaneTimer = setInterval(function() {
			EnemyPlane_this.enemyPlaneMove(bulletSpeed);
		}, 16)

		//创建敌机子弹
		this.enemyBulletTimer = setInterval(function() {
			if(EnemyPlane_this.enemyPosY >= 0) {
				enemyBullet[EnemyPlane_this.enemyBulletNum] = new enemyBullet(element, EnemyPlane_this.enemyPlaneEles, EnemyPlane_this.bulletSpeed);
				EnemyPlane_this.enemyBulletNum++;	
			}
		}, 1000);
	}

	//设置敌机的运动
	EnemyPlane.prototype.enemyPlaneMove = function() {
		this.enemyPosX += this.enemySpeedX;
		this.enemyPosY += this.enemySpeedY;
		this.enemyPlaneEles.style.left = this.enemyPosX + "px";
		this.enemyPlaneEles.style.top = this.enemyPosY + "px";
	}

	//设置敌机子弹的基本值
	function enemyBullet(element, enemyPlaneEle, bulletSpeed) {
		var enemyBullet_this = this;
		this.enemybulletSum = document.createElement(element);
		enemyBulletEle.appendChild(this.enemybulletSum);
		this.bulletSpeed = bulletSpeed;

		//当敌机计入视野的时候才开始发射子弹
		if(enemyPlaneEle.offsetTop >= 0) {
			
			//设置敌机子弹的初始位置
			this.enemybulletPosX = enemyPlaneEle.offsetLeft + enemyPlaneEle.offsetWidth / 2 - 5;
			this.enemybulletPosY = enemyPlaneEle.offsetTop + enemyPlaneEle.offsetHeight / 2 + 10;

			this.enemyPlaneMoveTimer = setInterval(function() {
				enemyBullet_this.enemyBulletMove();
			}, 16);
		}
	}

	//设置敌机子弹的运动
	enemyBullet.prototype.enemyBulletMove = function() {
		this.enemybulletPosY += this.bulletSpeed;
		this.enemybulletSum.style.left = this.enemybulletPosX + "px";
		this.enemybulletSum.style.top = this.enemybulletPosY + "px";
		if(parseInt(getStyle(this.enemybulletSum, "top")) >= 860) {
			enemyBulletEle.removeChild(this.enemybulletSum);
		}
	}

	// 设置普通敌机的基本值（继承敌机）
	function normalEnemyPlane(element, enemyHP, bulletSpeed) {
		EnemyPlane.call(this, element, enemyHP, bulletSpeed);
	}

	//设置普通敌机的运动(只继承敌机的方法，如果用new EnemyPlane的话，会导致新建一个undefined标签)
	normalEnemyPlane.prototype = EnemyPlane.prototype;

	//设置直升机的基本值（继承敌机）
	function fastEnemyPlane(element, enemyHP, bulletSpeed) {
		EnemyPlane.call(this, element, enemyHP, bulletSpeed);
	}

	//设置直升机的运动（同上）
	fastEnemyPlane.prototype = EnemyPlane.prototype;
	
	//封装雷霆战机的各个子弹是否有触碰到敌机
	function ThunderBulletImpactEnemyPlane(EnemyPlanesNum, EnemyPlanes, enemyHP, url, size) {	
		scoreEle.innerHTML = score;
		for(var i = 0; i < myPlaneNum; i++) {
			for(var j = 0; j < EnemyPlanesNum; j++) {
				//雷霆战机子弹和敌机的碰撞检测
				if(myPlaneBullet[i].bulletPosX >= EnemyPlanes[j].enemyPosX && myPlaneBullet[i].bulletPosX <= EnemyPlanes[j].enemyPosX + EnemyPlanes[j].enemyWidth) {
					if(myPlaneBullet[i].bulletPosY >= EnemyPlanes[j].enemyPosY && myPlaneBullet[i].bulletPosY <= EnemyPlanes[j].enemyPosY + EnemyPlanes[j].enemyHeight) {

						//防止多次碰撞，让子弹的Y轴等于飞机的Y轴最大值(还是无法解决该问题，偶尔还会产生多次碰撞)
						// myPlaneBullet[i].bulletPosY = EnemyPlanes[j].enemyPosY;

						//清除该子弹的计时器
						// clearInterval(myPlaneBullet[i].thunderBulletTimer);

						//移除该子弹(最大BUG，一旦执行这段，会发生一系列报错，但程序还能正常执行)
						// thunderBulletEle.removeChild(myPlaneBullet[i].bulletSum);
						myPlaneBullet[i].bulletPosX = -1500;
						myPlaneBullet[i].bulletPosY = -1500;

						//敌机的生命值减少
						EnemyPlanes[j].enemyHP--;
						//敌机的生命值为0，飞机爆炸并消失，持续0.2秒
						if(EnemyPlanes[j].enemyHP == 0) {
							var EnemyPlaneFocus = EnemyPlanes[j];
							EnemyPlanes[j].enemyPlaneEles.style.background = "url(/images/thunderplane/hit1.png) 0 0 no-repeat";
							EnemyPlanes[j].enemyPlaneEles.style.backgroundSize = "contain";
							EnemyPlanes[j].enemyHP = enemyHP;

							//设置分数
							if(EnemyPlaneFocus.enemyPosY >= 0) {
								score += 100;
								scoreEle.innerHTML = score;
							}

							//造成延迟（会产生BUG，爆炸的样子还在）
							setTimeout(function() {

								//暂时不做移除（无法持续增加新的敌机，所以仅做重新设定位置处理）
								EnemyPlaneFocus.enemyPlaneEles.style.background = url;
								EnemyPlaneFocus.enemyPlaneEles.style.backgroundSize = size;
								EnemyPlaneFocus.enemyPosX = Math.floor(Math.random() * 541);
								EnemyPlaneFocus.enemyPosY = Math.floor(Math.random() * -1000 - 100);
								EnemyPlaneFocus.enemySpeedX = Math.floor(Math.random() * 5) * EnemyPlaneFocus.enemyPlaneDirection;
								EnemyPlaneFocus.enemySpeedY = Math.floor(Math.random() * 3 + 2);
							}, 40);
						}
					}
				}
			}	
		}
	}

	// 判断敌机子弹碰撞问题 
	function EnemyPlaneBulletImpactThunder(EnemyPlanesNum, enemyPlaneEle, myPlane) {
		// console.log(EnemyPlanesNum)
		for(i = 0; i < EnemyPlanesNum; i++) {
			// console.log(enemyPlaneEle[i].enemyBulletNum)
			for(var j = 0; j < enemyPlaneEle[i].enemyBulletNum; j++) {

				// 判断敌机子弹是否碰撞到雷霆战机(存在问题)
				if(enemyBullet[j].enemybulletPosX >= myPlane.thunderPosX && enemyBullet[j].enemybulletPosX <= myPlane.thunderPosX + myPlane.thunderPlaneWidth) {
					if(enemyBullet[j].enemybulletPosY >= myPlane.thunderPosY && enemyBullet[j].enemybulletPosY <= myPlane.thunderPosY + myPlane.thunderPlaneHeight) {

					// 	//雷霆战机与敌机子弹相碰撞，令子弹的Y坐标等于雷霆战机的Y坐标
					// 	enemyBullet[j].enemybulletPosY = myPlane.thunderPosY;
						myPlane.thunderHP--;

					// 	//如果打到雷霆战机，则移除子弹
					// 	// enemyBulletEle.removeChild(enemyBullet[j].enemybulletSum);

					// 	//因为敌机子弹与雷霆战机多次发生碰撞检测，所以暂时改变子弹的位置
						enemyBullet[j].enemybulletPosX = 1000;
						enemyBullet[j].enemybulletPosY = 1000;
						// console.log(myPlane.thunderHP)
						setThunderHP(myPlane.thunderHP);
					}
				}
			}			
		}
	}

	//判断敌机是否撞击到雷霆战机(已解决)
	function EnemyPlaneImpactThunder(EnemyPlanesNum, EnemyPlanes, enemyHP, url, size) {
		for(var i = 0; i < EnemyPlanesNum; i++) {
			if((myPlane.thunderPosX >= EnemyPlanes[i].enemyPosX && myPlane.thunderPosX <= EnemyPlanes[i].enemyPosX + EnemyPlanes[i].enemyWidth) || (myPlane.thunderPosX + myPlane.thunderPlaneWidth >= EnemyPlanes[i].enemyPosX && myPlane.thunderPosX + myPlane.thunderPlaneWidth <= EnemyPlanes[i].enemyPosX + EnemyPlanes[i].enemyWidth)) {
				if((myPlane.thunderPosY >= EnemyPlanes[i].enemyPosY && myPlane.thunderPosY <= EnemyPlanes[i].enemyPosY + EnemyPlanes[i].enemyHeight) || myPlane.thunderPosY + myPlane.thunderPlaneHeight >= EnemyPlanes[i].enemyPosY && myPlane.thunderPosY + myPlane.thunderPlaneHeight <= EnemyPlanes[i].enemyPosY + EnemyPlanes[i].enemyHeight) {
					var EnemyPlaneFocus = EnemyPlanes[i];

					//设置分数
					if(EnemyPlanes[i].enemyPosY >= 0) {
						score += 100;
						scoreEle.innerHTML = score;
					}

					//当敌机触碰到雷霆战机时，敌机的Y坐标等于雷霆战机的Y坐标
					EnemyPlanes[i].enemyPosY = myPlane.thunderPosY - myPlane.thunderHeight;
					
					//设置飞机爆炸的图片
					EnemyPlanes[i].enemyPlaneEles.style.background = "url(/images/thunderplane/hit1.png) 0 0 no-repeat";
					EnemyPlanes[i].enemyPlaneEles.style.backgroundSize = "contain";

					myPlane.thunderHP--;

					//设置生命值
					setThunderHP(myPlane.thunderHP);

					setTimeout(function() {
						EnemyPlaneFocus.enemyHP = enemyHP;
						// worldEle.removeChild(EnemyPlanes[i].enemyPlaneEle)

						//因为无法删除enemyPlane对象，所以采用
						EnemyPlaneFocus.enemyPlaneEles.style.background = url;
						EnemyPlaneFocus.enemyPlaneEles.style.backgroundSize = size;
						EnemyPlaneFocus.enemyPosX = Math.floor(Math.random() * 541);
						EnemyPlaneFocus.enemyPosY = -100;
					}, 200);		
				}
			}
		}
	}
		
	//判断敌机是否超出边界，如果超出，重新设置敌机的位置
	function EnemyPlaneChangeDirection(EnemyPlanesNum, EnemyPlanes, enemyHP) {
		for(var j = 0; j < EnemyPlanesNum; j++) {
			if(EnemyPlanes[j].enemyPosX >= 540 || EnemyPlanes[j].enemyPosX < 0) {
				EnemyPlanes[j].enemySpeedX = EnemyPlanes[j].enemySpeedX * enemyPlaneChangeDirection;
			}
			if(EnemyPlanes[j].enemyPosY >= 860) {
				EnemyPlanes[j].enemyPosX = Math.floor(Math.random() * 541);
				EnemyPlanes[j].enemyPosY = Math.floor(Math.random() * -1000 - 100);
				EnemyPlanes[j].enemySpeedX = Math.floor(Math.random() * 5) * EnemyPlanes[j].enemyPlaneDirection;
				EnemyPlanes[j].enemySpeedY = Math.floor(Math.random() * 3 + 2);
				EnemyPlanes[j].enemyHP = enemyHP;
			}		
		}
	}

	//游戏开始函数Start
	function Start() {

		//背景图片运动	
		worldEle.style.background = "url(/images/thunderplane/bg1.jpg) 0 " + this.bgPosY + "px";	
		bgPosY++;
		if(bgPosY >= 854) {
			bgPosY = 0;
		}

		//判断敌机是否超出边界
		EnemyPlaneChangeDirection(firstEnemyPlanesNum, firstEnemyPlanes, 1);
		EnemyPlaneChangeDirection(normalEnemyPlanesNum, normalEnemyPlanes, 2);
		EnemyPlaneChangeDirection(fastEnemyPlanesNum, fastEnemyPlanes, 5);

		//雷霆战机的各个子弹是否有触碰到敌机(由于enemyHP本来要设置为firstEnemyPlanes[0].enemyHP，但是由于自减，导致生命值在赋值过程中出现重大BUG)
		ThunderBulletImpactEnemyPlane(firstEnemyPlanesNum, firstEnemyPlanes, 1, "url(/images/thunderplane/enemyPlane1.png) 0 0 no-repeat", "contain");
		ThunderBulletImpactEnemyPlane(normalEnemyPlanesNum, normalEnemyPlanes, 2, "url(/images/thunderplane/enemyPlane2.png) 0 0 no-repeat", "342%");
		ThunderBulletImpactEnemyPlane(fastEnemyPlanesNum, fastEnemyPlanes, 5, "url(/images/thunderplane/enemyPlane3.png) 0 0 no-repeat", "contain");
		
		//敌机子弹碰撞到雷霆战机进行判断
		EnemyPlaneBulletImpactThunder(firstEnemyPlanesNum, firstEnemyPlanes, myPlane);		
		EnemyPlaneBulletImpactThunder(normalEnemyPlanesNum, normalEnemyPlanes, myPlane);
		EnemyPlaneBulletImpactThunder(fastEnemyPlanesNum, fastEnemyPlanes, myPlane);

		//判断敌机是否碰撞到雷霆战机
		EnemyPlaneImpactThunder(firstEnemyPlanesNum, firstEnemyPlanes, 1, "url(/images/thunderplane/enemyPlane1.png) 0 0 no-repeat", "contain", "contain");
		EnemyPlaneImpactThunder(normalEnemyPlanesNum, normalEnemyPlanes, 2, "url(/images/thunderplane/enemyPlane2.png) 0 0 no-repeat", "contain", "contain");
		EnemyPlaneImpactThunder(fastEnemyPlanesNum, fastEnemyPlanes, 5, "url(/images/thunderplane/enemyPlane3.png) 0 0 no-repeat", "contain", "contain");

		//判断雷霆战机的生命值，如果小于0，游戏结束
		gameOverTimer = setInterval(function() {
			if(myPlane.thunderHP <= 0) {

				// 计时器太多，导致要清理的时候非常麻烦
				clearInterval(startTimer);
				clearInterval(myPlane.thunderTimer)
				for(var i = 0; i < myPlaneNum; i++) {
					clearInterval(myPlaneBullet[i].thunderBulletTimer);
				}
				for(var i = 0; i < firstEnemyPlanesNum; i++) {
					clearInterval(firstEnemyPlanes[i].enemyPlaneTimer);
					clearInterval(firstEnemyPlanes[i].enemyBulletTimer);
				}
				for(var i = 0; i < normalEnemyPlanesNum; i++) {
					clearInterval(normalEnemyPlanes[i].enemyPlaneTimer);
					clearInterval(normalEnemyPlanes[i].enemyBulletTimer);
				}
				for(var i = 0; i < fastEnemyPlanesNum; i++) {
					clearInterval(fastEnemyPlanes[i].enemyPlaneTimer);
					clearInterval(fastEnemyPlanes[i].enemyBulletTimer);
				}
				gameoverEle.style.display = "block";
				thunderBulletEle.innerHTML = "";
				enemyPlaneEle.innerHTML = "";
				enemyBulletEle.innerHTML = "";
				score = 0;
				scoreEle.innerHTML = "";
			}	
		}, 16)
	}

	//主函数GameMain
	function GameMain() {
		startTimer = setInterval(Start, 16);
		//创建一个雷霆战机
		myPlane = new ThunderPlane();

		// 发射子弹
		document.onkeyup = function(e) {
			if(e.keyCode == 74 || e.keyCode == 32) {
				myPlaneBullet[myPlaneNum] = new Bullet();
				myPlaneNum++;
			}
		}

		//设置原始敌机
		for(var i = 0; i < firstEnemyPlanesNum; i++) {
			firstEnemyPlanes[i] = new EnemyPlane("span", 1, 5);
		}

		//设置改进版敌机
		for(var i = 0; i < normalEnemyPlanesNum; i++) {
			normalEnemyPlanes[i] = new normalEnemyPlane("em", 2, 7);
		}
		
		//设置直升机
		for(var i = 0; i < fastEnemyPlanesNum; i++) {
			fastEnemyPlanes[i] = new fastEnemyPlane("strong", 5, 9);
		}
	}

	spanstartEle.onclick = function() {
		gamestartEle.style.display = "none";

		//设置游戏开始
		GameMain();
	}
	spanrestarEle.onclick = function() {
		gameoverEle.style.display = "none";
		clearInterval(gameOverTimer)
		GameMain();
	}