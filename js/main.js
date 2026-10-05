const NUM="5551998475083",MSG="Olá! Vim pelo site da Clínica Bergmann e gostaria de agendar uma avaliação. Poderiam me orientar?";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const track=(n,p={})=>{try{(window.dataLayer=window.dataLayer||[]).push({event:n,...p})}catch(e){}};
$$("[data-wa]").forEach(a=>{const t=a.dataset.t;const m=t?MSG.replace("uma avaliação","uma avaliação sobre: "+t):MSG;
a.href="https://wa.me/"+NUM+"?text="+encodeURIComponent(m);a.target="_blank";a.rel="noopener noreferrer";
a.addEventListener("click",()=>track(a.dataset.wa,t?{treatment:t}:{}))});
$("#route").addEventListener("click",()=>track("route_click"));
$("#ano").textContent=new Date().getFullYear();
// header
const hd=$("header.top"),sc=()=>hd.classList.toggle("scrolled",scrollY>12);addEventListener("scroll",sc,{passive:true});sc();
// menu
const bg=$(".burger"),mn=$("#menu");
const setMenu=o=>{bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Fechar menu":"Abrir menu");mn.classList.toggle("open",o);document.body.classList.toggle("lock",o&&innerWidth<960)};
bg.addEventListener("click",()=>setMenu(bg.getAttribute("aria-expanded")!=="true"));
mn.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&mn.classList.contains("open")){setMenu(false);bg.focus()}
if(e.key==="Tab"&&mn.classList.contains("open")&&innerWidth<960){const f=[bg,...$$("a",mn)],i=f.indexOf(document.activeElement);
if(e.shiftKey&&i<=0){e.preventDefault();f.at(-1).focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
matchMedia("(min-width:960px)").addEventListener("change",e=>e.matches&&setMenu(false));
// tabs (setas, Home, End)
const tabs=$$('[role=tab]');
const sel=t=>{tabs.forEach(b=>{const on=b===t;b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;$("#"+b.getAttribute("aria-controls")).hidden=!on});track("tab_select",{tab:t.textContent})};
tabs.forEach((t,i)=>{t.addEventListener("click",()=>sel(t));t.addEventListener("keydown",e=>{
const k={ArrowRight:i+1,ArrowLeft:i-1,Home:0,End:tabs.length-1}[e.key];if(k===undefined)return;e.preventDefault();const n=tabs[(k+tabs.length)%tabs.length];n.focus();sel(n)})});
// FAQ
const faq=[
["Como agendar uma avaliação?","Clique em qualquer botão de WhatsApp da página. A conversa abre com uma mensagem pronta e a equipe orienta o agendamento."],
["Onde fica a Clínica Bergmann?","R. Tobias da Silva, 253 - sala 305, Moinhos de Vento, Porto Alegre - RS. Instruções de acesso e estacionamento serão confirmadas pela clínica."],
["Quais são os horários de atendimento?","Horário publicado: segunda a sexta, das 8h às 20h, e sábado, das 9h às 15h. A reconfirmar antes da publicação."],
["A clínica trabalha com convênios ou reembolso?","[A preencher somente após validação da clínica.]"],
["Como funciona a primeira avaliação?","[A preencher com o fluxo real, aprovado pelo profissional responsável.]"],
["Quais tratamentos estão disponíveis?","Veja a seção Especialidades desta página ou pergunte à equipe pelo WhatsApp."]];
const fl=$("#faqlist");
faq.forEach(([q,a],i)=>{const d=document.createElement("div");d.className="it";
d.innerHTML=`<h3><button id="fq${i}" aria-expanded="false" aria-controls="fp${i}">${q}</button></h3><div class="pn" id="fp${i}" role="region" aria-labelledby="fq${i}"><div><p>${a}</p></div></div>`;fl.appendChild(d)});
fl.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const o=b.getAttribute("aria-expanded")==="true";
b.setAttribute("aria-expanded",!o);$("#"+b.getAttribute("aria-controls")).classList.toggle("open",!o)});
// mapa sob demanda
$("#loadmap").addEventListener("click",()=>{$("#map").innerHTML='<iframe title="Mapa: Clínica Bergmann, Moinhos de Vento" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=R.+Tobias+da+Silva,+253,+Porto+Alegre,+RS&output=embed"></iframe>'});
// entrada suave só em blocos decorativos
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion:reduce)").matches){document.body.classList.add("reveal-on");
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.1});$$(".rv").forEach(el=>io.observe(el))}
// scroll depth
[50,90].forEach(p=>{let d=false;addEventListener("scroll",()=>{if(!d&&(scrollY+innerHeight)/document.documentElement.scrollHeight*100>=p){d=true;track("scroll_"+p)}},{passive:true})});
