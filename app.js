```javascript
/* =========================================================
   FÉMININE MIND — APP.JS
   Version — Store + Services Connected
========================================================= */

const $ = (s) => document.querySelector(s);

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
    },
    {
      id: 4,
      title: "كيف أعرف أنني أحتاج إلى حدود؟",
      cat: "الحدود النفسية",
      free: true,
      date: "هذا الأسبوع",
      text: "من العلامات المهمة الشعور المستمر بالاستنزاف، الموافقة رغم عدم الرغبة، والخوف المبالغ فيه من رفض الآخرين."
    },
    {
      id: 5,
      title: "الأمان العاطفي داخل العلاقة",
      cat: "العلاقات",
      free: false,
      date: "Premium",
      text: "الأمان العاطفي لا يعني غياب الخلاف، بل القدرة على التعبير عن الاحتياجات والمشاعر مع وجود الاحترام والاحتواء."
    }
  ],

  affirmations: [
    "أستطيع أن أسمع احتياجاتي وأن أتعامل معها باحترام.",
    "قيمتي لا تتحدد بمدى قبول الآخرين لي.",
    "يمكنني أن أضع حدودًا واضحة دون أن أتخلى عن لطفي.",
    "أمنح نفسي وقتًا ومساحة قبل اتخاذ القرار.",
    "أنا أستحق علاقة آمنة ومحترمة.",
    "يمكنني التعبير عن احتياجاتي دون خوف.",
    "لا أحتاج إلى إرضاء الجميع كي أكون جديرة بالحب.",
    "أسمح لنفسي أن أكون صادقة مع مشاعري."
  ],

  exercises: [
    {
      title: "توقفي واسألي نفسك",
      text: "ماذا أشعر الآن؟ ماذا أحتاج؟ وما الشيء الصغير الذي يمكنني فعله لنفسي اليوم؟"
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
      title: "ما الذي أحتاجه؟",
      text: "اختاري شعورًا حاضرًا الآن واكتبي تحته: ماذا يحاول هذا الشعور أن يخبرني؟ وما الاحتياج الموجود خلفه؟"
    },
    {
      title: "مساحتي الخاصة",
      text: "حددي شيئًا واحدًا يستنزف طاقتك، ثم اكتبي حدًا صغيرًا يمكنك وضعه هذا الأسبوع."
    },
    {
      title: "التوقف عن إرضاء الآخرين",
      text: "اكتبي موقفًا فعلتِ فيه شيئًا فقط خوفًا من إزعاج شخص آخر. ماذا كنتِ تريدين فعلًا؟"
    },
    {
      title: "حديث لطيف مع الذات",
      text: "اكتبي ثلاث جمل لطيفة تحتاجين إلى سماعها اليوم، ثم اقرئيها ببطء."
    }
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
    },
    {
      id: "femininity",
      title: "مؤشر علاقتك بأنوثتك",
      desc: "رحلة تأملية لفهم علاقتك بذاتك وأنوثتك.",
      free: false,
      qs: [
        "أشعر بالراحة مع طريقتي الخاصة في التعبير عن أنوثتي.",
        "أسمح لنفسي بالراحة وتلقي الدعم.",
        "لا أقارن أنوثتي باستمرار بالنساء الأخريات.",
        "أشعر أن قيمتي أكبر من مظهري الخارجي.",
        "أستطيع التعبير عن رغبتي واحتياجاتي باحترام."
      ]
    }
  ]
};


/* =========================================================
   LOCAL STORAGE
========================================================= */

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
    const saved = JSON.parse(
      localStorage.getItem("fm_state") || "null"
    );

    if (saved) {
      if (Array.isArray(saved.articles) && saved.articles.length) {
        state.articles = saved.articles;
      }

      if (
        Array.isArray(saved.affirmations) &&
        saved.affirmations.length
      ) {
        state.affirmations = saved.affirmations;
      }
    }
  } catch (e) {
    console.log("FM state load skipped");
  }
}


/* =========================================================
   PRODUCTS + SERVICES
   يتم قراءتها مباشرة من لوحة الإدارة
========================================================= */

function getProducts() {
  try {
    const products = JSON.parse(
      localStorage.getItem("fm_products") || "[]"
    );

    return Array.isArray(products)
      ? products
      : [];
  } catch (error) {
    console.log("FM products load skipped");
    return [];
  }
}

function getServices() {
  try {
    const services = JSON.parse(
      localStorage.getItem("fm_services") || "[]"
    );

    return Array.isArray(services)
      ? services
      : [];
  } catch (error) {
    console.log("FM services load skipped");
    return [];
  }
}

function getVisibleProducts() {
  return getProducts().filter(
    (product) =>
      product.visible !== false &&
      product.status === "published"
  );
}

function getVisibleServices() {
  return getServices();
}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function money(value) {
  const number = Number(value || 0);

  return number.toLocaleString("fr-FR");
}

function accessLabel(access) {
  const labels = {
    paid: "💰 مدفوع",
    free: "🆓 مجاني",
    premium: "💎 Premium"
  };

  return labels[access] || access || "منتج";
}

function toast(message) {
  const el = $("#toast");

  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.fmToastTimer);

  window.fmToastTimer = setTimeout(() => {
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

function layout(html) {
  const app = $("#app");

  if (!app) return;

  app.innerHTML = html;

  nav();

  document
    .querySelectorAll(".bottom-nav button")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.route === state.route
      );
    });
}

function nav() {
  document
    .querySelectorAll(".bottom-nav button")
    .forEach((btn) => {
      btn.onclick = () => {
        go(btn.dataset.route);
      };
    });
}


/* =========================================================
   DAILY CONTENT
========================================================= */

function getDailyIndex(length) {
  if (!length) return 0;

  const start = new Date(
    new Date().getFullYear(),
    0,
    0
  );

  const today = new Date();

  const diff = today - start;

  const day =
    Math.floor(diff / 86400000);

  return day % length;
}

function getDailyAffirmation() {
  return state.affirmations[
    getDailyIndex(state.affirmations.length)
  ];
}

function getDailyExercise() {
  return state.exercises[
    getDailyIndex(state.exercises.length)
  ];
}


/* =========================================================
   HOME
========================================================= */

function home() {
  const affirmation = getDailyAffirmation();
  const exercise = getDailyExercise();

  const products = getVisibleProducts();
  const services = getVisibleServices();

  layout(`
    <section class="hero">

      <span class="eyebrow">
        Féminine Mind
      </span>

      <h1>
        مساحة آمنة للعودة إلى ذاتك
      </h1>

      <p>
        محتوى نفسي مبسط، وعي ذاتي، علاقات صحية،
        وتمارين عملية تساعدك على فهم نفسك
        والتعامل مع مشاعرك بوعي.
      </p>

    </section>


    <section class="daily card">

      <span class="pill">
        توكيد الصباح
      </span>

      <p class="quote">
        ${escapeHTML(affirmation)}
      </p>

      <div class="banner">
        🌷 توكيد اليوم يتغير تلقائيًا كل يوم.
      </div>

    </section>


    <section class="daily card">

      <span class="pill">
        تمرين اليوم
      </span>

      <h3>
        ${escapeHTML(exercise.title)}
      </h3>

      <p>
        ${escapeHTML(exercise.text)}
      </p>

      <button
        class="btn full"
        id="dailyExerciseBtn"
      >
        ابدئي تمرين اليوم
      </button>

    </section>


    <!-- STORE -->

    ${
      products.length
        ? `
          <section class="section-title">
            <h2>
              🛍️ منتجات Féminine Mind
            </h2>

            <p class="micro">
              اكتشفي الدورات والكتب والـ Workbooks
              والمحتوى المتقدم.
            </p>
          </section>

          <div class="grid">

            ${products.map(
              (product) => `
                <article class="card">

                  <span class="pill">
                    ${escapeHTML(product.type)}
                  </span>

                  <h3>
                    ${escapeHTML(product.name)}
                  </h3>

                  <p>
                    ${escapeHTML(product.description)}
                  </p>

                  <p>
                    <strong>
                      ${money(product.price)}
                    </strong>
                  </p>

                  ${
                    Number(product.oldPrice) > 0
                      ? `
                        <p class="micro">
                          السعر السابق:
                          ${money(product.oldPrice)}
                        </p>
                      `
                      : ""
                  }

                  <p>
                    ${escapeHTML(
                      accessLabel(product.access)
                    )}
                  </p>

                  <button
                    class="btn full openProduct"
                    data-id="${escapeHTML(product.id)}"
                  >
                    اكتشفي المنتج
                  </button>

                </article>
              `
            ).join("")}

          </div>
        `
        : ""
    }


    <!-- SERVICES -->

    ${
      services.length
        ? `
          <section class="section-title">
            <h2>
              💗 خدمات Féminine Mind
            </h2>

            <p class="micro">
              جلسات وبرامج وورش لمرافقتك في رحلتك.
            </p>
          </section>

          <div class="grid">

            ${services.map(
              (service) => `
                <article class="card">

                  <span class="pill">
                    💗 خدمة
                  </span>

                  <h3>
                    ${escapeHTML(service.name)}
                  </h3>

                  <p>
                    ${escapeHTML(service.description)}
                  </p>

                  <span class="pill">
                    ${escapeHTML(service.status)}
                  </span>

                  <button
                    class="btn full openService"
                    data-id="${escapeHTML(service.id)}"
                  >
                    اكتشفي الخدمة
                  </button>

                </article>
              `
            ).join("")}

          </div>
        `
        : ""
    }


    <section class="banner">
      مساحة آمنة لفهم ذاتك وبناء علاقة أكثر لطفًا مع نفسك.
    </section>


    <div class="section-title">
      <h2>
        ماذا تريدين اليوم؟
      </h2>
    </div>


    <div class="grid">

      <button
        class="card action-card"
        data-go="chat"
      >
        <span>💗</span>
        <strong>المحادثة</strong>
        <small>
          تحدثي مع Feminine Mind AI
        </small>
      </button>

      <button
        class="card action-card"
        data-go="library"
      >
        <span>📚</span>
        <strong>المحتوى</strong>
        <small>
          مقالات وتمارين وتوكيدات
        </small>
      </button>

      <button
        class="card action-card"
        data-go="tests"
      >
        <span>📝</span>
        <strong>الاختبارات</strong>
        <small>
          اكتشفي نفسك بوعي
        </small>
      </button>

      <button
        class="card action-card"
        data-go="store"
      >
        <span>🛍️</span>
        <strong>المتجر</strong>
        <small>
          المنتجات الرقمية
        </small>
      </button>

      <button
        class="card action-card"
        data-go="services"
      >
        <span>💗</span>
        <strong>الخدمات</strong>
        <small>
          الجلسات والبرامج
        </small>
      </button>

      <button
        class="card action-card"
        data-go="profile"
      >
        <span>👤</span>
        <strong>حسابي</strong>
        <small>
          مساحتك الشخصية
        </small>
      </button>

    </div>
  `);


  document
    .querySelectorAll("[data-go]")
    .forEach((btn) => {
      btn.onclick = () => {
        go(btn.dataset.go);
      };
    });


  $("#dailyExerciseBtn")?.addEventListener(
    "click",
    () => {
      exercisePage();
    }
  );


  document
    .querySelectorAll(".openProduct")
    .forEach((btn) => {
      btn.onclick = () => {
        productPage(btn.dataset.id);
      };
    });


  document
    .querySelectorAll(".openService")
    .forEach((btn) => {
      btn.onclick = () => {
        servicePage(btn.dataset.id);
      };
    });
}


/* =========================================================
   STORE
========================================================= */

function store() {

  const products =
    getVisibleProducts();

  layout(`
    <button
      class="btn secondary"
      id="backHomeStore"
    >
      ← العودة إلى الرئيسية
    </button>

    <div class="section-title">
      <h2>
        🛍️ متجر Féminine Mind
      </h2>

      <p class="micro">
        منتجات رقمية صممت لمرافقتك في رحلة الوعي والنمو.
      </p>
    </div>

    ${
      products.length
        ? `
          <div class="grid">

            ${products.map(
              (product) => `
                <article class="card">

                  <span class="pill">
                    ${escapeHTML(product.type)}
                  </span>

                  <h2>
                    ${escapeHTML(product.name)}
                  </h2>

                  <p>
                    ${escapeHTML(product.description)}
                  </p>

                  <h3>
                    ${money(product.price)}
                  </h3>

                  ${
                    Number(product.oldPrice) > 0
                      ? `
                        <p class="micro">
                          السعر قبل الخصم:
                          ${money(product.oldPrice)}
                        </p>
                      `
                      : ""
                  }

                  <p>
                    ${escapeHTML(
                      accessLabel(product.access)
                    )}
                  </p>

                  <button
                    class="btn full openProduct"
                    data-id="${escapeHTML(product.id)}"
                  >
                    عرض المنتج
                  </button>

                </article>
              `
            ).join("")}

          </div>
        `
        : `
          <div class="card">
            <h3>
              المتجر قيد التجهيز 🌷
            </h3>

            <p>
              ستظهر المنتجات هنا تلقائيًا
              عندما يتم نشرها من لوحة الإدارة.
            </p>
          </div>
        `
    }
  `);


  $("#backHomeStore").onclick =
    () => go("home");


  document
    .querySelectorAll(".openProduct")
    .forEach((btn) => {
      btn.onclick = () => {
        productPage(btn.dataset.id);
      };
    });
}


/* =========================================================
   PRODUCT PAGE
========================================================= */

function productPage(id) {

  const product =
    getProducts().find(
      (item) =>
        String(item.id) === String(id)
    );

  if (
    !product ||
    product.visible === false ||
    product.status !== "published"
  ) {
    toast(
      "هذا المنتج غير متاح حاليًا."
    );
    return;
  }


  layout(`
    <button
      class="btn secondary"
      id="backStore"
    >
      ← العودة إلى المتجر
    </button>

    <article
      class="card"
      style="margin-top:15px"
    >

      <span class="pill">
        ${escapeHTML(product.type)}
      </span>

      <h1>
        ${escapeHTML(product.name)}
      </h1>

      <p>
        ${escapeHTML(product.description)}
      </p>

      <div class="banner">

        <strong>
          السعر:
        </strong>

        ${money(product.price)}

      </div>

      ${
        Number(product.oldPrice) > 0
          ? `
            <p class="micro">
              السعر قبل الخصم:
              ${money(product.oldPrice)}
            </p>
          `
          : ""
      }

      <p>
        ${escapeHTML(
          accessLabel(product.access)
        )}
      </p>

      <button
        class="btn full"
        id="productAction"
      >
        ${
          product.access === "free"
            ? "فتح المنتج"
            : "طلب المنتج"
        }
      </button>

    </article>
  `);


  $("#backStore").onclick =
    () => go("store");


  $("#productAction").onclick =
    () => {

      toast(
        product.access === "free"
          ? "سيتم فتح المحتوى المجاني 🌷"
          : "تم تسجيل رغبتك في هذا المنتج 🌷"
      );

      localStorage.setItem(
        "fm_product_request",
        JSON.stringify({
          id: product.id,
          name: product.name,
          date: new Date().toISOString()
        })
      );
    };
}


/* =========================================================
   SERVICES
========================================================= */

function services() {

  const items =
    getVisibleServices();

  layout(`
    <button
      class="btn secondary"
      id="backHomeServices"
    >
      ← العودة إلى الرئيسية
    </button>

    <div class="section-title">
      <h2>
        💗 خدمات Féminine Mind
      </h2>

      <p class="micro">
        خدمات مخصصة لدعم رحلتك مع ذاتك وعلاقاتك.
      </p>
    </div>

    <div class="grid">

      ${
        items.length
          ? items.map(
              (service) => `
                <article class="card">

                  <span class="pill">
                    💗 خدمة
                  </span>

                  <h2>
                    ${escapeHTML(service.name)}
                  </h2>

                  <p>
                    ${escapeHTML(service.description)}
                  </p>

                  <span class="pill">
                    ${escapeHTML(service.status)}
                  </span>

                  <button
                    class="btn full openService"
                    data-id="${escapeHTML(service.id)}"
                  >
                    عرض الخدمة
                  </button>

                </article>
              `
            ).join("")
          : `
              <div class="card">
                <p>
                  الخدمات قيد التجهيز 🌷
                </p>
              </div>
            `
      }

    </div>
  `);


  $("#backHomeServices").onclick =
    () => go("home");


  document
    .querySelectorAll(".openService")
    .forEach((btn) => {
      btn.onclick = () => {
        servicePage(btn.dataset.id);
      };
    });
}


/* =========================================================
   SERVICE PAGE
========================================================= */

function servicePage(id) {

  const service =
    getServices().find(
      (item) =>
        String(item.id) === String(id)
    );

  if (!service) {
    toast(
      "لم يتم العثور على الخدمة."
    );
    return;
  }


  layout(`
    <button
      class="btn secondary"
      id="backServices"
    >
      ← العودة إلى الخدمات
    </button>

    <article
      class="card"
      style="margin-top:15px"
    >

      <span class="pill">
        💗 خدمة
      </span>

      <h1>
        ${escapeHTML(service.name)}
      </h1>

      <p>
        ${escapeHTML(service.description)}
      </p>

      <div class="banner">
        ${escapeHTML(service.status)}
      </div>

      <button
        class="btn full"
        id="serviceBooking"
      >
        طلب هذه الخدمة
      </button>

    </article>
  `);


  $("#backServices").onclick =
    () => go("services");


  $("#serviceBooking").onclick =
    () => {

      localStorage.setItem(
        "fm_booking_request",
        JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          date: new Date().toISOString()
        })
      );

      toast(
        "تم تسجيل رغبتك في الخدمة 🌷"
      );
    };
}


/* =========================================================
   DAILY EXERCISE
========================================================= */

function exercisePage() {

  const exercise =
    getDailyExercise();

  layout(`
    <button
      class="btn secondary"
      id="backHome"
    >
      ← العودة
    </button>

    <div class="section-title">
      <h2>
        تمرين اليوم 🌷
      </h2>
    </div>

    <article class="card">

      <span class="pill">
        تمرين اليوم
      </span>

      <h2>
        ${escapeHTML(exercise.title)}
      </h2>

      <p>
        ${escapeHTML(exercise.text)}
      </p>

      <div class="banner">
        خذي من 5 إلى 10 دقائق لنفسك.
        لا تبحثي عن الإجابة المثالية،
        فقط كوني صادقة مع نفسك.
      </div>

      <textarea
        id="exerciseJournal"
        class="input"
        rows="7"
        placeholder="اكتبي تأملك هنا..."
      ></textarea>

      <button
        class="btn full"
        id="saveExercise"
      >
        حفظ التأمل
      </button>

    </article>
  `);

  $("#backHome").onclick =
    () => go("home");

  $("#saveExercise").onclick =
    () => {

      const value =
        $("#exerciseJournal")?.value.trim();

      if (!value) {
        toast(
          "اكتبي شيئًا قبل الحفظ 🌷"
        );
        return;
      }

      localStorage.setItem(
        "fm_daily_exercise_" +
          new Date().toISOString().slice(0, 10),
        value
      );

      toast(
        "تم حفظ تأملكِ 🌷"
      );
    };
}


/* =========================================================
   CHAT
========================================================= */

function chat() {

  layout(`
    <section class="section-title">

      <h2>
        Féminine Mind AI
      </h2>

      <p class="micro">
        مساحة حوار هادئة لفهم مشاعرك وأفكارك بوعي.
      </p>

    </section>

    <div class="chat-wrap">

      <div
        id="messages"
        class="messages"
      >

        <div class="msg ai">
          مرحبًا بكِ في Féminine Mind 🌷
          <br>
          أنا هنا للاستماع إليكِ ومساعدتكِ
          على فهم مشاعركِ وأفكاركِ بطريقة آمنة وهادئة.
        </div>

      </div>

      <div class="composer">

        <textarea
          id="chatInput"
          placeholder="اكتبي ما يشغل بالك..."
          rows="3"
        ></textarea>

        <button
          class="send"
          id="send"
        >
          إرسال
        </button>

      </div>

    </div>
  `);

  $("#send")?.addEventListener(
    "click",
    sendChat
  );

  $("#chatInput")?.addEventListener(
    "keydown",
    (e) => {

      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {
        e.preventDefault();
        sendChat();
      }

    }
  );
}

function addMessage(text, type) {

  const box =
    $("#messages");

  if (!box) return;

  const div =
    document.createElement("div");

  div.className =
    `msg ${type}`;

  div.innerHTML =
    escapeHTML(text)
      .replace(/\n/g, "<br>");

  box.appendChild(div);

  box.scrollTop =
    box.scrollHeight;
}

async function sendChat() {

  const input =
    $("#chatInput");

  const text =
    input?.value.trim();

  if (!text) return;

  addMessage(
    text,
    "user"
  );

  input.value = "";

  addMessage(
    "جاري التفكير في رسالتكِ… 🌷",
    "ai"
  );

  const messages =
    $("#messages");

  const lastAI =
    messages?.lastElementChild;

  try {

    const history =
      JSON.parse(
        localStorage.getItem(
          "fm_chat_history"
        ) || "[]"
      );

    const response =
      await fetch(
        "/.netlify/functions/ai-chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            message: text,
            history:
              history.slice(-8)
          })
        }
      );

    const data =
      await response.json();

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

      lastAI.innerHTML =
        escapeHTML(reply)
          .replace(
            /\n/g,
            "<br>"
          );

    }

    history.push(
      {
        role: "user",
        text
      },
      {
        role: "assistant",
        text: reply
      }
    );

    localStorage.setItem(
      "fm_chat_history",
      JSON.stringify(
        history.slice(-16)
      )
    );

  } catch (error) {

    console.error(error);

    if (lastAI) {

      lastAI.textContent =
        "تعذر الاتصال بالمساعد الآن. تأكدي من اتصال الإنترنت ثم حاولي مرة أخرى.";

    }

  }
}


/* =========================================================
   LIBRARY
========================================================= */

function library() {

  layout(`
    <div class="tabs">

      <button
        class="active"
        data-tab="articles"
      >
        المقالات
      </button>

      <button
        data-tab="affirmations"
      >
        التوكيدات
      </button>

      <button
        data-tab="exercises"
      >
        تمارين
      </button>

    </div>

    <div id="libraryContent"></div>
  `);

  document
    .querySelectorAll("[data-tab]")
    .forEach((btn) => {

      btn.onclick = () => {

        document
          .querySelectorAll("[data-tab]")
          .forEach((x) =>
            x.classList.remove("active")
          );

        btn.classList.add("active");

        renderLibraryTab(
          btn.dataset.tab
        );

      };

    });

  renderLibraryTab("articles");
}

function renderLibraryTab(tab) {

  const box =
    $("#libraryContent");

  if (!box) return;


  if (tab === "affirmations") {

    box.innerHTML = `
      <div class="section-title">
        <h2>
          توكيداتك اليومية
        </h2>
      </div>

      ${state.affirmations
        .map(
          (a, i) => `
          <div class="card">

            <span class="pill">
              توكيد ${i + 1}
            </span>

            <p class="quote">
              ${escapeHTML(a)}
            </p>

            <button
              class="btn secondary copyAff"
              data-index="${i}"
            >
              نسخ التوكيد
            </button>

          </div>
        `
        )
        .join("")}
    `;

    document
      .querySelectorAll(".copyAff")
      .forEach((btn) => {

        btn.onclick = async () => {

          const text =
            state.affirmations[
              Number(btn.dataset.index)
            ];

          try {

            await navigator.clipboard.writeText(
              text
            );

            toast(
              "تم نسخ التوكيد 🌷"
            );

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

        <h2>
          تمارين العودة إلى الذات
        </h2>

        <p class="micro">
          اختاري تمرينًا يناسب احتياجك اليوم.
        </p>

      </div>

      ${state.exercises
        .map(
          (exercise, i) => `
          <div class="card">

            <span class="pill">
              تمرين ${String(i + 1).padStart(2, "0")}
            </span>

            <h3>
              ${escapeHTML(
                exercise.title
              )}
            </h3>

            <p>
              ${escapeHTML(
                exercise.text
              )}
            </p>

            <button
              class="btn full openExercise"
              data-index="${i}"
            >
              ابدئي التمرين
            </button>

          </div>
        `
        )
        .join("")}
    `;

    document
      .querySelectorAll(".openExercise")
      .forEach((btn) => {

        btn.onclick = () => {

          exerciseDetails(
            Number(
              btn.dataset.index
            )
          );

        };

      });

    return;
  }


  box.innerHTML = `
    <div class="section-title">

      <h2>
        محتوى Féminine Mind
      </h2>

    </div>

    ${state.articles
      .map(
        (article) => `
        <article class="card">

          <span class="pill">
            ${escapeHTML(
              article.cat
            )}
          </span>

          <h3>
            ${escapeHTML(
              article.title
            )}
          </h3>

          <small>
            ${escapeHTML(
              article.date
            )}
          </small>

          <p>
            ${escapeHTML(
              article.text
            )}
          </p>

          ${
            article.free
              ? `
                <button
                  class="btn full readArticle"
                  data-id="${article.id}"
                >
                  قراءة المقال
                </button>
              `
              : `
                <button
                  class="btn full premiumArticle"
                  data-id="${article.id}"
                >
                  فتح المحتوى Premium 🔓
                </button>
              `
          }

        </article>
      `
      )
      .join("")}
  `;


  document
    .querySelectorAll(".readArticle")
    .forEach((btn) => {

      btn.onclick = () => {

        openArticle(
          Number(
            btn.dataset.id
          )
        );

      };

    });


  document
    .querySelectorAll(".premiumArticle")
    .forEach((btn) => {

      btn.onclick = () => {

        openArticle(
          Number(
            btn.dataset.id
          ),
          true
        );

      };

    });
}


