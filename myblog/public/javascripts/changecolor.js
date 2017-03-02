
var levels = 1;
var clickSum = 0;
function boxObject(level) {
	var _this = this;
	this.isChange = true;
	this.num = 0;
	this.level = level;
	this.boxEle = document.getElementById("boxs");
	this.spanEles = this.boxEle.getElementsByTagName("span");
	this.emEle = document.getElementById("theLevel");
	this.strongEle = document.getElementById("restart");
	this.goalsEle = document.getElementById("goals");

	this.emEle.innerHTML = "关卡：" + levels;
	this.goalsEle.innerHTML = "记录：" + clickSum;
	for(var i = 0; i < this.level * this.level; i++) {
		this.spanEle = document.createElement("span");
		this.spanEle.style.width = _this.boxEle.offsetWidth / level + "px";
		this.spanEle.style.height = _this.boxEle.offsetHeight / level + "px";
		this.boxEle.appendChild(_this.spanEle);
	}
	for(var i = 0; i < this.level * this.level; i++) {
		this.spanEles[i].judge = false;
		this.spanEles[i].index = i;
		this.spanEles[i].onclick = function(e) {
			clickSum++;
			_this.change(e, e.target.index);
			if(e.target.index % _this.level != 0) {
				_this.change(e, e.target.index - 1);
			}
			if((e.target.index + 1) % _this.level != 0) {
				_this.change(e, e.target.index + 1);
			}
			if(e.target.index >= _this.level) {
				_this.change(e, e.target.index - _this.level);
			}
			if(e.target.index <= _this.level * (_this.level - 1) - 1) {
				_this.change(e, e.target.index + _this.level);
			}
			var num = 0;
			for(var j = 0; j < _this.level * _this.level; j++) {
				if(_this.spanEles[j].className == "select") {
					num++;
				}
			}
			if(num == levels * levels) {
				levels++;
				_this.boxEle.innerHTML = "";
				new boxObject(levels);
			}
			_this.emEle.innerHTML = "关卡：" + levels;
			_this.goalsEle.innerHTML = "记录：" + clickSum;
		}
	}
	this.strongEle.onclick = function() {
		levels = 1;
		clickSum = 0;
		_this.boxEle.innerHTML = "";
		_this.emEle.innerHTML = "关卡：" + levels;
		_this.goalsEle.innerHTML = "记录：" + clickSum;
		new boxObject(levels);
	}
}
boxObject.prototype.change = function(e, index) {
	if(this.spanEles[index].judge) {
		this.spanEles[index].className = "";
		this.spanEles[index].judge = false;
	} else {
		this.spanEles[index].className = "select";
		this.spanEles[index].judge = true;
	}
}
new boxObject(levels);