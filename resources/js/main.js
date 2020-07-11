/*
 * Main.js Tiny Shop custom javascript. For external javascript, edit site.json and add the uri.
 */
 
var tinyshop = {

	// vars
	name: "tinyshop javascript library",
	version: "1.14",
	instanceid: 1e5,
	messagecode: 1e5,
	csp: ["Access-Control-Allow-Origin","*"],

	xhr: function() {

		var objxml = null;
		var ProgID = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];

		try {
			objxml = new XMLHttpRequest();
		} catch (e) {
			for (var i = 0; i < ProgID.length; i++) {
				try {
					objxml = new ActiveXObject(ProgID[i]);
				} catch (e) {
					continue;
				}
			}
		}
		return objxml;
	},
	
	message: function(str) {
		
		window.alert(this.htmlspecialchars(str,'full') + '\n' + '-'.repeat(32) + '\n' + '#TS-MSGC-' + this.messagecode);
		if(this.messagecode < this.math('maxint')) {
			this.messagecode++;
		}
	},

	htmlspecialchars: function(str,method='full',encoding='utf-8') {
		
		switch(method) {
			
			case 'full':
			f 	= ['<','>','!','$','%','\'','(',')','*','+',':','=','`','{','}','[',']'];
			r 	= ['&#60;','&#62;','&#34;','&#36;','&#37;','&#39;','&#40;','&#41;','&#42;','&#43;','&#58;','&#61;','&#96;','&#123;','&#125;','&#91;','&#93;'];
			break;
			
			case 'uri':
			f 	= ['<','>','\''];
			r 	= ['&#60;','&#62;','&#39;'];
			break;
		}
		
		for (var i = 0; i < f.length; i++) {
			str = String(str).replace(f[i], r[i]);
		}
		 
		return str;
	},
	
	duplicatearray: function(a,b) {
		a.length = 0;
		a.push.apply(a, b);
		return a;
	},
	
	redirect: function(uri) {
		if(!uri) {
			document.location = this.htmlspecialchars(location.href,'uri');
			} else {
			document.location = this.htmlspecialchars(uri,'uri');
		}
	},
	
	math: function(method,e=1,mod=1) {
		
		var result;
		let i = 0;
		
		switch(method) {
			
			case 'int':
			if(mod > 1) {
				while(mod > i) {
					this.math('int',e,mod);
					this.result = parseInt(e);
					mod--;
				}
			} else {
			this.result = parseInt(e); 
			}
			
			break;
			
			case 'float':
			this.result = parseFloat(e);
			break;	

			case 'fixed':
			this.result = e.toFixed(mod);
			break;	
			
			case 'rand':
			this.result = Math.random(1,Number.MAX_SAFE_INTEGER);
			break;
			
			case 'maxint':
			this.result = Number.MAX_SAFE_INTEGER;
			break;		
			
			case 'uuid':
			this.result = Math.random().toString(16).slice(2, 10);
			break;			
			
		}
		
		return this.result;
	},	
	
	rnd: function(method='rand',e=null,len=null,seed=null) {
		
		let r = null;
		switch(method) {
			case 'rand':
			this.r = Math.random(1,Number.MAX_SAFE_INTEGER);
			break;
			case 'uuid':
			this.r = Math.random().toString(16).slice(2, 14);
			break;			
			case 'bytes':
			this.r = Math.random();
			break;			
		}
		return this.r;
	},
	
	toggle: function(id, counter) {
		
		for (i = 0; i < counter; i++) {
			
			try {
				this.dom('toggle' + id,'display','none');
				this.dom('cat' + id,'fontWeight','100');
			} catch (e) {}
		}
		
		this.dom('toggle' + id,'display','block');
		this.dom('cat' + id,'fontWeight','bold');
	},
	
	dom: function(id,method,value='') {

		try {
			if((value) && value != null || value != 'null') {
			
				switch(method) {

					case 'get':
					return document.getElementById(escape(id)).value;
					break;	
					
					case 'set':
					document.getElementById(escape(id)).value = this.htmlspecialchars(value,'full');
					break;
					
					case 'html':
					document.getElementById(escape(id)).innerHTML = this.htmlspecialchars(value,'full');
					break;
					
					case 'gethtml':
					document.getElementById(escape(id)).innerHTML;
					break;	
					
					case 'display':
					document.getElementById(escape(id)).style.display = this.htmlspecialchars(value,'full');
					break;	
					
					case 'fontWeight':
					document.getElementById(escape(id)).style.fontWeight = this.htmlspecialchars(value,'full');
					break;	
					
					case 'className':
					document.getElementById(escape(id)).style.fontWeight = this.htmlspecialchars(value,'full');
					break;				
				}
			
			} else {
				this.message('DOM constructor could not populate the requested action.');
			}
		} catch(e) {
			this.message(this.htmlspecialchars(e,'full'));
		}
		
		return true;
	},
	
	returner: function(data) {
		window.alert(this.htmlspecialchars(data,'full'));
		return this.htmlspecialchars(data,'full');
	},

	json: function(uri) {
	 tinyshop.fetchJSON(uri,function(response) {
		var obj =  JSON.parse(response);
		return obj;
	 });
	},
	
	caller: function(action,method,opts=[],data=[],uri) {
	
		if(action == 'POST') {
			
			if(data != null) {
				var requestMethod = 'POST';
			}
			
		} else {
			var requestMethod =  'GET';
		}
		
		if(!uri) {
			
			switch(method) {
				
				case 'shipping':
				var uri = 'inventory/shipping.json';
				break;
				
				case 'inventory':
				var uri = 'inventory/shop.json';
				break;	
				
				case 'settings':
				var uri = 'inventory/site.json';
				break;
				
				case 'currencies':
				var uri = 'inventory/currencies.json';
				break;	
				
				case 'pages':
				var uri = 'inventory/pages.json';
				break;	
				
				case 'articles':
				var uri = 'inventory/articles.json';
				break;	

				case 'blog':
				var uri = 'inventory/blog.json';
				break;	
				
				case 'messages':
				var uri = 'inventory/messages.json';
				break;	

				case 'conf':
				var uri = 'inventory/shop.conf.json';
				break;	
				
				case 'cart':
				var uri = 'inventory/cart.json';
				break;	
				
				case 'customer':
				var uri = 'inventory/customer.json';
				break;		
				
				case 'orders':
				var uri = 'inventory/orders.json';
				break;		
				
			}	
		}
		
		var func = method;
		var req  = tinyshop.xhr();
		
		req.onreadystatechange = returncall;
		req.open(requestMethod, uri + '?cache-control=' + this.instanceid, true); 
		req.withCredentials = true;
		req.setRequestHeader('Access-Control-Allow-Origin', '*');
		
		if(requestMethod == 'POST' ) {
			
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(JSON.stringify(data));
			
			// req.onload = function (d) {
			//     callback(d.currentTarget.response);
			// };
		
			} else {
			req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			req.send();
		}

		
		function returncall() {

			if (req.readyState == 4) {	
				// add a switch case for each file we need to process.
				switch(func) {
					
					case 'inventory':
					tinyshop.getinventory(this.responseText);
					break;
					
					case 'settings':
					tinyshop.getsettings(this.responseText);
					break;
					
					case 'shipping':
					tinyshop.getshipping(this.responseText,opts);
					break;
					
					case 'currencies':
					tinyshop.getcurrencies(this.responseText,opts);
					break;	
					
					case 'pages':
					tinyshop.getpages(this.responseText,opts);
					break;	
					
					case 'articles':
					tinyshop.getarticles(this.responseText,opts);
					break;	

					case 'blog':
					tinyshop.getblog(this.responseText,opts);
					break;	
					
					case 'messages':
					tinyshop.getmessages(this.responseText,opts);
					break;	

					case 'conf':
					tinyshop.getconf(this.responseText,opts);
					break;	
					
					case 'cart':
					tinyshop.getcart(this.responseText,opts);
					break;	
					
					case 'customer':
					tinyshop.getcustomer(this.responseText,opts);
					break;		
					
					case 'orders':
					tinyshop.getorders(this.responseText,opts);
					break;	
				}
				
			}
		};
	},
 
	fetchJSON: function(uri,callback) {

		var req = tinyshop.xhr();

		req.open("GET", uri, true);
		req.withCredentials = true;
		req.setRequestHeader('Access-Control-Allow-Origin', '*');
		req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				callback(req.responseText);
			}
		}
		req.send(null);
	},
	
	fetchHTML: function(method,uri,data=[],id) {

		var req = this.xhr();
		var res = '';

		if(method == 'POST') {
			if(data != null) {
				var requestMethod = 'POST';
			}
		} else {
			var requestMethod =  'GET';
		}
		
		req.open(requestMethod, uri, true);
		req.withCredentials = true;
		req.setRequestHeader('Access-Control-Allow-Origin', '*');

		if(requestMethod == 'POST' ) {
			
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(data);
			
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status == 200) {
					this.res = req.responseText;
					tinyshop.dom(id,'html',this.res);
				}
			}
		
			} else {
			req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			req.send(null);
		}
	},

	//--> end of tinyshop javascript logic.


	/*
	* Site specific functions
	*/
	
	addtocart: function(productId,qtyformId,token) {
		
		if(!token) {
			var token = 'invalid';
		}
		
		var quantity = this.dom(qtyformId,'get');
		
		if(!quantity || quantity.isNaN) {
			var quantity = 1;
		}
		
		this.id  = this.math('int',productId,1);
		this.qty = this.math('int',quantity, 1);
		
		this.fetchHTML('POST','/shop/cart/addtocart/' + this.instanceid + '/', 'action=addtocart&id='+this.id+'&qty='+this.qty+'&token='+token, 'result');
	},
	
	/*
	* PayPal functions.
	*/
	
	calculateTotalPayPal: function(amount) {

		var price = this.dom('item_price','get');
		var shipping = this.dom('shipping','get');
		var handling = this.dom('handling','get');
		
		var total_amount = this.dom('total_amount','get');
		
		var pre = this.math('int',this.math('int',shipping) + this.math('int',handling));
		var sub_total = this.math('int',price * amount);
		var total = this.math('int',this.math('int',pre) + this.math('int',sub_total));
		
		this.dom('total_amount','set',total);
		
		return true;
	},

	/*
	* Functions to retrieve JSON files. These are called by the caller function.
	* Example: tinyshop.caller('GET','settings',[opt1,opt2,opt3],data={},'inventory/site.json'); 
	* The 3rd and 4th param is optional, as it is constructed from the 1st. the 3rd takes a data object for POST.
	* This retrieves the site.json file, and prints the object out in html. 
	*/
	
    getsettings: function(jsonData) {
	
        var arr = [];
		var col = [];
        arr = JSON.parse(jsonData); 
		
        for (var i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
		
		for (var i = 0; i < arr.length; i++) {
				
			for (var j = 0; j < col.length; j++) {
					if(arr[i][col[j]] == '' || arr[i][col[j]] == null) {
					} else {
					document.write(col[j] + ':');
					document.write(arr[i][col[j]]);
					document.write('<br>');
				}
			}
		}
    },
	
    getinventory: function(jsonData) {
		
        var arr = [];
		var col = [];
        arr = JSON.parse(jsonData); 
		
        for (var i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
		
		for (var i = 0; i < arr.length; i++) {
				
			for (var j = 0; j < col.length; j++) {
					if(arr[i][col[j]] == '' || arr[i][col[j]] == null) {
					} else {
					document.write(col[j] + ':');
					document.write(arr[i][col[j]]);
					document.write('<br>');
				}
			}
		}
    },
	
    getshipping: function(jsonData,opts) {

		if(!opts[2]) {
			this.message('Shipping country is not set, cannot calculate shipping cost.');
		} else {
			
			var arr = [];
			var col = [];
			
			var verzendmethode 	= this.htmlspecialchars(opts[0],'full');
			var totaal 			= opts[1];
			var country 		= this.htmlspecialchars(opts[2],'full');
			var parentId 		= this.htmlspecialchars(opts[3],'full');
			
			var sc = 'shipping.' + this.htmlspecialchars(country,'full');
			
			arr = JSON.parse(jsonData); 
				
			for (var i = 0; i < arr.length; i++) {
					for (var key in arr[i]) {
						if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}
				
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < col.length; j++) {
					if(col[j] == sc) {
						var sp = arr[i][col[j]]; // shipping price
						var totals = this.math('float',totaal) + this.math('float',sp);
						this.dom(parentId,'html',"&euro;" + this.math('float',totals,2));
					}	
				}
			}
		}
    },

    wishlist: function(method, product, g) {

		var req = this.xhr();

		req.open("GET", '/wishlist/' + this.rnd() + '/' + method + '/' + this.htmlspecialchars(product,'full') + '&tr=' + this.htmlspecialchars(g,'uri'), true);
		
		req.onreadystatechange = function() {

			if (req.readyState == 4 && req.status == 200) {
				var text = req.responseText.split('|');
				if (text[0].replace(' ', '') == 'O') {
					if (g != '0') {
						tinyshop.dom('fhs' + product,'html',text[1]);
						tinyshop.dom('favheart' + product,'className','heartfull_png');
						} else {
						tinyshop.dom('fhs' + product,'html',text[1]);
						tinyshop.dom('favheart' + product,'className','favheart_fixed');
					}
				return false;
				} else if (text[0].replace(' ', '') == 'X') {
					if (g != '0') {
						tinyshop.dom('fhs' + product,'html',text[1]);
						tinyshop.dom('favheart' + product,'className','heart_png');
						} else {
						tinyshop.dom('fhs' + product,'html',text[1]);
						tinyshop.dom('favheart' + product,'className','favheart');
					}
					return false;
					} else {
				return false;
				}
			}
		}
		
		req.send(null);
    },
	
    redeemVoucher: function() {

		var voucher = this.dom('voucher','get');

		if (voucher == '') {
			this.message('Please enter voucher code. This code is a sequence of numbers and letters.');
		} else {
			
			var req = this.xhr();
			req.open("GET", '/query/' + this.rnd() + '/voucher/' + this.htmlspecialchars(voucher) + '/', true);
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status == 200) {

					if (req.responseText) {

						var check = req.responseText.split('|');

						if (check[0].replace(' ', '') == 'OK') {
							
							var tot = this.dom('total','gethtml');
							tot = tot.replace('&euro;', '').replace(/\u20ac/g, '').replace(',', '.').replace(' ', '');
							
							var totals = this.math('float',tot);

							if (check[1] != '') {
								var t = check[1];
								var ta = this.math('float',t);
								var totalsx = (totals - ta);
							} else if (check[2] != '' && check[2] != '|') {
								var totals_sub = (totals / 100 * check[2]);
								var totalsx = (totals - totals_sub);
							} else {}

							if (totals < 0) {
								this.message('The amount is too tow to redeem the voucher.');
							} else {
								if (totalsx.toFixed(2) == 'NaN') {
									this.dom('total','html',"&euro;" + totalsx);
									} else {
									this.dom('total','html',"&euro;" + totalsx.toFixed(2));
								}
							}

						} else if (check[0].replace(' ', '') == 'ERR') {
							this.message('Code has already been redeemed, or is wrong.');
						} else {
							this.message('There was a problem with redeeming the voucher code. Please check if the code is correct.');
						}

					} else {
						this.message('There was a problem with redeeming. Please check if the code is correct.');
					}
				}
			}
			req.send(null);
		}
	},
};

/* Cache-control.
 * Setting a fixed instanceid when main.js is loaded. 
 * the instanceid prevents json caching for recently updated files, 
 * but also prevents caching too much on individual json files.
*/
tinyshop.instanceid = tinyshop.rnd('uuid');
