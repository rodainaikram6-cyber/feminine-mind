Me_rita, [11.08.2026 15:47]
const $ = s => document.querySelector(s);

const state = {
  route: location.hash.slice(1) || "home",

  articles: [
    {
      id: 1,
      title: "لماذا يصعب علينا قول «لا»؟",
      cat: "الحدود النفسية",
      free: true,
      date: "هذا الأسبوع",
      text: "عندما نربط قبول الآخرين لنا بمدى موافقتنا عليهم، تصبح الحدود صعبة. تعلمي أن تحمي احتياجاتك دون شعور بالذنب."
    },
    {
      id: 2,
      title: "عندما يصبح إرضاء الآخرين عادة",
      cat: "الوعي الذاتي",
      free: true,
      date: "هذا الأسبوع",
      text: "إرضاء الآخرين قد يمنح راحة قصيرة، لكنه قد يبعدك تدريجيًا عن احتياجاتك وقيمك وحدودك."
    },
    {
      id: 3,
      title: "الاحتواء الذي نحتاجه داخل العلاقة",
      cat: "التعافي العاطفي",
      free: false,
      date: "Premium",
      text: "الاحتواء العاطفي يساعد على بناء علاقة أكثر أمانًا، ويمنح المشاعر مساحة للفهم والتعبير."
    }
  ],

  affirmations: [
    "أستطيع أن أسمع احتياجاتي وأن أتعامل معها باحترام.",
    "قيمتي لا تتحدد بمدى قبول الآخرين لي.",
    "يمكنني أن أضع حدودًا واضحة دون أن أتخلى عن لطفِي.",
    "أمنح نفسي وقتًا ومساحة قبل اتخاذ القرار."
  ],

  tests: [
    {
      id: "selflove",
      title: "مؤشر حب الذات",
      desc: "تأمل قصير حول علاقتك بنفسك.",
      free: true,
      qs: [
        "أشعر أنني أستحق الحب والاحترام.",
        "أستطيع التعبير عن احتياجاتي بوضوح.",
        "أتعامل مع أخطائي بتعاطف بدل القسوة.",
        "أستطيع أن أقول لا عندما لا يناسبني الأمر.",
        "أمنح نفسي وقتًا للراحة دون شعور بالذنب."
      ]
    },
    {
      id: "boundaries",
      title: "مؤشر الحدود النفسية",
      desc: "أسئلة عملية حول قدرتك على وضع الحدود.",
      free: true,
      qs: [
        "أستطيع قول لا دون خوف مبالغ فيه من الرفض.",
        "أعرف متى أشعر أن حدودي قد تم تجاوزها.",
        "أعبّر عن انزعاجي بطريقة واضحة ومحترمة.",
        "لا أوافق دائمًا فقط حتى لا أغضب الآخرين.",
        "أشعر أن من حقي حماية وقتي وطاقتي."
      ]
    },
    {
      id: "attachment",
      title: "خريطة أنماط التعلق",
      desc: "تقييم تأملي أعمق لفهم نمط التعلق.",
      free: false,
      qs: [
        "أشعر بالقلق عندما يبتعد شخص مهم عني.",
        "أجد صعوبة في طلب الاحتياج العاطفي مباشرة.",
        "أخاف أحيانًا من الهجر أو الرفض.",
        "أحتاج إلى الطمأنة المتكررة داخل العلاقة.",
        "أستطيع الحفاظ على هويتي حتى داخل العلاقة."
      ]
    }
  ]
};

function save() {
  localStorage.setItem(
    "fm_state",
    JSON.stringify({
      articles: state.articles,
      affirmations: state.affirmations
    })
  );
}

function load() {
  try {
    const x = JSON.parse(localStorage.getItem("fm_state") || "null");

    if (x) {
      if (Array.isArray(x.articles)) state.articles = x.articles;
      if (Array.isArray(x.affirmations)) state.affirmations = x.affirmations;
    }
  } catch (e) {
    console.log("FM state load skipped");
  }
}

function toast(message) {
  const el = $("#toast");
  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  }, 2200);
}

function go(route) {
  state.route = route;
  location.hash = route;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nav() {
  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.onclick = () => go(btn.dataset.route);
  });
}

function layout(html) {
  $("#app").innerHTML = html;
  nav();

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.route === state.route
    );
  });
}

/* =========================
   HOME
========================= */

