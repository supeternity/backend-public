AIO = {
    version: [1,0,0]
	,generatedId: 0
	,currentTime: 0
	,useTest: false
    ,set: function(object, sourceObject, defaultObject) {
        if (typeof defaultObject !== 'undefined') {
            AIO.set(object, defaultObject);
        }

        if (typeof sourceObject !== 'undefined') {
            for(var param in sourceObject) {
                object[param] = sourceObject[param];
            }
        }
        return object;
    }
};


Element.prototype.aioIsVisible = function() {

    'use strict';

    function _isVisible(el, t, r, b, l, w, h) {
        var p = el.parentNode,
                VISIBLE_PADDING = 2;

        if ( !_elementInDocument(el) ) {
            return false;
        }

        //-- Return true for document node
        if ( 9 === p.nodeType ) {
            return true;
        }

        //-- Return false if our element is invisible
        if (
             '0' === _getStyle(el, 'opacity') ||
             'none' === _getStyle(el, 'display') ||
             'hidden' === _getStyle(el, 'visibility')
        ) {
            return false;
        }

        if (
            'undefined' === typeof(t) ||
            'undefined' === typeof(r) ||
            'undefined' === typeof(b) ||
            'undefined' === typeof(l) ||
            'undefined' === typeof(w) ||
            'undefined' === typeof(h)
        ) {
            t = el.offsetTop;
            l = el.offsetLeft;
            b = t + el.offsetHeight;
            r = l + el.offsetWidth;
            w = el.offsetWidth;
            h = el.offsetHeight;
        }
        //-- If we have a parent, let's continue:
        if ( p ) {

            //-- Let's recursively check upwards:
            return _isVisible(p, t, r, b, l, w, h);
        }
        return true;
    }

    //-- Cross browser method to get style properties:
    function _getStyle(el, property) {
        if ( window.getComputedStyle ) {
            return document.defaultView.getComputedStyle(el,null)[property];
        }
        if ( el.currentStyle ) {
            return el.currentStyle[property];
        }
    }

    function _elementInDocument(element) {
        while (element = element.parentNode) {
            if (element == document) {
                    return true;
            }
        }
        return false;
    }

    return _isVisible(this);

};

