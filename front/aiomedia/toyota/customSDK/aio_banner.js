AIO.createCss('.aio_ctype_5{ height:100px;position:fixed;bottom:0;left:0;right:0;z-index:99; }'); 


AIO.Banner = AIO.extend(AIO.event.Eventful,
{
	refreshed: false

	,constructor: function(config)
    {
	    AIO.Banner.superclass.constructor.call(this);
			
		config = config || {};
		
		this.closeButton  = config.closeButton?true:false;
		
		var self = this;

		if (window.addEventListener) {
			window.addEventListener('scroll', function(){self.onUserAction.call(self);}, false);   
			window.addEventListener("touchstart", function(){self.onUserAction.call(self);}, false); 
			window.addEventListener("mousedown", function(){self.onUserAction.call(self);}, false); 
			window.addEventListener('resize', function() { self.resize.call(self); }, true);
			window.addEventListener('load',function() { self.onUserAction.call(self); },false);
		} else if (window.attachEvent) {
			window.attachEvent('onscroll', function(){self.onUserAction.call(self);}); 
			window.attachEvent('onmousedown', function(){self.onUserAction.call(self);}); 
			window.attachEvent('onresize', function() { self.resize.call(self); });
			window.attachEvent('onload',function() { self.onUserAction.call(self); });
		}
		
	}
	
	,onUserAction: function()
	{
		if (!this.elId) return;
		
					
		if (this.contentType == 6 || this.contentType == 7){
			var vp = this.videoPlayer;
			if (vp && vp.loaded && !vp.ended){
			
				var videoContainer = AIO.get(this.elId);
				var width =  videoContainer.clientWidth;
				var videoSize = this.videoPlayer.getVideoSize.call(this.videoPlayer);
				var height = Math.floor((width*videoSize.h) / videoSize.w);
                
				var isVisible = AIO.isElementInViewport(AIO.get(this.elId), width, height);

				if (isVisible && videoContainer.aioIsVisible() && videoSize.w > 0 && videoSize.h > 0){

					if (!this.expanded && !this.expanding) {
						this.expand();
					}

					if (!vp.playing) {
						vp.play.call(vp);
					}

					if(this.expanded && !this.impressed) {
						
						vp.reportImpression.call(vp);
						this.impressed = true;
						//vp.onCanPlay();	
					}
				
				} else {
					if (vp.playing) {
						vp.pause.call(vp);
					}
				}
			}		
		}
		
		if (this.contentType == 1 && this.showed){
			//var width =  AIO.get(this.elId).clientWidth;
			//var height = AIO.get(this.elId).clientHeight;
		
			// var isVisibe = AIO.isElementInViewport(AIO.get(this.elId), width, height);
			// if (isVisibe && !this.impressed){
			// 	this.impressed = true;
			// 	AIO.aioStat(this.appId, this.devId, this.contentId, this.rId, "impression" );
			// }
			if (!this.impressed){
				this.impressed = true;
				AIO.aioStat(this.appId, this.devId, this.contentId, this.rId, "impression" );
			}
		}
	}
	,impressed: false
	
	,refresh: function(elId, contentType, forced)
	{
		if (forced) this.refreshed = false;
		if (this.refreshed ) return;
		
		this.refreshed = true;
		
		this.elId = elId;
		this.contentType = contentType;
		
		this.request()
	}

	,request: function() 
	{
        if (!AIO.isNumber(this.contentType)) return;

		var self = this;
        var appId= AIO.getAppId();
        
		var url = AIO.getRequestUrl() 
		url += '?devid=' + AIO.guid();
		url += '&ctype=' + this.contentType;
		url += '&appid=' + appId;
		url += '&elid=' + encodeURIComponent(this.elId);
		url += '&aio_web=' + '1';
		url += '&aio_osid=' + AIO.ua.osid;
		url += '&aio_devtypeid=' + AIO.ua.devtypeid;
		url += '&aio_devvendor=' + encodeURIComponent(AIO.ua.device.vendor);
		url += '&aio_devmodel=' + encodeURIComponent(AIO.ua.device.model);
		
		if (this.contentType == 1 || this.contentType == 5) {
			AIO.loadJSfile(url);
		} else if (this.contentType == 6 || this.contentType == 7) {
			
			this.clearContainer();
			this.expanded = false;
			this.expanding = false;
			if (this.expandingTimer) window.clearInterval(this.expandingTimer);
			
			var parentEl = AIO.get(this.elId);
			if (parentEl){
				if (this.contentType != 5){
					if (parentEl.style.position == '') { parentEl.style.position = 'relative'; }
				}
		
				var el = document.createElement('div');
				el.className = 'aio_videobanner_container';
				el.id = this.elId + "_aio_container";
				parentEl.appendChild(el);
			
				url += '&vast=' + '1';
				
				var hasProgress 	= !parentEl.hasAttribute('data-progress-control') || parentEl.getAttribute('data-progress-control') === 'true';
				var hasMuteControl 	= AIO.isTouchDevice() || !parentEl.hasAttribute('data-mute-control') || parentEl.getAttribute('data-mute-control') === 'true';
				var hasPackshot 	= !parentEl.hasAttribute('data-packshot') || parentEl.getAttribute('data-packshot') === 'true';

				var vp = new AIO.VideoPlayer({
					parentId: el.id
					,hasProgress: hasProgress
					,hasMuteControl: hasMuteControl
					,skipable: false
					,launchWithAudio: false
					,autoStart: false
					,hasPackshot: hasPackshot
				});

				vp.addListener.call(vp, 'start', {fn:function(){
					self.showContainer.call(self);
					self.resize.call(self);
				}});

				vp.addListener.call(vp, 'click', {fn:function(){
					self.collapse.call(self);
				}});

				vp.addListener.call(vp, 'skip', {fn:function(){
					self.collapse.call(self);
				}});

				vp.addListener.call(vp, 'end', {fn:function(){

					if(vp.hasPackshot) {
						
						vp.packshotEl.style.display = 'block';

						setTimeout(function(){
			
							if(!vp.playing) {
								
								vp.fireEvent('close');
								vp.closed = true;	
							
							}
			
						}, 20 * 1000);


					} else {

						self.collapse.call(self);
					
					}
				}});

				vp.addListener.call(vp, 'close', {fn: function(){
					
					self.collapse.call(self);

				}});

				vp.addListener.call(vp, 'load_error', {fn:function(){
					AIO.eventManager.fireEvent('loaderror',{id:self.elId});
				}});
				
				this.videoPlayer = vp;
				vp.loadVAST.call(vp, url);
				
				this.resize();
			}			
		}
	}
	
	,clearContainer: function()
	{
		var el = AIO.get(this.elId);
		if (el) el.innerHTML = '';
	}
	
	,showContainer: function()
	{
		var el = AIO.get(this.elId);
		if (el) el.style.display = 'block';
	}
	
	,showed: false
	,show: function(elId, appId, devId, contentId, newtab, rId, imgUrl, adUrl, gacode, thcode)
	{
		if (elId != this.elId) return;
		
		this.appId = appId;
		this.contentId = contentId;
		this.devId = devId;
		this.rId = rId;
		
		this.clearContainer();
		
		var self = this;
		
		var parentEl = AIO.get(elId);
		if (parentEl){
		
			if (thcode){
				var thcodeimg = new Image();
				thcodeimg.src = thcode;
			}
		
			AIO.gaPage(this.gacode, '/', AIO.guid());
			AIO.gaEvent(this.gacode, AIO.devtype(), 'request', 'aio_banner_'+contentId, AIO.guid());
			
			var el = document.createElement('a');
            
			if (this.contentType != 5 && parentEl.style.position == '') { parentEl.style.position = 'relative'; }
			el.className = 'aio_banner_container';
			el.id = this.elId + '_aio_banner_container';
			parentEl.appendChild(el);
            if(/\.html$/.test(imgUrl)) {
                
                var iframe = document.createElement('iframe');
                var frameUrl = imgUrl;
                var queryParams = [];
                
                if (this.devId){ 
                    queryParams.push('aio_devid=' + encodeURIComponent(this.devId));
                }
                
                if (this.contentId){
                    queryParams.push('aio_contentid=' + encodeURIComponent(this.contentId));
                }
                
                if (this.appId){ 
                    queryParams.push('aio_appid=' + encodeURIComponent(this.appId));
                }
                
                if (this.rId){ 
                    queryParams.push('aio_rid=' + encodeURIComponent(this.rId));
                }
                
                if (this.gacode){ 
                    queryParams.push('aio_gacode=' + encodeURIComponent(this.gacode));
                }
                
                try {
                    queryParams.push('aio_pubhost=' + encodeURIComponent(window.top.location.hostname));
                } catch (e) { }
                
                if (frameUrl.indexOf('?') == -1) frameUrl += '?';
                frameUrl += queryParams.join("&");
                
                iframe.src = frameUrl;
                iframe.setAttribute('frameborder', 0);
                iframe.setAttribute('scrolling', 'no');
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                el.appendChild(iframe);
                
            } else {
                
                el.style.backgroundImage = "url('" + imgUrl + "')";
                el.style.backgroundSize = 'contain';
                el.style.backgroundRepeat = 'no-repeat';
                el.style.backgroundPosition = 'center center';
            
            }
            
            AIO.aioStat(appId, devId, contentId, rId, "impression" );
            
			var url = AIO.getClickUrl() + '?devid=' + devId + '&cid=' + contentId + '&appid=' + appId + '&web=' + '1'+ '&aioid=' + rId;
			el.setAttribute('href', url);
			if (newtab) {
				el.setAttribute('target', '_blank');
			} 
			
			el.onclick = function(event){
				AIO.gaPage(self.gacode, 'aio_banner_'+contentId, AIO.guid());
				AIO.gaEvent(self.gacode, AIO.devtype(), 'click', 'aio_banner_'+contentId, AIO.guid());
			}
			
			if (this.contentType == 5){
				this.showCloseButton();
			}
		}		
	}

	,collapseStep: 0
	,collapsing: false
	,collapseTimer: 0
	,expandStep: 0
	,expanded: false
	,expanding: false
	,expandingTimer: 0
	,resize: function()
	{
		if (this.contentType == 1){
		
		}
	
		if (this.contentType == 6 || this.contentType == 7){
			if(!this.elId || !this.videoPlayer || !this.videoPlayer.loaded || !this.expanded || this.collapsing ) return;
		
			var width =  AIO.get(this.elId).clientWidth;
			var containerEl = AIO.get(this.elId + "_aio_container");
			if (containerEl) {
				var videoSize = this.videoPlayer.getVideoSize.call(this.videoPlayer);
				if (videoSize && videoSize.w){
					var height = Math.floor((width*videoSize.h) / videoSize.w);
					containerEl.style.height = '' + height + 'px';
				}
			}
		}
	}
	
	,expand: function()
	{

		var videoSize = this.videoPlayer.getVideoSize();

		if ((this.contentType != 6 && this.contentType != 7) || !this.elId || !this.videoPlayer || !this.videoPlayer.loaded) return;
		if (this.expanded || this.expanding) return;
		
		this.expanding = true;
		this.expandStep = 0;
		
		var self = this;
		
		this.expandingTimer = window.setInterval(function(){
			self.onExpand.call(self);
		}, 50);
	}
	
	,onExpand: function()
	{
		this.expandStep++;
		var el = AIO.get(this.elId);
		var width =  el.clientWidth || el.offsetWidth;
		var containerEl = AIO.get(this.elId + "_aio_container");
		if (containerEl) {
			var videoSize = this.videoPlayer.getVideoSize.call(this.videoPlayer);
			if (videoSize && videoSize.w){
				var height = (width*videoSize.h) / videoSize.w;
				height = Math.floor((height*this.expandStep)/10);
				containerEl.style.height = '' + height + 'px';
			}
		}
		
		this.expandStep++;
		if (this.expandStep > 10){
			this.expanded = true;
			this.expanding = false;
			if (this.expandingTimer) window.clearInterval(this.expandingTimer);
			this.resize();
		}
	}
	
	,collapse: function()
	{
		if ((this.contentType != 6 && this.contentType != 7) || !this.elId || !this.videoPlayer || !this.videoPlayer.loaded ) return;
		if (this.collapsing) return;
		
		this.collapsing = true;
		this.collapseStep = 0;
		
		var self = this;
		
		this.collapsingTimer = window.setInterval(function(){
			self.onCollapse.call(self);
		}, 50);
	}
	
	,onCollapse: function()
	{
		this.collapseStep++;
		var width =  AIO.get(this.elId).clientWidth;
		var containerEl = AIO.get(this.elId + "_aio_container");
		if (containerEl) {
			var videoSize = this.videoPlayer.getVideoSize.call(this.videoPlayer);
			if (videoSize && videoSize.w){
				var height = (width*videoSize.h) / videoSize.w;
				height = Math.floor((height*(10-this.collapseStep))/10);
				containerEl.style.height = '' + height + 'px';
			}
		}
		
		this.collapseStep++;
		if (this.collapseStep > 10){
			this.collapsing = false;
			if (this.collapsingTimer) window.clearInterval(this.collapsingTimer);
			this.clearContainer();
			delete AIO.banners[this.elId]; 
		}
	}
	
	,showCloseButton: function(show) 
	{
		var self = this;
		var id = this.elId;
		var parentEl = AIO.get(id);
		if (parentEl) {
			el = document.createElement('div');
			el.className = 'aio_close';
			parentEl.appendChild(el);
			el.onclick = function(event){
				self.close.call(self, event);
			};
		}
	}
	
	,close: function(event)
	{
		this.clearContainer();
		var parentEl = AIO.get(this.elId);
		parentEl.style.display = 'none';
		
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.returnValue = false;
		}
		
		AIO.eventManager.fireEvent('bannerDidClose',{id:this.elId});
	}
}); 


