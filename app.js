const $ = s => document.querySelector(s);

const DAILY_AFFIRMATIONS = [
  "أستحق الحب والاحترام كما أنا.",
  "أمنح نفسي اللطف الذي أحتاجه اليوم.",
  "أثق بحدسي وأحترم مشاعري.",
  "من حقي أن أضع حدودًا صحية.",
  "أنا كافية كما أنا.",
  "أستحق الراحة دون شعور بالذنب.",
  "أختار أن أعتني بنفسي بحب.",
  "مشاعري مهمة وتستحق الإصغاء.",
  "أتقبل نفسي وأمنحها الأمان.",
  "أستطيع أن أقول لا عندما أحتاج لذلك.",
  "كل يوم أقترب أكثر من ذاتي الحقيقية.",
  "أختار العلاقات التي تحترمني.",
  "أسمح لنفسي بالنمو بهدوء.",
  "أنا جديرة بالدعم والاحتواء.",
  "جسدي يستحق الاحترام والعناية.",
  "أتحرر من الحاجة لإرضاء الجميع.",
  "أمنح نفسي وقتًا للتعافي.",
  "أثق بقدرتي على التغيير.",
  "أنا قوية ولطيفة في الوقت نفسه.",
  "أعيش يومي بوعي وهدوء.",
  "أسمح لنفسي بالفرح.",
  "أختار الأفكار التي تدعمني.",
  "أحترم احتياجاتي اليومية.",
  "أنا آمنة في علاقتي مع نفسي.",
  "أستحق السعادة والطمأنينة.",
  "كل خطوة صغيرة لها قيمة.",
  "أتعلم أن أحب نفسي أكثر.",
  "أحتفل بتقدمي مهما كان بسيطًا.",
  "أختار السلام الداخلي.",
  "أنا أستحق حياة متوازنة."
];

