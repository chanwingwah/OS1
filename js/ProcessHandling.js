// 先设定系统的时钟；
var OStime = 0;
var IDflag = 1;
var running = 0;
var next = 1;
var algorithm = "先来先服务（FCFS）"
document.getElementById('AA').innerHTML = ":"+algorithm;
var processArray = new Array();
var FArray = new Array();
function Process() {}
timerID = setInterval(function (){
	if (running) {
		run();//每秒监听一次
	}
	showTime();
},1000);
function setrunning() {
	running = 1;
}

//重置输入
function resetaddinput() {
	   document.getElementById('addname').value = "";
	document.getElementById('addruntime').value = "";
   document.getElementById('addpriority').value = "";
}

//重置就绪列表
function delePL() {
	document.getElementsByClassName('W_table')[0].innerHTML = "<ul class='w_tableheader tableheader'><li class='w_c1'>ID</li><li class='w_c2'>name</li><li class='w_c3'>到达时间</li><li class='w_c4'>优先数</li><li class='w_c5'>需要运行时间</li><li class='w_c6'>已用CPU时间</li></ul><div class='clr '></div><div class='blank1'></div>"
}

// 时钟函数
function showTime() {
	OStime++;
	document.getElementsByClassName('OStime')[0].getElementsByTagName('span')[0].innerHTML = OStime;
}
// 重置时钟
function resetime() {
	OStime = 0;
    delePL();
    resetaddinput();
    IDflag = 1;
    processArray = [];
	//重置时钟会清空就绪进程；运行中的进程，IDflag 也重置
}



// 添加进程，自定义对象；
// 定义就绪进程列表：

function addprocess() {
	var addname = document.getElementById('addname').value;
	var addruntime = document.getElementById('addruntime').value;
	var addpriority = document.getElementById('addpriority').value;
			//优先数不可以重复
	if (addname||addruntime||addpriority) {
		for ( var pindex in processArray){
			if(processArray[pindex].priority == addpriority){
				alert("优先数重复");
				return 0;
				}
			}
		var p = new Process
		p.ID = IDflag;
		p.name = addname;
		p.runtime = addruntime;
		p.priority = addpriority;
		p.addtime = OStime;
		p.getcputime = 0;
		//初始化所有属性。。。
		p.duringtime = 0;
		p.status = "W";
		p.selectedtime = -1;
		p.Ftime = -1;
		IDflag++;
		// 重置输入
		resetaddinput();
		processArray.push(p);
		var addHTML = "<ul class='row' id ='"+p.ID+"' ><li class='w_c1'>"+p.ID+"</li><li class='w_c2'>"+p.name+"</li><li class='w_c3'>"+p.addtime+"</li><li class='w_c4'>"+p.priority+"</li><li class='w_c5'>"+p.runtime+"</li><li class='w_c6'>"+p.getcputime+"</li></ul><div class='clr '></div>"
		// 往列表中添加进程：
		document.getElementsByClassName('W_table')[0].innerHTML = document.getElementsByClassName('W_table')[0].innerHTML + addHTML;
		// alert(processArray.length);
		return 1;
	}
	return 0;
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
		document.getElementById('AA').innerHTML = ":"+algorithm;
		return 1;
	}
	return 0;
}



// 按进入时间排序：
function sortaddtime(a,b)
{// 排序函数设定：
return a.addtime - b.addtime;
}
function sortpriority(a,b)
{
return a.addtime - b.addtime;
}
// 删除元素
function removeElement(_element){
         var _parentElement = _element.parentNode;
         if(_parentElement){
                _parentElement.removeChild(_element); 
         }
}
function FCFSaddrun(){
		P = processArray[0];
		addHTML = "<ul class='row'><li class='R_c1'>"+OStime+"</li><li class='R_c2'>"+P.ID+"</li><li class='R_c3'>"+P.name+"</li><li class='R_c4'>"+P.duringtime+"</li><li class='R_c5'>"+P.priority+"</li><li class='R_c6'>"+P.runtime+"</li><li class='R_c7'>"+P.getcputime+"</li><li class='R_c8'>"+P.status+"</li></ul><div class='clr'></div>"
		document.getElementsByClassName('running_table')[0].innerHTML = document.getElementsByClassName('running_table')[0].innerHTML + addHTML;
		var aaa = document.getElementsByClassName('running_table')[0];
		if(aaa.scrollHeight>aaa.offsetHeight)aaa.scrollTop = aaa.scrollHeight-aaa.offsetHeight;


}

function FCFSaddF(){
		var addHTML = "<ul class='row'><li class='F_c1'>"+ F.ID +"</li><li class='F_c2'>"+ F.name +"</li><li class='F_c3'>"+ F.addtime +"</li><li class='F_c4'>"+ F.priority +"</li><li class='F_c5'>"+ F.runtime +"</li><li class='F_c6'>"+ F.selectedtime +"</li><li class='F_c7'>"+ F.Ftime+"</li><li class='F_c8'>"+ F.T +"</li><li class='F_c9'>"+ F.PT +"</li></ul><div class='clr '></div>"
		   // 往列表中添加进程：
		     document.getElementsByClassName('Finish_table')[0].innerHTML = document.getElementsByClassName('Finish_table')[0].innerHTML + addHTML;
}

// 先到先出算法
function FCFS() {
		if (processArray.length==0){
			return 0;
		}
	 	// 操作1取出就绪列表
	 	if (next) {
	 		var takeP = document.getElementById(processArray[0].ID);
			removeElement(takeP);
			if (processArray[0].selectedtime == -1) {
		        processArray[0].selectedtime = OStime;}		
		     	processArray[0].status = "R";	
		     	next = 0;
		     	//打印调入
		     	FCFSaddrun();
		     	processArray[0].duringtime++;
				processArray[0].getcputime++;
	 	}else if (processArray[0].getcputime == processArray[0].runtime) {
			//进入F队列：
			processArray[0].status = "F";
			processArray[0].Ftime = OStime;
			FCFSaddrun();
			//删除
			F = processArray.shift();
			F.T = 100;
			F.PT = 10;
			FArray.push(F);
			//在F表中显示
			FCFSaddF();
		    next = 1;
		    if (processArray.length ==0) {
		    	runing = 0;
		    	return 1;
		    }else{
		    	FCFS();//重新调度下一进程；
		    }

		}else{
	 				FCFSaddrun();
	 				processArray[0].duringtime++;
					processArray[0].getcputime++;

	 	}
		//进入运行状态&进入CPU			
}


function run() {
	if (processArray.length==0){
			running = 0;
			return 0;
		}
	if (algorithm = algorithm1) {
		if(FCFS() == 1 ){
			alert("队列执行完毕");
			return 1;
		}
	}

}





