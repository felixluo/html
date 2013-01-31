(function(window){

var mArray = [
		"dojo/parser",
		"dojo/_base/fx",
		"dojo/dom",
		"dijit/layout/TabContainer",
		"dijit/layout/ContentPane",
		"dijit/Toolbar",
		"dijit/form/Button",
		"dijit/form/Textarea",
		"dojo/domReady!"
	],
	
// Constructor
	Module = function() {
		var self = this;
		require(mArray, function(){
			var len = arguments.length;
			for(var i=0;i<len-1;i++) {
				var mName = mArray[i];   // 模块名称，字符串中最后一位字符 
				var tmp = mName.split("/").pop();
				tmp = tmp.split("-").join("");
				self[tmp] = arguments[i];
			}
			
			self.parser.parse()			
			self.loadEnd();	
		});
	};

// Prototype
Module.prototype = {	
	/**
	 *
	 * Public methods
	 *
	 */
	loadBegin: function() {
		var self = this;
		//显示等待UI
		var loader = self.dom.byId("loader");
		if ( loader ) {
			self.domattr.set('loader','style','display:block;');
		}	
	},

	loadEnd: function() {
		var self = this;
		//加载完毕，显示界面
		var loader = self.dom.byId("loader");
		if ( loader ) {
			setTimeout(function(){
				self.fx.fadeOut({ node: loader, duration: 500, onEnd: function(){ loader.style.display = "none"; }}).play();
			}, 500);
		}	
	}
};

if (typeof exports !== 'undefined') 
	exports.Module = new Module;
else 
	window.Module = new Module;

})(window);