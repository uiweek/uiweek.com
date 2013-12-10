﻿var Weeks = {
	year:13,//年
	month:07,//月[01-12]
	"1":{
		type:"cover",
		covers:[
			"./img/v2/bg/201307.png",
		],
		books:{
			ios:{
				size:"",
				url:"https://itunes.apple.com/cn/app/uiweek/id666201146?mt=8"
			},
			offline:{
				size:"433M",
				url:"http://uiweek.qiniudn.com/UIweek01_all.ibooks"
			},
			pdf:{
				size:"229M",
				url:"http://uiweek.qiniudn.com/UIweek01_pdf.zip"
			}
		}
	},
	"2":{
		type:"gift",
		url:"./down_v2.php?k=201307"
	},
	//,
	/*
	[说明]
	"1":{日期[1-31]
		type:[gift|cover],
		covers:[
			"图片地址1，可使用绝对路径或者相对路径",
			"图片地址2，可使用绝对路径或者相对路径",
			"图片地址3，可使用绝对路径或者相对路径"
		],
		books:{
			ios:{//ios版
				size:"",//显示尺寸
				url:"#"//下载地址
			},
			offline:{//离线版
				size:"42M",//显示尺寸
				url:"#"//下载地址
			},
			pdf:{//pdf版
				size:"42M",//显示尺寸
				url:"#"//下载地址
			}
		}
	},//[!]如果有多个日期请以[,]号结尾，最后一个不要加[,]
	*/
};