(function() {
    AIO.set(AIO, {
        define : function() {
            for (var i = 0; i < arguments.length; i++) {
                var name = arguments[i];
                var subNames = name.split(".");
                var parent = window;
                var subName;

                for (var si = 0; si < subNames.length; si++) {
                    subName = subNames[si];
                    parent[subName] = parent[subName] || {};
                    parent = parent[subName];
                }
            }
        },
		hasBanner:false
		,removeEl: function(id)
		{
			var el = document.getElementById(id);
			if (el) {
				el.parentNode.removeChild(el);
			}
		}
			
		,createEl: function(type, id, className, text)
		{
			var el = document.createElement(type);
			if (id && id.length) el.id = id;
			if (className && className.length) el.className = className;
			if (text && text.length) el.innerHTML = text;
			AIO.containerEl.insertBefore(el, AIO.containerEl.firstChild);
			return el;
		}

		,createButton: function(id, className, title, parent) {
			var el = document.createElement('button');
			if (id && id.length) el.id = id;
			if (className && className.length) el.className = className;
			if (title && title.length) el.innerHTML = title;
			if (parent) parent.appendChild(el);
			return el;
		}
	
		,createCss: function(css) {
            
            var head, style;
            
            style = document.getElementById('aio-media-style');
            
            if(!style) {
                
                head = document.head || document.getElementsByTagName('head')[0];
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'aio-media-style';
                head.appendChild(style);
            }
            
			if (style.styleSheet){
                style.styleSheet.cssText += css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

		}
		
		,loadJSfile: function(filename) {
			var fileref=document.createElement('script')
			fileref.setAttribute("type","text/javascript")
			fileref.setAttribute("src", filename)
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
		
		,getTime: function()
        {
            return AIO.currentTime || 0;
        }

		,loadCSSfile: function(filename) {
			var fileref=document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", filename)
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
		
        ,generateId: function() {
            return 'aid-'+(AIO.generatedId++);
        }

        ,isArray: function(object) {
            return Object.prototype.toString.call(object) == '[object Array]';
        }

        ,isDate : function(object) {
                return toString.apply(object) === '[object Date]';
        }

        ,isObject: function(object) {
            return !!object && Object.prototype.toString.call(object) === '[object Object]';
        }

        ,isFunction : function(object) {
            return Object.prototype.toString.apply(object) === '[object Function]';
        }

        ,isNumber : function(object) {
            return typeof object === 'number' && isFinite(object);
        }

        ,isString : function(object) {
            return typeof object === 'string';
        }

        ,isBoolean : function(object) {
            return typeof object === 'boolean';
        }

        ,isElement : function(object) {
            return object ? !!object.tagName : false;
        }

        ,isDefined : function(object) {
            return typeof object !== 'undefined';
        }

		,isSmartphone: function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		
		,isMobileOrTablet: function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		
        ,doEach : function(objects, fn, scope, params) {
            try {
                for(var i = 0, length = objects.length; i < length; i++) {
                    fn.call(scope || objects[i], objects[i], i, objects, params);
                }
            } catch(e) { }
        }
		
		,logEl: null
		,log: function(text) {
			if (!AIO.logEl) AIO.logEl = AIO.get('aio_log');
			if (AIO.logEl && text) AIO.logEl.innerHTML = AIO.logEl.innerHTML + text;
		}
		
		 ,get: function(id) {
            var el = document.getElementById(id);
            return el;
        }

        ,html: function(el, value) {
            if (!el || !('innerHTML' in el))
                return undefined;

            if (value === undefined) {
                return el.innerHTML;	
			} else {
                el.innerHTML = value;
                return value;
            }
        }
		
		,css: function(el, value) {
            for (var name in value){
                AIO.setStyle(el, name, value[name]);
            }
        }
		
		,doEach : function(objects, fn, scope, params)
        {
            try {
                for(var i = 0, length = objects.length; i < length; i++) {
                    fn.call(scope || objects[i], objects[i], i, objects, params);
                }
            } catch(e) {

            }
        }

        ,setStyle: function(el, name, value) {
            if (!el)
                return;

            if (name == 'width' || name == 'height' || name == 'top' || name == 'left') {
                value = parseInt(value);
                value = value == 0? 0: value + 'px';
            }

            if (name == 'opacity') {
                value = parseFloat(value);
                if (value < 0)
                    value = 0.0;
                else if (value > 1)
                    value = 1.0;
            }

            if (name == 'webkitTransitionDuration') {
                value = parseInt(value);
                value = value <= 0? 0: value + 'ms';
            }

            el.style[name] = value;
        }
		
		,parseGET: function()
        {
            var tmp = new Array();
            var tmp2 = new Array();
            var get = {};

            var url = window.location.search
            if(url != '') {
                tmp = (url.substr(1)).split('&');
				for(var i=0; i < tmp.length; i++) {
					tmp2 = tmp[i].split('=');
					get[tmp2[0]] = tmp2[1];
				}
            }

            return get;
        }

        ,getStyle: function(el, name) {
            return el? el.style[name] : '';
        }

        ,createNode: function(tag, id, parent) {
            var el = document.createElement(tag || 'div');

            if (id !== undefined) {
                el.setAttribute('id', id);
            }
            
            if (parent !== undefined) {
                var parentEl = AIO.isString(parent)?AIO.get(parent): parent;
                if (parentEl){
                    parentEl.appendChild(el);
				}
            }
            return el;
        }

        ,addClass: function(el, className) {
            if (el && className && typeof className === "string") {
                var classNames = (className || "").split(/\s+/);

                if (el.nodeType === 1) {
                    if (!el.className){
                        el.className = className;
                    } else {
                        var currentClassName = " " + el.className + " ";
                        for (var c = 0, cl = classNames.length; c < cl; c++) {
                            if (currentClassName.indexOf(" " + classNames[c] + " ") < 0) {
                                el.className += " " + classNames[c];
                            }
                        }
                    }
                }
            }
        }

        ,removeClass: function (el, className) {
            if (el && className && typeof className === "string") {
                var classNames = (className || "").split(/\s+/);

                if (el.nodeType === 1) {
                    if (el.className) {
                        var currentClassName = (" " + el.className + " ").replace(/[\n\t]/g, " ");
                        for (var c = 0, cl = classNames.length; c < cl; c++) {
                            currentClassName = currentClassName.replace(" " + classNames[c] + " ", " ");
                        }
                        el.className = currentClassName.substring(1, currentClassName.length - 1);
                    }
                }
            }
        }
		
		,isElementInViewport: function(el, width, height) 
		{
			//return el.aioIsVisible();


			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = width || el.offsetWidth;
			var height = height || el.offsetHeight;

			while(el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}

			return (
				top + height / 2 >= window.pageYOffset &&
				left >= window.pageXOffset &&
				(top + height  / 2) <= (window.pageYOffset + window.innerHeight) &&
				(left + width) <= (window.pageXOffset + window.innerWidth)
			);
		}
        ,isTouchDevice: function() {
            return 'ontouchstart' in window || navigator.maxTouchPoints;
        }
		,setClass: function(el, className) {
            if (el && className && typeof className === "string") {
                if (el.nodeType === 1) {
                    el.className = className;
                }
            }
		}
		
		,guid: function(){
			var guidKey = 'aio_guid';
            var guid;
            
            // Read GUID from object
            guid = AIO._guid;
            if (AIO.isString(guid) && guid.length) {
				return guid;
			}
            
            // Read GUID from cookie
			guid = AIO.readCookie(guidKey);
			if (AIO.isString(guid) && guid.length){
				return guid;
			}
            
            // Read GUID from localStorage
            try {
                guid = localStorage.getItem(guidKey);
            } catch(e) { }
            
            if (AIO.isString(guid) && guid.length){
				return guid;
			}
            
			guid = AIO.generateGuid();
			AIO.createCookie(guidKey, guid, 90);
            AIO[guidKey] = guid;
            try {
                localStorage.setItem(guidKey, guid);
            } catch (e) { }
            
            return guid;
		}
		
		,generateGuid: function() {
			function _p8(s) {
				var p = (Math.random().toString(16)+"000000000").substr(2,8);
				return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
			}
			return _p8() + _p8(true) + _p8(true) + _p8();
		}
		/*
		,generateGuid : function() {
			var nav = window.navigator;
			var screen = window.screen;
			var guid = nav.mimeTypes.length;
			guid += nav.userAgent.replace(/\D+/g, '');
			guid += nav.plugins.length;
			guid += screen.height || '';
			guid += screen.width || '';
			guid += screen.pixelDepth || '';

			return guid;
		}
		*/
		
		,createCookie: function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}

		,readCookie: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}

		,eraseCookie: function(name) {
			AIO.createCookie(name,"",-1);
		}
		
		,hasClass: function (el, className) {
			if (el && className && typeof className === "string") {
				if (el.nodeType === 1) {
                    if (el.className) {
                        var currentClassName = (" " + el.className + " ").replace(/[\n\t]/g, " ");
						return ( currentClassName.indexOf(" " + className + " ") > -1 ) 
					}
				}
			} 
			
			return false;
			
		}
		
        ,extend: function() {
            return function(child, parent, overrides) {
                if(typeof parent == 'object') {
                    overrides = parent;
                    parent = child;
                    child = overrides.constructor != Object.prototype.constructor ? overrides.constructor : function(){AIO.set(this, arguments);};
                }
                var F = function(){};
                var parentp = parent.prototype;
                F.prototype = parentp;
                var childp = child.prototype = new F();
                childp.constructor=child;
                child.superclass=parentp;
                
				if (parentp.constructor == Object.prototype.constructor) {
                    parentp.constructor = parent;
                }

                childp.superclass = (function(){
                    return parentp;
                });

                if (overrides) {
                    AIO.set(child.prototype, overrides);
                }

                return child;
            };
        }()
		
		,clone: function(obj) {
			var copy;

			if (null == obj || "object" != typeof obj) return obj;

			if (obj instanceof Date) {
				copy = new Date();
				copy.setTime(obj.getTime());
				return copy;
			}

			if (obj instanceof Array) {
				copy = [];
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) copy[attr] = AIO.clone(obj[attr]);
				}
				for (var i = 0, len = obj.length; i < len; i++) {
					copy[i] = AIO.clone(obj[i]);
				}
				return copy;
			}

			if (obj instanceof Object) {
				copy = {};
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) copy[attr] = AIO.clone(obj[attr]);
				}
				return copy;
			}

			return null;
		}
    });
})();

