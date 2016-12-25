// 先设定系统的时钟；
var OStime = 0;
var timer = 500;
var IDflag = 1;
var running = 0;
var PW = new Array();
PW.length=0;
var PZ = new Array();
var next = 1;
var algorithm = "FCFS"
var processArray = new Array();
processArray.length=0;
var FTsum = 0;
var FPTsum = 0;
	var PTT = document.getElementById('PTT');
	var PPTT = document.getElementById('PPTT');
var PP = new Array();
var FArray = new Array();
var addtime = 1;
function Process() {}

timerID = setInterval(function (){
	if (running) {
		run();//每秒监听一次
		OStime++;
		showTime();
	}
},timer);

function resetaa(){
	if (running == 0 ) {
		addtime = 1;
		IDflag = 1;
		for (var i = 0; i < PP.length; i++) {
			chushihua(PP[i]);
			addtoWList(PP[i]);
			processArray[i]=PP[i];
		}
		PP.length = 0;
		delePL;
	}

}

function setrunning() {
	if ((running == 0)&&(processArray.length !=0)) {
		PP.length =0;
		PP = processArray.slice(0);
	    deRUN();
		running = 1;
	    OStime = 0;
	    deFinish();
	    FArray.length == 0;
	    next = 1;
	    FArray.length = 0;
	    document.getElementById('AA').innerHTML = ":"+algorithm;
	    document.getElementById('vv').innerHTML = "调度结果窗口_ <small>使用算法："+algorithm+"</small>"


	}
	

}


// 重置输入
function resetaddinput() {
	   document.getElementById('addname').value = "";
	document.getElementById('addruntime').value = "";
}
					
//重置就绪列表
function delePL() {
	document.getElementsByClassName('W_table')[0].innerHTML ="<div class='blank1'></div><ul class='w_tableheader tableheader'>	<li class='c1'>ID</li>	<li class='c2'>name</li>	<li class='w_c3'>到达时间</li>	<li class='w_c4'>服务时间</li></ul><div class='clr '></div>"}

function deRUN() {
	document.getElementsByClassName('running_table')[0].innerHTML = "<ul class='R_tableheader tableheader'><li class='c1'>time</li><li class='c1'>ID</li><li class='c2'>name</li><li class='R_c3'>服务时间</li><li class='R_c4'>已用CPU时间</li><li class='R_c5'>作业状态</li></ul><div class='clr '></div><div class='blank1'></div>"
}
					
				
function deFinish() {
	document.getElementsByClassName('Finish_table')[0].innerHTML = "<ul class='F_tableheader tableheader'><li class='c1'>ID</li><li class='c2'>name</li><li class='F_c3'>到达时间</li><li class='F_c4'>开始时间</li><li class='F_c5'>服务时间</li><li class='F_c6'>完成时间</li><li class='F_c7'>周转时间</li><li class='F_c8'>带权周转时间</li></ul><div class='blank1'></div><div class='clr '></div>"
}

// 时钟函数
function showTime() {
	document.getElementsByClassName('OStime')[0].getElementsByTagName('span')[0].innerHTML = OStime;
}


// 重置
function resetime() {
	OStime = 0;
	showTime();
    delePL();
    running = 0;
    resetaddinput();
    IDflag = 1;
    processArray = [];
    deRUN();
    deFinish();
	PW.length=0;
	next = 1;
	processArray.length=0;
 	addtime = 1;
 	FArray.length == 0;
 	timer = 1000;

	//重置时钟会清空就绪进程；运行中的进程，IDflag 也重置
}


// 添加等待列表，自定义对象；

function addtoWList(p) {
	var addHTML = "<ul id="+p.ID+" ><li class='c1'>"+p.ID+"</li><li class='c2'>"+p.name+"</li><li class='w_c3'>"+p.addtime+"</li><li class='w_c4'>"+p.runtime+"</li></ul><div class='clr '></div>"
	document.getElementsByClassName('W_table')[0].innerHTML = document.getElementsByClassName('W_table')[0].innerHTML + addHTML;
}


// 定义作业列表：

function chushihua(p) {
		p.ID = IDflag;
		p.addtime = addtime++;
		p.getcputime = 0;
		p.status = "W";
		p.selectedtime = -1;
		p.Ftime = -1;
		IDflag++;
		return 1;
	
}


function addjob() {
	var addname = document.getElementById('addname').value;
	var addruntime = document.getElementById('addruntime').value;
		var p = new Process
		p.name = addname;
		p.runtime = addruntime;
		chushihua(p);
		// 重置输入
		resetaddinput();
		processArray.push(p);
		addtoWList(p);
		return 1;
}


