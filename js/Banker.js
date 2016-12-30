var n = 5;
var m = 3;
var JobArray = new Array;
var Available = new Array;
var Return;
var Temp;
var PF = new Array;
function Job_obj() {};
var let = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','T','S','T','U','V','W','X','Y','Z');

	createJob();
function getStart() {
	n = document.getElementById('N').value;	
	m = document.getElementById('M').value;
	if (!n||!m) {
	 n = 5;
     m = 3;
	}
	createJob();
}

//初始化剩余
function SourceA() {
	Available.length = m;
	for (var i = 0; i < m; i++) {
		Available[i] = Rannum(10,0);
	}
	ShowSurplus();
}

//显示剩余
function ShowSurplus() {
	var HTML1 = " ";
	for (var i = 0; i < Available.length; i++) {
		HTML1 += let[i]+":"+Available[i]+" ";
	}
	document.getElementById('Available').innerHTML = HTML1;
}

//Job表
function ShowJob() {
	var HTML1 = "<ul class='U1'>作业</ul><ul class='U2'><li>编号</li><li>状态</li><li>操作</li></ul>";
	for (var i = 0; i < JobArray.length; i++) {
		HTML1 += "<ul class='U2'><li>"+"P"+JobArray[i].ID+"</li><li>"+JobArray[i].Finish+"</li><li id=index"+i+" onclick='Revoke()'>撤销</li></ul>";
	}
	document.getElementById('tbJob').innerHTML = HTML1;
}
//source表
function ShowSource() {
	var Hname ="<ul class='U2'>";
	for (var i = 0; i < m; i++) {
		Hname += "<li>"+let[i]+"</li>";
	}
	Hname +="</ul>";
	var HTML1 = "<ul class='U1'>Max</ul>"+Hname;
	var HTML2 = "<ul class='U1'>Allocation</ul>"+Hname;
	var HTML3 = "<ul class='U1'>Need</ul>"+Hname;
	for (var i = 0; i < JobArray.length; i++) {

		var HM ="<ul>";
		var HA ="<ul>";
		var HN ="<ul>";
		for (var j = 0; j < m; j++) {
			HM += "<li>"+JobArray[i].SM[j]+"</li>";
			HA += "<li>"+JobArray[i].SA[j]+"</li>";
			HN += "<li>"+JobArray[i].SN[j]+"</li>";
		}
		HM +="</ul>";
		HA +="</ul>";
		HN +="</ul>";
		HTML1 += HM;
		HTML2 += HA;
		HTML3 += HN;

	}

	document.getElementById('tbMax').innerHTML = HTML1;
	document.getElementById('tbAllocation').innerHTML = HTML2;
	document.getElementById('tbNeed').innerHTML = HTML3;
	ShowSurplus()
}

function createJob() {
	clrAA();
	JobArray.length =0;
	for (var i = 0; i < n; i++) {
		var JJ = new Job_obj;
		JJ.ID = (i+1);
		JJ.Finish = "wait";
		var JsourceM = [];
		var JsourceA = [];
		var JsourceN = [];
		for (var j = 0; j < m; j++) {
			JsourceM[j] = Rannum(10,0);
			JsourceA[j] = Rannum(JsourceM[j],0);
		}
		JsourceN = Reduce(JsourceM,JsourceA);

		JJ.SM = JsourceM;	
		JJ.SA = JsourceA;	
		JJ.SN = JsourceN;

		JobArray.push(JJ);
	}
	ShowJob();
	SourceA();
	setSelect();
	ShowSource()
	SafeCheck();
	if (PF.length == n) {
		var HTMLF = "P"+PF[0].ID;
			for (var i = 1; i < PF.length; i++) {
				HTMLF=HTMLF+"->P"+PF[i].ID;
			}
		document.getElementsByClassName('OSstatus')[0].innerHTML = "安全";
		alert("当前存在安全序列："+HTMLF);
		return 0;
	}else{
		createJob();
	}
			

}
function Reduce(a,b) {
	var c = [];
	for (var i = 0; i < a.length; i++) {
		c[i] = a[i] -b[i];
	}
	return c;
}

