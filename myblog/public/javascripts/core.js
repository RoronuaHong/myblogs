//放在头部
//目录
//1.getEleByClass 通过类名获取标签
//2.getStyle 获取CSS样式
//3.addClass 添加类名
//4.deleteClass 删除类名
//5.随机数
//6.事件对象兼容处理
//7.阻止默认事件兼容处理


/*
 * [getEleByClass 通过类名获取标签]
 * @param  {[字符串]} className [要获取的标签类名]
 * @param  {[字符串]} tagName   [要获取的标签名]
 * @return {[字符串]} proVal    [获取标签的结果]
 * @date 2016.1.7
 * @author RH
 * @demo getEleByClass("con", "div");
 */
function getEleByClass(className, tagName) {
    var allEle = document.getElementsByTagName(tagName);
    var arr = [];
    var len = allEle.length;

    for(var i = 0; i <len; i++) {
        if( allEle[i].className == className) {
        	//(往数组尾部添加内容)
            arr.push(allEle[i]);   
        }
    }
    return arr;
}
/*
 *[getStyle 获取CSS样式]
 * @param  {[字符串]} eleObj   [要获取的对象]
 * @param  {[字符串]} property [要获取的标签名]
 * @return {[样式]}   proVal   [获取标签的结果]
 * @date 2016.1.11
 * @author RH
 * @demo getEleByClass(boxEle, "backgroundColor");
 */
function getStyle(eleObj, property) {
	var proVal = 0;
	//兼容处理
	if(document.defaultView) {
	     proVal = document.defaultView.getComputedStyle(eleObj)[property];
	} else {
	     proVal  = eleObj .currentStyle[property];
	}
	return proVal;
}
/*
 *[addClass 添加类名]
 * @param  {[字符串]} eleObj   [要添加的对象]
 * @param  {[字符串]} className [要获取的标签名]
 * @return {[样式]}   proVal   [获取标签的结果]
 * @date 2016.1.11
 * @author RH
 * @demo getEleByClass(boxEle, "show");
 */
function addClass(eleObj,className) {
	eleObj.className += " " + className;
	return eleObj.className;
}

/*
 *[removeClass 删除类名]
 * @param  {[字符串]} eleObj   [要删除的对象]
 * @param  {[字符串]} className [要删除的标签名]
 * @return {[样式]}      [获取标签的结果]
 * @date 2016.1.11
 * @author RH
 * @demo getEleByClass(boxEle, "show");
 */

function removeClass(eleObj,className) {
	var j = 0;
	var getClass = [" "];
	for(var i = 0; i < eleObj.className.length; i++) {
		if(eleObj.className[i] != " ") {
			getClass[j] += eleObj.className[i];
		} else {
			j++;
			getClass[j] = " ";	
		}
	} 
	eleObj.className = "";
	for(var a = 0;a <= j; a++) {
		if(getClass[a] != " "+ className) {
			eleObj.className += getClass[a];
		}
	}
}

function  eventCompatibility(e) {
	return e = e || window.event;
}