function openArticle(id, premium = false) {

  const article =
    state.articles.find(
      (x) =>
        Number(x.id) ===
        Number(id)
    );

  if (!article) {
    toast(
      "لم يتم العثور على المقال."
    );
    return;
  }

  layout(`
    <button
      class="btn secondary"
      id="backLibrary"
    >
      ← العودة إلى المحتوى
    </button>

    <article
      class="card"
      style="margin-top:15px"
    >

      <span class="pill">
        ${escapeHTML(
          article.cat
        )}
      </span>

      <h1>
        ${escapeHTML(
          article.title
        )}
      </h1>

      <small>
        ${escapeHTML(
          article.date
        )}
      </small>

      <p style="margin-top:20px">
        ${escapeHTML(
          article.text
        )}
      </p>

      ${
        premium
          ? `
            <div class="banner">
              ✨ هذا محتوى Premium.
              تم فتحه الآن في النسخة الحالية
              لمتابعة اختبار وظائف المنصة.
            </div>

            <p>
              الاحتواء العاطفي يعني أن تكون المشاعر
              قادرة على الظهور داخل العلاقة دون خوف
              مستمر من الرفض أو السخرية أو التجاهل.
            </p>
          `
          : `
            <p>
              خذي وقتكِ في قراءة الفكرة، ثم اسألي نفسك:
              كيف تظهر هذه الفكرة في حياتي وعلاقاتي؟
            </p>
          `
      }

    </article>
  `);

  $("#backLibrary").onclick =
    () => library();
}