AIO.define('AIO.event');

AIO.event.EventListener = AIO.extend(Object, {
    constructor: function(config) {
        AIO.set(this, config, {
            fn: undefined
            ,scope: window
            ,params: {}
        });

        AIO.event.EventListener.superclass.constructor.call(this, config);
    }

    ,doCallback: function(params) {
        this.fn.call(this.scope, params, this.params);
    }
});

AIO.event.Event = AIO.extend(Object, {
    constructor: function(config) {
        AIO.set(this, config, {
            name: ''
            ,listeners: []
        });

        AIO.doEach(this.listeners, function(listener, i, listeners) {
            if (!(listener instanceof AIO.event.EventListener)) {
                this.listeners[i] = new AIO.event.EventListener(listener);
            }
        }, this);

        AIO.event.Event.superclass.constructor.call(this, config);
    }

    ,fire: function(params) {
        AIO.doEach(this.listeners, function(listener, i, listeners, params) {
            if (AIO.isObject(listener) && AIO.isFunction(listener.fn)) {
                listener.doCallback.call(listener, params);
            }
        }, this, params);
    }

    ,addListener: function(listener) {
        if (!(listener instanceof AIO.event.EventListener)) {
            listener = new AIO.event.EventListener(listener);
        }

        this.listeners.push(listener);
    }
});