function Add(a,b) {
	var c = [];
	for (var i = 0; i < a.length; i++) {
		c[i]= 0;
		c[i] = a[i] -b[i]+b[i]*2;
	}
	return c;
}

function Eq(a,b) {
	for (var i = 0; i < a.length; i++) {
		if(a[i]!=b[i]){
			return 0;
		}
	}
	return 1;
}

function Prepare(a,b) {
	for (var i = 0; i < a.length; i++) {
		if ((a[i] - b[i])>0) {
			return 0;
		}
	}
	return 1;
}

// 随机数生成器
function Rannum(a,b) {
	return Math.round(Math.random()*a)+b;
}

function Rannum2(i) {
	i = Rannum(10,0);
	return i;
}

//撤销作业
function Revoke(e) {
		clrAA();
        if(!e){  
          var e = window.event;  
        }  
        var e = e ? e : window.event 
        var oElem = e.toElement ? e.toElement : e.relatedTarget; // 此做法是为了兼容FF浏览器
        //获取事件点击元素  
        // var targ = e.target;  
       var index = (oElem.id).slice(5,6);
       Available = Add(JobArray[index].SA,Available);
       JobArray[index].SA = Reduce(JobArray[index].SA,JobArray[index].SA);
       JobArray[index].SN = JobArray[index].SM;
       	ShowJob();
		ShowSource();
		ShowSurplus();
		SafeCheck();
		if (Return) {
			document.getElementsByClassName('OSstatus')[0].innerHTML = "安全";
		}else{
			document.getElementsByClassName('OSstatus')[0].innerHTML = "不安全";
		}
	return 0;
}


function setSelect() {

	var HTML1 = "<label  class='label2' for=''>>设置请求作业:</label> <select onchange = 'settingR()' name='JobName' id='Select'><option value='0'>  </option>"
	for (var i = 0; i <n; i++) {
		HTML1+="<option value='"+(i+1)+"'>P"+(i+1)+"</option>";
	}
	HTML1 +="</select>"
	document.getElementById('SelectH2').innerHTML = HTML1;
	setSelectABC();
}
function setSelectABC(){

	var HTML2 = " "
	for (var i = 0; i <m; i++) {
		HTML2+="<input type='number' onchange = 'settingR2()' min = '0', max= '10' placeholder = '"+let[i]+"'>";
	}
	document.getElementById('SelectABC').innerHTML = HTML2;
};

	
function SafeCheck() {
	PF.length = 0 ;
	var Work;
		Work = Available;
	var Finish = [];
	var Allocation = [];
	var Need = [];
	var Max = [];
	// 步骤一
	for (var i = 0; i < JobArray.length; i++) {
		    Finish[i] = JobArray[i].Finish;
		Allocation[i] = JobArray[i].SA;
			  Need[i] = JobArray[i].SN;
		       Max[i] = JobArray[i].SM;
	}
	//步骤二
	step2();
	function step2() {
		// body...
			for (var i = 0; i < JobArray.length; i++) {

					if ((Finish[i] =="wait")&&Prepare(Need[i],Work)) {
						//步骤三
						Work = Add(Work,Allocation[i]);
						PF.push(JobArray[i]);
						Finish[i] ="finish";
						break;
					}
				}

			if (i==JobArray.length) {
				for (var i = 0; i < Finish.length; i++) {
					if(Finish[i]=="wait"){
						// alert("系统不安全,请尝试撤销作业");		
						Temp = PF.length;
						Return = 0;
						return 0;
					}
				}	
					Temp = PF.length;
					Return = 1;
					return 1;
			}
			step2();
		}	
}


