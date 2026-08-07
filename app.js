const $=s=>document.querySelector(s);
const state={
 route:location.hash.slice(1)||'home',
 articles:[
  {id:1,title:"لماذا يصعب علينا قول «لا»؟",cat:"الحدود النفسية",free:true,date:"هذا الأسبوع",text:"عندما نربط قبول الآخرين بقيمتنا، قد يصبح وضع الحدود مصدراً للذنب. البداية ليست بالقسوة، بل بملاحظة احتياجاتك والتعبير عنها بوضوح واحترام."},
  {id:2,title:"عندما يصبح إرضاء الآخرين عادة",cat:"الوعي الذاتي",free:true,date:"هذا الأسبوع",text:"إرضاء الآخرين قد يمنح راحة قصيرة، لكنه قد يبعدك عن احتياجاتك. لاحظي متى تقولين نعم بينما تريدين التمهل، ثم جربي جملة واضحة ومحترمة."},
  {id:3,title:"الاحتواء الذاتي بعد موقف عاطفي صعب",cat:"التعافي النفسي",free:false,date:"Premium",text:"مسار تأملي أعمق لفهم المشاعر، تهدئة الاستجابة الانفعالية، وبناء خطوات عملية للعناية بالذات."}
 ],
 affirmations:[
  "أستطيع أن أسمع احتياجاتي وأن أتعامل معها باحترام.",
  "قيمتي لا تتحدد بقبول الآخرين لي.",
  "يمكنني أن أضع حدوداً واضحة دون أن أتخلى عن التعاطف.",
  "أمنح نفسي وقتاً لفهم مشاعري قبل اتخاذ القرار."
 ],
 tests:[
  {id:"selflove",title:"مؤشر حب الذات",desc:"تأمل قصير حول علاقتك بنفسك.",free:true,qs:["أستطيع التعبير عن احتياجاتي دون شعور دائم بالذنب.","أتحدث مع نفسي بلطف عندما أخطئ.","أسمح لنفسي بالراحة دون اعتبارها فشلاً.","أعرف ما أحتاجه في المواقف العاطفية."]},
  {id:"boundaries",title:"مؤشر الحدود النفسية",desc:"أسئلة عملية حول قول نعم ولا.",free:true,qs:["أستطيع قول لا عندما لا يناسبني الأمر.","أطلب وقتاً للتفكير قبل الموافقة على طلب مهم.","أميز بين التعاطف وتحمل مسؤولية مشاعر الآخرين.","أستطيع توضيح ما أقبله وما لا أقبله."]},
  {id:"attachment",title:"خريطة أنماط التعلق",desc:"تقييم تأملي أعمق.",free:false,qs:["أشعر بقلق واضح عندما يقل التواصل مع شخص مهم.","أحتاج إلى تطمين متكرر كي أشعر بالأمان.","أجد صعوبة في طلب احتياجاتي مباشرة.","أميل إلى تفسير المسافة العاطفية كرفض شخصي."]}
 ]
};

