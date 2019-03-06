(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];

// aio customer config
const toyota = {};

// aioType config
toyota.cFontBold = "ToyotaDisplay-Bold";
toyota.cFontRegular = "ToyotaDisplay-Regular";
toyota.cFontSimple = "OpenSans-Regular";
toyota.cSize = 28;
toyota.cColor = new Array();
toyota.cColor['toyota_black'] = "#202020";
toyota.cColor['toyota_white'] = "#ffffff";

toyota.bank = {};
toyota.bank.Src = "Кредитование осуществляется АО «Тойота Банк»";
toyota.bank.Align = "left";
toyota.bank.norX = 0;
toyota.bank.norY = 0;
toyota.bank.Size = function (fs) { var r = fs + "px " + toyota.cFontSimple; return r; };

toyota.offer = {};
toyota.offer.Src = "СПЕЦИАЛЬНАЯ КРЕДИТНАЯ СТАВКА_ВЫГОДА_200 000_руб.";
toyota.offer.Align = "left";
toyota.offer.norX = 0;
toyota.offer.norY = 0;
toyota.offer.Text = new Array();
toyota.offer.Text = toyota.offer.Src.split("_");
toyota.offer.Size = function (fs) { var r = fs + "px " + toyota.cFontBold; return r; };


// symbols:



(lib.background = function() {
	this.initialize(img.background);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,1036);


(lib.disc = function() {
	this.initialize(img.disc);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,447,518);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.legal_txt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.disc();
	this.instance.parent = this;
	this.instance.setTransform(-216,-96,0.967,0.967);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EgniBS1MAAAilpMBPFAAAMAAAClpg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.legal_txt, new cjs.Rectangle(-253,-530.1,506.2,1060.3), null);


(lib.cp_white = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

    // true-type for customer
    this.t = new cjs.Text;
    this.t.text = toyota.offer.Text[0];
    this.t.font = toyota.offer.Size(toyota.cSize - 9);
    this.t.color = toyota.cColor['toyota_black'];
    this.t.textAlign = toyota.offer.Align;
    this.t.x = toyota.offer.norX + 27;
    this.t.y = toyota.offer.norY + 9;

	this.timeline.addTween(cjs.Tween.get(this.t).wait(1));

	// white
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().rr(-181.4,-26.5,362.8,53,1.5);
	this.shape_1.setTransform(197.4,24.6,1.047,0.974,0,17.6,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// shadow
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.118)").s().rr(-181.4,-26.5,362.8,53,1.5);
	this.shape_2.setTransform(198.1,27.8,1.047,0.973,0,17.6,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

}).prototype = getMCSymbolPrototype(lib.cp_white, new cjs.Rectangle(0,0,395.5,52.4), null);


(lib.cp_red = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	
    // true-type for customer
    this.t0 = new cjs.Text;
    this.t0.text = toyota.offer.Text[1];
    this.t0.font = toyota.offer.Size(toyota.cSize - 9);
    this.t0.color = toyota.cColor['toyota_white'];
    this.t0.textAlign = toyota.offer.Align;
    this.t0.x = toyota.offer.norX + 27;
    this.t0.y = toyota.offer.norY + 19;
    // true-type for customer
    this.t1 = new cjs.Text;
    this.t1.text = toyota.offer.Text[2];
    this.t1.font = toyota.offer.Size(toyota.cSize);
    this.t1.color = toyota.cColor['toyota_white'];
    this.t1.textAlign = toyota.offer.Align;
    this.t1.x = toyota.offer.norX + 118;
    this.t1.y = toyota.offer.norY + 10;
    // true-type for customer
    this.t2 = new cjs.Text;
    this.t2.text = toyota.offer.Text[3];
    this.t2.font = toyota.offer.Size(toyota.cSize - 9);
    this.t2.color = toyota.cColor['toyota_white'];
    this.t2.textAlign = toyota.offer.Align;
    this.t2.x = toyota.offer.norX + 245;
    this.t2.y = toyota.offer.norY + 18;

    this.timeline.addTween(cjs.Tween.get(this.t0).wait(1));
    this.timeline.addTween(cjs.Tween.get(this.t1).wait(1));
    this.timeline.addTween(cjs.Tween.get(this.t2).wait(1));

	// red
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0318").s().rr(-181.4,-26.5,362.8,53,1.5);
	this.shape_1.setTransform(154.8,30.3,0.803,1.2,0,17.6,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// shadow
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.118)").s().rr(-181.4,-26.5,362.8,53,1.5);
	this.shape_2.setTransform(155.9,33.9,0.803,1.2,0,17.6,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

}).prototype = getMCSymbolPrototype(lib.cp_red, new cjs.Rectangle(0,0,310.7,64.2), null);


(lib.bottom_credit_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

    // true-type for customer
    this.t = new cjs.Text;
    this.t.text = toyota.bank.Src;
    this.t.font = toyota.bank.Size(toyota.cSize - 14);
    this.t.color = toyota.cColor['toyota_black'];
    this.t.textAlign = toyota.bank.Align;
    this.t.x = toyota.bank.norX - 165;
    this.t.y = toyota.bank.norY - aioAda._logo.tytH;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.t}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-174.1,-17.7,347.4,22);


