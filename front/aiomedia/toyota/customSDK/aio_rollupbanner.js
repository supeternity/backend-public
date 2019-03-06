AIO.RollupBanner = AIO.extend(AIO.event.Eventful,
{
    constructor: function(config)
    {
	    AIO.RollupBanner.superclass.constructor.call(this);
			
		config = config || {};
		
		this.closed = false;
		this.expanded = false;
		
		this.initEvents();
	}
	
	,initEvents: function()
	{
		var self = this;
		if (window.attachEvent) {
			window.attachEvent('onresize', function() { self.onWindowResize.call(self); });
		} else if (window.addEventListener) {
			window.addEventListener('resize', function() { self.onWindowResize.call(self); }, true);
		}
	}

	,request: function(options) 
	{
		var self = this;
		
		var devId = AIO.guid();
		var appId = AIO.getAppId();
	
		var url = AIO.getRequestUrl() + '?devid=' + devId + '&ctype=5' + '&appid=' + appId + '&fullscreen=1';
		url += '&aio_web=' + '1';
		url += '&aio_osid=' + AIO.ua.osid;
		url += '&aio_devtypeid=' + AIO.ua.devtypeid;
		url += '&aio_devvendor=' + encodeURIComponent(AIO.ua.device.vendor);
		url += '&aio_devmodel=' + encodeURIComponent(AIO.ua.device.model);
		
		AIO.loadJSfile(url);
	}
	
	,setData: function(contetnType, appId, devId, contentId, newtab, rId, gacode, thcode) 
	{
		this.gacode = gacode;
		this.appId = appId;
		this.devId = devId;
		this.rId = rId;
		this.contentId = contentId;
		this.contentType = contetnType;
		this.useNewTab = (newtab === undefined)?true:(newtab?true:false);
		this.thcode = thcode;
	}
	
	,show: function(imgUrl, iframeUrl)
	{
		var self = this;
	
		this.closed = false;
	
		var appId = this.appId;
		var elId = this.elId;
		var devId = this.devId; 
		var rId = this.rId; 
		var contentId = this.contentId;
		var contentType = this.contentType;
		var newtab = this.useNewTab;
		var gacode = this.gacode;
		
		if (this.thcode){
			var thcodeimg = new Image();
			thcodeimg.src = this.thcode;
		}
		this.createContainer();
		var parentEl = AIO.get('aio_rollup_container');
		
		AIO.gaPage(this.gacode, '/', AIO.guid());
		AIO.gaEvent(this.gacode, AIO.devtype(), 'request', 'aio_banner_'+contentId, AIO.guid());

		if (parentEl){
			var statImg = new Image();
			statImg.onload = function(){
				AIO.aioStat(appId, devId, contentId, rId, "impression" );
				self.showContainer.call(self);
			};
			statImg.src = imgUrl;
			
			var iframeEl = AIO.get('aio_rollup_iframe');
			
			var url = iframeUrl;
			if (url.indexOf('?') == -1) url += '?';
			if (this.devId){ url += '&aio_devid=' + encodeURIComponent(this.devId); }
			if (this.contentId){ url += '&aio_contentid=' + encodeURIComponent(this.contentId); }
			if (this.appId){ url += '&aio_appid=' + encodeURIComponent(this.appId); }
			if (this.rId){ url += '&aio_rid=' + encodeURIComponent(this.rId); }
			if (this.gacode){ url += '&aio_gacode=' + encodeURIComponent(this.gacode); }
			
			if (iframeEl) iframeEl.src = url;
		
			parentEl.style.backgroundImage = "url('" + imgUrl + "')";
						
			//parentEl.onclick = function(event){
			//	if (!self.closed){
					//self.expandRollupBanner.call(self);
			//	}
			//}
			
			var url = AIO.getClickUrl() + '?devid=' + devId + '&cid=' + contentId + '&appid=' + appId + '&web=' + '1'+ '&aioid=' + rId;
			parentEl.setAttribute('href', url);
			if (newtab) {
				parentEl.setAttribute('target', '_blank');
			} 
			
			parentEl.onclick = function(event){
				if (event.target == parentEl){
					self.close.call(self);
					AIO.gaPage(gacode, 'aio_banner_'+contentId, AIO.guid());
					AIO.gaEvent(gacode, AIO.devtype(), 'click', 'aio_banner_'+contentId, AIO.guid());
				}
			}
		}
		
		this.onWindowResize();
	}

	,showHTML: function(bannerIframeUrl, iframeUrl)
	{
		var self = this;
	
		this.closed = false;
	
		var appId = this.appId;
		var elId = this.elId;
		var devId = this.devId; 
		var rId = this.rId; 
		var contentId = this.contentId;
		var contentType = this.contentType;
		var newtab = this.useNewTab;
		var gacode = this.gacode;
		
		if (this.thcode){
			var thcodeimg = new Image();
			thcodeimg.src = this.thcode;
		}
			
		this.createContainer();
		var parentEl = AIO.get('aio_rollup_container');
		
		AIO.gaPage(this.gacode, '/', AIO.guid());
		AIO.gaEvent(this.gacode, AIO.devtype(), 'request', 'aio_banner_'+contentId, AIO.guid());

		if (parentEl){
			AIO.aioStat(appId, devId, contentId, rId, "impression" );
			self.showContainer.call(self);
			
			var bannerIframeEl = document.createElement('iframe');
			bannerIframeEl.id = 'aio_rollup_banner_iframe';
			var url = bannerIframeUrl;
			if (url.indexOf('?') == -1) url += '?';
			if (this.devId){ url += '&aio_devid=' + encodeURIComponent(this.devId); }
			if (this.contentId){ url += '&aio_contentid=' + encodeURIComponent(this.contentId); }
			if (this.appId){ url += '&aio_appid=' + encodeURIComponent(this.appId); }
			if (this.rId){ url += '&aio_rid=' + encodeURIComponent(this.rId); }
			if (this.gacode){ url += '&aio_gacode=' + encodeURIComponent(this.gacode); }
            try {
                url += '&aio_pubhost=' + encodeURIComponent(window.top.location.hostname);
            } catch (e) { }
            
			bannerIframeEl.src = url;
		
			parentEl.appendChild(bannerIframeEl);
			
			
			var iframeEl = AIO.get('aio_rollup_iframe');
			
			url = iframeUrl;
			if (url.indexOf('?') == -1) url += '?';
			if (this.devId){ url += '&aio_devid=' + encodeURIComponent(this.devId); }
			if (this.contentId){ url += '&aio_contentid=' + encodeURIComponent(this.contentId); }
			if (this.appId){ url += '&aio_appid=' + encodeURIComponent(this.appId); }
			if (this.rId){ url += '&aio_rid=' + encodeURIComponent(this.rId); }
			if (this.gacode){ url += '&aio_gacode=' + encodeURIComponent(this.gacode); }
            
            try {
                url += '&aio_pubhost=' + encodeURIComponent(window.top.location.hostname);
            } catch (e) { }
            
			if (iframeEl) iframeEl.src = url;
		
			var url = AIO.getClickUrl() + '?devid=' + devId + '&cid=' + contentId + '&appid=' + appId + '&web=' + '1'+ '&aioid=' + rId;
			parentEl.setAttribute('href', url);
			if (newtab) {
				parentEl.setAttribute('target', '_blank');
			} 
			
			parentEl.onclick = function(event){
				if (event.target == parentEl){
					self.close.call(self);
					AIO.gaPage(gacode, 'aio_banner_'+contentId, AIO.guid());
					AIO.gaEvent(gacode, AIO.devtype(), 'click', 'aio_banner_'+contentId, AIO.guid());
				}
			}
		}
		
		this.onWindowResize();
	}

	
	,createContainer: function()
	{
		var self = this;
	
		var el = AIO.get('aio_rollup_container');

		if (!el){
			var el = document.createElement('a');
			el.id = 'aio_rollup_container';
			document.body.appendChild(el);
			el = AIO.get('aio_rollup_container');
			
		}

		if (el){

			el.innerHTML = '';
			
			var expEl = document.createElement('div');
			expEl.id = 'aio_rollup_expand';
			el.appendChild(expEl);
			expEl.onclick = function(event){
				self.expandRollupBanner(0, "true");
				event.preventDefault();
			};
			
			var closeEl = document.createElement('div');
			closeEl.id = 'aio_rollup_close_container';
			closeEl.className = 'aio_rollup_close';
			el.appendChild(closeEl);
			closeEl.onclick = function(event){
				self.close.call(self);
				event.preventDefault();
			};
			
			var bannerEl = document.createElement('div');
			bannerEl.id = 'aio_rollup_banner';

			document.body.appendChild(bannerEl);
			var iframeEl = document.createElement('iframe');
			iframeEl.id = 'aio_rollup_iframe';
			bannerEl.appendChild(iframeEl);

			closeEl = document.createElement('div');
			closeEl.id = 'aio_rollup_close_banner';
			closeEl.className = 'aio_rollup_close';
			closeEl.style.position = 'fixed';
			bannerEl.appendChild(closeEl);
			closeEl.onclick = function(event){
				self.close.call(self);
				event.preventDefault();
			};

			//var collapseEl = document.createElement('div');
			//collapseEl.className = 'aio_rollup_collapse';
			//bannerEl.appendChild(collapseEl);
			//collapseEl.onclick = function(event){
			//	self.collapseRollupBanner.call(self);
			//};

			// AIO.detectSwipe(document.body, function(swipedir){
			// 	if (swipedir == 'up'){
			// 		if (!AIO.rollupBanner){
			// 			return;
			// 		}
			//
			// 		var bnr = AIO.rollupBanner;
			// 		bnr.expandRollupBanner.call(bnr);
			// 	}
			// }, el);

		}
		this.onWindowResize();
	}
	
	,showContainer: function()
	{
		var el = AIO.get('aio_rollup_container');
		if (el){
			el.style.display = 'block';
			this.onWindowResize();	
		}
	}


    , expandRollupBanner: function (dist, isActiveted) {

    	var el = AIO.get('aio_rollup_banner');

    	var elStateDrag = function () {
			el.style.display = 'block';
			el.style.top = "calc(100% - " + dist + "px)";
			var closeImg = AIO.get('aio_rollup_close_banner');
			closeImg.style.display = "none";
        }
		var elStateActive = function () {
			el.style.display = 'block';
			var closeImg = AIO.get('aio_rollup_close_banner');
			if (closeImg) {
				setTimeout(function () {
					closeImg.style.display = "block";
					closeImg.style.top = "initial";
				}, 300)
			}
			AIO.doLoop(10, 30, this, function (step, numberOfSteps) {
				var p = Math.floor(100 * ((numberOfSteps - step) / numberOfSteps));
				el.style.top = p + "%";
                el.style.WebkitTransition = '0.4s top cubic-bezier(0.39, 0.575, 0.565, 1)';
                el.style.MozTransition = '0.4s top cubic-bezier(0.39, 0.575, 0.565, 1)';
                el.style.Transition = '0.4s top cubic-bezier(0.39, 0.575, 0.565, 1)';
            }, function () {
				el.style.top = 0;
			});

			if (document.getElementById('aio_rollup_iframe').contentWindow.postMessage){
            	document.getElementById('aio_rollup_iframe').contentWindow.postMessage("startAnimation", "*");
            }
        }

		if (el && isActiveted === "none") {
			elStateDrag();
		} else if (isActiveted === "true") {
			elStateDrag = elStateActive();
		}

    	if (isActiveted === "false") {

        	animate(function (timePassed) {
            	el.style.top = "calc(100% - " + (+dist - timePassed * (dist / 125)) + "px)";
        	}, 125);
        	setTimeout(function() {el.style.display = "none"}, 125);
    	}
    	function animate(draw, duration) {
        	var start = performance.now();
        	requestAnimationFrame(function animate(time) {
            	var timePassed = time - start;
            	if (timePassed > duration) timePassed = duration;
            	draw(timePassed);
            	if (timePassed < duration) {
                	requestAnimationFrame(animate);
            	}
        	});
    	}
	}

    , compressRollupBanner: function (dist, isDeactiveted) {
    var el = AIO.get('aio_rollup_banner');
    var closeImg;
    if (el && isDeactiveted === "none") {
        el.style.top = -dist + "px";
         closeImg = AIO.get('aio_rollup_close_banner');
		 closeImg.style.top = -dist + "px";
    }
    if (isDeactiveted === "true") {
    	closeImg = AIO.get('aio_rollup_close_banner');
        animate(function (timePassed) {
            el.style.top = -dist +1500/125*timePassed + "px";
            closeImg.style.top = -dist +1500/125*timePassed + "px";
        }, 125);
        setTimeout(function() {el.style.display = "none"}, 125);
        this.expanded = false;
    }
    if (isDeactiveted === "false") {
    	closeImg = AIO.get('aio_rollup_close_banner')
		if (dist < -250) {
            animate(function (timePassed) {
                el.style.top = -dist + dist / 125 * timePassed + "px";
                closeImg.style.top = -dist + dist / 125 * timePassed + "px";
            }, 125);
        } else {
            el.style.top = 0;
            closeImg.style.top = 0;
            // closeImg.style.display = "none";
		}

    }
    function animate(draw, duration) {
        var start = performance.now();
        requestAnimationFrame(function animate(time) {
            // определить, сколько прошло времени с начала анимации
            var timePassed = time - start;
            // возможно небольшое превышение времени, в этом случае зафиксировать конец
            if (timePassed > duration) timePassed = duration;
            // нарисовать состояние анимации в момент timePassed
            draw(timePassed);
            // если время анимации не закончилось - запланировать ещё кадр
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            }
        });
    }
}
	
	,collapseRollupBanner: function()
	{
		var el = AIO.get('aio_rollup_banner');
		if (el){
			el.style.display = 'block';
		}
		
		if (this.expanded){
			this.expanded = false;
			el.style.top = 0;
			AIO.doLoop(10, 30, this, function(step, numberOfSteps){
				var p = Math.floor(100*(step/numberOfSteps));
				el.style.top =  p + "%";
			}, function(){
				el.style.top = '100%';
			});
		}
	}
	
	,hideContainer: function()
	{
		var el = AIO.get('aio_rollup_container');
		if (el){
			el.style.display = 'none';
		}
	}
	
	,hideRollupBanner: function()
	{
		var el = AIO.get('aio_rollup_banner');
		if (el){
			el.style.display = 'none';
		}
	}
	
	,close: function(show) 
	{
		this.closed = true;
		
		this.hideContainer();
		this.hideRollupBanner();
	}
	
	,onWindowResize: function()
	{
		var width =  document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			
		var el = AIO.get('aio_rollup_container');
		var el2 = AIO.get('aio_rollup_banner');
		if (el){
			var expEl = AIO.get('aio_rollup_expand');
			if (width > height){
				width = 0;
				expEl.style.display = 'none';
                el2.style.height = Math.floor((width*100)/320) + 'px';
			} else {
				expEl.style.display = 'block';
                el2.style.height = "100%";
			}
			el.style.height = Math.floor((width*100)/320) + 'px';
		}
		
		var closeEl = document.getElementById('aio_rollup_close_container');
		if (closeEl){
			var w = Math.round(0.1*width);
            closeEl.style.width = '' + w + 'px';
			closeEl.style.height = '' + w + 'px';
			closeEl.style.backgroundSize = '' + w + 'px' + ' ' + w + 'px';
		}
		
		closeEl = document.getElementById('aio_rollup_close_banner');
		if (closeEl){
			var w = Math.round(0.1*width);
			closeEl.style.width = '' + w + 'px';
			closeEl.style.height = '' + w + 'px';
			closeEl.style.backgroundSize = '' + w + 'px' + ' ' + w + 'px';
		}
		
		var expEl = document.getElementById('aio_rollup_expand');
		if (expEl){
			var h = Math.round(0.04*height);
			var w = Math.round(2.5*h);
			expEl.style.width = '' + w + 'px';
			expEl.style.height = '' + h + 'px';
			expEl.style.top = '-' + h + 'px';
			expEl.style.marginLeft = '-' + Math.round(w/2) + 'px';
			expEl.style.backgroundSize = '' + w + 'px' + ' ' + h + 'px';

		}
	}

}); 