function exerciseDetails(index) {

  const exercise =
    state.exercises[index];

  if (!exercise) return;

  layout(`
    <button
      class="btn secondary"
      id="backExercises"
    >
      ← العودة إلى التمارين
    </button>

    <article
      class="card"
      style="margin-top:15px"
    >

      <span class="pill">
        تمرين
      </span>

      <h1>
        ${escapeHTML(
          exercise.title
        )}
      </h1>

      <p>
        ${escapeHTML(
          exercise.text
        )}
      </p>

      <textarea
        id="exerciseNote"
        class="input"
        rows="8"
        placeholder="اكتبي إجابتك وتأملك هنا..."
      ></textarea>

      <button
        class="btn full"
        id="saveExerciseNote"
      >
        حفظ التأمل
      </button>

    </article>
  `);

  $("#backExercises").onclick =
    () => library();

  $("#saveExerciseNote").onclick =
    () => {

      const value =
        $("#exerciseNote")
          ?.value
          .trim();

      if (!value) {
        toast(
          "اكتبي تأملكِ أولًا 🌷"
        );
        return;
      }

      localStorage.setItem(
        "fm_exercise_note_" +
          index,
        value
      );

      toast(
        "تم حفظ تأملكِ بنجاح 🌷"
      );
    };
}


/* =========================================================
   TESTS
========================================================= */

