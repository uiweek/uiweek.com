var UIWeek = {
	goTop:function(){
		this.goTo();
	},
	goTo:function(o){
		var top = 0;
		if(o && $(o).length > 0){
			top = $(o).offset().top - 25;
		}
		$("html,body").animate({scrollTop:top},400);
	},
	refreshDown:function(){
		$("#down").load("./down.php?a=1");
	},
	init:function(){
		window.downType = "";
		window.rightCode = 0;
		$(".go-top").click(function(){
			UIWeek.goTop();
			return false;
		});
		$(".go-top").hover(function(){
			$(this).animate({opacity:0.4},0);
			$(this).animate({opacity:1.0},300);
		},function(){
			$(this).animate({opacity:1.0},0);
		});
		$("#overview,#assistant,#contract,#about").each(
			function(i,o){
				$(".nav ul li:eq("+i+")").click(function(){
					UIWeek.goTo(o);
					return false;
				});
			}
		);
		if(location.hash.indexOf("#go-")==0){
			var o = $("#"+location.hash.replace("#go-",""));
			location.hash = "";
			UIWeek.goTo(o);
		}
		$(".download-code .close").click(function(){
			$(this).parent().hide();
			return false;
		});
		$(".download a").click(function(){
			if($(this).is($(".ibooks"))){
				window.downType = "i";
			}
			if($(this).is($(".pdf"))){
				window.downType = "p";
			}
			if($(this).is($(".zip"))){
				window.downType = "z";
			}
			if(window.rightCode>0||window.downType!="z"){
				$.post("./down.php",{c:window.rightCode,t:window.downType},function(data){
					//console.debug(data);
					$("#code1,#code2,#code3,#code4").val("");
					$("#code1").focus();
					UIWeek._codeLock = false;
					if(data["error"]==1){//错误
						showError(data["msg"]);
					}else{//下载
						location.href = data["data"];
						UIWeek.refreshDown();
					}
				},"json");
				return;
			}
			$(".download-code").show();
			$("#code1,#code2,#code3,#code4").val("");
			$("#code1").focus();
			return false;
		});
		$("#code1").keyup(function(event){
			if($(this).val().length==0){
				return;
			}
			//if(event.keyCode!=8){
				if(!getCode()){
					$("#code2").val("");
					$("#code2").focus();
				}
			//}
			showText();
		});
		$("#code2").keyup(function(event){//8 46
			if($(this).val().length==0){
				return;
			}
			if(event.keyCode==8){
				/*if($(this).val().length==0){
					$("#code1").val("");
					$("#code1").focus();
				}else{
					return false;
				}*/
			}else{
				if(!getCode()){
					$("#code3").val("");
					$("#code3").focus();
				}
			}
			showText();
		});
		$("#code3").keyup(function(event){
			if($(this).val().length==0){
				return;
			}
			if(event.keyCode==8){
				/*if($(this).val().length==0){
					$("#code2").val("");
					$("#code2").focus();
				}else{
					return false;
				}*/
			}else{
				if(!getCode()){
					$("#code4").val("");
					$("#code4").focus();
				}
			}
			showText();
		});
		$("#code4").keyup(function(event){
			if($(this).val().length==0){
				return;
			}
			//get url
			getCode();
			showText();
		});
		function showText(){
			$("#downText").css("color","").html("请输入月刊中的四道问答题答案后即可下载");
		}
		function showError(text){
			$("#downText").css("color","red").html(text);
		}
		function getCode(){
			var code = "",i = 0;
			while(i++<4){
				code += $("#code"+i).val().toString();
			}
			if(code.length == 4){
				if(UIWeek._codeLock){
					return true;
				}
				UIWeek._codeLock = true;
				$.post("./down.php",{c:code,t:window.downType},function(data){
					//console.debug(data);
					$("#code1,#code2,#code3,#code4").val("");
					$("#code1").focus();
					UIWeek._codeLock = false;
					if(data["error"]==1){//错误
						showError(data["msg"]);
					}else{//下载
						$(".download-code").hide();
						window.rightCode = code;
						location.href = data["data"];
						UIWeek.refreshDown();
					}
				},"json");
				return true;
			}else{
				return false;
			}
		}
		this.refreshDown();
	},
	commit:function(type,id){
		var mailReg = /^[a-zA-Z]?([a-zA-Z0-9_\.-]){2,}@{1}([a-zA-Z0-9_-]){2,}(\.[a-zA-Z0-9_-]{2,7})+$/;
		switch(type){
			case "designer":
				var mail = $("[name=dmail]");
				var type = $("[name=dtype]");
				var text = $("[name=dtext]");
				if(mail.val().length==0){
					mail.focus();
					return false;
				}
				if(!mailReg.test(mail.val())){
					alert("请正确输入邮箱地址");
					mail.focus();
					this.setPos(mail.get(0),mail.val().length);
					return false;
				}
				if(type.val().length==0){
					type.focus();
					return false;
				}
				if(text.val().length==0){
					text.focus();
					return false;
				}
				/*if(!confirm("确认邮箱["+mail.val()+"]并提交吗？")){
					return false;
				}*/
				$.post("./designer.php",{m:mail.val(),p:type.val(),c:text.val()},function(data){
					if(data){
						if(data["error"]!=1){
							alert(mail.val()+"提交成功，请耐心等待审核。");
							mail.val("");
							type.val("");
							text.val("");
						}else{
							alert(data["msg"]);
						}
					}
				});
				break;
			case "business":
				var mail = $("[name=bmail]");
				var type = $("[name=btype]");
				var text = $("[name=btext]");
				if(mail.val().length==0){
					mail.focus();
					return false;
				}
				if(!mailReg.test(mail.val())){
					alert("请正确输入邮箱地址");
					mail.focus();
					this.setPos(mail.get(0),mail.val().length);
					return false;
				}
				if(type.val().length==0){
					type.focus();
					return false;
				}
				if(text.val().length==0){
					text.focus();
					return false;
				}
				/*if(!confirm("确认邮箱["+mail.val()+"]并提交吗？")){
					return false;
				}*/
				$.post("./business.php",{m:mail.val(),p:type.val(),c:text.val()},function(data){
						if(data["error"]!=1){
							alert(mail.val()+"提交成功，请耐心等待审核。");
							mail.val("");
							type.val("");
							text.val("");
						}else{
							alert(data["msg"]);
						}
				});
				break;
			case "board":
				var mail = $("[name=mmail]");
				var nick = $("[name=mnick]");
				var text = $("[name=mtext]");
				if(mail.val().length==0){
					mail.focus();
					return false;
				}
				if(!mailReg.test(mail.val())){
					alert("请正确输入邮箱地址");
					mail.focus();
					this.setPos(mail.get(0),mail.val().length);
					return false;
				}
				if(nick.val().length==0){
					nick.focus();
					return false;
				}
				if(text.val().length==0){
					text.focus();
					return false;
				}
				/*if(!confirm("确认邮箱["+mail.val()+"]并提交吗？")){
					return false;
				}*/
				$.post("./board.php",{m:mail.val(),n:nick.val(),c:text.val()},function(data){
					if(data){
						if(data["error"]!=1){
							alert("提交成功，请耐心等待审核。");
							mail.val("");
							nick.val("");
							text.val("");
						}else{
							alert(data["msg"]);
						}
					}
				});
				break;
			case "comment":
				var nick = $("#rely"+id+" [name=cnick]");
				var text = $("#rely"+id+" [name=ctext]");
				var rid = $("#rely"+id+" [name=cid]");
				/*if(mail.val().length==0){
					mail.focus();
					return false;
				}
				if(!mailReg.test(mail.val())){
					alert("请正确输入邮箱地址");
					mail.focus();
					this.setPos(mail.get(0),mail.val().length);
					return false;
				}*/
				if(nick.val().length==0){
					nick.focus();
					return false;
				}
				if(text.val().length==0){
					text.focus();
					return false;
				}
				/*if(!confirm("确认邮箱["+mail.val()+"]并提交吗？")){
					return false;
				}*/
				$.post("./board.php",{m:"none",n:nick.val(),c:text.val(),r:rid.val()},function(data){
					if(data){
						if(data["error"]!=1){
							alert("提交成功，请耐心等待审核。");
							//mail.val("");
							nick.val("");
							text.val("");
						}else{
							alert(data["msg"]);
						}
					}
				});
				break;
			default:
		}
		return false;
	},
	setPos:function(text,start,end){//输入框文字位置
		start = start||0;
		end = typeof end != "undefined"?end:start;
		if(text.setSelectionRange){
			text.focus();
			setTimeout(function(){text.setSelectionRange(start,end);});
		}else if(text.createTextRange){
			var range = text.createTextRange();
			range.collapse(true);
			range.moveEnd('character',end);
			range.moveStart('character',start);
			range.select();
		}
	}
};
var Scroll = function(width,lists,pages,prev,next){
	this.index = 0;
	this.lists = $(lists);
	this.pages = $(pages);
	this.width = +width;
	var _this = this;
	this.pages.hide();
	this.lists.each(function(i){
		_this.pages.eq(i).show();
		_this.pages.eq(i).click(function(){
			_this.goTo(i);
		});
	});
	$(prev).click(function(){
		_this.prev();
		return false;
	});
	$(next).click(function(){
		_this.next();
		return false;
	});
};
Scroll.prototype.prev = function(){
	this.index--;
	if(this.index < 0){
		this.index = this.lists.length-1;
	}
	this.goTo(this.index);
};
Scroll.prototype.next = function(){
	this.index++;
	if(this.index > this.lists.length-1){
		this.index = 0;
	}
	this.goTo(this.index);
};
Scroll.prototype.goTo = function(i){
	this.showPage(i);
	$(this.lists).stop(false,true);
	$(this.lists).parent().animate({marginLeft:-i*this.width},400);
};
Scroll.prototype.showPage = function(i){
	this.pages.html("○");
	this.pages.eq(i).html("●");
}
$(document).ready(function(){
	UIWeek.init();
	new Scroll(860,".marquee:eq(0) .list ul li",".marquee:eq(0) .page li",".marquee:eq(0) .prev",".marquee:eq(0) .next");
	new Scroll(860,".marquee:eq(1) .list ul li",".marquee:eq(1) .page li",".marquee:eq(1) .prev",".marquee:eq(1) .next");
	new Scroll(821,".marquee-inner .list ul li",null,".marquee-inner .prev",".marquee-inner .next");
});