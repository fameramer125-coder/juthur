/* Hifz map (memorisation map) for Murqat al-Juthur. Loaded before the main script. */
const HKEY='murqat_hifz_v1';
let HF={p:{},done:[],len:5};
try{HF=Object.assign(HF,JSON.parse(localStorage.getItem(HKEY)||'{}'))}catch(e){}
(function(){if(!HF||typeof HF!=='object'||Array.isArray(HF))HF={p:{},done:[],len:5};
 if(!HF.p||typeof HF.p!=='object'||Array.isArray(HF.p))HF.p={};
 if(!Array.isArray(HF.done))HF.done=[];
 HF.done=HF.done.filter(d=>d&&typeof d==='object'&&Array.isArray(d.rev)&&d.s&&d.from&&d.to&&d.date);
 if(![3,4,5,7,10].includes(HF.len))HF.len=5;
 Object.keys(HF.p).forEach(k=>{const v=HF.p[k];if(!v||!Array.isArray(v.steps)||v.steps.length!==13||!v.prayer||typeof v.prayer!=='object')HF.p[k]={steps:Array(13).fill(0),prayer:{},ijaza:null}})})();
function hsave(){try{localStorage.setItem(HKEY,JSON.stringify(HF))}catch(e){}}
const HSTEPS=[
 {id:'fahm',ar:'الْفَهْمُ',en:'Understand',how:'اقْرَأِ الْمَعْنَى وَالتَّفْسِيرَ الْمُيَسَّرَ، ثُمَّ احْكِ الْآيَاتِ بِكَلِمَاتِكَ.',hen:'Read the meaning, then retell the verses in your own words.',done:'تَسْتَطِيعُ أَنْ تَحْكِيَ مَعْنَى الْوِرْدِ دُونَ النَّظَرِ.',den:'You can retell the meaning without looking.'},
 {id:'listen',ar:'الِاسْتِمَاعُ الْوَاعِي',en:'Mindful listening',how:'اسْتَمِعْ إِلَى الْوِرْدِ كُلِّهِ وَحَرِّكْ إِصْبَعَكَ فَوْقَ كُلِّ كَلِمَةٍ، وَمَرِّرِ الْمُؤَشِّرَ لِيَظْهَرَ مَعْنَاهَا.',hen:'Listen to the whole portion and move your finger above each word; hover to see its meaning.',done:'خَمْسُ مَرَّاتٍ مُتَتَالِيَةٍ.',den:'Five listens in a row.',tool:'listen'},
 {id:'bg',ar:'الِاسْتِمَاعُ الدَّائِمُ',en:'Background listening',how:'فِي السَّيَّارَةِ وَأَوْقَاتِ الِانْتِظَارِ وَفِي الْبَيْتِ فِي الْخَلْفِيَّةِ، لِلْوِرْدِ الْمُسْتَهْدَفِ فَقَطْ.',hen:'In the car, while waiting, and at home in the background, for the target portion only.',done:'كُلَّ يَوْمٍ مَا دُمْتَ تَحْفَظُ هَذَا الْوِرْدَ.',den:'Daily while you work on this portion.',tool:'loop'},
 {id:'repeat',ar:'التَّكْرَارُ خَلْفَ الشَّيْخِ',en:'Repeat after the Sheikh',how:'اسْتَمِعْ إِلَى الْآيَةِ ثُمَّ كَرِّرْهَا أَنْتَ فِي الْفَجْوَةِ.',hen:'Listen to the verse, then repeat it yourself in the pause.',done:'كُلُّ آيَةٍ ثَلَاثَ مَرَّاتٍ دُونَ خَطَأٍ.',den:'Each verse three times without error.',tool:'repeat'},
 {id:'with',ar:'التِّلَاوَةُ مَعَ الشَّيْخِ',en:'Recite with the Sheikh',how:'انْظُرْ فِي الْمُصْحَفِ وَضَعِ الْإِصْبَعَ أَوِ الْقَلَمَ عَلَى الْكَلِمَةِ أَثْنَاءَ التِّلَاوَةِ.',hen:'Look in the Mushaf with a finger or pen on the word as you recite along.',done:'ثَلَاثُ مَرَّاتٍ مُتَتَالِيَةٍ.',den:'Three times in a row.',tool:'cont'},
 {id:'solo',ar:'الْقِرَاءَةُ الْفَرْدِيَّةُ',en:'Solo reading',how:'اقْرَأِ الْوِرْدَ بِنَفْسِكَ مِنَ الْمُصْحَفِ مُبَاشَرَةً.',hen:'Read the portion yourself straight from the Mushaf.',done:'ثَلَاثُ مَرَّاتٍ دُونَ خَطَأٍ فِي يَوْمَيْنِ.',den:'Three error-free reads on two days.'},
 {id:'check',ar:'عَرْضٌ قَصِيرٌ لِلتَّصْحِيحِ',en:'Short correction check',how:'اعْرِضِ الْوِرْدَ عَلَى مُجَازٍ أَوْ مُعَلِّمٍ لِيُصَحِّحَ التَّجْوِيدَ قَبْلَ أَنْ يَتَرَسَّخَ خَطَأٌ.',hen:'Show the portion to an authorised reciter or teacher so tajweed errors are fixed before they set.',done:'صَحَّحَ الْمُعَلِّمُ مَا وَجَدَ.',den:'The teacher has corrected what was found.'},
 {id:'record',ar:'التَّسْجِيلُ وَالْمُقَارَنَةُ',en:'Record and compare',how:'سَجِّلْ صَوْتَكَ، ثُمَّ اسْمَعْهُ بَعْدَ الشَّيْخِ، وَاسْتَخْرِجِ الْأَخْطَاءَ، ثُمَّ أَعِدِ التِّلَاوَةَ.',hen:'Record yourself, listen after the Sheikh, find the mistakes, then recite again.',done:'تِلَاوَةٌ مُسَجَّلَةٌ بِلَا أَخْطَاءٍ ظَاهِرَةٍ.',den:'One recorded recitation with no clear mistakes.',tool:'rec'},
 {id:'write',ar:'الْكِتَابَةُ الْخُمَاسِيَّةُ',en:'Five-fold writing',how:'مُرَّ بِكُلِّ آيَةٍ فِي مَرَاحِلِهَا الْخَمْسِ (النِّقَاطُ الْمُلَوَّنَةُ تَحْتَ كُلِّ آيَةٍ).',hen:'Take each verse through its five stages (the coloured dots under each verse).',done:'كُلُّ آيَةٍ لَهَا مَرَاحِلُهَا الْخَمْسُ.',den:'Every verse has its five stages ticked.'},
 {id:'cards',ar:'قَصْرُ الذَّاكِرَةِ',en:'Memory palace',how:'كُلُّ آيَةٍ فِي بِطَاقَةٍ بِرَقْمِهَا، تُعَلَّقُ فِي مَكَانٍ وَاضِحٍ فِي أَنْحَاءِ الْبَيْتِ.',hen:'Each verse on a numbered card, hung in a clear place around the home.',done:'الْبِطَاقَاتُ مُعَلَّقَةٌ.',den:'The cards are hung.',tool:'cards'},
 {id:'prayer',ar:'الْآيَاتُ فِي الصَّلَاةِ',en:'Use it in prayer',how:'اقْرَأِ الْوِرْدَ فِي كُلِّ صَلَاةٍ مَا دَامَ مُتْقَنًا.',hen:'Recite the portion in every prayer once it is secure.',done:'خَمْسُ صَلَوَاتٍ فِي يَوْمٍ وَاحِدٍ.',den:'All five prayers in one day.',tool:'prayer'},
 {id:'ijaza',ar:'التَّسْمِيعُ عَلَى مُجَازٍ',en:'Recite to an authorised reciter',how:'يَسْمَعُ الْمُجَازُ الْوِرْدَ كُلَّهُ غَيْبًا.',hen:'The authorised reciter hears the whole portion from memory.',done:'أَقَرَّ الْمُجَازُ بِإِتْقَانِهِ.',den:'The reciter confirms it is secure.',tool:'ijaza'},
 {id:'next',ar:'الِانْتِقَالُ وَالْمُرَاجَعَةُ',en:'Move on and keep reviewing',how:'تَبْدَأُ الْوِرْدَ التَّالِيَ بِالطَّرِيقَةِ نَفْسِهَا، وَتُرَاجِعُ مَا مَضَى بَعْدَ يَوْمٍ وَأُسْبُوعٍ وَشَهْرٍ.',hen:'Start the next portion the same way, and review the old one after a day, a week and a month.',done:'جَدْوَلُ الْمُرَاجَعَةِ يَظْهَرُ فِي الصَّفْحَةِ الرَّئِيسِيَّةِ.',den:'The review schedule appears on the home page.'}
];
const HPR=['الْفَجْرُ','الظُّهْرُ','الْعَصْرُ','الْمَغْرِبُ','الْعِشَاءُ'];
const HPRE=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
function hToday(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function hAdd(ds,n){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
let SU=null;
function hSurahs(){if(SU)return SU;SU={};DATA.parts.forEach(p=>p.units.forEach(u=>{const s=SU[u.num]||(SU[u.num]={num:u.num,ar:u.name_ar,en:u.name_en,ayat:[]});u.ayat.forEach(a=>s.ayat.push(a))}));Object.values(SU).forEach(s=>s.ayat.sort((a,b)=>a.n-b.n));return SU}
function hEsc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function hHomeBlock(){
 const su=hSurahs();const opts=Object.values(su).map(s=>`<option value="${s.num}">${s.num}. ${s.ar}</option>`).join('');
 const t=hToday();
 const due=[];HF.done.forEach((d,i)=>{const sched=[hAdd(d.date,1),hAdd(d.date,7),hAdd(d.date,30)];for(let k=0;k<3;k++){if(!d.rev[k]){if(sched[k]<=t)due.push({i,k,d,when:sched[k]});break}}});
 const dueHtml=due.length?`<h3 style="font-size:20px;margin:18px 0 6px">مُرَاجَعَةُ الْيَوْمِ <span class="lat" style="font-size:15px;color:var(--ink2)">Reviews due</span></h3>`+due.map(x=>{const s=su[x.d.s];return `<div class="card" style="margin-top:8px"><span class="t" style="font-size:20px">${s.ar} · ${x.d.from}–${x.d.to}</span><span class="m">${['After a day','After a week','After a month'][x.k]} · due ${x.when}</span><span><a href="#H${x.d.s}:${x.d.from}">افْتَحِ الْوِرْدَ</a> · <button class="optb" style="display:inline-block;min-height:36px;color:var(--ink);border-color:var(--gold)" data-hrev="${x.i}:${x.k}">تَمَّتِ الْمُرَاجَعَةُ</button></span></div>`}).join(''):'';
 return `<h2>خَرِيطَةُ الْحِفْظِ <span class="lat" style="font-size:18px;color:var(--ink2)">Memorisation map</span></h2>
 <p style="color:var(--ink2);font-size:18px;max-width:62ch;margin:0 0 10px">ثَلَاثَ عَشْرَةَ خُطْوَةً لِكُلِّ وِرْدٍ صَغِيرٍ (مِنْ ٣ إِلَى ١٠ آيَاتٍ): فَهْمٌ، ثُمَّ سَمَاعٌ وَتَكْرَارٌ وَقِرَاءَةٌ، ثُمَّ تَسْجِيلٌ وَكِتَابَةٌ وَبِطَاقَاتٌ، ثُمَّ صَلَاةٌ وَتَسْمِيعٌ، ثُمَّ مُرَاجَعَةٌ. <span class="lat">Thirteen steps for every small portion.</span></p>
 <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><select id="hsel" aria-label="اخْتَرْ سُورَةً" style="font:inherit;min-height:44px;padding:0 10px;border:1px solid var(--rule);border-radius:8px;background:var(--surface);color:var(--ink)">${opts}</select><button class="optb" id="hgo" style="display:inline-block;color:var(--ink);border-color:var(--gold)">ابْدَأْ وِرْدًا</button></div>${dueHtml}`;
}
function hifzView(sn,from,keep){
 const prevI=typeof CURI==='number'?CURI:-1;
 const su=hSurahs();const s=su[sn];if(!s){location.hash='';return}
 const len=HF.len||5;const total=s.ayat.length;
 from=Math.max(1,Math.min(total,from||1));const to=Math.min(total,from+len-1);
 const pk=sn+':'+from+'-'+to;const st=HF.p[pk]||(HF.p[pk]={steps:HSTEPS.map(()=>0),prayer:{},ijaza:null});
 const part=DATA.parts.find(p=>p.units.some(u=>u.num===sn));
 QUEUE=[];PART=null;
 const und=(typeof UND!=='undefined'&&UND[sn])||null;
 const ay=s.ayat.filter(a=>a.n>=from&&a.n<=to);
 const doneN=st.steps.filter(Boolean).length;
 let h=`<a class="back" href="#">› الرَّئِيسِيَّةُ <span class="lat">Home</span></a>
 <div class="phead"><h1 style="font-size:34px">خَرِيطَةُ الْحِفْظِ</h1><div class="sub">${s.ar} · ${s.en} · verses ${from}–${to} of ${total}</div></div>
 <div class="prow" style="gap:8px;margin:8px 0"><button class="optb" style="display:inline-block;color:var(--ink);border-color:var(--gold)" id="hprev">› الْوِرْدُ السَّابِقُ</button>
 <label style="font-size:16px">عَدَدُ الْآيَاتِ <select id="hlen" style="font:inherit;min-height:44px;padding:0 8px;border:1px solid var(--rule);border-radius:8px;background:var(--surface);color:var(--ink)">${[3,4,5,7,10].map(n=>`<option ${n===len?'selected':''}>${n}</option>`).join('')}</select></label>
 <button class="optb" style="display:inline-block;color:var(--ink);border-color:var(--gold)" id="hnext">الْوِرْدُ التَّالِي ‹</button></div>
 <div class="bar" aria-hidden="true"><b style="width:${Math.round(100*doneN/HSTEPS.length)}%"></b></div><p class="hint"><bdi dir="ltr">${doneN} / ${HSTEPS.length}</bdi> <span class="lat">steps done for this portion</span></p>`;
 // understanding
 h+=`<details open class="hund"><summary>الْفَهْمُ <span class="lat" style="font-size:16px;color:var(--ink2)">Understanding card</span></summary>`;
 if(und&&(und.theme_ar||und.theme_en)) h+=`<p><b>مِحْوَرُ السُّورَةِ.</b> ${hEsc(und.theme_ar||'')}<br><span class="lat">${hEsc(und.theme_en||'')}</span></p>`;
 if(und&&(und.story_ar||und.story_en)) h+=`<p><b>الْقِصَّةُ.</b> ${hEsc(und.story_ar||'')}<br><span class="lat">${hEsc(und.story_en||'')}</span></p>`;
 const asb=(und&&und.asbab||[]).filter(x=>{const n=+x.v.split(':')[1];return n>=from&&n<=to});
 asb.forEach(x=>{h+=`<p><b>سَبَبُ النُّزُولِ (${x.v}).</b> ${hEsc(x.ar||'')}<br><span class="lat">${hEsc(x.en||'')}</span><br><small>${hEsc(x.src||'')}</small></p>`});
 ay.forEach(a=>{const m=MEAN[sn+':'+a.n];if(!m)return;
  h+=`<div class="hm"><span class="num">${a.n}</span><p class="lat" style="margin:6px 0 2px;font-size:19px">${hEsc(m.e)}</p><p style="margin:2px 0 8px;font-size:18px;color:var(--ink2)">${hEsc(m.a)}${m.g?` <small>(التَّفْسِيرُ يَشْمَلُ الْآيَاتِ ${m.g[0]}–${m.g[1]})</small>`:''}</p></div>`});
 h+=`<p class="hint"><span class="lat">English: Sahih International (via Quran.com). Arabic: Al-Tafsir al-Muyassar. Draft for review by a qualified reader; licences to be confirmed before wider distribution.</span></p></details>`;
 // steps
 h+='<ol class="hsteps">';
 HSTEPS.forEach((x,i)=>{
  let tool='';
  if(x.tool==='listen')tool=`<button class="optb hb" data-ht="listen">اسْتَمِعْ الْآنَ</button>`;
  if(x.tool==='loop')tool=`<button class="optb hb" data-ht="loop">شَغِّلْ فِي حَلْقَةٍ</button> <button class="optb hb" data-ht="stop">أَوْقِفْ</button>`;
  if(x.tool==='repeat')tool=`<button class="optb hb" data-ht="repeat">ابْدَأِ التَّكْرَارَ</button>`;
  if(x.tool==='cont')tool=`<button class="optb hb" data-ht="cont">تَلَاوَةٌ مُتَوَاصِلَةٌ</button>`;
  if(x.tool==='rec')tool=`<div class="hrec"><button class="optb hb" id="hrecb" data-ht="rec">● سَجِّلْ</button> <button class="optb hb" data-ht="cmp" id="hcmp" disabled>الشَّيْخُ ثُمَّ أَنَا</button> <audio id="hrecau" controls hidden></audio><div class="msg" id="hrecm"></div></div>`;
  if(x.tool==='cards')tool=`<button class="optb hb" data-ht="cards">اطْبَعِ الْبِطَاقَاتِ</button>`;
  if(x.tool==='prayer'){const t=hToday();const pr=st.prayer[t]||[0,0,0,0,0];tool=`<div class="hpray">${HPR.map((n,k)=>`<label><input type="checkbox" data-hp="${k}" ${pr[k]?'checked':''}> ${n} <span class="lat">${HPRE[k]}</span></label>`).join('')}</div>`}
  if(x.tool==='ijaza')tool=`<div class="hpray"><button class="optb hb" data-ht="ijz">${st.ijaza?'أَلْغِ التَّأْكِيدَ':'أَكَّدَ الْمُجَازُ إِتْقَانَ الْوِرْدِ'}</button><span class="lat">${st.ijaza?'Confirmed on '+st.ijaza:'Not yet confirmed'}</span></div>`;
  h+=`<li class="hstep"><div class="hsh"><button class="hchk" data-hs="${i}" aria-pressed="${st.steps[i]?'true':'false'}" aria-label="${x.ar}">${i+1}</button><div class="hst"><b>${x.ar}</b><div class="lat hen" style="margin-top:-2px">${x.en}</div><div>${x.how}</div><div class="lat hen">${x.hen}</div><div class="hdone"><b>مَتَى تُنْجَزُ؟</b> ${x.done}</div><div class="lat hen">Done when: ${x.den}</div>${tool}</div></div></li>`});
 h+='</ol>';
 // verses
 ay.forEach(a=>{const id=QUEUE.length;QUEUE.push({s:sn,key:a.n,label:s.ar+' · الْآيَةُ '+a.n,vk:sn+':'+a.n});const r=prog[sn+':'+a.n]||[0,0,0,0,0];
  h+=`<article class="verse" id="v${id}"><p class="vtext" tabindex="0">${W(a.t,sn+':'+a.n)}</p><div class="vrow"><div class="vl"><button class="play" data-q="${id}" aria-label="استماع إلى الآية ${a.n}"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button><span class="num">${a.n}</span><span>${sn}:${a.n}</span></div>
  <div class="stages" role="group" aria-label="مراحل الآية ${a.n}">${[1,2,3,4,5].map(k=>`<button class="dot d${k}" data-vk="${sn+':'+a.n}" data-k="${k-1}" aria-pressed="${r[k-1]?'true':'false'}" aria-label="الآية ${a.n}، المرحلة ${k}: ${STG[k-1][0]}">${k}</button>`).join('')}</div></div></article>`});
 app.innerHTML=h;if(!keep)window.scrollTo(0,0);$('#player').hidden=false;
 document.title='خَرِيطَةُ الْحِفْظِ · '+s.ar+' '+from+'–'+to+' · Murqat al-Juthur';
 if(keep&&prevI>=0&&prevI<QUEUE.length){setNow(prevI);icon(playing()||!!wait)}else setNow(-1);
 if(!keep&&HBLOB){HBLOB=null;if(HURL){URL.revokeObjectURL(HURL);HURL=null}}
 if(HBLOB&&HURL){const au=document.getElementById('hrecau'),cb=document.getElementById('hcmp');if(au){au.src=HURL;au.hidden=false}if(cb)cb.disabled=false}
 window.HCUR={sn,from,to,pk,total,ay};
}
let HREC=null,HBLOB=null,HSTREAM=null,HURL=null,HBUSY=false;
function hifzClick(e){
 const c=window.HCUR;
 const rv=e.target.closest('[data-hrev]');if(rv){const [i,k]=rv.dataset.hrev.split(':').map(Number);HF.done[i].rev[k]=1;hsave();home();return true}
 if(!c)return false;
 const hs=e.target.closest('[data-hs]');if(hs){const i=+hs.dataset.hs;const st=HF.p[c.pk];st.steps[i]=st.steps[i]?0:1;
  if(HSTEPS[i].id==='next'){if(st.steps[i]){const ix=HF.done.findIndex(d=>d.k===c.pk);if(ix<0)HF.done.push({k:c.pk,s:c.sn,from:c.from,to:c.to,date:hToday(),rev:[0,0,0]})}else HF.done=HF.done.filter(d=>d.k!==c.pk)}
  hsave();const y=window.scrollY;hifzView(c.sn,c.from,true);window.scrollTo(0,y);const nb=document.querySelector('[data-hs="'+i+'"]');if(nb)nb.focus({preventScroll:true});return true}
 const hp=e.target.closest('[data-hp]');if(hp){const st=HF.p[c.pk];const t=hToday();const pr=st.prayer[t]||(st.prayer[t]=[0,0,0,0,0]);pr[+hp.dataset.hp]=hp.checked?1:0;hsave();return true}
 const ht=e.target.closest('[data-ht]');if(ht){hTool(ht.dataset.ht,c);return true}
 return false;
}
function hSetMode(m){const b=document.querySelector('#modes [data-m="'+m+'"]');if(b)b.click()}
function hSetReps(n){const b=document.querySelector('#reps [data-n="'+n+'"]');if(b)b.click()}
async function hTool(t,c){if(typeof setSpan==='function')setSpan(0);
 window.HLOOP=false;window.HEND=null;
 if(t==='ijz'){const st=HF.p[c.pk];st.ijaza=st.ijaza?null:hToday();st.steps[11]=st.ijaza?1:0;hsave();const y=window.scrollY;hifzView(c.sn,c.from,true);window.scrollTo(0,y);const nb=document.querySelector('[data-ht="ijz"]');if(nb)nb.focus({preventScroll:true});return}
 if(t==='stop'){window.HLOOP=false;pause();return}
 if(t==='listen'){hSetMode('cont');hSetReps(1);window.HLOOP=4;playIdx(0);return}
 if(t==='cont'){hSetMode('cont');hSetReps(1);playIdx(0);return}
 if(t==='loop'){hSetMode('cont');hSetReps(1);window.HLOOP=true;playIdx(0);return}
 if(t==='repeat'){hSetMode('repeat');hSetReps(3);playIdx(0);return}
 if(t==='cards'){hCards(c);return}
 const m=document.getElementById('hrecm');
 if(t==='rec'){
  const b=document.getElementById('hrecb');
  if(HREC&&HREC.state==='recording'){HREC.stop();return}
  try{
   if(!navigator.mediaDevices||!window.MediaRecorder)throw new Error('nomic');
   if(HBUSY)return;HBUSY=true;pause();
   let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}finally{HBUSY=false}
   if(!window.HCUR||window.HCUR.pk!==c.pk){stream.getTracks().forEach(x=>x.stop());return}
   HSTREAM=stream;
   const chunks=[];HREC=new MediaRecorder(HSTREAM);
   HREC.ondataavailable=ev=>chunks.push(ev.data);
   HREC.onstop=()=>{HBLOB=new Blob(chunks,{type:HREC.mimeType||'audio/webm'});HSTREAM.getTracks().forEach(x=>x.stop());if(HURL)URL.revokeObjectURL(HURL);HURL=URL.createObjectURL(HBLOB);const au=document.getElementById('hrecau');if(au){au.src=HURL;au.hidden=false}const cb=document.getElementById('hcmp');if(cb)cb.disabled=false;if(b)b.textContent='● سَجِّلْ مَرَّةً أُخْرَى';if(m)m.textContent='تَمَّ التَّسْجِيلُ. يَبْقَى عَلَى هَذَا الْجِهَازِ فَقَطْ وَلَا يُحْفَظُ بَعْدَ إِغْلَاقِ الصَّفْحَةِ.'};
   HREC.start();if(b)b.textContent='■ أَوْقِفِ التَّسْجِيلَ';if(m)m.textContent='';
  }catch(err){if(HSTREAM){HSTREAM.getTracks().forEach(x=>x.stop());HSTREAM=null}if(m)m.textContent='تَعَذَّرَ فَتْحُ الْمِيكْرُوفُونِ. اسْمَحْ بِالْوُصُولِ إِلَى الْمِيكْرُوفُونِ مِنْ إِعْدَادَاتِ الْمُتَصَفِّحِ ثُمَّ أَعِدِ الْمُحَاوَلَةَ.'}
  return}
 if(t==='cmp'){
  if(!HBLOB)return;const au=document.getElementById('hrecau');
  hSetMode('cont');hSetReps(1);window.HEND=()=>{if(!HURL)return;AU.dataset.f='';cur=null;AU.muted=false;AU.playbackRate=1;AU.src=HURL;const pr=AU.play();if(pr&&pr.catch)pr.catch(()=>{})};playIdx(0);return}
}
function hCards(c){
 let pa=document.getElementById('printarea');if(!pa){pa=document.createElement('div');pa.id='printarea';document.body.appendChild(pa)}
 const s=hSurahs()[c.sn];
 pa.innerHTML=c.ay.map(a=>`<div class="pcard"><div class="pnum">${a.n}</div><p class="pq" lang="ar" dir="rtl">${hEsc(a.t)}</p><p class="pl">${hEsc(s.ar)} · ${c.sn}:${a.n}</p><p class="pe">${hEsc((MEAN[c.sn+':'+a.n]||{}).e||'')}</p></div>`).join('');
 document.body.classList.add('pc');const rm=()=>{document.body.classList.remove('pc');removeEventListener('afterprint',rm)};addEventListener('afterprint',rm);window.print();
}
function hifzReset(){window.HLOOP=false;window.HEND=null;window.HCUR=null;if(HREC&&HREC.state==='recording'){try{HREC.stop()}catch(e){}}}
document.addEventListener('click',e=>{ if(hifzClick(e)) e.stopPropagation(); },true);
document.addEventListener('change',e=>{
 if(e.target.id==='hlen'){HF.len=+e.target.value;hsave();const c=window.HCUR;if(c)hifzView(c.sn,c.from)}
 const hp=e.target.closest&&e.target.closest('[data-hp]');if(hp&&window.HCUR)hifzClick(e);
});
document.addEventListener('click',e=>{
 if(e.target.id==='hgo'){const n=+document.getElementById('hsel').value;location.hash='H'+n+':1'}
 if(e.target.id==='hprev'&&window.HCUR){const c=window.HCUR;location.hash='H'+c.sn+':'+Math.max(1,c.from-(HF.len||5))}
 if(e.target.id==='hnext'&&window.HCUR){const c=window.HCUR;if(c.to<c.total)location.hash='H'+c.sn+':'+(c.to+1)}
});
