var algorithm ;
var SID = 1;
var JID = 1;
var StartAddress = 0;
var JobArray = new Array();
var StorageArray = new Array();
StorageArray.lengh = 0;
function storage() {}//定义storage对象
function job() {}//定义storage对象
// 初始化表
Ftable();
// createStorage();
// createJob();
// deleteALL();
 	radiocheck()

function Ftable() {
	var Storge = document.getElementsByClassName('Storge')[0];
	var Job = document.getElementsByClassName('Job')[0];
	var HTML1 = "<div class='blank'></div><ul class='tableheader'><li >分区编号</li><li >空间大小</li><li >剩余大小</li><li >分区起址</li><li >分配状态</li></ul><div class='clr '></div>"
	var HTML2 = "<div class='blank'></div><ul class='tableheader'>	<li >作业编号</li>	<li >作业大小</li>	<li >作业状态</li>	<li >占用分区</li></ul><div class='clr '></div>"	
	Storge.innerHTML = HTML1;
	Job.innerHTML = HTML2;
	for (var i = 0; i < 10; i++) {
		addtoList(i)
	}
}

function addtoList(i) {
	var Storge = document.getElementsByClassName('Storge')[0];
	var Job = document.getElementsByClassName('Job')[0];
	var HTML1 = "<ul class ='sli'><li ></li><li ></li><li ></li><li ></li><li ></li></ul><div class='clr '></div>"
	var HTML2 = "<ul class = 'jli'><li ></li><li ></li><li ></li><li ></li></ul><div class='clr'></div>"	
	Storge.innerHTML = Storge.innerHTML + HTML1;
	Job.innerHTML = Job.innerHTML + HTML2;
}



// 随机生成分区
function createStorage() {
	StartAddress = 0
	StorageArray.length = 0;
	for (var i = 0; i < 10; i++) {
		var S = new storage;
		S.ID = i+1;
		S.size = ranname(150,50);
		S.Surplus = S.size;
		if (i) {
			StartAddress = StorageArray[i-1].size+StorageArray[i-1].StartAddress+1;
			}
		S.StartAddress = StartAddress;
		S.status = "空闲";
		StorageArray.push(S);
		var SI = document.getElementsByClassName('sli')[i];
		addtoSlist(S,SI);	
	}
	returnBefore();

}

// 随机生成作业
function createJob() {
	JobArray.length = 0;
	for (var i = 0; i < 10; i++) {
		var J = new storage;
		J.ID = i+1;
		J.size = ranname(150,10);
		J.status = "W";
		J.occupy = "";
		JobArray.push(J);
		var JI = document.getElementsByClassName('jli')[i];
		addtoJlist(J,JI);	
	}
	returnBefore();
}




// 随机数生成器
function ranname(a,b) {
	return Math.round(Math.random()*a)+b;
}

//映射到表S;
function addtoSlist(S,SI){
	SI.getElementsByTagName('li')[0].innerHTML = S.ID;
	SI.getElementsByTagName('li')[1].innerHTML = S.size;
	SI.getElementsByTagName('li')[2].innerHTML = S.Surplus;
	SI.getElementsByTagName('li')[3].innerHTML = S.StartAddress;
	SI.getElementsByTagName('li')[4].innerHTML = S.status;
}

//映射到表J;
function addtoJlist(J,SI){
	SI.getElementsByTagName('li')[0].innerHTML = J.ID;
	SI.getElementsByTagName('li')[1].innerHTML = J.size;
	SI.getElementsByTagName('li')[2].innerHTML = J.status;
	SI.getElementsByTagName('li')[3].innerHTML = J.occupy;
}

// 清空
var nullStorage = new storage;
	nullStorage.ID = "";
	nullStorage.size = "";
	nullStorage.Surplus = "";
	nullStorage.StartAddress = "";
	nullStorage.status = "";
var nullJOB = new job;
	nullJOB.ID = "";
	nullJOB.size = "";
	nullJOB.status = "";
	nullJOB.occupy = "";


function deleteALL() {
	Ftable();
	JobArray.length = 0;
	StorageArray.length = 0;

}