(function() {
    AIO.set(AIO, {
		banners: {}
		
		,refresh: function() {
			var elements = document.getElementsByClassName('aio_banner');
			if (elements && elements.length){
				for (var i = 0; i < elements.length; i++){
					AIO.refreshEl(elements[i], false);
				}	
			}
		}
		
		,refreshEl: function(el, forced) {
			if (AIO.isElement(el) && el.nodeType == 1){
				var id = el.id;
				var ctype = parseInt(el.getAttribute("data-aio-ctype"));
				var banner = AIO.banners[id];
				if (!banner){
					banner = new AIO.Banner();
					AIO.banners[id] = banner;
				}
				
				banner.refresh(id, ctype, forced);
			}
		}
		
		,forceRefreshEl: function(el) {
			if (AIO.isElement(el) && el.nodeType == 1){
				AIO.refreshEl(el, true);
			}
		}

		,setData: function(elId, appId, devId, contentId, newtab, rid, gacode, thcode) 
		{
			AIO.banner_appId = appId;
			AIO.banner_elId = elId;
			AIO.banner_devId = devId;
			AIO.banner_rId = rid;
			AIO.banner_contentId = contentId;
			AIO.banner_newtab = newtab || 1;
			AIO.banner_gacode = gacode;
			AIO.banner_thcode = thcode;
		}
		
		,setNoData: function(elId)
		{
			AIO.eventManager.fireEvent('loaderror',{id:elId});
		}
		,showCode: function(html) {
            var c = document.createElement("div"),
                f = document.getElementById(AIO.elId);
            c.innerHTML = html, f ? f.appendChild(c) : document.getElementsByTagName("body")[0].appendChild(c);
            for (var scripts = c.getElementsByTagName("script"), i = 0; i < scripts.length; i++) "" != scripts[i].src ? AIO.loadJSfile(scripts[i].src) : scripts[i].text.length && eval(scripts[i].text)
        }
		,showBanner: function(imgUrl, adUrl) {
			
			var appId = AIO.banner_appId;
			var elId = AIO.banner_elId;
			var devId = AIO.banner_devId; 
			var contentId = AIO.banner_contentId;
			var rId = AIO.banner_rId; 
			var gacode = AIO.banner_gacode;
			var newtab = AIO.banner_newtab?true:false;
			var thcode = AIO.banner_thcode;
			
			var banner = AIO.banners[elId];
			if (banner){
				AIO.eventManager.fireEvent('bannerWillShow',{id:elId});
				banner.show.call(banner, elId, appId, devId, contentId, newtab, rId, imgUrl, adUrl, gacode, thcode);
			}
		}
	});
})();

AIO.addStartListener(function(){
	AIO.refresh();
});