function save(){localStorage.setItem("fm_state",JSON.stringify({articles:state.articles,affirmations:state.affirmations}));}
function load(){try{const x=JSON.parse(localStorage.getItem("fm_state"));if(x){state.articles=x.articles||state.articles;state.affirmations=x.affirmations||state.affirmations}}catch{}}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
function go(r){state.route=r;location.hash=r;render()}
function nav(){document.querySelectorAll(".bottom-nav button").forEach(b=>b.onclick=()=>go(b.dataset.route));}
function layout(html){$("#app").innerHTML=html;nav();document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.route===state.route))}
function home(){
 const a=state.affirmations[new Date().getDate()%state.affirmations.length];
 layout(`<section class="hero"><span class="eyebrow">Féminine Mind®</span><h1>مساحة آمنة للعودة إلى ذاتك</h1><p>محتوى نفسي مبسط، وعي ذاتي، علاقات صحية، وتمارين عملية تساعدك على فهم نفسك والتعامل مع مشاعرك بوعي.</p></section>
 <section class="daily"><span class="pill">توكيد الصباح</span><p class="quote">${a}</p><div class="micro">سلوك اليوم: توقفي دقيقة قبل الاستجابة لأي طلب واسألي نفسك: هل أوافق لأنني أريده أم خوفاً من الرفض؟</div><button class="btn full" onclick="go('library')">ابدئي تمرين اليوم</button></section>
 <div class="banner">مساحة إعلانية خفيفة — يمكن استخدامها لاحقاً للإعلانات والتسويق بالعمولة</div>
 <div class="section-title"><h2>ماذا تريدين اليوم؟</h2></div><div class="grid">
 ${[['chat','محادثة واعية','تحدثي مع المساعد'],['library','مقالات وتمارين','محتوى أسبوعي ويومي'],['tests','اختبارات','مجانية وPremium'],['profile','الجلسات والدورات','معكِ لاحقاً']].map(x=>`<button class="card" onclick="go('${x[0]}')" style="text-align:right;border:1px solid var(--line)"><span class="pill">${x[0]==='tests'?'🧠':'🌷'}</span><h3>${x[1]}</h3><p>${x[2]}</p></button>`).join('')}</div>`)
}
function chat(){
 layout(`<div class="chat-wrap"><div id="messages" class="messages"><div class="msg ai">مرحباً بكِ في Féminine Mind 🤍<br>أنا مساعد توعوي مبني على مبادئ نفسية مبسطة. يمكنني مساعدتك في فهم المشاعر، الحدود، حب الذات والعلاقات. لست بديلاً عن المختص النفسي، ولا أقدّم تشخيصاً.</div></div>
 <div class="composer"><textarea id="chatInput" placeholder="اكتبي ما يشغل بالك..."></textarea><button class="send" id="send">➤</button></div></div>`);
 $("#send").onclick=sendChat;
 $("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat()}});
}
function aiReply(text){
 const t=text.toLowerCase();
 if(/حدود|لا\b|رفض|إرضاء/.test(t)) return "قد يكون من المفيد أن نميّز بين التعاطف وبين التخلي عن احتياجاتك. وضع الحد لا يعني رفض الشخص؛ يعني توضيح ما تستطيعين قبوله وما لا تستطيعين. جرّبي أن تسألي نفسك: ما الشيء الذي أوافق عليه الآن فقط لأنني أخشى ردة فعل الآخر؟";
 if(/زوج|زوجي|علاقة|حب|شريك/.test(t)) return "في العلاقات، من المهم النظر إلى النمط المتكرر لا إلى موقف واحد فقط. لاحظي: هل تستطيعين التعبير عن احتياجاتك؟ هل يوجد احترام متبادل للحدود؟ وهل يمكنكما إصلاح الخلاف بعد حدوثه؟ إذا كان هناك خوف أو تهديد أو إساءة، فالأولوية للأمان وطلب دعم مهني مناسب.";
 if(/حزن|بكاء|مؤلم|ألم/.test(t)) return "مشاعرك تستحق أن تُفهم قبل أن تحاولي تغييرها. خذي نفساً هادئاً، سمّي الشعور بكلمة بسيطة، ثم اسألي: ما الذي أحتاج إليه الآن؟ إذا استمر الضيق أو أثّر بقوة في حياتك، فالتحدث مع مختص نفسي قد يكون خطوة داعمة.";
 return "أفهم أن هذا الموضوع مهم لكِ. لنبدأ من نقطة بسيطة: ما الموقف المحدد الذي حدث؟ وما الشعور الذي ظهر لديكِ؟ ثم يمكننا فصل الحدث عن التفسير والاحتياج، والبحث عن خطوة عملية صغيرة تناسبك.";
}
async function sendChat(){const input=$("#chatInput"),text=input.value.trim();if(!text)return;const box=$("#messages");box.innerHTML+=`<div class="msg user">${esc(text)}</div>`;input.value="";const thinking=document.createElement("div");thinking.className="msg ai";thinking.textContent="أفكر معكِ...";box.appendChild(thinking);box.scrollTop=box.scrollHeight;
 try{const r=await fetch("/.netlify/functions/ai-chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history:[]})});const d=await r.json();if(!r.ok||!d.text)throw new Error(d.error||"AI unavailable");thinking.textContent=d.text}catch(e){thinking.textContent=aiReply(text)+"\\n\\nملاحظة: المساعد السحابي لم يُربط بعد؛ هذا رد تجريبي محلي."}box.scrollTop=box.scrollHeight}
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function library(){
 layout(`<div class="tabs"><button class="active">الأحدث</button><button>توكيدات</button><button>تمارين</button><button>مقالات</button></div><div class="section-title"><h2>محتوى Féminine Mind</h2></div><div class="list">${state.articles.map(a=>`<article class="card article ${!a.free?'lock':''}"><span class="pill">${a.cat}</span><div class="meta">${a.date}</div><h3>${a.title}</h3><p>${a.text}</p><button class="btn secondary" onclick="${a.free?`toast('تم فتح المقال')`:`toast('هذا المحتوى مخصص لـ Premium لاحقاً')`}">${a.free?'قراءة':'فتح المحتوى'}</button></article>`).join('')}</div>
 <div class="section-title"><h2>تمرين اليوم</h2></div><div class="card"><span class="pill">عملي</span><h3>وقفة الاحتياج</h3><p>اكتبي ثلاثة أشياء تحتاجينها اليوم، ثم اختاري واحداً منها وحددي خطوة صغيرة واقعية لتلبيته.</p></div>
 <div class="section-title"><h2>توكيد الصباح</h2></div><div class="daily"><p class="quote">${state.affirmations[new Date().getDate()%state.affirmations.length]}</p></div>`)
}
let testIndex=0,testScore=0,currentTest=null;
function tests(){
 layout(`<div class="section-title"><h2>الاختبارات النفسية التأملية</h2></div><p class="micro">هذه الأدوات للتثقيف والتأمل الذاتي وليست تشخيصاً نفسياً أو بديلاً عن التقييم المهني.</p><div class="list">${state.tests.map(t=>`<div class="card ${!t.free?'lock':''}"><span class="pill">${t.free?'مجاني':'Premium'}</span><h3>${t.title}</h3><p>${t.desc}</p><button class="btn full" onclick="${t.free?`startTest('${t.id}')`:`toast('هذا التقييم العميق سيكون ضمن Premium عند تفعيله')`}">${t.free?'ابدئي الاختبار':'فتح Premium'}</button></div>`).join('')}</div>`)
}
function startTest(id){currentTest=state.tests.find(x=>x.id===id);testIndex=0;testScore=0;showQuestion()}
function showQuestion(){
 const q=currentTest.qs[testIndex],pct=(testIndex/currentTest.qs.length)*100;
 layout(`<div class="test-card card"><div class="progress"><i style="width:${pct}%"></i></div><p class="micro">السؤال ${testIndex+1} من ${currentTest.qs.length}</p><div class="question">${q}</div><div class="answers">${[1,2,3,4,5].map(v=>`<button onclick="answer(${v})">${v} — ${['أبداً','نادراً','أحياناً','غالباً','دائماً'][v-1]}</button>`).join('')}</div></div>`)
}
function answer(v){testScore+=v;if(++testIndex<currentTest.qs.length)showQuestion();else{const avg=testScore/currentTest.qs.length;let msg=avg<2.5?'يبدو أن هذا الجانب يحتاج إلى مزيد من الوعي والاحتواء.':avg<3.8?'لديكِ نقاط قوة واضحة مع بعض الجوانب التي يمكن تطويرها.':'لديكِ مؤشرات جيدة في هذا الجانب. حافظي على الممارسات التي تدعمكِ.';layout(`<div class="card"><span class="pill">النتيجة</span><h2>${currentTest.title}</h2><p>${msg}</p><p class="micro">النتيجة رقمية لأغراض التأمل فقط وليست حكماً سريرياً.</p><button class="btn full" onclick="go('tests')">العودة للاختبارات</button></div>`)}} 
function profile(){layout(`<div class="hero"><span class="eyebrow">حسابك</span><h1>مساحتك الخاصة</h1><p>هذه النسخة تبدأ بدون اشتراك إلزامي. الحسابات وقاعدة البيانات الآمنة يمكن ربطها في مرحلة النشر.</p></div><div class="grid"><div class="card"><span class="pill">Premium</span><h3>المحتوى المتقدم</h3><p>هيكل جاهز لفتح مسارات وتقييمات أعمق عند إطلاق الاشتراك.</p></div><div class="card"><span class="pill">جلسات</span><h3>الحجز مع المؤسسة</h3><p>قسم مخصص لاحقاً لعرض خدمات الكوتشينج والاستشارات وروابط الحجز.</p></div></div><div class="section-title"><h2>إعدادات</h2></div><div class="card"><button class="btn secondary" onclick="toggleTheme()">تبديل المظهر</button><button class="btn secondary" onclick="location.href='admin.html'">لوحة الإدارة</button></div>`) }
function toggleTheme(){document.body.classList.toggle('dark');localStorage.setItem('fm_dark',document.body.classList.contains('dark'))}
function render(){({home,chat,library,tests,profile}[state.route]||home)()}
load();if(localStorage.getItem('fm_dark')==='true')document.body.classList.add('dark');$("#themeBtn").onclick=toggleTheme;window.addEventListener('hashchange',()=>{state.route=location.hash.slice(1)||'home';render()});render();
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