(lib.content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.disclaimer_event_show = function() {
        aioAda._logo.container.style.opacity = 0;
        aioAda.toyotaTop.style.opacity = 0;
	}
	this.disclaimer_event_hide = function() {
        aioAda._logo.container.style.opacity = 1;
        aioAda.toyotaTop.style.opacity = 1;
        aioAda.toyotaTop.contentWindow.postMessage("replay", "*");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(395).call(this.disclaimer_event_show).wait(235).call(this.disclaimer_event_hide).wait(30));

	// legal
	this.instance = new lib.legal_txt();
	this.instance.parent = this;
	this.instance.setTransform(1.1,0.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(401).to({_off:false},0).to({alpha:1},17,cjs.Ease.cubicInOut).wait(212).to({alpha:0},29).wait(1));

	// animask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_156 = new cjs.Graphics().p("EgWfAl5IAAvHILlAAIhMDGIkVLTIgRAug");
	var mask_graphics_157 = new cjs.Graphics().p("AnEniIOJgBIlxPGIoYABg");
	var mask_graphics_158 = new cjs.Graphics().p("AoUniIQpgBIlwPHIq5AAg");
	var mask_graphics_159 = new cjs.Graphics().p("AphniITDgCIluPIItVABg");
	var mask_graphics_160 = new cjs.Graphics().p("AqrnhIVXgDIlsPIIvrABg");
	var mask_graphics_161 = new cjs.Graphics().p("ArznhIXngDIlsPHIx7ACg");
	var mask_graphics_162 = new cjs.Graphics().p("As3nhIZwgDIlqPII0GABg");
	var mask_graphics_163 = new cjs.Graphics().p("At6nhIb1gEIloPJI2NACg");
	var mask_graphics_164 = new cjs.Graphics().p("Au6ngId1gFIloPJI4NACg");
	var mask_graphics_165 = new cjs.Graphics().p("Av4ngIfxgFIlnPJI6KACg");
	var mask_graphics_166 = new cjs.Graphics().p("AwzngMAhngAFIhMDFIkaMEI8BACg");
	var mask_graphics_167 = new cjs.Graphics().p("AxsngMAjZgAFIhMDFIkZMEI90ADg");
	var mask_graphics_168 = new cjs.Graphics().p("AyinfMAlFgAHIhLDGIkYMEI/iADg");
	var mask_graphics_169 = new cjs.Graphics().p("AzXnfMAmvgAHIhLDGIkYMEMghMAADg");
	var mask_graphics_170 = new cjs.Graphics().p("A0JnfMAoTgAHIhLDFIkWMFMgiyAADg");
	var mask_graphics_171 = new cjs.Graphics().p("A06nfMAp1gAHIhLDFIkWMFMgkUAADg");
	var mask_graphics_172 = new cjs.Graphics().p("A1onfMArRgAHIhLDFIkVMFMglxAAEg");
	var mask_graphics_173 = new cjs.Graphics().p("A2VnfMAsrgAHIhMDFIkUMFMgnLAAEg");
	var mask_graphics_174 = new cjs.Graphics().p("A2/neMAt/gAJIhLDGIkTMFMgohAAEg");
	var mask_graphics_175 = new cjs.Graphics().p("A3oneMAvRgAJIhMDGIkSMFMgpzAAEg");
	var mask_graphics_176 = new cjs.Graphics().p("A4PneMAwfgAJIhMDGIkRMFMgrCAAEg");
	var mask_graphics_177 = new cjs.Graphics().p("A40neMAxpgAJIhMDFIkQMGMgsNAAEg");
	var mask_graphics_178 = new cjs.Graphics().p("A5XneMAyvgAJIhLDFIkQMGMgtUAAEg");
	var mask_graphics_179 = new cjs.Graphics().p("A55neMAzzgAKIhLDGIkQMGMguYAAFg");
	var mask_graphics_180 = new cjs.Graphics().p("A6aneMA00gAKIhLDGIkPMGMgvaAAFg");
	var mask_graphics_181 = new cjs.Graphics().p("A65ndMA1zgALIhMDGIkPMGMgwYAAFg");
	var mask_graphics_182 = new cjs.Graphics().p("A7WndMA2sgALIhLDGIkOMGMgxTAAFg");
	var mask_graphics_183 = new cjs.Graphics().p("A7yndMA3kgALIhLDGIkOMHMgyLAAEg");
	var mask_graphics_184 = new cjs.Graphics().p("A8MndMA4ZgALIhLDGIkNMGMgzBAAFg");
	var mask_graphics_185 = new cjs.Graphics().p("A8lndMA5LgALIhLDFIkNMHMgzzAAFg");
	var mask_graphics_186 = new cjs.Graphics().p("A89ndMA57gALIhLDFIkNMHMg0jAAFg");
	var mask_graphics_187 = new cjs.Graphics().p("A9UndMA6ogALIhLDFIkMMHMg1RAAFg");
	var mask_graphics_188 = new cjs.Graphics().p("A9pndMA7TgAMIhLDGIkMMHMg18AAGg");
	var mask_graphics_189 = new cjs.Graphics().p("A99ndMA77gAMIhLDGIkLMHMg2lAAGg");
	var mask_graphics_190 = new cjs.Graphics().p("A+RndMA8jgAMIhMDGIkKMHMg3NAAGg");
	var mask_graphics_191 = new cjs.Graphics().p("A+jncMA9HgANIhMDGIkKMHMg3xAAGg");
	var mask_graphics_192 = new cjs.Graphics().p("A+0ncMA9pgANIhMDGIkKMHMg4TAAGg");
	var mask_graphics_193 = new cjs.Graphics().p("A/EncMA+JgANIhMDGIkKMHMg4zAAGg");
	var mask_graphics_194 = new cjs.Graphics().p("A/SncMA+mgANIhMDGIkJMHMg5RAAGg");
	var mask_graphics_195 = new cjs.Graphics().p("A/hncMA/DgANIhMDFIkJMJMg5uAAFg");
	var mask_graphics_196 = new cjs.Graphics().p("A/uncMA/dgANIhMDFIkIMJMg6JAAFg");
	var mask_graphics_197 = new cjs.Graphics().p("A/7ncMA/3gANIhMDFIkJMJMg6iAAFg");
	var mask_graphics_198 = new cjs.Graphics().p("EggGgHcMBAOgANIhMDFIkJMJMg65AAFg");
	var mask_graphics_199 = new cjs.Graphics().p("EggRgHcMBAjgANIhLDFIkJMJMg7PAAFg");
	var mask_graphics_200 = new cjs.Graphics().p("EggbgHcMBA3gANIhLDFIkIMJMg7kAAFg");
	var mask_graphics_201 = new cjs.Graphics().p("EgglgHcMBBLgANIhMDFIkIMJMg73AAFg");
	var mask_graphics_202 = new cjs.Graphics().p("EggugHcMBBdgANIhMDFIkIMJMg8JAAFg");
	var mask_graphics_203 = new cjs.Graphics().p("Egg2gHcMBBtgANIhMDFIkHMJMg8aAAFg");
	var mask_graphics_204 = new cjs.Graphics().p("Egg9gHcMBB7gANIhLDFIkIMIMg8oAAGg");
	var mask_graphics_205 = new cjs.Graphics().p("EghEgHcMBCJgANIhLDFIkIMIMg82AAGg");
	var mask_graphics_206 = new cjs.Graphics().p("EghLgHcMBCXgANIhMDFIkHMIMg9EAAGg");
	var mask_graphics_207 = new cjs.Graphics().p("EghQgHcMBCigANIhMDFIkIMIMg9OAAGg");
	var mask_graphics_208 = new cjs.Graphics().p("EghWgHcMBCtgANIhMDFIkHMIMg9aAAGg");
	var mask_graphics_209 = new cjs.Graphics().p("EghbgHcMBC3gANIhLDFIkHMIMg9lAAGg");
	var mask_graphics_210 = new cjs.Graphics().p("EghfgHcMBC/gANIhLDFIkHMIMg9tAAGg");
	var mask_graphics_211 = new cjs.Graphics().p("EghkgHcMBDJgANIhMDFIkHMIMg92AAHg");
	var mask_graphics_212 = new cjs.Graphics().p("EghogHcMBDRgANIhMDFIkHMIMg9+AAHg");
	var mask_graphics_213 = new cjs.Graphics().p("EghrgHcMBDXgANIhMDFIkHMIMg+EAAHg");
	var mask_graphics_214 = new cjs.Graphics().p("EghugHcMBDdgANIhMDFIkHMIMg+KAAHg");
	var mask_graphics_215 = new cjs.Graphics().p("EghxgHcMBDjgANIhMDFIkGMIMg+RAAHg");
	var mask_graphics_216 = new cjs.Graphics().p("EghzgHcMBDngANIhLDFIkHMIMg+VAAHg");
	var mask_graphics_217 = new cjs.Graphics().p("Egh2gHcMBDtgANIhMDFIkHMIMg+aAAHg");
	var mask_graphics_218 = new cjs.Graphics().p("Egh3gHcMBDvgANIhLDFIkHMIMg+dAAHg");
	var mask_graphics_219 = new cjs.Graphics().p("Egh5gHcMBDzgANIhLDFIkHMIMg+hAAHg");
	var mask_graphics_220 = new cjs.Graphics().p("Egh6gHcMBD1gANIhLDFIkGMIMg+kAAHg");
	var mask_graphics_221 = new cjs.Graphics().p("Egh8gHcMBD5gANIhMDFIkGMIMg+nAAHg");
	var mask_graphics_222 = new cjs.Graphics().p("Egh9gHcMBD7gANIhMDFIkGMIMg+pAAHg");
	var mask_graphics_223 = new cjs.Graphics().p("Egh+gHcMBD9gANIhLDFIkHMIMg+rAAHg");
	var mask_graphics_224 = new cjs.Graphics().p("Egh/gHcMBD/gANIhMDFIkGMIMg+tAAHg");
	var mask_graphics_225 = new cjs.Graphics().p("EgiAgHcMBEBgANIhMDFIkHMIMg+uAAHg");
	var mask_graphics_226 = new cjs.Graphics().p("EgiAgHcMBEBgANIhLDFIkHMIMg+vAAHg");
	var mask_graphics_227 = new cjs.Graphics().p("EgiBgHcMBEDgANIhMDFIkGMIMg+xAAHg");
	var mask_graphics_228 = new cjs.Graphics().p("EgiBgHcMBEDgANIhLDFIkHMIMg+xAAHg");
	var mask_graphics_229 = new cjs.Graphics().p("EgiBgHcMBEDgANIhLDFIkHMIMg+xAAHg");
	var mask_graphics_230 = new cjs.Graphics().p("EgiBgHcMBEEgANIhMDFIkHMIMg+xAAHg");
	var mask_graphics_231 = new cjs.Graphics().p("EgiCgHcMBEFgANIhMDFIkGMIMg+zAAHg");
	var mask_graphics_232 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_233 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_234 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_235 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_236 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_237 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_238 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_239 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_240 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_241 = new cjs.Graphics().p("EgiCgHcMBEFgANIhLDFIkHMIMg+zAAHg");
	var mask_graphics_242 = new cjs.Graphics().p("EgiCAWyMBEFgAOIhLDFIj1LdIgSAtMg+zAAGg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(156).to({graphics:mask_graphics_156,x:-144,y:242.5}).wait(1).to({graphics:mask_graphics_157,x:-243.7,y:436.6}).wait(1).to({graphics:mask_graphics_158,x:-236.7,y:436.6}).wait(1).to({graphics:mask_graphics_159,x:-230,y:436.6}).wait(1).to({graphics:mask_graphics_160,x:-223.5,y:436.5}).wait(1).to({graphics:mask_graphics_161,x:-217.3,y:436.5}).wait(1).to({graphics:mask_graphics_162,x:-211.2,y:436.5}).wait(1).to({graphics:mask_graphics_163,x:-205.4,y:436.5}).wait(1).to({graphics:mask_graphics_164,x:-199.8,y:436.4}).wait(1).to({graphics:mask_graphics_165,x:-194.5,y:436.4}).wait(1).to({graphics:mask_graphics_166,x:-189.3,y:436.4}).wait(1).to({graphics:mask_graphics_167,x:-184.3,y:436.4}).wait(1).to({graphics:mask_graphics_168,x:-179.5,y:436.3}).wait(1).to({graphics:mask_graphics_169,x:-175,y:436.3}).wait(1).to({graphics:mask_graphics_170,x:-170.6,y:436.3}).wait(1).to({graphics:mask_graphics_171,x:-166.3,y:436.3}).wait(1).to({graphics:mask_graphics_172,x:-162.3,y:436.3}).wait(1).to({graphics:mask_graphics_173,x:-158.4,y:436.3}).wait(1).to({graphics:mask_graphics_174,x:-154.7,y:436.2}).wait(1).to({graphics:mask_graphics_175,x:-151.2,y:436.2}).wait(1).to({graphics:mask_graphics_176,x:-147.8,y:436.2}).wait(1).to({graphics:mask_graphics_177,x:-144.5,y:436.2}).wait(1).to({graphics:mask_graphics_178,x:-141.4,y:436.2}).wait(1).to({graphics:mask_graphics_179,x:-138.5,y:436.2}).wait(1).to({graphics:mask_graphics_180,x:-135.6,y:436.2}).wait(1).to({graphics:mask_graphics_181,x:-132.9,y:436.1}).wait(1).to({graphics:mask_graphics_182,x:-130.4,y:436.1}).wait(1).to({graphics:mask_graphics_183,x:-127.9,y:436.1}).wait(1).to({graphics:mask_graphics_184,x:-125.6,y:436.1}).wait(1).to({graphics:mask_graphics_185,x:-123.4,y:436.1}).wait(1).to({graphics:mask_graphics_186,x:-121.3,y:436.1}).wait(1).to({graphics:mask_graphics_187,x:-119.4,y:436.1}).wait(1).to({graphics:mask_graphics_188,x:-117.5,y:436.1}).wait(1).to({graphics:mask_graphics_189,x:-115.8,y:436.1}).wait(1).to({graphics:mask_graphics_190,x:-114.1,y:436.1}).wait(1).to({graphics:mask_graphics_191,x:-112.5,y:436}).wait(1).to({graphics:mask_graphics_192,x:-111,y:436}).wait(1).to({graphics:mask_graphics_193,x:-109.6,y:436}).wait(1).to({graphics:mask_graphics_194,x:-108.3,y:436}).wait(1).to({graphics:mask_graphics_195,x:-107.1,y:436}).wait(1).to({graphics:mask_graphics_196,x:-105.9,y:436}).wait(1).to({graphics:mask_graphics_197,x:-104.8,y:436}).wait(1).to({graphics:mask_graphics_198,x:-103.8,y:436}).wait(1).to({graphics:mask_graphics_199,x:-102.8,y:436}).wait(1).to({graphics:mask_graphics_200,x:-102,y:436}).wait(1).to({graphics:mask_graphics_201,x:-101.1,y:436}).wait(1).to({graphics:mask_graphics_202,x:-100.4,y:436}).wait(1).to({graphics:mask_graphics_203,x:-99.7,y:436}).wait(1).to({graphics:mask_graphics_204,x:-99,y:436}).wait(1).to({graphics:mask_graphics_205,x:-98.4,y:436}).wait(1).to({graphics:mask_graphics_206,x:-97.8,y:436}).wait(1).to({graphics:mask_graphics_207,x:-97.3,y:436}).wait(1).to({graphics:mask_graphics_208,x:-96.8,y:436}).wait(1).to({graphics:mask_graphics_209,x:-96.4,y:436}).wait(1).to({graphics:mask_graphics_210,x:-96,y:436}).wait(1).to({graphics:mask_graphics_211,x:-95.6,y:436}).wait(1).to({graphics:mask_graphics_212,x:-95.3,y:436}).wait(1).to({graphics:mask_graphics_213,x:-95,y:436}).wait(1).to({graphics:mask_graphics_214,x:-94.7,y:436}).wait(1).to({graphics:mask_graphics_215,x:-94.5,y:436}).wait(1).to({graphics:mask_graphics_216,x:-94.3,y:436}).wait(1).to({graphics:mask_graphics_217,x:-94.1,y:436}).wait(1).to({graphics:mask_graphics_218,x:-93.9,y:436}).wait(1).to({graphics:mask_graphics_219,x:-93.8,y:436}).wait(1).to({graphics:mask_graphics_220,x:-93.6,y:436}).wait(1).to({graphics:mask_graphics_221,x:-93.5,y:436}).wait(1).to({graphics:mask_graphics_222,x:-93.4,y:436}).wait(1).to({graphics:mask_graphics_223,x:-93.3,y:436}).wait(1).to({graphics:mask_graphics_224,x:-93.3,y:436}).wait(1).to({graphics:mask_graphics_225,x:-93.2,y:436}).wait(1).to({graphics:mask_graphics_226,x:-93.1,y:436}).wait(1).to({graphics:mask_graphics_227,x:-93.1,y:436}).wait(1).to({graphics:mask_graphics_228,x:-93.1,y:436}).wait(1).to({graphics:mask_graphics_229,x:-93.1,y:436}).wait(1).to({graphics:mask_graphics_230,x:-93,y:436}).wait(1).to({graphics:mask_graphics_231,x:-93,y:436}).wait(1).to({graphics:mask_graphics_232,x:-93,y:436}).wait(1).to({graphics:mask_graphics_233,x:-93,y:436}).wait(1).to({graphics:mask_graphics_234,x:-93,y:436}).wait(1).to({graphics:mask_graphics_235,x:-93,y:436}).wait(1).to({graphics:mask_graphics_236,x:-93,y:436}).wait(1).to({graphics:mask_graphics_237,x:-93,y:436}).wait(1).to({graphics:mask_graphics_238,x:-93,y:436}).wait(1).to({graphics:mask_graphics_239,x:-93,y:436}).wait(1).to({graphics:mask_graphics_240,x:-93,y:436}).wait(1).to({graphics:mask_graphics_241,x:-93,y:436}).wait(1).to({graphics:mask_graphics_242,x:-93,y:242.5}).wait(418));

	// _red
	this.instance_1 = new lib.cp_red();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-39.8,427.9,1,1,0,0,0,154.8,30.3);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(156).to({_off:false},0).to({_off:true},263).wait(241));

	// animask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_137 = new cjs.Graphics().p("EgP2AgzIAArZIIDAAIjQJNIgxCMg");
	var mask_1_graphics_138 = new cjs.Graphics().p("Al4FsIAArXILxAAIkCLXg");
	var mask_1_graphics_139 = new cjs.Graphics().p("AnqlrIPVAAIkCLXIrTABg");
	var mask_1_graphics_140 = new cjs.Graphics().p("ApXlrISvAAIkCLXIutABg");
	var mask_1_graphics_141 = new cjs.Graphics().p("Aq+lrIV9AAIkCLXIx7ABg");
	var mask_1_graphics_142 = new cjs.Graphics().p("AsglrIZBgBIkBLYI1AABg");
	var mask_1_graphics_143 = new cjs.Graphics().p("At+lrIb9gBIkCLYI37ABg");
	var mask_1_graphics_144 = new cjs.Graphics().p("AvXlrIeugBIkBLYI6tABg");
	var mask_1_graphics_145 = new cjs.Graphics().p("AwrlrMAhXgABIkCLYI9VABg");
	var mask_1_graphics_146 = new cjs.Graphics().p("Ax6lrMAj1gABIkCLYI/zABg");
	var mask_1_graphics_147 = new cjs.Graphics().p("AzFlrMAmLgABIkBLXMgiKAACg");
	var mask_1_graphics_148 = new cjs.Graphics().p("A0MlrMAoZgABIkBLXMgkYAACg");
	var mask_1_graphics_149 = new cjs.Graphics().p("A1PlrMAqfgABIkCLXMgmdAACg");
	var mask_1_graphics_150 = new cjs.Graphics().p("A2NlrMAsbgABIkBLXMgoaAACg");
	var mask_1_graphics_151 = new cjs.Graphics().p("A3IlrMAuRgABIkCLXMgqPAACg");
	var mask_1_graphics_152 = new cjs.Graphics().p("A3/lqMAv/gACIkCLXMgr9AACg");
	var mask_1_graphics_153 = new cjs.Graphics().p("A4ylqMAxlgACIkBLXMgtkAACg");
	var mask_1_graphics_154 = new cjs.Graphics().p("A5ilqMAzFgACIkCLXMgvDAACg");
	var mask_1_graphics_155 = new cjs.Graphics().p("A6OlqMA0dgACIkCLXMgwbAACg");
	var mask_1_graphics_156 = new cjs.Graphics().p("A63lqMA1vgACIkBLXMgxuAACg");
	var mask_1_graphics_157 = new cjs.Graphics().p("A7dlqMA27gACIkCLXMgy5AACg");
	var mask_1_graphics_158 = new cjs.Graphics().p("A8AlqMA4BgACIkCLXMgz/AACg");
	var mask_1_graphics_159 = new cjs.Graphics().p("A8glqMA5BgACIkCLXMg0/AACg");
	var mask_1_graphics_160 = new cjs.Graphics().p("A89lqMA57gACIkCLXMg15AACg");
	var mask_1_graphics_161 = new cjs.Graphics().p("A9XlqMA6vgACIkBLXMg2uAADg");
	var mask_1_graphics_162 = new cjs.Graphics().p("A9vlqMA7fgACIkBLXMg3eAADg");
	var mask_1_graphics_163 = new cjs.Graphics().p("A+FlqMA8LgACIkCLXMg4JAADg");
	var mask_1_graphics_164 = new cjs.Graphics().p("A+YlqMA8xgACIkBLXMg4wAADg");
	var mask_1_graphics_165 = new cjs.Graphics().p("A+plqMA9TgACIkBLXMg5SAADg");
	var mask_1_graphics_166 = new cjs.Graphics().p("A+5lqMA9zgACIkCLXMg5xAADg");
	var mask_1_graphics_167 = new cjs.Graphics().p("A/GlqMA+NgACIkCLXMg6LAADg");
	var mask_1_graphics_168 = new cjs.Graphics().p("A/RlqMA+jgACIkBLXMg6iAADg");
	var mask_1_graphics_169 = new cjs.Graphics().p("A/blqMA+3gACIkBLXMg62AADg");
	var mask_1_graphics_170 = new cjs.Graphics().p("A/klqMA/IgACIkBLXMg7HAADg");
	var mask_1_graphics_171 = new cjs.Graphics().p("A/rlqMA/XgACIkCLXMg7VAADg");
	var mask_1_graphics_172 = new cjs.Graphics().p("A/wlqMA/hgACIkBLXMg7gAADg");
	var mask_1_graphics_173 = new cjs.Graphics().p("A/1lqMA/rgACIkCLXMg7pAADg");
	var mask_1_graphics_174 = new cjs.Graphics().p("A/4lqMA/xgACIkBLXMg7wAADg");
	var mask_1_graphics_175 = new cjs.Graphics().p("A/7lqMA/3gACIkBLXMg72AADg");
	var mask_1_graphics_176 = new cjs.Graphics().p("A/9lqMA/7gACIkCLXMg75AADg");
	var mask_1_graphics_177 = new cjs.Graphics().p("A/+lqMA/9gACIkBLXMg78AADg");
	var mask_1_graphics_178 = new cjs.Graphics().p("A//lqMA//gACIkCLXMg79AADg");
	var mask_1_graphics_179 = new cjs.Graphics().p("A//lqMA//gACIkBLXMg7+AADg");
	var mask_1_graphics_180 = new cjs.Graphics().p("EggAgFqMBABgACIkCLXMg7/AADg");
	var mask_1_graphics_181 = new cjs.Graphics().p("EggAAVaMBABgACIjQJMIgyCMMg7/AADg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(137).to({graphics:mask_1_graphics_137,x:-101.5,y:209.9}).wait(1).to({graphics:mask_1_graphics_138,x:-165.3,y:383.3}).wait(1).to({graphics:mask_1_graphics_139,x:-153.9,y:383.3}).wait(1).to({graphics:mask_1_graphics_140,x:-143,y:383.3}).wait(1).to({graphics:mask_1_graphics_141,x:-132.7,y:383.3}).wait(1).to({graphics:mask_1_graphics_142,x:-122.9,y:383.3}).wait(1).to({graphics:mask_1_graphics_143,x:-113.5,y:383.3}).wait(1).to({graphics:mask_1_graphics_144,x:-104.6,y:383.3}).wait(1).to({graphics:mask_1_graphics_145,x:-96.2,y:383.3}).wait(1).to({graphics:mask_1_graphics_146,x:-88.3,y:383.3}).wait(1).to({graphics:mask_1_graphics_147,x:-80.8,y:383.3}).wait(1).to({graphics:mask_1_graphics_148,x:-73.7,y:383.3}).wait(1).to({graphics:mask_1_graphics_149,x:-67,y:383.3}).wait(1).to({graphics:mask_1_graphics_150,x:-60.8,y:383.3}).wait(1).to({graphics:mask_1_graphics_151,x:-54.9,y:383.3}).wait(1).to({graphics:mask_1_graphics_152,x:-49.4,y:383.2}).wait(1).to({graphics:mask_1_graphics_153,x:-44.3,y:383.2}).wait(1).to({graphics:mask_1_graphics_154,x:-39.5,y:383.2}).wait(1).to({graphics:mask_1_graphics_155,x:-35.1,y:383.2}).wait(1).to({graphics:mask_1_graphics_156,x:-31,y:383.2}).wait(1).to({graphics:mask_1_graphics_157,x:-27.2,y:383.2}).wait(1).to({graphics:mask_1_graphics_158,x:-23.7,y:383.2}).wait(1).to({graphics:mask_1_graphics_159,x:-20.5,y:383.2}).wait(1).to({graphics:mask_1_graphics_160,x:-17.6,y:383.2}).wait(1).to({graphics:mask_1_graphics_161,x:-15,y:383.2}).wait(1).to({graphics:mask_1_graphics_162,x:-12.6,y:383.2}).wait(1).to({graphics:mask_1_graphics_163,x:-10.4,y:383.2}).wait(1).to({graphics:mask_1_graphics_164,x:-8.5,y:383.2}).wait(1).to({graphics:mask_1_graphics_165,x:-6.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_166,x:-5.2,y:383.2}).wait(1).to({graphics:mask_1_graphics_167,x:-3.9,y:383.2}).wait(1).to({graphics:mask_1_graphics_168,x:-2.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_169,x:-1.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_170,x:-0.9,y:383.2}).wait(1).to({graphics:mask_1_graphics_171,x:-0.2,y:383.2}).wait(1).to({graphics:mask_1_graphics_172,x:0.3,y:383.2}).wait(1).to({graphics:mask_1_graphics_173,x:0.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_174,x:1.1,y:383.2}).wait(1).to({graphics:mask_1_graphics_175,x:1.4,y:383.2}).wait(1).to({graphics:mask_1_graphics_176,x:1.6,y:383.2}).wait(1).to({graphics:mask_1_graphics_177,x:1.7,y:383.2}).wait(1).to({graphics:mask_1_graphics_178,x:1.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_179,x:1.8,y:383.2}).wait(1).to({graphics:mask_1_graphics_180,x:1.9,y:383.2}).wait(1).to({graphics:mask_1_graphics_181,x:1.9,y:209.9}).wait(479));

	// _white
	this.instance_2 = new lib.cp_white();
	this.instance_2.parent = this;
	this.instance_2.setTransform(1.3,380.1,1,1,0,0,0,197.3,24.6);
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(137).to({_off:false},0).to({_off:true},282).wait(241));

	// credit
	this.instance_3 = new lib.bottom_credit_text("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(-2.9,502.7);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(169).to({_off:false},0).to({alpha:1},47).to({startPosition:0},26).to({_off:true},177).wait(241));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


// stage content:
(lib.AIOtoyotaFS = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// content
	this.instance = new lib.content();
	this.instance.parent = this;
	this.instance.setTransform(240,518);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// back
	this.instance_1 = new lib.background();
	this.instance_1.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(240,518,480,1036);
// library properties:
lib.properties = {
	id: '7B6CBD67A234F3488145E008774DD399',
	width: 480,
	height: 1036,
	fps: 60,
	color: "#343233",
	opacity: 0.00,
	manifest: [
		{src:"images/background.jpg", id:"background"},
		{src:"images/disc.png", id:"disc"}
	],
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
an.compositions['7B6CBD67A234F3488145E008774DD399'] = {
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