//设置请求
var SelectJ = document.getElementById('Select').value;
var SelectABC = document.getElementById('SelectABC');
var Request = [0,0,0];
function settingR(e) {
      clrAA();

        if(!e){  
          var e = window.event;  
        }  
        var e = e ? e : window.event 
        var oElem = e.toElement ? e.toElement : e.relatedTarget; // 此做法是为了兼容FF浏览器
        //获取事件点击元素  
        var targ = e.target;  
        SelectJ = targ.value;	
        if (SelectJ>0) {
        	 for (var i = 0; i < m; i++) {
        		SelectABC.getElementsByTagName('input')[i].value = JobArray[SelectJ-1].SN[i];
        		Request[i] = SelectABC.getElementsByTagName('input')[i].value;
        	}	
        }
        if (SelectJ==0) {
        	 for (var i = 0; i < m; i++) {
        		SelectABC.getElementsByTagName('input')[i].value = "";
        		Request[i] = 0;
        	}	
        }
        // alert(Request);
	return 0;
}
function settingR2() {
	 for (var i = 0; i < m; i++) {
        Request[i] = SelectABC.getElementsByTagName('input')[i].value;
      }	
      clrAA();
}




function doRequest() {
	clrAA();
	if (SelectJ==0) {
		return 0;
	}else  if (Prepare(Request,JobArray[SelectJ-1].SN)==0){
		document.getElementById('CheckOUT1').innerHTML = "No";
		document.getElementById('CheckOUT4').innerHTML = "拒绝分配";

	}else  if (Prepare(Request,Available)==0){
		document.getElementById('CheckOUT2').innerHTML = "No";
		document.getElementById('CheckOUT4').innerHTML = "拒绝分配";


	}else{
		// 假设进行分配
		// 备份：
		var temp1 =  JobArray[SelectJ-1].SN;
		var temp2 =  JobArray[SelectJ-1].SA;
		// alert(JobArray[SelectJ-1].SA);
		JobArray[SelectJ-1].SN = Reduce(JobArray[SelectJ-1].SN,Request);
		JobArray[SelectJ-1].SA = Add(JobArray[SelectJ-1].SA,Request);
		// alert(JobArray[SelectJ-1].SA);
		Available = Reduce(Available,Request);
		// alert(Available+":"+ JobArray[SelectJ-1].SA+":"+ JobArray[SelectJ-1].SN);
		SafeCheck();
		if (Return) {
			var HTMLF = "P"+PF[0].ID;
			for (var i = 1; i < PF.length; i++) {
				HTMLF=HTMLF+"->P"+PF[i].ID;
			}
			document.getElementById('CheckOUT1').innerHTML = "Yes";
			document.getElementById('CheckOUT2').innerHTML = "Yes";
			document.getElementById('CheckOUT3').innerHTML = "存在安全序列:"+HTMLF;
			document.getElementById('CheckOUT4').innerHTML = "分配成功";
			
			if ( Eq(JobArray[SelectJ-1].SA,JobArray[SelectJ-1].SM)) {
				JobArray[SelectJ-1].Finish = "finish";
				JobArray[SelectJ-1].SN = Reduce(JobArray[SelectJ-1].SN,JobArray[SelectJ-1].SN);
				JobArray[SelectJ-1].SA = Reduce(JobArray[SelectJ-1].SA,JobArray[SelectJ-1].SA);
				Available = Add(Available,JobArray[SelectJ-1].SM);
			}
			ShowJob();
			ShowSource();

			}else{
			// 回滚
			JobArray[SelectJ-1].SN = temp1;
			JobArray[SelectJ-1].SA = temp2;
			Available = Add(Available,Request);
			document.getElementById('CheckOUT1').innerHTML = "Yes";
			document.getElementById('CheckOUT2').innerHTML = "Yes";
			document.getElementById('CheckOUT3').innerHTML = "不安全，不存在安全序列";
			document.getElementById('CheckOUT4').innerHTML = "拒绝分配";
		}
	}
}

function clrAA() {
			document.getElementById('CheckOUT1').innerHTML = "";
			document.getElementById('CheckOUT2').innerHTML = "";
			document.getElementById('CheckOUT3').innerHTML = "";
			document.getElementById('CheckOUT4').innerHTML = "";
}