const DAILY_EXERCISES = [
  {
    title: "توقفي واسألي نفسك",
    text: "خذي دقيقة هادئة واسألي نفسك: ماذا أشعر الآن؟ ماذا أحتاج؟ وما الشيء الصغير الذي يمكنني فعله لنفسي اليوم؟"
  },
  {
    title: "حدودي اليوم",
    text: "اكتبي موقفًا وافقتِ فيه رغم أنكِ كنتِ تريدين الرفض، ثم اكتبي كيف كنتِ تتمنين التعبير عن حدك."
  },
  {
    title: "رسالة إلى الذات",
    text: "اكتبي لنفسك رسالة قصيرة كما لو كنتِ تتحدثين إلى امرأة تحبينها وتريدين دعمها."
  },
  {
    title: "ثلاثة أشياء أقدرها في نفسي",
    text: "اكتبي ثلاثة أشياء تقدّرينها في شخصيتك أو جهودك، حتى لو بدت صغيرة."
  },
  {
    title: "التنفس الواعي",
    text: "اجلسي بهدوء لدقيقتين. خذي شهيقًا هادئًا وزفيرًا أطول قليلًا، ولاحظي ما يحدث في جسدك دون حكم."
  },
  {
    title: "ماذا أحتاج؟",
    text: "اكتبي احتياجًا عاطفيًا أو جسديًا لديك اليوم، ثم حددي خطوة واقعية صغيرة للاستجابة له."
  },
  {
    title: "الحديث الداخلي",
    text: "لاحظي جملة قاسية قلتِها لنفسك اليوم، ثم أعيدي صياغتها بطريقة أكثر لطفًا وواقعية."
  },
  {
    title: "راحة بلا ذنب",
    text: "خصصي 15 دقيقة للراحة دون إنتاج أو إنجاز، وراقبي أي شعور بالذنب يظهر."
  },
  {
    title: "موقف أستطيع أن أقول فيه لا",
    text: "فكري في طلب أو موقف لا يناسبك. اكتبي جملة قصيرة ومحترمة يمكنك استخدامها لقول لا."
  },
  {
    title: "ما الذي يمنحني الأمان؟",
    text: "اكتبي ثلاثة أشخاص أو أماكن أو عادات تساعدك على الشعور بالأمان والهدوء."
  },
  {
    title: "إنجاز صغير",
    text: "اكتبي إنجازًا صغيرًا حققته مؤخرًا بدل التركيز فقط على الأشياء التي لم تفعليها."
  },
  {
    title: "مقارنة أقل",
    text: "لاحظي مقارنة واحدة أجريتها اليوم، ثم اكتبي ما الذي تحتاجين إليه بدل مقارنة نفسك بالآخرين."
  },
  {
    title: "العلاقة مع الجسد",
    text: "اختاري شيئًا واحدًا تشكرين جسدك عليه اليوم، بعيدًا عن الشكل والمظهر."
  },
  {
    title: "مشاعري لها معنى",
    text: "اختاري شعورًا ظهر لديك اليوم واسألي: ما الرسالة أو الاحتياج الذي قد يكون خلفه؟"
  },
  {
    title: "ما الذي أريد حمايته؟",
    text: "اكتبي شيئًا مهمًا في حياتك يحتاج إلى حدود أو حماية أو وقت أكبر."
  },
  {
    title: "اختيار واعٍ",
    text: "قبل اتخاذ قرار اليوم، توقفي قليلًا واسألي: هل أختار هذا من رغبة حقيقية أم من الخوف؟"
  },
  {
    title: "طفلتي الداخلية",
    text: "تخيلي نفسك في عمر صغير واسألي: ما الكلمة التي كنت أتمنى سماعها؟ ثم قوليها لنفسك الآن."
  },
  {
    title: "الامتنان الواقعي",
    text: "اكتبي ثلاثة أشياء جيدة حدثت اليوم، حتى لو كانت بسيطة جدًا."
  },
  {
    title: "علاقتي بالرفض",
    text: "اكتبي ماذا يعني لك رفض شخص لطلبك. ثم اسألي: هل رفض الطلب يعني رفض قيمتي؟"
  },
  {
    title: "مساحتي الخاصة",
    text: "خصصي اليوم مساحة قصيرة تكون لك وحدك، بلا تبرير وبلا شعور بالذنب."
  },
  {
    title: "قيمة لا تعتمد على الإنجاز",
    text: "اكتبي ثلاث صفات جميلة فيك لا علاقة لها بالعمل أو الإنجاز أو إرضاء الآخرين."
  },
  {
    title: "طلب الدعم",
    text: "حددي شيئًا واحدًا لا تحتاجين إلى تحمله وحدك، وفكري في شخص آمن يمكنك طلب الدعم منه."
  },
  {
    title: "إشارة من الجسد",
    text: "لاحظي أين يظهر التوتر في جسدك اليوم. لا تحاولي تغييره فورًا؛ فقط لاحظيه وتنفسّي بهدوء."
  },
  {
    title: "علاقة صحية",
    text: "اكتبي صفة واحدة تريدين وجودها في علاقاتك، وصفة واحدة تريدين أن تمنحيها للآخرين."
  },
  {
    title: "التوقف قبل الموافقة",
    text: "طبقي اليوم قاعدة بسيطة: لا تجيبي فورًا على طلب مهم. امنحي نفسك وقتًا للتفكير."
  },
  {
    title: "التخلي عن المثالية",
    text: "اختاري شيئًا لا يحتاج إلى الكمال اليوم، واسمحي لنفسك بإنجازه بطريقة كافية."
  },
  {
    title: "شيء يسعدني",
    text: "افعلي شيئًا صغيرًا يمنحك المتعة دون أن يكون الهدف منه إرضاء شخص آخر."
  },
  {
    title: "ماذا أريد فعلًا؟",
    text: "اكتبي رغبة حقيقية لديك، ثم اسألي نفسك ما الخطوة الصغيرة التي تقربك منها."
  },
  {
    title: "أنا أتعلم",
    text: "اكتبي شيئًا أخطأتِ فيه سابقًا، ثم اكتبي ما تعلمته منه بدل معاقبة نفسك عليه."
  },
  {
    title: "إغلاق اليوم",
    text: "قبل النوم، اكتبي: ماذا شعرت؟ ماذا تعلمت؟ وما الشيء الذي أريد أن أتركه لليوم التالي؟"
  },
  {
    title: "نية الغد",
    text: "اكتبي نية بسيطة ليومك القادم: كيف تريدين أن تعاملي نفسك؟ وكيف تريدين أن تحمي طاقتك؟"
  }
];