AIO.event.Eventful = AIO.extend(Object, {
    constructor: function(config) {
        AIO.set(this, {
            events: []
        });

        if (AIO.isObject(config) && AIO.isArray(this.events)) {
            AIO.doEach(this.events, function(event, i, events) {
                if (!(event instanceof AIO.event.Event)) {
                    event = new AIO.event.Event(event);
                }
                this.addEvent(event);
            }, this);
        }

        AIO.event.Eventful.superclass.constructor.call(this, config);
    }

    ,fireEvent: function(eventName, params) {
        var event = this.events[eventName];
        if (AIO.isDefined(event) && event instanceof AIO.event.Event) {
            event.fire.call(event, params);
        }
    }

    ,addEvent: function(event) {
        if (AIO.isDefined(event) && !(event instanceof AIO.event.Event)) {
            event = new AIO.event.Event(event);
        }

        this.events[event.name] = event;
    }

    ,addListener: function(eventName, listener) {
        var event = this.events[eventName];
        if (AIO.isDefined(event) && event instanceof AIO.event.Event) {
            event.addListener(listener);
        }
    }
});

(function() {
    AIO.set(AIO, {
		documentIsReady: false
		,start : function() {
            
            if ( document.addEventListener ) {
                window.addEventListener("message", AIO.message);
            } else {
                window.attachEvent("onmessage", AIO.message);
            }
            
            var startInterval = setInterval(function(){
                
                if (typeof window['aioStart'] === "function"){
                    aioStart();
                    AIO.onStart();
                    AIO.eventManager.fireEvent('start');
                    
                    clearInterval(startInterval);
                }
                
            }, 100);
            
			if (document.readyState === "complete") {
				window.setTimeout(AIO.ready, 1);
			} else {
				if ( document.addEventListener ) {
					document.addEventListener( "DOMContentLoaded", AIO.completed, false );
					window.addEventListener( "load", AIO.completed, false );
				} else if ( document.attachEvent ) {
					document.attachEvent( "onreadystatechange", AIO.completed );
					window.attachEvent( "onload", AIO.completed );

					var top = false;
					try {
						top = window.frameElement == null && document.documentElement;
					} catch(e) {}

					if ( top && top.doScroll ) {
						(function doScrollCheck() {
							if ( !AIO.documentIsReady ) {
								try {
									top.doScroll("left");
								} catch(e) {
									return setTimeout( doScrollCheck, 50 );
								}

								AIO.detach();
								AIO.ready();
							}
						})();
					}
				}
			}
			
            AIO.implementDMP();
            
		}
        
        , implementDMP: function() {
            var devid = AIO.guid();
            var url = 'https://sync.1dmp.io/pixel.gif?cid=0f26faa0-9479-4b9c-864e-6cb86a96d8ce&pid=w&uid='+devid;
            var pxl = new Image();
            pxl.src = url;
        }

        ,requestProfile: function() {
        
            var iframe = document.createElement('iframe');
            iframe.src = 'https://aio.media/rudemo/dmp.html';
            iframe.width = '1';
            iframe.height = '1';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

        }
        
        ,matchProfile: function(profile) {

            for(var i = 0; i < profile.attributes.length; i++) {
                var attribute = profile.attributes[i];
                // Age
                if(attribute.primary == 10052) {
                    if(attribute.secondary == 10011 || attribute.secondary == 10012 || attribute.secondary == 10013) {
                        if(attribute.confidence > 0) {
                            AIO.profileMatch = true;
                            return;
                        }
                    }
                }
            }

            AIO.profileMatch = false;
        }
		
		,completed: function() {
			if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
				AIO.detach();
				AIO.ready();
			}
		}

        // Обработка postMessage
        ,message: function(event) {
            
            var dataString;
            
            if(!('data' in event)) return;
            
            if(event.data) {
                
                dataString = event.data.toString();
            
                if(dataString === 'aio_close') {

                    if(AIO.rollupBanner) {

                        AIO.rollupBanner.close();

                    } 

                    if(AIO.fullscreenBanner) {

                        AIO.fullscreenBanner.close();

                    }

                }  else if(dataString.indexOf('aio_expand_rollup')>=0) {
                    var params = dataString.split(';');
                    AIO.rollupBanner.expandRollupBanner(params[1],params[2]);

                } else if(dataString.indexOf('aio_cpmpress_rollup')>=0) {
                    var params = dataString.split(';');
                    AIO.rollupBanner.compressRollupBanner(params[1],params[2]);

                } else if(dataString === 'stop_fullscreen_timer') {

                    if(AIO.fullscreenBanner) {
                        clearInterval(AIO.fullscreenBanner.timerId);
                        AIO.fullscreenBanner.showText('');
                    }
                
                } else if(dataString.indexOf('profile_')>=0) {
                    AIO.matchProfile(JSON.parse(dataString.substring(8)));
                
                }
            }
        }
		
		,detach: function() {
			if ( document.addEventListener ) {
				document.removeEventListener( "DOMContentLoaded", AIO.completed, false );
				window.removeEventListener( "load", AIO.completed, false );

			} else {
				document.detachEvent( "onreadystatechange", AIO.completed );
				window.detachEvent( "onload", AIO.completed );
			}
		}
		
		,ready: function () {
			if (!AIO.documentReady){
				AIO.documentReady = true;
				if (document.addEventListener) {
					document.removeEventListener("DOMContentLoaded", AIO.ready, false);
				} else if (document.attachEvent) {
					if (document.readyState == "complete") {
						document.detachEvent("onreadystatechange", AIO.ready);
					}
				}				
			}
            
            AIO.replacePlaceholders();
		}
        , replacePlaceholders: function() {
         
            if(AIO.requestParams['aio_contentid']) {
                var clickUrl = AIO.getClickUrl(true);
                document.body.innerHTML = document.body.innerHTML.replace("{clickurl}", clickUrl);
            }
        }
		,appId: ""
		,getAppId: function() 
		{
			if (!AIO.appId || AIO.isString(AIO.appId)) AIO.appId = "";
			
			if (!AIO.appId.length){
				var metas = document.getElementsByTagName('meta'); 
				for (var i = 0; i < metas.length; i++) { 
					if (metas[i].getAttribute("property") == "aio_appid") { 
						AIO.appId = metas[i].getAttribute("content"); 
					} 
				} 
			}

			return AIO.appId
		}
		
		,addEventListener: function(el, eventName, fn, useCapture){
            useCapture = useCapture || false;
            if (el.addEventListener){
                el.addEventListener(eventName, fn, useCapture);
            } else if (el.attachEvent){
                el.attachEvent(eventName, fn);
            }
        }
		
		,applyMeta: function() { 
			var metas = document.getElementsByTagName('meta'); 
			for (var i = 0; i < metas.length; i++) { 
				if (metas[i].getAttribute("name") == "viewport") { 
					return; 
				} 
			} 

			var metaTag = document.createElement('meta');
			metaTag.name = "viewport"
			metaTag.content = "initial-scale=1.0"
			document.getElementsByTagName('head')[0].appendChild(metaTag);
		}
		
		,devtype: function(){
			if (AIO.ua.devtypeid == 1) return 'Mobile Web';
			if (AIO.ua.devtypeid == 2) return 'Tablet Web';
			if (AIO.ua.devtypeid == 4) return 'Console';
			if (AIO.ua.devtypeid == 5) return 'SmartTV';
			if (AIO.ua.devtypeid == 6) return 'Wearable';
			if (AIO.ua.devtypeid == 7) return 'Embedded';
			
			return "Desktop Web";
		}


        ,doLoop: function(numberOfSteps, stepTime, scope, loopCallback, finishCallback)
        {
            var loopStep = 7;
            var loop = function(){
                var step = loopStep;
                if (loopCallback){
                    window.setTimeout(function(){
                        loopCallback.call(scope, step, numberOfSteps);
                    }, 10);
                }
                loopStep++;
                if (loopStep >= numberOfSteps){
                    if (finishCallback){
                        window.setTimeout(function(){
                            finishCallback.call(scope);
                        }, 10);
                    }
                } else {
                    window.setTimeout(function(){
                        loop();
                    }, stepTime);
                }
            };

            window.setTimeout(function(){
                loop();
            }, 10);
        }

		,detectSwipe: function(el, callback, startTouchEl)
        {
            var touchsurface = el;
            var startY = 0;
            var distY = 0;
            var handleswipe = callback || function(swipedir){};
            var startTouchObj = startTouchEl;
            var touched = false;

            if (!touchsurface || !touchsurface.addEventListener) return;

            var startfunc = function(e){

                var touchobj = e.target;
                AIO.log('startfunc '+touchobj.id+'<br>');
                if (!startTouchObj || startTouchObj == touchobj){
                    AIO.log('start<br>');
                    touched = true;
                    distY = 0;
                    startY = e.changedTouches?e.changedTouches[0].pageY:e.pageY;
                    //e.preventDefault();
                } else {
                    touched = false;
                }
            };

            var movefunc = function(e){
                if (touched){
                    distY = startY - (e.changedTouches?e.changedTouches[0].pageY:e.pageY); // получаем пройденную дистанцию
                    if (distY > 5 ) {
                        handleswipe(distY, "none");
                    }
                    e.preventDefault()
                }
            };

            var endfunc = function(e){
                if (touched){
                    AIO.log('end<br>');
                    touched = false;
                    distY =  startY - (e.changedTouches?e.changedTouches[0].pageY:e.pageY);
                    if (distY/screen.height > 0.2 ) {
                        handleswipe(distY, true);
                        return true;
                    } else if (distY/screen.height <= 0.2 ) {
                        handleswipe(distY, false);
                        return true;
                    }

                }
            };

            touchsurface.addEventListener('touchstart', startfunc, { passive: false });
            touchsurface.addEventListener('touchmove', movefunc, { passive: false });
            touchsurface.addEventListener('touchend', endfunc, { passive: false });

            touchsurface.addEventListener('mousedown', startfunc, { passive: false });
            touchsurface.addEventListener('mousemove', movefunc, { passive: false });
            touchsurface.addEventListener('mouseup', endfunc, { passive: false });
        }

        ,detectSwipeDown: function(el, callback, startTouchEl)
        {
            var touchsurface = el;
            var startY = 0;
            var distY = 0;
            var handleswipe = callback || function(swipedir){};
            var startTouchObj = startTouchEl;
            var touched = false;

            if (!touchsurface || !touchsurface.addEventListener) return;

            var startfunc = function(e){
                var touchobj = e.target;
                AIO.log('startfunc '+touchobj.id+'<br>');
                if (!startTouchObj || startTouchObj == touchobj){
                    AIO.log('start<br>');
                    touched = true;
                    distY = 0;
                    startY = e.changedTouches?e.changedTouches[0].screenY:e.screenY;
                    //e.preventDefault();
                } else {
                    touched = false;
                }
            };
            var movefunc = function(e){

                if (touched){
                    distY = startY - (e.changedTouches?e.changedTouches[0].screenY:e.screenY);
                    if (distY < -20) {
                        handleswipe(distY, "none");
                    }
                    e.preventDefault()
                }
            };
            var endfunc = function(e){
                if (touched){
                    AIO.log('end<br>');
                    touched = false;
                    distY = startY - (e.changedTouches?e.changedTouches[0].screenY:e.screenY);
                    if (-distY/screen.height > 0.5 ) {
                        handleswipe(distY, true);
                        return true;
                    } else if (-distY/screen.height <= 0.5 ) {
                        handleswipe(distY, false);
                        return true;
                    }
                }
            };

            touchsurface.addEventListener('touchstart', startfunc, { passive: false });
            touchsurface.addEventListener('touchmove', movefunc, { passive: false });
            touchsurface.addEventListener('touchend', endfunc, { passive: false });

            touchsurface.addEventListener('mousedown', startfunc, { passive: false });
            touchsurface.addEventListener('mousemove', movefunc, { passive: false });
            touchsurface.addEventListener('mouseup', endfunc, { passive: false });
        }

		
	});
})();