//获取运行算法选择：
function radiocheck(e) {
        if(!e){  
          var e = window.event;  
        }  
        //获取事件点击元素  
        var targ = e.target;  
        //获取元素名称  
        var tname = targ.tagName;  
	if (targ.checked) {
		algorithm = targ.value;
		return 1;
	}
	return 0;

}



// 按进入时间排序：
function FCFS(a,b){// 排序函数设定：
return a.addtime - b.addtime;
}
function SJF(a,b){//作业长短
return a.runtime - b.runtime;
}
// 按响应比排序：
function HRN(a,b){//作业长短
return (b.runtime+OStime-b.addtime)/b.runtime - (a.runtime+OStime-a.addtime)/a.runtime;
}
// 删除元素
function removeElement(_element){
         var _parentElement = _element.parentNode;
         if(_parentElement){
                _parentElement.removeChild(_element); 
         }
}


// 调度函数（删除等待，进入cpu）
function FCFSaddrun(){
		P = PW[0];
		addHTML = "<ul class='row'><li class='c1'>"+OStime+"</li><li class='c1'>"+P.ID+"</li><li class='c2'>"+P.name+"</li><li>"+P.runtime+"</li><li class='R_c4'>"+P.getcputime+"</li><li class='R_c5'>"+P.status+"</li></ul><div class='clr'></div>"
		document.getElementsByClassName('running_table')[0].innerHTML = document.getElementsByClassName('running_table')[0].innerHTML + addHTML;
		var aaa = document.getElementsByClassName('running_table')[0];
		if(aaa.scrollHeight>aaa.offsetHeight)aaa.scrollTop = aaa.scrollHeight-aaa.offsetHeight;
}

 // 往列f表中添加进程：
function FCFSaddF(){

		var addHTML = "<ul ><li class='c1'>"+F.ID+"</li><li class='c2'>"+F.name+"</li><li class='F_c3'>"+F.addtime+"</li><li class='F_c4'>"+F.selectedtime+"</li><li class='F_c5'>"+F.runtime+"</li><li class='F_c6'>"+F.Ftime+"</li><li class='F_c7'>"+F.TT+"</li><li class='F_c8'>"+F.PT+"</li></ul><div class='clr '></div>"
		document.getElementsByClassName('Finish_table')[0].innerHTML = document.getElementsByClassName('Finish_table')[0].innerHTML + addHTML;
		PTT.innerHTML = FTsum/FArray.length;
	    PPTT.innerHTML = FPTsum/FArray.length;
}



// 先到先出算法
function DOing() {
		if (PW.length==0){
			return 0;
		}
	 	// 操作1取出就绪列表
	 	if (next) {
	 		var takeP = document.getElementById(PW[0].ID);
			removeElement(takeP);
			if (PW[0].selectedtime == -1) {
		        PW[0].selectedtime = OStime;}		
		     	PW[0].status = "R";	
		     	next = 0;
		     	//打印调入
		     	FCFSaddrun();
				PW[0].getcputime++;
	 		}else if (PW[0].getcputime == PW[0].runtime) {
			//进入F队列：
			PW[0].status = "F";
			PW[0].Ftime = OStime;
			FCFSaddrun();
			//删除
			F = PW.shift();
			F.TT = F.Ftime- F.addtime;
			F.PT = F.TT/F.runtime;
			FTsum += F.TT;
			FPTsum = F.PT;
			FArray.push(F);
			//在F表中显示
			FCFSaddF();
		    next = 1;
		    if ((processArray.length+PW.length) == 0 ) {
		    	runing = 0;
		    	next = 0;
		    	return 1;
		    }else{
		    	run();//重新调度下一进程；
		    }

		}else{
	 			FCFSaddrun();
	 			PW[0].duringtime++;
				PW[0].getcputime++;
	 	}
}





function run() {
	if ((processArray.length+PW.length) == 0){
			running = 0;
			return 0;
		}
	if (next) {	
			for (var i = 0; i < processArray.length; i++) {
				if (processArray[i].addtime<=OStime) {
					PW.push(processArray[i]);
				}else{
					PZ.push(processArray[i]);
				}
			}
			processArray.length = 0;
			processArray = PZ.slice(0);
			PZ.length = 0;
			if (algorithm =="FCFS") {
					PW.sort(FCFS);
				}else if(algorithm=="SJF"){
					PW.sort(SJF);
				}else{
					PW.sort(HRN);
				}
	 			
			}

	var kk =DOing();
	if( kk == 1 ){
			running = 0;
			OStime = 0;
			showTime();  			
			alert("队列执行完毕");

			return 1;
		}
}






