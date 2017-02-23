
	/**
 	 * [MyCanvas 绘制画布]
 	 */
	function MainGame() {
		this.canvasEle = document.getElementById("mycanvas");
		this.contexts = this.canvasEle.getContext("2d");
		this.imgs = document.getElementById("canvasimg");
		this.whites = document.getElementById("canvaswhiteimg");

		new DrawImages(this.contexts, this.imgs, this.whites);
	}

	/**
	 * [onload description]
	 * @return {[type]} [description]
	 */
	new MainGame();

	/**
	 * [DrawImages 绘制图片]
	 * @param {[type]} ctx [画布设置]
	 * @param {[type]} img [图片设置]
	 */

	/**
	 * [ChangeOrder 绘制图像]
	 * @param {[type]} ctx      [画布设置]
	 * @param {[type]} img      [图片设置]
	 * @param {[type]} whites   [白块设置]
	 * @param {[type]} sumarray [顺序设置]
	 * @param {[type]} newarray [打乱顺序设置]
	 * @param {[type]} firsttime [刷新页面设置]
	 */
	function ChangeOrder(ctx, img, whites, oldarray, sumarray, newarray, firsttime) {
		for(var i = 0; i < sumarray.length; i++) {
			ctx.drawImage(img, newarray[i] % 3 * 200, Math.floor(newarray[i] / 3) * 200, 200, 200, Math.floor(i % 3) * 200, Math.floor(i / 3) * 200, 200, 200);

			//将最后一个变为白色
			if(newarray[i] == 8) {
				ctx.drawImage(whites, 0, 0, 100, 200, Math.floor(i % 3) * 200, Math.floor(i / 3) * 200, 200, 200);
			}

		}
		//判断是否排序成功
		if(oldarray.toString() === newarray.toString()) {
			alert("通关啦！");
		}
	}

	//生成九个，隐藏一个，插入数组中
	// ctx.drawImage(img, 0,   0,   200, 200, 0,   0, 	200, 200);
	// ctx.drawImage(img, 200, 0,   200, 200, 200, 0, 	200, 200);
	// ctx.drawImage(img, 400, 0,   200, 200, 400, 0, 	200, 200);
	// ctx.drawImage(img, 0,   200, 200, 200, 0,   200, 200, 200);
	// ctx.drawImage(img, 200, 200, 200, 200, 200, 200, 200, 200);
	// ctx.drawImage(img, 400, 200, 200, 200, 400, 200, 200, 200);
	// ctx.drawImage(img, 0,   400, 200, 200, 0,   400, 200, 200);
	// ctx.drawImage(img, 200, 400, 200, 200, 200, 400, 200, 200);
	// ctx.drawImage(img, 400, 400, 200, 200, 400, 400, 200, 200);

	function DrawImages(ctx, img, whites) {
		var _this = this;

		//设置数值参数
		this.sumarray = [];

		//老顺序
		this.oldarray = [];

		//新顺序
		this.newarray = [];

		//随机生成9个位置
		for(var i = 0; i < 9; i++) {
			this.sumarray[i] = i;
			this.oldarray[i] = i;
		}

		console.log(this.oldarray);

		//打乱顺序
		for(var i = 0; i < 9; i++) {
			this.sumarray.sort(function() {
				return 0.5 - Math.random();
			});
		}

		for(var i = 0; i < this.sumarray.length; i++) {
			this.newarray.push(this.sumarray[i]);
		}
		new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, true);

		console.log(this.newarray);

		document.onkeyup = function(e) {
			_this.KeyMoveBlock(ctx, img, whites, e);
		}

		document.onmousedown = function(e) {
			_this.MouseMove(ctx, img, whites, e);
		}
	}

	//移动拼图方块
	DrawImages.prototype = {
		//判断空白格的位置
		WhitePosition: function() {
			for(var i = 0; i < this.newarray.length; i++) {
				if(this.newarray[i] == 8) {
					this.whitecheck = i;
				}
			}
		},

		/**
		 * [ChangePosition 交换位置]
		 * @param {[type]} newposition [按钮方向位置]
		 * @param {[type]} whitecheck  [白块位置]
		 */
		ChangePosition: function(newposition, whitecheck) {
			this.temp = this.newarray[newposition];
			this.newarray[newposition] = this.newarray[whitecheck];
			this.newarray[whitecheck] = this.temp;
		},
		KeyMoveBlock: function(ctx, img, whites, e) {
			this.WhitePosition();

			switch(e.keyCode) {
				case 87:case 38:
					this.newbottom = this.whitecheck + 3;

					//交换位置
					if(this.whitecheck / 3 < 2) {
						this.ChangePosition(this.newbottom, this.whitecheck);

						//重新绘制新图像
						new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, false);
					};
					break;
				case 83: case 40:
					this.newtop = this.whitecheck - 3;

					//交换位置
					if(this.whitecheck / 3 >= 1) {
						this.ChangePosition(this.newtop, this.whitecheck);

						//重新绘制新图像
						new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, false);
					};
					break;
				case 65: case 37:
					this.newright = this.whitecheck + 1;

					//交换位置
					if(this.whitecheck % 3 != 2) {
						this.ChangePosition(this.newright, this.whitecheck);

						//重新绘制新图像
						new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, false);
					};
					break;
				case 68:case 39:
					this.newleft = this.whitecheck - 1;

					//交换位置
					if(this.whitecheck % 3 != 0) {
						this.ChangePosition(this.newleft, this.whitecheck);

						//重新绘制新图像
						new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, false);
					};
					break;
			}
		},
		// 鼠标点击交换位置
		MouseMove: function(ctx, img, whites, e) {
			e.preventDefault();
			this.WhitePosition();

			//获取鼠标点击的下标
			this.arrays = parseInt(e.offsetX / 200) + parseInt(e.offsetY / 200) * 3;

			//判断点击的子格周围是否有空白格
			if(this.newarray[this.arrays - 1] === (this.newarray.length - 1) && (this.arrays - 1) % 3 !== 2) {
				this.ChangePosition(this.arrays, this.whitecheck);
			}
			if(this.newarray[this.arrays + 1] === (this.newarray.length - 1) && (this.arrays + 1) % 3 !== 0) {
				this.ChangePosition(this.arrays, this.whitecheck);
			}

			if(this.newarray[this.arrays + 3] === (this.newarray.length - 1) || this.newarray[this.arrays - 3] === (this.newarray.length - 1)) {
				this.ChangePosition(this.arrays, this.whitecheck);
			}
			//重新绘制新图像
			new ChangeOrder(ctx, img, whites, this.oldarray, this.sumarray, this.newarray, false);
		}
	}