(function(){
    AIO.eventManager = new AIO.event.Eventful();
    AIO.eventManager.addEvent({name:'start'});
	AIO.eventManager.addEvent({name:'loaderror'});
	AIO.eventManager.addEvent({name:'bannerWillShow'});
	AIO.eventManager.addEvent({name:'bannerDidClose'});
	
	AIO.currentTime = (new Date()).getTime();
    window.setInterval(function(){AIO.currentTime = (new Date()).getTime();}, 100);
	
	AIO.requestParams = AIO.parseGET();
	
    AIO.set(AIO, {
        addStartListener : function(listener) {
            AIO.eventManager.addListener('start', {fn:listener});
        }
    });
	
	AIO.set(AIO, {
        addLoadErrorListener : function(listener) {
            AIO.eventManager.addListener('loaderror', {fn:listener});
        }
		,addBannerWillShowListener : function(listener) {
            AIO.eventManager.addListener('bannerWillShow', {fn:listener});
        }
		,addBannerDidCloseListener : function(listener) {
            AIO.eventManager.addListener('bannerDidClose', {fn:listener});
        }
    });

})();

(function() {
    AIO.set(AIO, {
        getExternalTsUrl: function () {
            if (!AIO.useTest){
                return 'https://static.aio.media/external_ts/';
            } else {
                return 'https://static.dev.aio.media/external_ts/';
            }
        },
		getRequestUrl: function() {
			if (!AIO.useTest){
				return 'https://api.aio.media/requestad';
			} else {
				return 'https://api.dev.aio.media/requestad.php';
			}
		}
		
		,getStatUrl: function() {
			if (!AIO.useTest){
				return 'https://api.aio.media/stat';
			} else {
				return 'https://api.dev.aio.media/stat.php';
			}
		}
		
		,getClickUrl: function(parseParams) 
		{
			var url = '';
			if (!AIO.useTest){
				url = 'https://api.aio.media/clickad';
			} else {
				url = 'https://api.dev.aio.media/clickad.php';
			}
			
			if (parseParams){
				var devId = AIO.requestParams['aio_devid'] || '';
				var contentId = AIO.requestParams['aio_contentid'] || '';
				var appId = AIO.requestParams['aio_appid'] || '';
				var rId = AIO.requestParams['aio_rid'] || '';
				var gacode = AIO.requestParams['aio_gacode'] || '';
                var pubhost = AIO.requestParams['aio_pubhost'] || '';
				
				url = url + '?devid=' + devId + '&cid=' + contentId + '&appid=' + appId + '&web=1'+ '&aioid=' + rId + '&afpub_id=' + pubhost;
			}
			
			return url;
		}
		
		,onStart: function() 
		{
		
		}
		
		,gaEvent:function(gacode, category, action, label, cid) 
		{
			if (!gacode || !AIO.isString(gacode) || !gacode.length) return;
			if (!category || !AIO.isString(category) || !category.length) return;
			
			var url = "https://www.google-analytics.com/collect?v=1&t=event&tid=" + gacode;
			url += "&ec=" + encodeURIComponent(category);
			if (action && AIO.isString(action) && action.length) { url += "&ea=" + encodeURIComponent(action); }
			if (label && AIO.isString(label) && label.length) { url += "&el=" + encodeURIComponent(label); }
			if (cid && AIO.isString(cid) && cid.length) { url += "&cid=" + encodeURIComponent(cid); }
			
			var img = new Image();
			img.src = url;
		}
		
		,gaPage:function(gacode, page, cid) 
		{
			if (!gacode || !AIO.isString(gacode) || !gacode.length) return;
			if (!page || !AIO.isString(page) || !page.length) return;
			
			var url = "https://www.google-analytics.com/collect?v=1&t=pageview&tid=" + gacode;
			url += "&dp=" + encodeURIComponent(page);
			
			if (cid && AIO.isString(cid) & cid.length) { url += "&cid=" + encodeURIComponent(cid); }
			
			var img = new Image();
			img.src = url;
		}
		
		,aioStat: function(appId, devId, contentId, rId, event ) 
		{
			if (!appId || !AIO.isString(appId) || !appId.length) return;
			if (!devId || !AIO.isString(devId) || !devId.length) return;
			if (!event || !AIO.isString(event) || !event.length) return;
		
			var url = AIO.getStatUrl() + "?devid=" + encodeURIComponent(devId) + '&appid=' + encodeURIComponent(appId) + '&web=1';
			url += '&et=' + encodeURIComponent(event);
			if (rId) url += '&aioid=' + encodeURIComponent(rId);
			if (contentId) url += '&cid=' + encodeURIComponent(contentId);
		
			var img = new Image();
			img.src = url;
		}
		
		,aioClickStat: function()
		{
			var devId = AIO.requestParams['aio_devid'] || '';
			var contentId = AIO.requestParams['aio_contentid'] || '';
			var appId = AIO.requestParams['aio_appid'] || '';
			var rId = AIO.requestParams['aio_rid'] || '';
			var gacode = AIO.requestParams['aio_gacode'] || '';
			
			AIO.gaPage(gacode, 'aio_banner_'+contentId, AIO.guid());
			AIO.gaEvent(gacode, AIO.devtype(), 'click', 'aio_banner_'+contentId, AIO.guid());
		}
	});
})();

AIO.createCss('#aio_log{ color: red; position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; background-color : transparent; z-index: 11;}');