let testIndex = 0;
let testScore = 0;
let currentTest = null;

function tests() {

  layout(`
    <div class="section-title">

      <h2>
        الاختبارات النفسية التأملية
      </h2>

      <p class="micro">
        اختبارات للتأمل وفهم الذات، وليست تشخيصًا طبيًا.
      </p>

    </div>

    <div class="test-list">

      ${state.tests
        .map(
          (test) => `
          <div class="card test-card">

            <span class="pill">
              ${
                test.free
                  ? "مجاني"
                  : "Premium"
              }
            </span>

            <h3>
              ${escapeHTML(
                test.title
              )}
            </h3>

            <p>
              ${escapeHTML(
                test.desc
              )}
            </p>

            <button
              class="btn full startTest"
              data-id="${test.id}"
            >
              ${
                test.free
                  ? "ابدئي الاختبار"
                  : "ابدئي اختبار Premium 🔓"
              }
            </button>

          </div>
        `
        )
        .join("")}

    </div>
  `);

  document
    .querySelectorAll(".startTest")
    .forEach((btn) => {

      btn.onclick = () => {

        const test =
          state.tests.find(
            (x) =>
              x.id ===
              btn.dataset.id
          );

        if (!test) return;

        startTest(test.id);
      };
    });
}


function startTest(id) {

  currentTest =
    state.tests.find(
      (x) => x.id === id
    );

  if (!currentTest) return;

  testIndex = 0;
  testScore = 0;

  showQuestion();
}