const state = {
  route: location.hash.slice(1) || "home",

  articles: [
    {
      id: 1,
      title: "لماذا يصعب علينا قول «لا»؟",
      cat: "الحدود النفسية",
      free: true,
      date: "هذا الأسبوع",
      text: "عندما نربط قبول الآخرين بقيمتنا، قد يصبح وضع الحدود مصدراً للذنب. البداية ليست بالقسوة، بل بملاحظة احتياجاتك والتعبير عنها بوضوح واحترام."
    },
    {
      id: 2,
      title: "عندما يصبح إرضاء الآخرين عادة",
      cat: "الوعي الذاتي",
      free: true,
      date: "هذا الأسبوع",
      text: "إرضاء الآخرين قد يمنح راحة قصيرة، لكنه قد يبعدك عن احتياجاتك. لاحظي متى تقولين نعم بينما تريدين التمهل، ثم جربي جملة واضحة ومحترمة."
    },
    {
      id: 3,
      title: "الاحتواء الذاتي بعد موقف عاطفي صعب",
      cat: "التعافي النفسي",
      free: false,
      date: "Premium",
      text: "مسار تأملي أعمق لفهم المشاعر، تهدئة الاستجابة الانفعالية، وبناء خطوات عملية للعناية بالذات."
    }
  ],

  affirmations: [...DAILY_AFFIRMATIONS],

  tests: [
    {
      id: "selflove",
      title: "مؤشر حب الذات",
      desc: "تأمل قصير حول علاقتك بنفسك.",
      free: true,
      qs: [
        "أستطيع التعبير عن احتياجاتي دون شعور دائم بالذنب.",
        "أتحدث مع نفسي بلطف عندما أخطئ.",
        "أسمح لنفسي بالراحة دون اعتبارها فشلاً.",
        "أعرف ما أحتاجه في المواقف العاطفية."
      ]
    },
    {
      id: "boundaries",
      title: "مؤشر الحدود النفسية",
      desc: "أسئلة عملية حول قول نعم ولا.",
      free: true,
      qs: [
        "أستطيع قول لا عندما لا يناسبني الأمر.",
        "أطلب وقتاً للتفكير قبل الموافقة على طلب مهم.",
        "أميز بين التعاطف وتحمل مسؤولية مشاعر الآخرين.",
        "أستطيع توضيح ما أقبله وما لا أقبله."
      ]
    },
    {
      id: "attachment",
      title: "خريطة أنماط التعلق",
      desc: "تقييم تأملي أعمق لفهم بعض أنماطك داخل العلاقات.",
      free: false,
      qs: [
        "أشعر بقلق واضح عندما يقل التواصل مع شخص مهم.",
        "أحتاج إلى تطمين متكرر كي أشعر بالأمان.",
        "أجد صعوبة في طلب احتياجاتي مباشرة.",
        "أميل إلى تفسير المسافة العاطفية كرفض شخصي."
      ]
    }
  ]
};

function isAdmin() {
  return sessionStorage.getItem("fm_admin") === "1";
}

function getDayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) % 30;
}

function getDailyAffirmation() {
  return DAILY_AFFIRMATIONS[getDayIndex()];
}

function getDailyExercise() {
  return DAILY_EXERCISES[getDayIndex()];
}

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

    if (!x) return;

    if (Array.isArray(x.articles) && x.articles.length) {
      state.articles = x.articles;
    }

    /*
      لا نستبدل قائمة الـ30 الجديدة ببيانات قديمة
      تحتوي فقط على 4 توكيدات من النسخة السابقة.
    */
    if (
      Array.isArray(x.affirmations) &&
      x.affirmations.length >= 30
    ) {
      state.affirmations = x.affirmations;
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
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function nav() {
  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.onclick = () => go(btn.dataset.route);
  });
}