AIO.createCss('#aio_rollup_container{ position: fixed; height: 100px; bottom: 0; left: 0; right: 0; background-color : white; display: none; z-index: 9999999998; background-repeat: no-repeat; background-size: cover; background-position: center center; }');
AIO.createCss('#aio_rollup_banner{ position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-overflow-scrolling: touch; overflow: hidden; overflow-y: scroll; background-color : white; display: none; z-index: 9999999999; border: 0; }');
AIO.createCss('#aio_rollup_iframe{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; overflow: hidden; background-color : white; border: 0; }');
AIO.createCss('.aio_rollup_close{ z-index: 9999999999;position: absolute; top: 0; right: 0; display: block; width: 40px; height: 40px; background-size: 40px 40px; background-repeat: no-repeat; background-image: url(data:image/png;base64,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); }');
AIO.createCss('#aio_rollup_expand{ position: absolute; top: -20px; left: 50%; display: block; width: 50px; height: 20px; background-size: 50px 20px; background-position: 0 0; margin-left:-25px; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg4NDk2MThFRjExRTY4RjYxRTFFOTA1REI4RDY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg4NDk3MThFRjExRTY4RjYxRTFFOTA1REI4RDY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTRBODg0OTQxOEVGMTFFNjhGNjFFMUU5MDVEQjhENjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTRBODg0OTUxOEVGMTFFNjhGNjFFMUU5MDVEQjhENjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HjWhBAAAD1klEQVR42uyZSUtbYRSGzTwPJpqYmLSxaqG7bpwHKIVuuusPKKW0hW66za7ddddNf0LpL9GgKI6oOCQ3IgpOSBJv5rHvaSOEm2urJWqC54VDLt+JN7nnOef7zjGKYDDYJiM/7C3sOczYxmqkVmA/YFNyTrXM2mvYR5iGY3cjelq1EOwz7LzWqay51sG+wj4xjFvROOwnrO8yIF9gLzhOtyov7DvMJQXyhmHcmQjGtwsWyurCe47LneoJ7NUFkHfV84N1t6Ki0BGQlxyLppAT9kzJ1dFcnZeSY9BUeqxu9SfIZrPqmZmZnlKppBodHRVMJlOhhR+nq6UrJJPJqKenp3vPzs6s8XjchOv+ZDKpbeFHMrYskFQqpSEAAGG+WBNF0TA1NdWfSCRa9lxsSSBUBYDRh8AbZUDpQ6FQfywW0zOQWxBlP1UBquHS/0Kn02kdQcFWZmQgNyhkvYECTVVwhcNei/f2nZycmBjIDYiynQJM2S/1aTSaEqwoXc/n85rZ2dm+o6MjMwNpoI6Pj81UGZT1Up9KpSoPDAxE0fJGLoGiJigHBwdWBtIAHR4eWhDQXgqs1KdWq0uDg4NCd3f3ucvlSo2MjAharbYOSrFYVM3Pzz/a39+3NfvzqsbHxz8065ejrEYgexHQOhgU+OHhYcHr9YoXa2azOd/Z2SkCoo0g1L6/UqkosW43GAw5u92e5Qq5pvb29uxzc3O90sBWYRRQDZGurq6k1Od0OtNjY2MRCrzUh2leubCw0BONRh0M5Bra3d1tp8CVy+W674dA51HVEdqiLvt7h8ORmZiYiJhMprpKQKUolpaWAuFw2MlAriBBEJyLi4uyMIxGYw7ZH6Yq+Nd9bDZbFlDCFoslIwdlZWUlsL293clnyF+0s7PTsbq6+pACJvVRtlNlYP/PXfV+Op2u5PF4EujSLLlcTiPTvdkUCkUZ506KgUi0ubnpWltbe4DLOhjI8jRtQVarNX/d++K8KaELS2BANMu1zaenp1ZUY8Xtdid5y6pqfX3dDfPL+QDhNwzqoP73/jh3CnSP9vZ22aBvbW11Ly8ve1GZDGRjY8ON6vDJ+bA9JScnJ8ON+I1Dr9cXCUpHR8e5nD8SiXhQoZ57DwSHb0ZuwkanJAKGgOwuNuqz6EzBFi2gQ4vLTfyoxuy9B+Lz+c5ppqidsCmLkc0CAlhs9OcBfhmd2i5mmFjtxD80NCQEAoEYH+p/JuwCWlmRuh56RcCiAFS+sSxUKit+vz8uiqKWui/AiNZO/HcpRTAYXGhj8WDIYiAMhMVAGAiLgTAQFgNhIKzm0C8BBgB9HJ9oj5pLAwAAAABJRU5ErkJggg==); }');
AIO.createCss('.aio_rollup_collapse{ position: absolute; bottom: 0; left: 50%; display: block; width: 50px; height: 20px; background-size: 50px 20px; background-position: 0 0; margin-left:-25px; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyN0MyMzBFMTkwMDExRTY4QkMxQkZBNDUxQzZEQzBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyN0MyMzBGMTkwMDExRTY4QkMxQkZBNDUxQzZEQzBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI3QzIzMEMxOTAwMTFFNjhCQzFCRkE0NTFDNkRDMEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI3QzIzMEQxOTAwMTFFNjhCQzFCRkE0NTFDNkRDMEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70OaN8AAADoUlEQVR42uyay25SQRjH4VzgnMOlUFqgtJTLOdi48wHcGBM37nwAY4wu3Lhlpzt3bnwE45MYH8A9d63Wqihyv+P/a6gh7ZCm6W3Gzj/5EsIA0/l+8z8z30zd+XzexVAS8RhxF2G5pM5THxFvEe9ZjRrjvYeIZwhd5u5CdGseHxAvEM3FRmXhtRfxCvFcwrgU3Ua8QzjLgLxE3JN5ulQlEG8Q0aNAHkkYVyaC8fqQhTJ/46nMy5XqJuLBIZAn8/VD6mpFpvASkPsyF1wogrijSHfwtfNSZA640g0JhC/FJRC+ZGm8/CXtdtuqVCq2aZrdTCZTUVV1epH9zWYzN/pLod9gKpWqrKystHjIAxcOabVavnK5nBuNRp5msxkqlUr2eDxWL6q/6XSqoI9Mo9GIoB+dJgJeByUQiBIBGA4Soy24JTiHcu4OnkwmBzAAPrwASK1Wq3a9Xg9feyC9Xs9Eko4lvtPpBAqFgg3XnBsUch2BhiNDLNf0+33j2gPZ2NjYj8fju0tg+QElNxwOz3z6TGCLxaJD7mO1r6+v7yUSiT25hkBIxD7iM6sNs9aiRA4GA88ZYOj0G91u18/ca8bjX5LJ5Fe32y3XkIWkfN/a2qrRBmgJlBwcc+pTBQIJlzn4rm+JQ3cxGb7xkgeu6pBoNPoTM7WGmTpjJNbA8z+HWW6cBgY5g4Cy2jc3Nz/RI5OnHHBXGOJZXt/e3q4AyrE6BGuJl6BgwT/xnh+OMGj9ARTzaBsBhxursVjsB2/j57JSj0Qiv6lYY0GhWgVQHKpdln0fLjLJGQBosGDAhVW4sc7j2Lk9OlldXW2gYi8pijJhbF91ql1QS/gZ22WLgAHcsfUGvzUl962trf3iddxcn2WFQqEmQVFVdcwo8DRU2M5ihQ3X+OmRRi5iwJjAdWVyH89j5v5wkc6YstlsSdM0FpSDCpugzI9fmNU9gE7S6XQ5HA7/4X28mksABQKBtm3bBUr40dlPFXatVsvSdplV8ZO7yGXBYLAtwliFOX73+XxdQCl6PJ4ByyksGHDVCO4qigJDKCAky7J65BSv19s/6bO6rg8JINzVEWmMwl1QmaY5cBynYBhGd9lnyEUEjlwl2viEvDGEQ4aAUqTLLEZbn2DATX0RxybsFS5cMCKnIPH/1ge4pkfvkYtEHZfQd+pYJ8ZwQwmPpiYgdAgGuUfkMWkuwUVQdnZ2Cq7/RPK/TiQQKQlEApGSQCQQKQnkGuivAAMAh8SeCmACA74AAAAASUVORK5CYII=); }');
AIO.createCss('#aio_rollup_banner_iframe{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; overflow: hidden; background-color : white; border: 0; }');

 
(function() {
    AIO.set(AIO, {
		rollupBanner: null
		
		,requestRollupBanner: function(options) {
			if (!AIO.rollupBanner){
				AIO.rollupBanner = new AIO.RollupBanner();
			}
			
			var bnr = AIO.rollupBanner;
			bnr.request.call(bnr, options);
			
		}
		
		,setRollupData: function(contetnType, appId, devId, contentId, newtab, rid, gacode, thcode) {
			if (!AIO.rollupBanner){
				return;
			}
			
			var bnr = AIO.rollupBanner;
			bnr.setData.call(bnr, contetnType, appId, devId, contentId, newtab, rid, gacode, thcode);
		}
		
		,setRollupNoData: function()
		{
			AIO.eventManager.fireEvent('loaderror',{id:'aio_rollup_container'});
		}
		
		,showRollupBanner: function(imgUrl, iframeUrl) {
			if (!AIO.rollupBanner || AIO.hasBanner){
				return;
			}
			
			AIO.hasBanner = true;
		
			var bnr = AIO.rollupBanner;
			var fbnr = AIO.fullscreenBanner;			
			if (imgUrl.indexOf(".jpeg", imgUrl.length - 5) !== -1 
				|| imgUrl.indexOf(".jpg", imgUrl.length - 4) !== -1
				|| imgUrl.indexOf(".gif", imgUrl.length - 4) !== -1
				|| imgUrl.indexOf(".png", imgUrl.length - 4) !== -1){
				bnr.show.call(bnr, imgUrl, iframeUrl);
			} else {
				bnr.showHTML.call(bnr, imgUrl, iframeUrl);
			}
		}
		
		,closeRollupBanner: function() {
			if (!AIO.rollupBanner){
				return;
			}
			
			var bnr = AIO.rollupBanner;
			bnr.close.call(bnr);
		}
	});
})();


function aioRollupListener(event) 
{
	if (event.data && event.data == 'AIO.closeRollupBanner()') {
		AIO.closeRollupBanner();
		return;
	}
}

if (window.addEventListener) {
	window.addEventListener("message", aioRollupListener);
} else {
	window.attachEvent("onmessage", aioRollupListener);
}