function showQuestion() {

  const q =
    currentTest.qs[testIndex];

  const progress =
    (testIndex /
      currentTest.qs.length) *
    100;

  layout(`
    <button
      class="btn secondary"
      id="backTests"
    >
      ← الاختبارات
    </button>

    <div
      class="test-card card"
      style="margin-top:15px"
    >

      <span class="pill">
        السؤال
        ${testIndex + 1}
        من
        ${currentTest.qs.length}
      </span>

      <div
        class="progress"
        style="margin-top:15px"
      >
        <i
          style="width:${progress}%"
        ></i>
      </div>

      <h2 style="margin-top:20px">
        ${escapeHTML(q)}
      </h2>

      <div class="answers">

        <button data-score="0">
          أبدًا
        </button>

        <button data-score="1">
          أحيانًا
        </button>

        <button data-score="2">
          غالبًا
        </button>

        <button data-score="3">
          دائمًا
        </button>

      </div>

    </div>
  `);

  $("#backTests").onclick =
    () => tests();

  document
    .querySelectorAll("[data-score]")
    .forEach((btn) => {

      btn.onclick = () => {

        answer(
          Number(
            btn.dataset.score
          )
        );

      };

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

  const max =
    currentTest.qs.length * 3;

  const percentage =
    Math.round(
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

  layout(`
    <div class="card result">

      <span class="pill">
        النتيجة
      </span>

      <h1>
        ${percentage}%
      </h1>

      <h2>
        ${escapeHTML(
          currentTest.title
        )}
      </h2>

      <p>
        ${message}
      </p>

      <p class="micro">
        هذه النتيجة للتأمل والوعي الذاتي
        وليست تشخيصًا نفسيًا.
      </p>

      <button
        class="btn full"
        id="againTest"
      >
        إعادة الاختبار
      </button>

      <button
        class="btn secondary full"
        id="backTestList"
      >
        العودة إلى الاختبارات
      </button>

    </div>
  `);

  $("#againTest").onclick =
    () =>
      startTest(
        currentTest.id
      );

  $("#backTestList").onclick =
    () => tests();
}


/* =========================================================
   PROFILE
========================================================= */

function profile() {

  layout(`
    <div class="section-title">

      <h2>
        مساحتي الشخصية
      </h2>

      <p class="micro">
        مكانك الخاص لمتابعة رحلتك مع ذاتك.
      </p>

    </div>

    <div class="card">

      <span class="pill">
        حسابي
      </span>

      <h3>
        مرحبًا بكِ في مساحتكِ 🌷
      </h3>

      <p>
        يمكنك العودة إلى الاختبارات والمحتوى
        والمحادثة في أي وقت.
      </p>

      <button
        class="btn full"
        id="profileTests"
      >
        اختباراتي
      </button>

      <button
        class="btn secondary full"
        id="profileChat"
      >
        محادثة Féminine Mind AI
      </button>

    </div>


    <div class="card">

      <span class="pill premium">
        Premium
      </span>

      <h3>
        المحتوى المتقدم
      </h3>

      <p>
        محتوى أعمق وتمارين متقدمة لفهم الذات
        والعلاقات والأنوثة.
      </p>

      <button
        class="btn full"
        id="advancedContent"
      >
        فتح المحتوى المتقدم
      </button>

    </div>


    <div class="card">

      <span class="pill">
        جلسات
      </span>

      <h3>
        الحجز مع المؤسسة
      </h3>

      <p>
        يمكنك من هنا الوصول إلى معلومات الجلسات
        وخيارات التواصل والحجز.
      </p>

      <button
        class="btn full"
        id="bookingBtn"
      >
        جلسات وحجز
      </button>

    </div>


    <div class="card">

      <span class="pill premium">
        Founder Admin
      </span>

      <h3>
        لوحة الإدارة
      </h3>

      <p>
        إدارة المقالات والتوكيدات والمنتجات والخدمات.
      </p>

      <button
        class="btn full"
        id="adminPanel"
      >
        👑 فتح لوحة الإدارة
      </button>

    </div>


    <div class="card">

      <h3>
        الخصوصية
      </h3>

      <p class="micro">
        البيانات المحلية التي تحفظها المنصة
        في هذا المتصفح تبقى في مساحة التخزين
        المحلية للجهاز.
      </p>

      <button
        class="btn secondary full"
        id="clearChat"
      >
        مسح سجل المحادثة
      </button>

    </div>
  `);


  $("#profileTests").onclick =
    () => go("tests");

  $("#profileChat").onclick =
    () => go("chat");

  $("#advancedContent").onclick =
    () => advancedContent();

  $("#bookingBtn").onclick =
    () => bookingPage();

  $("#adminPanel").onclick =
    () => {
      window.location.href =
        "admin.html";
    };

  $("#clearChat").onclick =
    () => {

      localStorage.removeItem(
        "fm_chat_history"
      );

      toast(
        "تم مسح سجل المحادثة."
      );

    };
}


/* =========================================================
   ADVANCED CONTENT
========================================================= */

function advancedContent() {

  layout(`
    <button
      class="btn secondary"
      id="backProfile"
    >
      ← العودة إلى حسابي
    </button>

    <div
      class="section-title"
      style="margin-top:20px"
    >
      <h2>
        المحتوى المتقدم ✨
      </h2>
    </div>

    <div class="card">

      <span class="pill premium">
        Premium
      </span>

      <h3>
        رحلة أعمق إلى الذات
      </h3>

      <p>
        هذا القسم مخصص للمحتوى المتقدم في Féminine Mind:
        الوعي الذاتي، الحدود، التعلق، العلاقات،
        وتنظيم المشاعر.
      </p>

    </div>

    <div class="card">

      <span class="pill">
        تمرين متقدم
      </span>

      <h3>
        خريطة الاحتياج العاطفي
      </h3>

      <p>
        اكتبي موقفًا عاطفيًا يتكرر لديك، ثم حددي:
        ماذا حدث؟ ماذا شعرتِ؟ ماذا احتجتِ؟
        وما الطريقة الصحية للتعبير عن هذا الاحتياج؟
      </p>

      <textarea
        id="advancedNote"
        class="input"
        rows="7"
        placeholder="اكتبي تأملك هنا..."
      ></textarea>

      <button
        class="btn full"
        id="saveAdvanced"
      >
        حفظ التأمل
      </button>

    </div>
  `);

  $("#backProfile").onclick =
    () => go("profile");

  $("#saveAdvanced").onclick =
    () => {

      const value =
        $("#advancedNote")
          ?.value
          .trim();

      if (!value) {
        toast(
          "اكتبي تأملكِ أولًا 🌷"
        );
        return;
      }

      localStorage.setItem(
        "fm_advanced_note",
        value
      );

      toast(
        "تم حفظ التأمل 🌷"
      );

    };
}


/* =========================================================
   BOOKING
========================================================= */

function bookingPage() {

  const servicesList =
    getVisibleServices();

  layout(`
    <button
      class="btn secondary"
      id="backProfileBooking"
    >
      ← العودة إلى حسابي
    </button>

    <div
      class="section-title"
      style="margin-top:20px"
    >
      <h2>
        جلسات مع Féminine Mind
      </h2>
    </div>

    ${
      servicesList.length
        ? `
          ${servicesList.map(
            (service) => `
              <div class="card">

                <span class="pill">
                  💗 خدمة
                </span>

                <h3>
                  ${escapeHTML(service.name)}
                </h3>

                <p>
                  ${escapeHTML(service.description)}
                </p>

                <button
                  class="btn full bookingService"
                  data-id="${escapeHTML(service.id)}"
                >
                  طلب هذه الخدمة
                </button>

              </div>
            `
          ).join("")}
        `
        : `
          <div class="card">

            <p>
              لا توجد خدمات منشورة حاليًا.
            </p>

          </div>
        `
    }
  `);


  $("#backProfileBooking").onclick =
    () => go("profile");


  document
    .querySelectorAll(".bookingService")
    .forEach((btn) => {

      btn.onclick = () => {

        const service =
          getServices().find(
            (item) =>
              String(item.id) ===
              String(btn.dataset.id)
          );

        if (!service) return;

        localStorage.setItem(
          "fm_booking_request",
          JSON.stringify({
            serviceId: service.id,
            serviceName: service.name,
            date: new Date().toISOString()
          })
        );

        toast(
          "تم تسجيل رغبتك في الحجز 🌷"
        );

      };

    });
}


/* =========================================================
   RENDER
========================================================= */

function render() {

  const pages = {
    home,
    chat,
    library,
    tests,
    profile,
    exercise: exercisePage,
    advanced: advancedContent,
    booking: bookingPage,
    store,
    services
  };

  const page =
    pages[state.route] ||
    home;

  page();
}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {

  document.body.classList.toggle(
    "dark"
  );

  const isDark =
    document.body.classList.contains(
      "dark"
    );

  localStorage.setItem(
    "fm_dark",
    isDark
      ? "true"
      : "false"
  );

  toast(
    isDark
      ? "تم تفعيل الوضع الليلي 🌙"
      : "تم تفعيل الوضع النهاري ☀️"
  );
}


/* =========================================================
   START
========================================================= */

load();

if (
  localStorage.getItem(
    "fm_dark"
  ) === "true"
) {
  document.body.classList.add(
    "dark"
  );
}

window.addEventListener(
  "hashchange",
  () => {

    state.route =
      location.hash.slice(1) ||
      "home";

    render();

  }
);

$("#themeBtn")?.addEventListener(
  "click",
  toggleTheme
);

render();
```