function layout(html) {
  $("#app").innerHTML = html;

  nav();

  document
    .querySelectorAll(".bottom-nav button")
    .forEach(btn => {
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
  const affirmation = getDailyAffirmation();
  const exercise = getDailyExercise();

  layout(`
    <section class="hero">
      <span class="eyebrow">Féminine Mind®</span>

      <h1>مساحة آمنة للعودة إلى ذاتك</h1>

      <p>
        محتوى نفسي مبسط، وعي ذاتي، علاقات صحية،
        وتمارين عملية تساعدك على فهم نفسك والتعامل
        مع مشاعرك بوعي.
      </p>
    </section>

    <section class="daily card">

      <span class="pill">توكيد الصباح · اليوم ${getDayIndex() + 1}</span>

      <p class="quote">
        ${escapeHTML(affirmation)}
      </p>

      <div class="micro">
        ${escapeHTML(exercise.title)}
      </div>

      <button class="btn full" id="startToday">
        ابدئي تمرين اليوم
      </button>

    </section>

    <section class="banner">
      ${isAdmin()
        ? "وضع الأدمن التجريبي مفعل — يمكنك معاينة محتوى Premium."
        : "مساحة آمنة لفهم ذاتك وبناء علاقة أكثر لطفًا مع نفسك."}
    </section>

    <div class="section-title">
      <h2>ماذا تريدين اليوم؟</h2>
    </div>

    <div class="grid">

      <button class="card" data-go="chat"
        style="text-align:right;border:1px solid var(--line)">
        <span class="pill">💗</span>
        <h3>المحادثة</h3>
        <p>تحدثي مع Feminine Mind AI</p>
      </button>

      <button class="card" data-go="library"
        style="text-align:right;border:1px solid var(--line)">
        <span class="pill">📚</span>
        <h3>المحتوى</h3>
        <p>مقالات وتوكيدات وتمارين</p>
      </button>

      <button class="card" data-go="tests"
        style="text-align:right;border:1px solid var(--line)">
        <span class="pill">📝</span>
        <h3>الاختبارات</h3>
        <p>اكتشفي نفسك بوعي</p>
      </button>

      <button class="card" data-go="profile"
        style="text-align:right;border:1px solid var(--line)">
        <span class="pill">👤</span>
        <h3>حسابي</h3>
        <p>مساحتك الشخصية والخدمات</p>
      </button>

    </div>
  `);

  $("#startToday")?.addEventListener("click", () => {
    dailyExercise();
  });

  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => {
      go(btn.dataset.go);
    });
  });
}

/* =========================
   DAILY EXERCISE
========================= */

function dailyExercise() {
  const exercise = getDailyExercise();

  layout(`
    <button class="btn secondary" id="backHome">
      ← العودة للرئيسية
    </button>

    <div class="section-title">
      <h2>تمرين اليوم</h2>
    </div>

    <article class="card">
      <span class="pill">
        اليوم ${getDayIndex() + 1} من 30
      </span>

      <h2>${escapeHTML(exercise.title)}</h2>

      <p>
        ${escapeHTML(exercise.text)}
      </p>

      <div class="banner">
        خذي وقتكِ. الهدف ليس الأداء المثالي، بل التواصل
        الصادق مع نفسك.
      </div>

      <textarea
        id="dailyJournal"
        class="input"
        rows="6"
        placeholder="اكتبي تأملك هنا..."
      ></textarea>

      <button class="btn full" id="saveDailyJournal">
        حفظ تأمل اليوم
      </button>

    </article>
  `);

  $("#backHome").onclick = () => go("home");

  $("#saveDailyJournal").onclick = () => {
    const text = $("#dailyJournal").value.trim();

    if (!text) {
      toast("اكتبي تأملك أولًا 🌷");
      return;
    }

    localStorage.setItem(
      `fm_daily_${getDayIndex()}`,
      text
    );

    toast("تم حفظ تأملك لهذا اليوم 🌷");
  };

  const saved = localStorage.getItem(
    `fm_daily_${getDayIndex()}`
  );

  if (saved) {
    $("#dailyJournal").value = saved;
  }
}

/* =========================
   CHAT
========================= */

function chat() {
  layout(`
    <div class="section-title">
      <h2>Féminine Mind AI</h2>
      <p class="micro">
        مساحة حوار هادئة لفهم مشاعرك وأفكارك بوعي.
      </p>
    </div>

    <div class="chat-wrap">

      <div id="messages" class="messages">

        <div class="msg ai">
          مرحبًا بكِ في Féminine Mind 🤍
          <br>
          أنا مساعد توعوي مبني على مبادئ نفسية مبسطة.
          يمكنني مساعدتك في فهم المشاعر، الحدود، حب الذات
          والعلاقات. لست بديلاً عن المختص النفسي، ولا أقدّم تشخيصًا.
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
  `);

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

  div.className = `msg ${type}`;

  div.innerHTML = escapeHTML(text)
    .replace(/\n/g, "<br>");

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function sendChat() {
  const input = $("#chatInput");
  const text = input?.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  addMessage(
    "جاري التفكير في رسالتكِ… 🌷",
    "ai"
  );

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
        data.error ||
        "حدث خطأ في الاتصال بالمساعد."
      );
    }

    const reply =
      data.reply ||
      data.message ||
      data.text ||
      "لم تصلني استجابة واضحة. حاولي مرة أخرى.";

    if (lastAI) {
      lastAI.innerHTML = escapeHTML(reply)
        .replace(/\n/g, "<br>");
    }

    history.push(
      { role: "user", text },
      { role: "assistant", text: reply }
    );

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