function home() {
  const affirmation =
    state.affirmations[
      new Date().getDate() % state.affirmations.length
    ];

  layout(`
    <section class="hero">
      <span class="eyebrow">Féminine Mind</span>

      <h1>مساحة آمنة للعودة إلى ذاتك</h1>

      <p>
        محتوى نفسي مبسط، وعي ذاتي، علاقات صحية،
        وتمارين عملية تساعدك على فهم نفسك والتعامل
        مع مشاعرك بوعي.
      </p>
    </section>

    <section class="daily card">
      <span class="pill">توكيد الصباح</span>

Me_rita, [11.08.2026 15:47]
<h3>امنحي نفسك وقتًا لفهم مشاعرك قبل اتخاذ القرار.</h3>

      <p class="quote">${affirmation}</p>

      <button class="primary" id="startToday">
        ابدئي تمرين اليوم
      </button>
    </section>

    <section class="banner">
      مساحة آمنة لفهم ذاتك وبناء علاقة أكثر لطفًا مع نفسك.
    </section>

    <div class="section-title">
      <h2>ماذا تريدين اليوم؟</h2>
    </div>

    <div class="grid">

      <button class="card action-card" data-go="chat">
        <span>💗</span>
        <strong>المحادثة</strong>
        <small>تحدثي مع Feminine Mind AI</small>
      </button>

      <button class="card action-card" data-go="library">
        <span>📚</span>
        <strong>المحتوى</strong>
        <small>مقالات وتمارين وتوكيدات</small>
      </button>

      <button class="card action-card" data-go="tests">
        <span>📝</span>
        <strong>الاختبارات</strong>
        <small>اكتشفي نفسك بوعي</small>
      </button>

      <button class="card action-card" data-go="profile">
        <span>👤</span>
        <strong>حسابي</strong>
        <small>مساحتك الشخصية</small>
      </button>

    </div>
  );

  $("#startToday")?.addEventListener("click", () => {
    go("tests");
  });

  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => {
      go(btn.dataset.go);
    });
  });
}

/* =========================
   CHAT
========================= */

function chat() {
  layout(
    <section class="section-title">
      <h2>Féminine Mind AI</h2>
      <p class="micro">
        مساحة حوار هادئة لفهم مشاعرك وأفكارك بوعي.
      </p>
    </section>

    <div class="chat-wrap">

      <div id="messages" class="messages">

        <div class="msg ai">
          مرحبًا بكِ في Féminine Mind 🌷
          <br>
          أنا هنا للاستماع إليكِ ومساعدتكِ على فهم
          مشاعركِ وأفكاركِ بطريقة آمنة وهادئة.
        </div>

      </div>

      <div class="composer">

        <textarea
          id="chatInput"
          placeholder="اكتبي ما يشغل بالك..."
          rows="3"
        ></textarea>

        <button class="send" id="send">
          إرسال
        </button>

      </div>

    </div>
  );

  $("#send")?.addEventListener("click", sendChat);

  $("#chatInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  });
}

function escapeHTML(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function addMessage(text, type) {
  const box = $("#messages");
  if (!box) return;

  const div = document.createElement("div");
  div.className = msg ${type}`;
  div.innerHTML = escapeHTML(text).replace(/\n/g, "<br>");

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function sendChat() {
  const input = $("#chatInput");
  const text = input?.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("جاري التفكير في رسالتكِ… 🌷", "ai");

  const messages = $("#messages");
  const lastAI = messages?.lastElementChild;

  try {

    const history = JSON.parse(
      localStorage.getItem("fm_chat_history") || "[]"
    );

    const response = await fetch(
      "/.netlify/functions/ai-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: history.slice(-8)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "حدث خطأ في الاتصال بالمساعد."
      );
    }

    const reply =
      data.reply ||
      data.message ||
      data.text ||
      "لم تصلني استجابة واضحة. حاولي مرة أخرى.";

    if (lastAI) {
      lastAI.innerHTML = escapeHTML(reply).replace(/\n/g, "<br>");
    }

    history.push(
      { role: "user", text },
      { role: "assistant", text: reply }
    );

Me_rita, [11.08.2026 15:47]
localStorage.setItem(
      "fm_chat_history",
      JSON.stringify(history.slice(-16))
    );

  } catch (error) {

    console.error(error);

    if (lastAI) {
      lastAI.textContent =
        "تعذر الاتصال بالمساعد الآن. تأكدي من اتصال الإنترنت ثم حاولي مرة أخرى.";
    }

  }
}

/* =========================
   LIBRARY
========================= */

function library() {

  layout(
    <div class="tabs">

      <button class="active" data-tab="articles">
        المقالات
      </button>

      <button data-tab="affirmations">
        التوكيدات
      </button>

      <button data-tab="exercises">
        تمارين
      </button>

    </div>

    <div id="libraryContent"></div>
  );

  const renderTab = tab => {

    const box = $("#libraryContent");

    if (tab === "affirmations") {

      box.innerHTML = 
        <div class="section-title">
          <h2>توكيداتك اليومية</h2>
        </div>

        ${state.affirmations.map((a, i) => 
          <div class="card affirmation-card">
            <span class="pill">توكيد ${i + 1}</span>
            <p class="quote">${a}</p>

            <button class="secondary copyAff" data-text="${escapeHTML(a)}">
              نسخ التوكيد
            </button>
          </div>
        ).join("")}
      ;

      document.querySelectorAll(".copyAff").forEach(btn => {
        btn.onclick = async () => {
          try {
            await navigator.clipboard.writeText(
              btn.dataset.text
            );
            toast("تم نسخ التوكيد 🌷");
          } catch {
            toast("يمكنك تحديد التوكيد ونسخه يدويًا.");
          }
        };
      });

      return;
    }

    if (tab === "exercises") {

      box.innerHTML = 
        <div class="section-title">
          <h2>تمارين العودة إلى الذات</h2>
          <p class="micro">
            اختاري تمرينًا يناسب احتياجك اليوم.
          </p>
        </div>

        <div class="card">
          <span class="pill">تمرين 01</span>
          <h3>توقفي واسألي نفسك</h3>
          <p>
            ماذا أشعر الآن؟ ماذا أحتاج؟ وما الشيء الصغير
            الذي يمكنني فعله لنفسي اليوم؟
          </p>
        </div>

        <div class="card">
          <span class="pill">تمرين 02</span>
          <h3>حدودي اليوم</h3>
          <p>
            اكتبي موقفًا وافقتِ فيه رغم أنكِ كنتِ تريدين الرفض،
            ثم اكتبي كيف كنتِ تتمنين التعبير عن حدك.
          </p>
        </div>

        <div class="card">
          <span class="pill">تمرين 03</span>
          <h3>رسالة إلى الذات</h3>
          <p>
            اكتبي لنفسك رسالة قصيرة كما لو كنتِ تتحدثين
            إلى امرأة تحبينها وتريدين دعمها.
          </p>
        </div>
      ;

      return;
    }

    box.innerHTML = 
      <div class="section-title">
        <h2>محتوى Féminine Mind</h2>
      </div>

      ${state.articles.map(article => 
        <article class="card article-card">

          <span class="pill">
            ${article.cat}
          </span>

          <h3>${article.title}</h3>

          <small>${article.date}</small>

          <p>${article.text}</p>

          <button
            class="primary readArticle"
            data-id="${article.id}"
          >
            قراءة
          </button>

        </article>
      ).join("")}
    ;

    document.querySelectorAll(".readArticle").forEach(btn => {
      btn.onclick = () => {
        const article = state.articles.find(
          x => x.id == btn.dataset.id
        );

        if (!article) return;

        layout(
          <button class="secondary" id="backLibrary">
            ← العودة إلى المحتوى
          </button>

          <article class="card article-full">

            <span class="pill">
              ${article.cat}
            </span>

            <h1>${article.title}</h1>

            <small>${article.date}</small>

            <p>${article.text}</p>

            <p>
              خذي وقتكِ في قراءة الفكرة، ثم اسألي نفسك:
              كيف تظهر هذه الفكرة في حياتي وعلاقاتي؟
            </p>

          </article>
        );

Me_rita, [11.08.2026 15:47]
$("#backLibrary").onclick = () => library();
      };
    });
  };

  document.querySelectorAll("[data-tab]").forEach(btn => {
    btn.onclick = () => {

      document
        .querySelectorAll("[data-tab]")
        .forEach(x => x.classList.remove("active"));

      btn.classList.add("active");

      renderTab(btn.dataset.tab);
    };
  });

  renderTab("articles");
}

/* =========================
   TESTS
========================= */

let testIndex = 0;
let testScore = 0;
let currentTest = null;

function tests() {

  layout(
    <div class="section-title">
      <h2>الاختبارات النفسية التأملية</h2>

      <p class="micro">
        اختبارات للتأمل وفهم الذات، وليست تشخيصًا طبيًا.
      </p>
    </div>

    <div class="test-list">

      ${state.tests.map(test => 
        <div class="card test-card">

          <span class="pill">
            ${test.free ? "مجاني" : "Premium"}
          </span>

          <h3>${test.title}</h3>

          <p>${test.desc}</p>

          <button
            class="primary startTest"
            data-id="${test.id}"
          >
            ${test.free ? "ابدئي الاختبار" : "Premium 🔒"}
          </button>

        </div>
      ).join("")}

    </div>
  );

  document.querySelectorAll(".startTest").forEach(btn => {

    btn.onclick = () => {

      const test = state.tests.find(
        x => x.id === btn.dataset.id
      );

      if (!test) return;

      if (!test.free) {
        toast("هذا الاختبار متاح في Premium 🌷");
        return;
      }

      startTest(test.id);
    };

  });
}

function startTest(id) {

  currentTest = state.tests.find(x => x.id === id);

  if (!currentTest) return;

  testIndex = 0;
  testScore = 0;

  showQuestion();
}

function showQuestion() {

  const q = currentTest.qs[testIndex];

  const progress =
    ((testIndex) / currentTest.qs.length) * 100;

  layout(
    <button class="secondary" id="backTests">
      ← الاختبارات
    </button>

    <div class="test-card card">

      <span class="pill">
        السؤال ${testIndex + 1} من ${currentTest.qs.length}
      </span>

      <div class="progress">
        <i style="width:${progress}%"></i>
      </div>

      <h2>${q}</h2>

      <div class="answers">

        <button data-score="0">أبدًا</button>
        <button data-score="1">أحيانًا</button>
        <button data-score="2">غالبًا</button>
        <button data-score="3">دائمًا</button>

      </div>

    </div>
  );

  $("#backTests").onclick = () => tests();

  document.querySelectorAll("[data-score]").forEach(btn => {

    btn.onclick = () => {
      answer(Number(btn.dataset.score));
    };

  });
}

function answer(value) {

  testScore += value;
  testIndex++;

  if (testIndex < currentTest.qs.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {

  const max = currentTest.qs.length * 3;

  const percentage = Math.round(
    (testScore / max) * 100
  );

  let message;

  if (percentage < 35) {
    message =
      "قد تكون علاقتك بنفسك بحاجة إلى مزيد من اللطف والاهتمام.";
  } else if (percentage < 70) {
    message =
      "لديكِ جوانب جيدة، وهناك مساحة جميلة لمزيد من الوعي والنمو.";
  } else {
    message =
      "لديكِ مؤشرات جيدة على علاقة أكثر دعمًا واحترامًا مع ذاتك.";
  }

  layout(
    <div class="card result">

      <span class="pill">
        النتيجة
      </span>

      <h1>${percentage}%</h1>

      <h2>${currentTest.title}</h2>

      <p>${message}</p>

      <p class="micro">
        هذه النتيجة للتأمل والوعي الذاتي وليست تشخيصًا نفسيًا.
      </p>

      <button class="primary" id="againTest">
        إعادة الاختبار
      </button>

      <button class="secondary" id="backTestList">
        العودة إلى الاختبارات
      </button>

    </div>
  );

  $("#againTest").onclick = () => {
    startTest(currentTest.id);
  };

  $("#backTestList").onclick = () => {
    tests();
  };
}

/* =========================
   PROFILE
========================= */

function profile() {

Me_rita, [11.08.2026 15:47]
layout(
    <div class="section-title">
      <h2>مساحتي الشخصية</h2>
      <p class="micro">
        مكانك الخاص لمتابعة رحلتك مع ذاتك.
      </p>
    </div>

    <div class="card">

      <span class="pill">حسابي</span>

      <h3>مرحبًا بكِ في مساحتكِ 🌷</h3>

      <p>
        يمكنك العودة إلى الاختبارات والمحتوى والمحادثة
        في أي وقت.
      </p>

      <button class="primary" id="profileTests">
        اختباراتي
      </button>

      <button class="secondary" id="profileChat">
        محادثة Feminine Mind AI
      </button>

    </div>

    <div class="card">

      <h3>الخصوصية</h3>

      <p class="micro">
        البيانات المحلية التي تحفظها المنصة في هذا المتصفح
        تبقى في مساحة التخزين المحلية للجهاز.
      </p>

      <button class="secondary" id="clearChat">
        مسح سجل المحادثة
      </button>

    </div>
  );

  $("#profileTests").onclick = () => go("tests");

  $("#profileChat").onclick = () => go("chat");

  $("#clearChat").onclick = () => {

    localStorage.removeItem("fm_chat_history");

    toast("تم مسح سجل المحادثة.");

  };
}

/* =========================
   RENDER
========================= */

function render() {

  const pages = {
    home,
    chat,
    library,
    tests,
    profile
  };

  const page = pages[state.route] || home;

  page();
}

/* =========================
   THEME
========================= */

function toggleTheme() {

  document.body.classList.toggle("dark");

  const isDark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "fm_dark",
    isDark ? "true" : "false"
  );

  toast(
    isDark
      ? "تم تفعيل الوضع الليلي 🌙"
      : "تم تفعيل الوضع النهاري ☀️"
  );
}

/* =========================
   START
========================= */

load();

if (localStorage.getItem("fm_dark") === "true") {
  document.body.classList.add("dark");
}

window.addEventListener("hashchange", () => {

  state.route =
    location.hash.slice(1) || "home";

  render();

});

$("#themeBtn")?.addEventListener(
  "click",
  toggleTheme
);

render();