//回到未分配
function returnBefore() {
	if (JobArray.length==0||StorageArray.length ==0) {
		return 0;
	}
	for (var i = 0; i < 10; i++) {
		JobArray[i].status = "W";
		JobArray[i].occupy = "";
		StorageArray[i].Surplus = StorageArray[i].size;
		StorageArray[i].status = "空闲";
	}
	renew();
}

//将表更新一下
function renew() {
		for (var i = 0; i < 10; i++) {
		var JI = document.getElementsByClassName('jli')[i];
		addtoJlist(JobArray[i],JI);	
		var SI = document.getElementsByClassName('sli')[i];
		addtoSlist(StorageArray[i],SI);	
	}
}
function renewS() {
		for (var i = 0; i < 10; i++) {
		var SI = document.getElementsByClassName('sli')[i];
		addtoSlist(StorageArray[i],SI);	
	}
}
function renewJ() {
		for (var i = 0; i < 10; i++) {
		var JI = document.getElementsByClassName('jli')[i];
		addtoJlist(JobArray[i],JI);	
	}
}

//获取运行算法选择：

function radiocheck(){
  var temp = document.getElementsByName("algorithm");
  for(var i=0;i<temp.length;i++)
  {
     if(temp[i].checked){
     algorithm = temp[i].value;
	  if (StorageArray.length !==0) {
			 if (algorithm == "最差适应算法") {
		     	StorageArray.sort(sort2); 
		     }else if (algorithm == "最佳适应算法") {
		     	 StorageArray.sort(sort1); 
		     }else{
		     	 StorageArray.sort(sort3);
		     }
	     renewS();
		}   
	    
 	 return temp[i].value;}
  }
} 



// 
//

//排序算法
// 按存块大小升序排序：
function sort1(a,b){// 排序函数设定：
return a.Surplus - b.Surplus;
}

// 按存块大小降序排序：
function sort2(a,b){// 排序函数设定：
return b.Surplus - a.Surplus;
}
// 按存块起址升序排序：
function sort3(a,b){// 排序函数设定：
return a.StartAddress - b.StartAddress;
}
var Step = 0;
function StepF() {
	if (Step==0) {
		document.getElementById('Step').innerHTML = "单步中";
		Step =1;
	}else{
		Step=0;
		document.getElementById('Step').innerHTML = "非单步";

	}
}
var loopTap = 0;
// 分配函数
function distribute() {
	if (StorageArray.length==0||JobArray.length==0) {
		return 0;
	}  

	for (var i = 0; i < 10; i++) {

		if (JobArray[i].status =="W") {
			 // 选择前排序
			 if (algorithm == "最差适应算法") {
			    	StorageArray.sort(sort2); 
			     }else if (algorithm == "最佳适应算法") {
			     	 StorageArray.sort(sort1); 
			     }else{
			     	 StorageArray.sort(sort3);
			     }
			renewS();	
			
			for (var j = loopTap; j < loopTap+10; j++) {
				var k= j%10;
				if (JobArray[i].size <= StorageArray[k].Surplus){
						if (Step) {
						  alert(JobArray[i].ID);//单步执行

						}

						JobArray[i].status = "R";						
						StorageArray[k].Surplus -= JobArray[i].size;
						if (StorageArray[k].status == "空闲") {
							StorageArray[k].status = "#"+JobArray[i].ID;
						}else{
							StorageArray[k].status += "#"+JobArray[i].ID;
						}
						JobArray[i].occupy = "#"+StorageArray[k].ID;
						renew();
						if (algorithm == "循环首次适应") {
							loopTap = StorageArray[k].ID; 
						}
						break;
					}
				}




		}
	
	}
	loopTap=0;


}


//回收算法
function Recovery() {
	if (JobArray.length==0||StorageArray.length ==0) {
		return 0;
	}
	for (var i = 0; i < 10; i++) {
		if (JobArray[i].status == "R") {
			JobArray[i].status = "F";
			JobArray[i].occupy = "";
		}
		StorageArray[i].Surplus = StorageArray[i].size;
		StorageArray[i].status = "空闲";
	}
	renew();
}








