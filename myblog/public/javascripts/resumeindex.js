function Resumes() {
	this.slimboxEle = document.getElementById("slimboxs");
	this.skillsEle = document.getElementById("skillss");
	this.skillsLi = this.skillsEle.getElementsByTagName("li");
}
Resumes.prototype = {
	/*显示技能表*/
	skillfunc: function() {
		var _this = this;

		this.slimboxEle.addEventListener("mouseenter", function() {
			_this.skilllineShow();
		}, false);
	},
	/*技能表进度条显示*/
	skilllineShow: function() {
		var _this = this;

		this.skilltimer = 0;
		this.num = 0;
		this.widtharr = ["85%", "75%", "60%", "50%", "80%"];
		this.skilltimer = setInterval(function() {
			_this.skilltime();
		}, 500);
	},
	/*技能进度条时间戳*/
	skilltime: function() {
		this.skillsLi[this.num].style.opacity = "1";
		this.skillsLi[this.num].style.width = this.widtharr[this.num];
		this.skillsLi[this.num].style.transition = "width 2s linear";

		if(this.num < this.skillsLi.length - 1) {
			this.num++;
		} else {
			clearInterval(this.skilltimer);
		}
	},
	/*技能内容展示*/
	skillShow: function() {
		var _this = this;
		this.pcon = [];

		this.skillcon = document.createElement("div");
		this.skillcon.className = "skillcon";

		for(var i = 0; i < 4; i++) {
			this.pcon[i] = document.createElement("p");
			this.pcon[i].innerHTML = "我的技能1";
			this.skillcon.appendChild(this.pcon[i]);
		}

		for(var i = 0; i < this.skillsLi.length; i++) {
			this.skillsLi[i].addEventListener("mouseenter", function() {
				this.appendChild(_this.skillcon);
			}, false);
			this.skillsLi[i].addEventListener("mouseleave", function() {
				_this.skillcon.remove();
			}, false);
		}
	},
	slimunderwrite: function() {
		var _this = this;

		this.canvas = document.getElementById("myCanvas");
		this.cxt = this.canvas.getContext("2d");

		this.i = 0;

		this.tops = 130;
		this.topi = 0;

		this.s = 0;
		this.sback = 280;

		this.d1 = 0;

		this.centers = 0;

		this.d2 = 0;

		this.l = 0;
		this.llast = 197;

		this.d3 = 0;

		this.l2 = 0;

		this.d4 = 0;

		this.d5 = 0;

		this.dm = 0;
		this.lm = 105;

		this.d6 = 0;

		this.l3 = 0;

		this.l4 = 0;

		this.timer = 0;
		this.stimer = 0;

		//颜色渐变
		this.grd = this.cxt.createLinearGradient(0,0,500,2);
		this.colorarr = ["#70f", "#f93", "#f00", "#ccc", "#52d2f2", "#fff77f", "#fe6eeb", "#befc51", "#51fcca", "#0386b7"];

		for(var i = 0; i < 10; i++) {
			this.grd.addColorStop(parseFloat("0." + i), this.colorarr[i]);
		}

		this.cxt.fillStyle = this.grd;

		this.timer = setInterval(function() {
			_this.cxt.fillRect(0, 130, _this.i, 2);
			if(_this.i < 280) {
				_this.i++;
			} else {
				_this.cxt.fillRect(280, _this.tops, 1, _this.topi + 2);
				if(_this.topi < 110) {
					_this.topi++;
					_this.tops--;
				} else {
					_this.cxt.fillRect(_this.sback, 20, _this.s, 2);
					if(_this.s < 100) {
						_this.s++;
						_this.sback--;
					} else {
						_this.cxt.fillRect(180, 20, 2, _this.d1);
						if(_this.d1 < 40) {
							_this.d1++;
						} else {
							_this.cxt.fillRect(180, 60, _this.centers, 2);
							if(_this.centers < 15) {
								_this.centers++;
							} else {
								_this.cxt.fillRect(195, 60, 2, _this.d2);
								if(_this.d2 < 45) {
									_this.d2++;
								} else {
									_this.cxt.fillRect(_this.llast, 105, _this.l, 3);
									if(_this.l < 18) {
										_this.l++;
										_this.llast--;
									} else {
										_this.cxt.fillRect(205, 20, 2, _this.d3);
										if(_this.d3 < 85) {
											_this.d3++;
										} else {
											_this.cxt.fillRect(205, 105, _this.l2, 2);
											if(_this.l2 < 15) {
												_this.l2++;
											} else {
												_this.cxt.fillRect(230, 40, 2, _this.d4);
												if(_this.d4 < 15) {
													_this.d4++;
												} else {
													_this.cxt.fillRect(230, 60, 2, _this.d5);
													if(_this.d5 < 45) {
														_this.d5++;
													} else {
														_this.cxt.fillRect(240, _this.lm, 2, _this.dm);
														if(_this.dm < 60) {
															_this.dm++;
															_this.lm--;
														} else {
															_this.cxt.fillRect(240, 45, _this.d6, 2);
															if(_this.d6 < 30) {
																_this.d6++;
															} else {
																_this.cxt.fillRect(270, 45, 2, _this.l3);
																if(_this.l3 < 60) {
																	_this.l3++;
																} else {
																	_this.cxt.fillRect(255, 45, 2, _this.l4);
																	if(_this.l4 < 55) {
																		_this.l4++;
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}, 16);
	}
}

var resumes = new Resumes();

//实现技能表效果
resumes.skillfunc();

//实现技能表内容
resumes.skillShow();

//实现签名功能
resumes.slimunderwrite();
