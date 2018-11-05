//>>built
define("dojox/widget/Rotator","dojo/aspect dojo/_base/declare dojo/_base/Deferred dojo/_base/lang dojo/_base/array dojo/_base/fx dojo/dom dojo/dom-attr dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/topic dojo/on dojo/parser dojo/query dojo/fx/easing dojo/NodeList-dom".split(" "),function(w,r,x,h,n,y,z,k,p,t,l,u,B,A,v){r=r("dojox.widget.Rotator",null,{transition:"dojox.widget.rotator.swap",transitionParams:"duration:500",panes:null,constructor:function(c,b){h.mixin(this,c);var a=this,d=
a.transition,e=a._transitions={};a._idMap={};var f=a.transitionParams=eval("({ "+a.transitionParams+" })");b=a._domNode=z.byId(b);a._domNodeContentBox=t.getContentBox(b);a.id=b.id||(new Date).getTime();"static"==l.get(b,"position")&&l.set(b,"position","relative");e[d]=h.getObject(d);e[d]||(this._transitionWarn(d,"dojox.widget.rotator.swap"),e[a.transition="dojox.widget.rotator.swap"]=h.getObject("dojox.widget.rotator.swap"));f.duration||(f.duration=500);n.forEach(a.panes,function(a){p.create("div",
a,b)});a.panes=[];v("\x3e *",b).forEach(function(b,c){a._initializePane(b,c)});a._controlSub=u.subscribe(a.id+"/rotator/control",h.hitch(a,this.control))},insert:function(c,b){var a;a=this.panes;null==b&&(b=a.length);b<a.length?(a=a[b],p.place(c,a.node,"before")):p.place(c,this._domNode,"last");this._initializePane(c,b)},remove:function(c){function b(a){if(a=e.splice(a,1)[0])a.id&&(d._idMap[a.id]=void 0),d._domNode.removeChild(a.node)}var a,d=this,e=this.panes;if("number"===typeof c)a=c;else{for(var f=
0;f<e.length;f++)if(e.node===c){a=f;break}if(null==a)return}if(a===this.idx){if(c=this.go(this.idx-1))return c.then(function(){b(a)});b(a)}else b(a),this.idx>a&&this.idx--},destroy:function(){n.forEach([this._controlSub,this.wfe],function(c){c&&c.remove()});p.destroy(this._domNode);this.panes=[]},next:function(){return this.go(this.idx+1)},prev:function(){return this.go(this.idx-1)},go:function(c){var b=this,a=b.idx,d=b.panes,e=d.length,f=b._idMap[c];b._resetWaitForEvent();c=null!=f?f:c||0;c=c<e?
0>c?e-1:c:0;if(c==a||b.anim)return null;var g=d[a],m=d[c];l.set(g.node,"zIndex",2);l.set(m.node,"zIndex",1);var q={current:g,next:m,rotator:b};if(a=b.anim=b._transitions[m.trans](h.mixin({rotatorBox:b._domNodeContentBox},q,m.params))){var k=new x,n=m.waitForEvent,p=w.after(a,"onEnd",function(){l.set(g.node,{display:"none",left:0,opacity:1,top:0,zIndex:0});p.remove();b.anim=null;b.idx=c;if(g.onAfterOut)g.onAfterOut(q);if(m.onAfterIn)m.onAfterIn(q);b.onUpdate("onAfterTransition");n||(b._resetWaitForEvent(),
k.callback())},!0);b.wfe=n?u.subscribe(n,function(){b._resetWaitForEvent();k.callback(!0)}):null;b.onUpdate("onBeforeTransition");if(g.onBeforeOut)g.onBeforeOut(q);if(m.onBeforeIn)m.onBeforeIn(q);a.play();return k}},onUpdate:function(c,b){u.publish(this.id+"/rotator/update",c,this,b||{})},_initializePane:function(c,b){var a={node:c,idx:b,params:h.mixin({},this.transitionParams,eval("({ "+(k.get(c,"transitionParams")||"")+" })"))},d=a.trans=k.get(c,"transition")||this.transition,e=this._transitions,
f=this.panes,g={left:0,top:0,position:"absolute",display:"none"};n.forEach(["id","title","duration","waitForEvent"],function(b){a[b]=k.get(c,b)});a.id&&(this._idMap[a.id]=b);e[d]||(e[d]=h.getObject(d))||this._transitionWarn(d,a.trans=this.transition);if(null==this.idx||k.get(c,"selected"))null!=this.idx&&l.set(f[this.idx].node,"display","none"),this.idx=b,g.display="";l.set(c,g);v("\x3e script[type^\x3d'dojo/method']",c).orphan().forEach(function(b){var c=k.get(b,"event");c&&(a[c]=A._functionFromScript(b))});
f.splice(b,0,a)},_resetWaitForEvent:function(){this.wfe&&(this.wfe.remove(),delete this.wfe)},control:function(c){var b=h._toArray(arguments),a=this;b.shift();a._resetWaitForEvent();a[c]?((b=a[c].apply(a,b))&&b.addCallback(function(){a.onUpdate(c)}),a.onManualChange(c)):console.warn(a.declaredClass,' - Unsupported action "',c,'".')},resize:function(c,b){var a=this._domNodeContentBox={w:c,h:b};t.setContentSize(this._domNode,a);n.forEach(this.panes,function(b){t.setContentSize(b.node,a)})},onManualChange:function(){},
_transitionWarn:function(c,b){console.warn(this.declaredClass,' - Unable to find transition "',c,'", defaulting to "',b,'".')}});h.setObject("dojox.widget.rotator.swap",function(c){return new y.Animation({play:function(){l.set(c.current.node,"display","none");l.set(c.next.node,"display","");this._fire("onEnd")}})});return r});