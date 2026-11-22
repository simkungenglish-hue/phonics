
const P=window.PAGE,A={};let playing=false,stop=false;
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function audio(id){if(!A[id]){A[id]=new Audio('../../audio/'+id+'.mp3');A[id].preload='auto'}return A[id]}
function play(id){return new Promise(r=>{const a=audio(id);a.currentTime=0;a.onended=()=>r(a.duration||0.6);a.onerror=()=>r(0.6);a.play().catch(()=>r(0.6))})}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function mark(id){document.querySelectorAll('.it').forEach(b=>b.classList.toggle('now',b.dataset.a===id))}
document.body.append(el('div','brand','스텔라의 심쿵영어 · 심쿵 파닉스'),el('h1','',esc(P.title)),el('p','sub',esc(P.sub)));
const go=el('button','go','▶ 듣고 따라 말하기');document.body.append(go);
const list=el('div','list');
P.items.forEach(it=>{const b=el('button','it'+(it.big?' big':'')+(it.t.length>8?' long':''),(it.e?'<i>'+it.e+'</i>':'')+'<b>'+esc(it.t)+'</b>'+(it.k?'<span>'+esc(it.k)+'</span>':''));b.dataset.a=it.a;
 b.onclick=async()=>{if(playing)return;mark(it.a);await play(it.a);mark(null)};list.append(b)});
document.body.append(list,el('p','hint','소리를 듣고, 멈춘 동안 큰 소리로 따라 말해요. 카드를 누르면 하나씩 다시 들을 수 있어요.'));
go.onclick=async()=>{if(playing){stop=true;return}playing=true;stop=false;go.classList.add('on');go.textContent='■ 멈추기';
 for(const id of P.seq){if(stop)break;mark(id);const d=await play(id);await wait(Math.max(900,d*1000+450))}
 mark(null);playing=false;go.classList.remove('on');go.textContent='▶ 듣고 따라 말하기'};
