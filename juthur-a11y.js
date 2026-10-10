/* Juthur accessibility safety net.
   1. main landmark and focusable scroll regions where a page lacks them.
   2. Contrast guard: any text whose rendered contrast falls below 4.5:1 is moved along its own lightness
      to the nearest accessible shade of the same hue. Brand colours in the source are untouched;
      only the rendered shade changes, and only where the source would fail WCAG 2.2 AA. */
(function(){
  var TH=4.6;
  function parse(s){var m=s&&s.match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:p.length>3&&!isNaN(p[3])?p[3]:1};}
  function lin(c){c/=255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4);}
  function lum(c){return .2126*lin(c.r)+.7152*lin(c.g)+.0722*lin(c.b);}
  function ratio(a,b){var x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
  function over(top,bot){var a=top.a;return {r:top.r*a+bot.r*(1-a),g:top.g*a+bot.g*(1-a),b:top.b*a+bot.b*(1-a),a:1};}
  function toHsl(c){var r=c.r/255,g=c.g/255,b=c.b/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2;
    if(mx!==mn){var d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);
      if(mx===r)h=(g-b)/d+(g<b?6:0);else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h/=6;}
    return {h:h,s:s,l:l};}
  function fromHsl(o){var h=o.h,s=o.s,l=o.l;function f(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;}
    var r,g,b;if(s===0){r=g=b=l;}else{var q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;r=f(p,q,h+1/3);g=f(p,q,h);b=f(p,q,h-1/3);}
    return {r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255),a:1};}
  function baseBg(el){
    var chain=[],n=el;
    while(n&&n.nodeType===1){chain.push(n);n=n.parentElement;}
    var bg={r:255,g:255,b:255,a:1};
    for(var i=chain.length-1;i>=0;i--){
      var cs=getComputedStyle(chain[i]);
      var c=parse(cs.backgroundColor);
      if(c&&c.a>0)bg=over(c,bg);
    }
    return bg;
  }
  function opac(el){var o=1,n=el;while(n&&n.nodeType===1){var v=parseFloat(getComputedStyle(n).opacity);if(!isNaN(v))o*=v;n=n.parentElement;}return o;}
  function fixEl(el){
    var cs=getComputedStyle(el);
    if(cs.visibility==='hidden'||cs.display==='none')return;
    var r=el.getBoundingClientRect();if(r.width<1||r.height<1)return;
    var fg=parse(cs.color);if(!fg)return;
    var bg=baseBg(el);
    // skip when something non-colour paints behind the text
    for(var n=el;n&&n.nodeType===1;n=n.parentElement){if(getComputedStyle(n).backgroundImage!=='none')return;}
    var op=opac(el);if(op<0.5)return;
    var eff=over({r:fg.r,g:fg.g,b:fg.b,a:fg.a*op},bg);
    if(ratio(eff,bg)>=TH)return;
    var hsl=toHsl(fg);
    var darker=ratio({r:0,g:0,b:0},bg)>=ratio({r:255,g:255,b:255},bg);
    var best=null;
    for(var step=0;step<=60;step++){
      var l=darker?hsl.l-step*.015:hsl.l+step*.015;
      if(l<0||l>1)break;
      var cand=fromHsl({h:hsl.h,s:hsl.s,l:l});
      var shown=over({r:cand.r,g:cand.g,b:cand.b,a:op},bg);
      if(ratio(shown,bg)>=TH){best=cand;break;}
    }
    if(!best)best=darker?{r:0,g:0,b:0}:{r:255,g:255,b:255};
    el.style.setProperty('color','rgb('+best.r+','+best.g+','+best.b+')','important');el.setAttribute('data-ag','1');
  }
  function guard(){
    try{
      var all=document.body.querySelectorAll('*');
      for(var i=0;i<all.length;i++){
        var el=all[i],t=el.tagName;
        if(t==='SCRIPT'||t==='STYLE'||t==='NOSCRIPT'||t==='SVG'||t==='svg'||t==='INPUT'||t==='TEXTAREA'||t==='SELECT')continue;
        var has=false;for(var k=0;k<el.childNodes.length;k++){var c=el.childNodes[k];if(c.nodeType===3&&/\S/.test(c.nodeValue)){has=true;break;}}
        if(has)fixEl(el);
      }
    }catch(_){}
  }
  function landmarks(){
    try{
      if(!document.querySelector('main,[role="main"]')){
        var c=document.querySelector('.jz-wrap')||document.getElementById('root')||document.getElementById('app')||
          document.querySelector('body > div:not(.jx-indep):not(#__bundler_thumbnail):not(.langtog)');
        if(c)c.setAttribute('role','main');
      }
      var en=(document.documentElement.lang||'').indexOf('en')===0;
      document.querySelectorAll('.pb-scroll,[style*="overflow-x:auto"],[style*="overflow-x: auto"]').forEach(function(e){
        if(e.scrollWidth>e.clientWidth&&!e.hasAttribute('tabindex')){
          e.setAttribute('tabindex','0');e.setAttribute('role','region');
          if(!e.getAttribute('aria-label'))e.setAttribute('aria-label',en?'Scrollable table':'جدول قابل للتمرير');
        }
      });
    }catch(_){}
  }
  var runs=0;
  function run(){landmarks();guard();}
  function schedule(){setTimeout(run,1500);setTimeout(run,3500);}
  if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule);
  var mo;try{mo=new MutationObserver(function(){if(runs++<40){clearTimeout(mo._t);mo._t=setTimeout(run,600);}});
    window.addEventListener('load',function(){mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});});}catch(_){}
  var st;window.addEventListener('scroll',function(){if(runs++<40){clearTimeout(st);st=setTimeout(run,700);}},{passive:true});
})();
