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
			_this.skillline();
		}, false);
	},
	/*技能表进度条*/
	skillline: function() {
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
			this.skillsLi[i].addEventListener("mouseenter", function(){
				this.appendChild(_this.skillcon);
			}, false);
			this.skillsLi[i].addEventListener("mouseleave", function(){
				_this.skillcon.remove();
			}, false);
		}
		// for(var i = 0; i < this.skillsLi.length - 1; i++) {
		// 	this.skillsLi[i].append()
		// }
	}
}

var resumes = new Resumes();

//实现技能表效果
resumes.skillfunc();

//实现技能表内容
resumes.skillShow();