function library(initialTab = "articles") {
  layout(`
    <div class="tabs">

      <button data-tab="articles">
        المقالات
      </button>

      <button data-tab="affirmations">
        التوكيدات
      </button>

      <button data-tab="exercises">
        التمارين
      </button>

    </div>

    <div id="libraryContent"></div>
  `);

  const tabs = document.querySelectorAll("[data-tab]");

  const renderTab = tab => {
    const box = $("#libraryContent");

    tabs.forEach(btn => {
      btn.classList.toggle(
        "active",
        btn.dataset.tab === tab
      );
    });

    if (tab === "affirmations") {
      box.innerHTML = `
        <div class="section-title">
          <h2>توكيداتك اليومية</h2>
        </div>

        ${state.affirmations.map((a, i) => `
          <div class="card">
            <span class="pill">
              توكيد ${i + 1}
            </span>

            <p class="quote">
              ${escapeHTML(a)}
            </p>

            <button
              class="btn secondary copyAff"
              data-index="${i}">
              نسخ التوكيد
            </button>
          </div>
        `).join("")}
      `;

      document.querySelectorAll(".copyAff")
        .forEach(btn => {
          btn.onclick = async () => {
            const text =
              state.affirmations[
                Number(btn.dataset.index)
              ];

            try {
              await navigator.clipboard.writeText(text);
              toast("تم نسخ التوكيد 🌷");
            } catch {
              toast(
                "يمكنك تحديد التوكيد ونسخه يدويًا."
              );
            }
          };
        });

      return;
    }

    if (tab === "exercises") {
      box.innerHTML = `
        <div class="section-title">
          <h2>تمارين العودة إلى الذات</h2>
          <p class="micro">
            يتغير تمرين اليوم تلقائيًا ضمن دورة 30 يومًا.
          </p>
        </div>

        <div class="card">
          <span class="pill">
            تمرين اليوم · اليوم ${getDayIndex() + 1}
          </span>

          <h3>
            ${escapeHTML(getDailyExercise().title)}
          </h3>

          <p>
            ${escapeHTML(getDailyExercise().text)}
          </p>

          <button class="btn full" id="openDailyExercise">
            ابدئي تمرين اليوم
          </button>
        </div>

        <div class="card">
          <span class="pill">30 يومًا</span>

          <h3>رحلة العودة إلى الذات</h3>

          <p>
            يمكنك العودة كل يوم إلى المنصة للحصول على
            تمرين جديد وتوكيد جديد.
          </p>
        </div>
      `;

      $("#openDailyExercise").onclick =
        dailyExercise;

      return;
    }

    box.innerHTML = `
      <div class="section-title">
        <h2>محتوى Féminine Mind</h2>
      </div>

      ${state.articles.map(article => `
        <article class="card article">

          <span class="pill">
            ${escapeHTML(article.cat)}
          </span>

          <div class="meta">
            ${escapeHTML(article.date)}
          </div>

          <h3>
            ${escapeHTML(article.title)}
          </h3>

          <p>
            ${escapeHTML(article.text)}
          </p>

          <button
            class="btn ${article.free || isAdmin()
              ? "secondary"
              : "secondary"} readArticle"
            data-id="${article.id}">
            ${article.free || isAdmin()
              ? "قراءة"
              : "فتح المحتوى Premium 🔒"}
          </button>

        </article>
      `).join("")}
    `;

    document.querySelectorAll(".readArticle")
      .forEach(btn => {
        btn.onclick = () => {
          const article =
            state.articles.find(
              x => x.id == btn.dataset.id
            );

          if (!article) return;

          if (!article.free && !isAdmin()) {
            premiumAccess();
            return;
          }

          openArticle(article);
        };
      });
  };

  tabs.forEach(btn => {
    btn.onclick = () => {
      renderTab(btn.dataset.tab);
    };
  });

  renderTab(initialTab);
}

