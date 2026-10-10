/* Juthur living layer. Silent. Honours prefers-reduced-motion. Designed and developed by Dr. Adel F. Amer. All rights reserved. */
(function(){
try{
var d=document,h=d.documentElement;
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(rm||!('IntersectionObserver' in window))return;
var m=d.querySelector('main');if(!m)return;
var els=m.querySelectorAll('h1,h2,p,blockquote,.block,.vx-grid,.lf-orn');
if(!els.length)return;
h.classList.add('lf-on');
var bar=d.createElement('div');bar.className='lf-root';bar.setAttribute('aria-hidden','true');bar.innerHTML='<i></i>';d.body.appendChild(bar);
var fill=bar.firstChild;
function prog(){var s=h.scrollHeight-h.clientHeight;fill.style.transform='scaleX('+(s>0?Math.min(1,h.scrollTop/s):0)+')'}
addEventListener('scroll',prog,{passive:true});prog();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.05});
els.forEach(function(e){if(e.closest('.jx-rights,footer,nav'))return;e.classList.add('lf-r');io.observe(e)});
setTimeout(function(){d.querySelectorAll('.lf-r:not(.in)').forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add('in')})},1200);
}catch(x){}
})();
