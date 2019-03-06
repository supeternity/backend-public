(function (cjs, an) {

    // adobe config
    var p; // shortcut to reference prototypes
    var lib={};var ss={};var img={};
        lib.ssMetadata = [];

    // aio customer config
    const toyota = {};

    // aioType config
    toyota.cFont = "ToyotaDisplay-Bold";
    toyota.cSize = 28;
    
    toyota.weeks = {};
    toyota.weeks.Src = "НЕДЕЛИ_ПРИТЯГАТЕЛЬНЫХ_ПРЕДЛОЖЕНИЙ_17-31_МАРТА";
    toyota.weeks.Align = "left";
    toyota.weeks.norX = 90;
    toyota.weeks.norY = -21;
    
    toyota.weeks.Color = new Array();
    toyota.weeks.Color['toyota_black'] = "#202020";
    toyota.weeks.Color['toyota_red'] = "#ff0318";

    toyota.weeks.Text = new Array();
    toyota.weeks.Text = toyota.weeks.Src.split("_");
    toyota.weeks.Size = function (fs) { var r = fs + "px " + toyota.cFont; return r; };

// symbols:

    (lib._line_3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // true-type for customer
        this.t0 = new cjs.Text;
        this.t1 = new cjs.Text;

        this.t0.text = toyota.weeks.Text[3];
        this.t0.font = toyota.weeks.Size(toyota.cSize + 40);
        this.t0.color = toyota.weeks.Color['toyota_red'];
        this.t0.textAlign = toyota.weeks.Align;
        this.t0.x = toyota.weeks.norX - 190;
        this.t0.y = toyota.weeks.norY - 38;

        this.t1.text = toyota.weeks.Text[4];
        this.t1.font = toyota.weeks.Size(toyota.cSize + 3);
        this.t1.color = toyota.weeks.Color['toyota_black'];
        this.t1.textAlign = toyota.weeks.Align;
        this.t1.x = this.t0.x + 4;
        this.t1.y = toyota.weeks.norY + 23;

        this.addChild(this.t0);
        this.addChild(this.t1);

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-93,-38.4,186.1,77);


    (lib._line_2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // true-type for customer
        this.t = new cjs.Text;
        this.t.text = toyota.weeks.Text[2];
        this.t.font = toyota.weeks.Size(toyota.cSize);
        this.t.color = toyota.weeks.Color['toyota_black'];
        this.t.textAlign = toyota.weeks.Align;
        this.t.x = toyota.weeks.norX - 206;
        this.t.y = toyota.weeks.norY + 6;

        this.addChild(this.t);

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-113.9,-16.4,228,32.4);


    (lib._line_1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // true-type for customer
        this.t = new cjs.Text;
        this.t.text = toyota.weeks.Text[1];
        this.t.font = toyota.weeks.Size(toyota.cSize);
        this.t.color = toyota.weeks.Color['toyota_black'];
        this.t.textAlign = toyota.weeks.Align;
        this.t.x = toyota.weeks.norX - 227;
        this.t.y = toyota.weeks.norY + 10;

        this.addChild(this.t);

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-135.4,-11.6,271.2,23.8);


    (lib._line_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});

        // true-type for customer
        this.t = new cjs.Text;
        this.t.text = toyota.weeks.Text[0];
        this.t.font = toyota.weeks.Size(toyota.cSize);
        this.t.color = toyota.weeks.Color['toyota_black'];
        this.t.textAlign = toyota.weeks.Align;
        this.t.x = toyota.weeks.norX - 150;
        this.t.y = toyota.weeks.norY + 10;

        this.addChild(this.t);

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-58.8,-12.9,117.4,26.2);


// stage content:
    (lib.toyota_top = function(mode,startPosition,loop) {
        if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

        // 04_date
        this.instance = new lib._line_3("synched",0);
        this.instance.parent = this;
        this.instance.setTransform(93.8,159.9);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(48).to({_off:false},0).to({alpha:1,startPosition:1},67).wait(1));

        // 03_predlojenii
        this.instance_1 = new lib._line_2("synched",0);
        this.instance_1.parent = this;
        this.instance_1.setTransform(94.8,79.9);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(28).to({_off:false},0).to({x:127.8,alpha:1},20,cjs.Ease.cubicIn).to({x:114.8},13,cjs.Ease.cubicIn).wait(55));

        // 01_prityagatelnyh
        this.instance_2 = new lib._line_1("synched",0);
        this.instance_2.parent = this;
        this.instance_2.setTransform(116.3,45.5);
        this.instance_2.alpha = 0;
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(15).to({_off:false},0).to({x:149.3,alpha:1},20,cjs.Ease.cubicIn).to({x:136.3},13,cjs.Ease.cubicIn).to({startPosition:0},33).wait(35));

        // 00_nedeli
        this.instance_3 = new lib._line_0("synched",0);
        this.instance_3.parent = this;
        this.instance_3.setTransform(39.3,13.4);
        this.instance_3.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:-0.1,regY:0.2,x:43.8,y:13.6,alpha:0.141,startPosition:1},0).wait(1).to({x:48.3,alpha:0.277,startPosition:2},0).wait(1).to({x:52.4,alpha:0.401,startPosition:0},0).wait(1).to({x:55.9,alpha:0.51,startPosition:1},0).wait(1).to({x:59,alpha:0.603,startPosition:2},0).wait(1).to({x:61.5,alpha:0.681,startPosition:0},0).wait(1).to({x:63.7,alpha:0.745,startPosition:1},0).wait(1).to({x:65.4,alpha:0.799,startPosition:2},0).wait(1).to({x:66.9,alpha:0.843,startPosition:0},0).wait(1).to({regX:0,regY:0,x:68.2,y:13.4,alpha:0.879},0).wait(1).to({regX:-0.1,regY:0.2,x:69,y:13.6,alpha:0.908,startPosition:1},0).wait(1).to({x:69.8,alpha:0.931,startPosition:2},0).wait(1).to({x:70.5,alpha:0.95,startPosition:0},0).wait(1).to({x:71,alpha:0.965,startPosition:1},0).wait(1).to({x:71.4,alpha:0.977,startPosition:2},0).wait(1).to({x:71.7,alpha:0.986,startPosition:0},0).wait(1).to({x:71.9,alpha:0.992,startPosition:1},0).wait(1).to({x:72,alpha:0.997,startPosition:2},0).wait(1).to({x:72.1,alpha:0.999,startPosition:0},0).wait(1).to({regX:0,regY:0,x:72.3,y:13.4,alpha:1},0).to({x:59.3},13,cjs.Ease.cubicIn).wait(83));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(127,102,117.4,26.2);
// library properties:
    lib.properties = {
        id: '2CFFBB6698717544AD5960EC0FCD88FE',
        width: 293,
        height: 203,
        fps: 60,
        color: "#FFFFFF",
        opacity: 0.00,
        manifest: [],
        preloads: []
    };



// bootstrap callback support:

    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();

    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
    p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
    p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
    p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

    p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if(!an.bootstrapListeners) {
        an.bootstrapListeners=[];
    }

    an.bootstrapCallback=function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if(an.bootcompsLoaded.length > 0) {
            for(var i=0; i<an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['2CFFBB6698717544AD5960EC0FCD88FE'] = {
        getStage: function() { return exportRoot.getStage(); },
        getLibrary: function() { return lib; },
        getSpriteSheet: function() { return ss; },
        getImages: function() { return img; }
    };

    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for(var j=0; j<an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function(id) {
        return an.compositions[id];
    }



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;