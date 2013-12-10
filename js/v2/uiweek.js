var UIWeek = {
	init:function(){
		window.downType = "p";
		window.rightCode = 0;
		/*$(".download-code .close").click(function(){
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
					}
				},"json");
				return;
			}
			$(".download-code").show();
			$("#code1,#code2,#code3,#code4").val("");
			$("#code1").focus();
			return false;
		});*/
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
			$("#downText").css("color","").html("请输入杂志中的四道问答题答案后即可下载");
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
				$.post(window.downUrl,{c:code,t:window.downType},function(data){
					$("#code1,#code2,#code3,#code4").val("");
					$("#code1").focus();
					UIWeek._codeLock = false;
					if(data["error"]==1){//错误
						showError(data["msg"]);
					}else{//下载
						$(".download-code").hide();
						window.rightCode = code;
						location.href = data["data"];
					}
				},"json");
				return true;
			}else{
				return false;
			}
		}
		$(".open-platform-close,.about-us-close,.activities-close").click(function(){
			$(".pop-up").fadeOut(400);
			$(".book-download,.open-platform,.download-code,.activities").fadeOut(300);
		});
		$(".about-us-link").click(function(){
			$(".book-download,.open-platform,.download-code,.activities").fadeOut(300);
			if($(".about-us").is(":visible")){
				$(".pop-up").fadeOut(400);
			}else{
				$(".pop-up").fadeIn(250);
			}
			$(".about-us").fadeIn(250);
		});
		$(".download-code-close").click(function(){
			UIWeek._codeLock = false;
			$(".download-code").fadeOut(300);
			$(".download-code").find("input").val("");
		});
		/*$(".download-options .pdf").click(function(){
			$(".download-code").fadeIn(250);
			return false;
		});*/
		if(typeof Weeks != "undefined"){
			for(var date in Weeks){
				if(+date > 0){
					date = +date;
					var week = Weeks[date];
					var target = $(".calendar dd");//.eq(date - 1);
					//target.hide();
					target.eq(date - 1).data("date",date);
					target.eq(date - 1).data("data",week);
					if(week.type == "cover"){
						$(document.body).append($("<img style='display:none' class='preload' src='"+week.covers[0]+"' />"));
					}
					target.click(function(){
						var self = $(this);
						var date = self.data("date");
						var data = self.data("data");
						if(+date > 0){
							if(data.type == "cover"){
								var books = data.books;
								$(".about-us,.open-platform,.download-code,.activities").hide();
								//pages
								window.covers = data.covers;
								$(".book-download .dots li").css("display","none");
								for(var i = 0,len = window.covers.length;i < len;i++){
									if(len > 1){
										$(".book-download .dots li:eq(" + i + ")").css("display","");
									}
								}
								$(".book-download .dots").css("width",(window.covers.length * 18) + "px");
								$(".book-download .dots").css("padding-left","8px");
								$(".book-download").css("background-image","url("+data.covers[0]+")").show();
								for(var key in books){
									$(".download-options ."+key+" a").attr("href",books[key].url);
									$(".download-options ."+key+" span").html(books[key].size);
								}
								window.countO = 0;
								window.countP = 0;
								$(".down-count").text("");
								date = [Weeks.year,Weeks.month,date].join("-");
								window.nowDate = date;
								$.get("./count/"+date+"O.txt",function(data){
									if(+data >= 0){
										window.countO = +data;
									}
								});
								$.get("./count/"+date+"P.txt",function(data){
									if(+data >= 0){
										window.countP = +data;
									}
								});
								window.downUrl = books.pdf.url;
								$(".pop-up").fadeIn(250);
							}else if(data.type == "gift"){
								window.downUrl = data.url||"";
								$(".download-code").fadeIn(250);
							}else if(data.type == "ads"){
								$(".about-us,.open-platform,.download-code,.book-download").hide();
								var image = data.covers[0];
								var desc = data.desc;
								var url = data.url;
								//pages
								/*window.covers = data.covers;
								$(".book-download .dots li").css("display","none");
								for(var i = 0,len = window.covers.length;i < len;i++){
									if(len > 1){
										$(".book-download .dots li:eq(" + i + ")").css("display","");
									}
								}*/
								//$(".book-download .dots").css("width",(window.covers.length * 18) + "px");
								//$(".book-download .dots").css("padding-left","8px");
								$(".activities").css("background-image","url("+image+")").show();
								$(".activities").find(".open a").attr("href",url);
								$(".activities").find(".activities-footer p").text(desc);
								$(".pop-up").fadeIn(250);
							}
						}else{
							$(".about-us,.book-download,.download-code").hide();
							$(".open-platform").show();
							$(".pop-up").fadeIn(250);
						}
						return false;
					});
					$(".book-download .dots li").click(function(){
						var index = $(".book-download .dots li").index($(this));
						var image = window.covers[index];
						$(".book-download .dots li").removeClass("cur");
						$(this).addClass("cur");
						$(".book-download").fadeOut(300,function(){
							$(this).css("background-image","url("+image+")").fadeIn(250);
						});
					});
					$(".download-options .offline a").click(function(){
						var href = $(this).attr("href");
						$.post("./count.php?t="+window.nowDate+"O",function(data){
							if(+data >= 0){
								window.countO = +data;
							}
							location.href = href;
						});
					}).attr("onclick","return false");;
					$(".download-options .offline").hover(function(){
						if(window.countO > 0){
							$(this).find(".down-count").text("["+window.countO+"]");
						}
					},function(){
						$(this).find(".down-count").text("");
					});
					$(".download-options .pdf").hover(function(){
						if(window.countO > 0){
							$(this).find(".down-count").text("["+window.countP+"]");
						}
					},function(){
						$(this).find(".down-count").text("");
					});
					$(".download-options .pdf a").click(function(){
						var href = $(this).attr("href");
						$.post("./count.php?t="+window.nowDate+"P",function(data){
							if(+data >= 0){
								window.countP = +data;
							}
							location.href = href;
						});
						return false;
					}).attr("onclick","return false");;
				}
			}
		}
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
});