function openArticle(article) {
  layout(`
    <button class="btn secondary" id="backLibrary">
      ← العودة إلى المحتوى
    </button>

    <article class="card" style="margin-top:12px">

      <span class="pill">
        ${escapeHTML(article.cat)}
      </span>

      <div class="micro">
        ${escapeHTML(article.date)}
      </div>

      <h1>
        ${escapeHTML(article.title)}
      </h1>

      <p>
        ${escapeHTML(article.text)}
      </p>

      <div class="banner">
        خذي وقتكِ في قراءة الفكرة، ثم اسألي نفسك:
        كيف تظهر هذه الفكرة في حياتي وعلاقاتك؟
      </div>

      <p>
        اكتبي ملاحظة قصيرة حول ما لامسكِ في هذا الموضوع
        وما الخطوة الصغيرة التي تريدين تجربتها.
      </p>

      <textarea
        id="articleNote"
        class="input"
        rows="5"
        placeholder="ملاحظتك..."
      ></textarea>

      <button class="btn full" id="saveArticleNote">
        حفظ ملاحظتي
      </button>

    </article>
  `);

  $("#backLibrary").onclick = () =>
    library("articles");

  $("#saveArticleNote").onclick = () => {
    const note =
      $("#articleNote").value.trim();

    if (!note) {
      toast("اكتبي ملاحظتك أولًا 🌷");
      return;
    }

    localStorage.setItem(
      `fm_article_note_${article.id}`,
      note
    );

    toast("تم حفظ ملاحظتك 🌷");
  };

  const saved =
    localStorage.getItem(
      `fm_article_note_${article.id}`
    );

  if (saved) {
    $("#articleNote").value = saved;
  }
}

/* =========================
   PREMIUM
========================= */

function premiumAccess() {
  if (isAdmin()) {
    toast(
      "وضع الأدمن مفعل — يمكنك الوصول إلى محتوى Premium."
    );
    return;
  }

  layout(`
    <button class="btn secondary" id="backPremium">
      ← العودة
    </button>

    <div class="card" style="margin-top:12px">

      <span class="pill premium">
        Premium
      </span>

      <h2>المحتوى المتقدم</h2>

      <p>
        هذا القسم مخصص للمحتوى المتقدم في المنصة.
      </p>

      <div class="banner">
        صلاحيات الاشتراك الحقيقية وقاعدة بيانات المستخدمين
        تحتاج إلى ربط Backend آمن. لن ندّعي أن الاشتراك
        الحقيقي موجود قبل ربطه فعليًا.
      </div>

      <button class="btn full" id="backPremiumProfile">
        العودة إلى حسابي
      </button>

    </div>
  `);

  $("#backPremium").onclick = () =>
    go("profile");

  $("#backPremiumProfile").onclick = () =>
    go("profile");
}

/* =========================
   TESTS
========================= */

let testIndex = 0;
let testScore = 0;
let currentTest = null;

function tests() {
  layout(`
    <div class="section-title">
      <h2>الاختبارات النفسية التأملية</h2>

      <p class="micro">
        هذه الأدوات للتثقيف والتأمل الذاتي وليست تشخيصًا نفسيًا.
      </p>
    </div>

    <div class="list">

      ${state.tests.map(test => `
        <div class="card ${!test.free ? "lock" : ""}">

          <span class="pill">
            ${test.free ? "مجاني" : "Premium"}
          </span>

          <h3>
            ${escapeHTML(test.title)}
          </h3>

          <p>
            ${escapeHTML(test.desc)}
          </p>

          <button
            class="btn full startTest"
            data-id="${test.id}">
            ${test.free
              ? "ابدئي الاختبار"
              : "فتح Premium 🔒"}
          </button>

        </div>
      `).join("")}

    </div>
  `);

  document.querySelectorAll(".startTest")
    .forEach(btn => {
      btn.onclick = () => {
        const test =
          state.tests.find(
            x => x.id === btn.dataset.id
          );

        if (!test) return;

        if (!test.free && !isAdmin()) {
          premiumAccess();
          return;
        }

        startTest(test.id);
      };
    });
}

function startTest(id) {
  currentTest =
    state.tests.find(x => x.id === id);

  if (!currentTest) return;

  testIndex = 0;
  testScore = 0;

  showQuestion();
}

function showQuestion() {
  const q =
    currentTest.qs[testIndex];

  const pct =
    (testIndex /
      currentTest.qs.length) *
    100;

  layout(`
    <button class="btn secondary" id="backTests">
      ← العودة للاختبارات
    </button>

    <div class="test-card card"
      style="margin-top:12px">

      <div class="progress">
        <i style="width:${pct}%"></i>
      </div>

      <p class="micro">
        السؤال ${testIndex + 1}
        من ${currentTest.qs.length}
      </p>

      <div class="question">
        ${escapeHTML(q)}
      </div>

      <div class="answers">

        ${[
          [1, "أبدًا"],
          [2, "نادراً"],
          [3, "أحيانًا"],
          [4, "غالبًا"],
          [5, "دائمًا"]
        ].map(([value, label]) => `
          <button
            data-score="${value}">
            ${value} — ${label}
          </button>
        `).join("")}

      </div>

    </div>
  `);

  $("#backTests").onclick = () =>
    tests();

  document.querySelectorAll("[data-score]")
    .forEach(btn => {
      btn.onclick = () =>
        answer(
          Number(btn.dataset.score)
        );
    });
}

function answer(value) {
  testScore += value;
  testIndex++;

  if (
    testIndex <
    currentTest.qs.length
  ) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const avg =
    testScore /
    currentTest.qs.length;

  let message;

  if (avg < 2.5) {
    message =
      "قد يكون هذا الجانب بحاجة إلى مزيد من الوعي والاحتواء.";
  } else if (avg < 3.8) {
    message =
      "لديكِ نقاط قوة واضحة مع بعض الجوانب التي يمكن تطويرها.";
  } else {
    message =
      "لديكِ مؤشرات جيدة في هذا الجانب. حافظي على الممارسات التي تدعمكِ.";
  }

  layout(`
    <div class="card">

      <span class="pill">
        النتيجة
      </span>

      <h2>
        ${escapeHTML(currentTest.title)}
      </h2>

      <h1>
        ${testScore}
      </h1>

      <p>
        ${message}
      </p>

      <p class="micro">
        النتيجة رقمية لأغراض التأمل فقط وليست حكمًا سريريًا.
      </p>

      <button class="btn full" id="againTest">
        إعادة الاختبار
      </button>

      <button class="btn secondary full" id="backTestList">
        العودة للاختبارات
      </button>

    </div>
  `);

  $("#againTest").onclick = () =>
    startTest(currentTest.id);

  $("#backTestList").onclick = () =>
    tests();
}

/* =========================
   BOOKING
========================= */

function booking() {
  layout(`
    <button class="btn secondary" id="backProfile">
      ← العودة إلى حسابي
    </button>

    <div class="section-title">
      <h2>الحجز مع المؤسسة</h2>
    </div>

    <div class="card">

      <span class="pill">
        جلسات
      </span>

      <h3>
        اطلبي جلسة أو استشارة
      </h3>

      <p>
        املئي الطلب التالي. سيتم حفظه محليًا في هذا المتصفح
        إلى أن يتم ربط نظام الحجز وقاعدة البيانات الآمنة.
      </p>

      <div class="field">
        <label>الاسم</label>
        <input
          id="bookingName"
          class="input"
          placeholder="اكتبي اسمك">
      </div>

      <div class="field">
        <label>نوع الجلسة</label>
        <select id="bookingType" class="input">
          <option>جلسة استشارة</option>
          <option>جلسة كوتشينج</option>
          <option>جلسة حول العلاقات</option>
          <option>جلسة حول الوعي الذاتي</option>
        </select>
      </div>

      <div class="field">
        <label>رسالتك</label>
        <textarea
          id="bookingMessage"
          class="input"
          rows="5"
          placeholder="اكتبي ما تريدين حجزه أو السؤال عنه">
        </textarea>
      </div>

      <button class="btn full" id="saveBooking">
        إرسال طلب الحجز
      </button>

    </div>

    <div class="banner">
      ملاحظة: الإرسال الخارجي الحقيقي يحتاج إلى ربط
      نموذج الحجز بخدمة Backend أو بريد إلكتروني.
    </div>
  `);

  $("#backProfile").onclick = () =>
    go("profile");

  $("#saveBooking").onclick = () => {
    const name =
      $("#bookingName").value.trim();

    const type =
      $("#bookingType").value;

    const message =
      $("#bookingMessage").value.trim();

    if (!name) {
      toast("اكتبي اسمك أولًا 🌷");
      return;
    }

    const bookings =
      JSON.parse(
        localStorage.getItem("fm_bookings") || "[]"
      );

    bookings.push({
      id: Date.now(),
      name,
      type,
      message,
      date: new Date().toISOString()
    });

    localStorage.setItem(
      "fm_bookings",
      JSON.stringify(bookings)
    );

    toast(
      "تم حفظ طلب الحجز على هذا الجهاز 🌷"
    );

    setTimeout(() => {
      go("profile");
    }, 1000);
  };
}

/* =========================
   PROFILE
========================= */

function profile() {
  layout(`
    <div class="hero">

      <span class="eyebrow">
        حسابك
      </span>

      <h1>
        مساحتك الخاصة
      </h1>

      <p>
        مكانك لمتابعة رحلتك مع ذاتك والمحتوى والخدمات.
      </p>

    </div>

    <div class="grid">

      <button
        class="card"
        id="advancedContent"
        style="text-align:right;border:1px solid var(--line)">

        <span class="pill premium">
          Premium
        </span>

        <h3>
          المحتوى المتقدم
        </h3>

        <p>
          ${isAdmin()
            ? "وضع الأدمن: معاينة المحتوى المتقدم."
            : "استكشفي المسارات والتقييمات الأعمق."}
        </p>

      </button>

      <button
        class="card"
        id="bookingBtn"
        style="text-align:right;border:1px solid var(--line)">

        <span class="pill">
          جلسات
        </span>

        <h3>
          الحجز مع المؤسسة
        </h3>

        <p>
          اطلبي جلسة أو استشارة.
        </p>

      </button>

    </div>

    <div class="section-title">
      <h2>مساحتك اليومية</h2>
    </div>

    <div class="card">

      <span class="pill">
        اليوم ${getDayIndex() + 1}
      </span>

      <h3>
        ${escapeHTML(getDailyExercise().title)}
      </h3>

      <p>
        ${escapeHTML(getDailyExercise().text)}
      </p>

      <button class="btn full" id="profileExercise">
        تمرين اليوم
      </button>

    </div>

    <div class="section-title">
      <h2>اختصارات</h2>
    </div>

    <div class="card">

      <button class="btn full" id="profileTests">
        اختباراتي
      </button>

      <button class="btn secondary full" id="profileChat">
        محادثة Féminine Mind AI
      </button>

      <button class="btn secondary full" id="profileContent">
        المحتوى
      </button>

      <button class="btn secondary full" id="adminBtn">
        لوحة الإدارة
      </button>

    </div>

    <div class="card">

      <h3>
        الخصوصية المحلية
      </h3>

      <p class="micro">
        بعض البيانات في هذه النسخة التجريبية تحفظ محليًا
        في هذا المتصفح. الحسابات الحقيقية وقاعدة البيانات
        الآمنة تحتاج إلى Backend.
      </p>

      <button class="btn secondary full" id="clearChat">
        مسح سجل المحادثة
      </button>

    </div>
  `);

  $("#advancedContent").onclick = () => {
    if (isAdmin()) {
      library("articles");
      toast("وضع الأدمن: يمكنك معاينة المحتوى المتقدم 🌷");
    } else {
      premiumAccess();
    }
  };

  $("#bookingBtn").onclick = booking;

  $("#profileExercise").onclick =
    dailyExercise;

  $("#profileTests").onclick =
    () => go("tests");

  $("#profileChat").onclick =
    () => go("chat");

  $("#profileContent").onclick =
    () => go("library");

  $("#adminBtn").onclick =
    () => {
      location.href = "admin.html";
    };

  $("#clearChat").onclick = () => {
    localStorage.removeItem(
      "fm_chat_history"
    );

    toast("تم مسح سجل المحادثة.");
  };
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
   RENDER
========================= */

function render() {
  const pages = {
    home,
    chat,
    library,
    tests,
    profile,
    dailyExercise,
    booking
  };

  const page =
    pages[state.route] || home;

  page();
}

/* =========================
   START
========================= */

load();

if (
  localStorage.getItem("fm_dark") === "true"
) {
  document.body.classList.add("dark");
}

window.addEventListener(
  "hashchange",
  () => {
    state.route =
      location.hash.slice(1) || "home";

    render();
  }
);

$("#themeBtn")?.addEventListener(
  "click",
  toggleTheme
);

render();

/*
  لا نغير طريقة عمل المحادثة هنا.
  Service Worker يبقى كما هو في هذه المرحلة.
*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .catch(() => {});
  });
}
