const root = document.querySelector("#admin");
const KEY = "fm_state";

/* =========================
   BASIC DATA
========================= */

const founder = {
  role: "Founder / Admin",
  brand: "Féminine Mind",
  website: "https://f-mind.netlify.app/",
  email: "",
  phone: "",
  country: ""
};

const products = [
  {
    type: "دورات",
    title: "الدورات التدريبية",
    status: "جاهز للتوسع",
    icon: "🎓"
  },
  {
    type: "كتب",
    title: "الكتب الإلكترونية",
    status: "جاهز للتوسع",
    icon: "📚"
  },
  {
    type: "Workbooks",
    title: "الملفات والـ Workbooks",
    status: "جاهز للتوسع",
    icon: "📄"
  },
  {
    type: "Premium",
    title: "عضوية Premium",
    status: "جاهز للتوسع",
    icon: "💎"
  }
];

const services = [
  {
    title: "الجلسات الفردية",
    status: "جاهز للتوسع",
    icon: "💗"
  },
  {
    title: "جلسات العلاقات",
    status: "جاهز للتوسع",
    icon: "💑"
  },
  {
    title: "ورش العمل",
    status: "جاهز للتوسع",
    icon: "👩‍🏫"
  },
  {
    title: "الباقات والبرامج",
    status: "جاهز للتوسع",
    icon: "🎁"
  }
];

/* =========================
   STORAGE
========================= */

function get() {
  try {
    return (
      JSON.parse(localStorage.getItem(KEY)) || {
        articles: [],
        affirmations: []
      }
    );
  } catch {
    return {
      articles: [],
      affirmations: []
    };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/* =========================
   SECURITY DISPLAY
========================= */

function esc(value) {
  return String(value || "").replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char])
  );
}

/* =========================
   LOGIN
========================= */

if (sessionStorage.getItem("fm_admin") !== "1") {
  showLogin();
} else {
  dashboard();
}

function showLogin() {
  root.innerHTML = `
    <div class="hero">

      <span class="eyebrow">
        Founder Admin
      </span>

      <h1>
        لوحة إدارة Féminine Mind
      </h1>

      <p>
        هذه لوحة الإدارة التجريبية للمؤسسة.
        سيتم لاحقًا ربطها بنظام مصادقة آمن عند
        إضافة نظام الحسابات والدفع الحقيقي.
      </p>

      <div class="field">

        <label>
          رمز الدخول التجريبي
        </label>

        <input
          class="input"
          id="pass"
          type="password"
          placeholder="أدخلي الرمز"
        >

      </div>

      <button
        class="btn full"
        id="loginBtn"
      >
        دخول لوحة الإدارة
      </button>

      <button
        class="btn secondary full"
        id="backHome"
      >
        العودة للمنصة
      </button>

    </div>
  `;

  document.querySelector("#loginBtn").onclick =
    login;

  document.querySelector("#backHome").onclick =
    () => {
      location.href = "index.html";
    };

  document.querySelector("#pass").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        login();
      }
    }
  );
}

function login() {
  const input = document.querySelector("#pass");

  if (!input) return;

  if (input.value === "FEMININE") {
    sessionStorage.setItem("fm_admin", "1");
    dashboard();
  } else {
    alert("رمز الدخول غير صحيح.");
  }
}

/* =========================
   DASHBOARD
========================= */

function dashboard() {
  const state = get();

  const articleCount =
    Array.isArray(state.articles)
      ? state.articles.length
      : 0;

  const affirmationCount =
    Array.isArray(state.affirmations)
      ? state.affirmations.length
      : 0;

  root.innerHTML = `

    <!-- HEADER -->

    <div class="hero">

      <span class="eyebrow">
        Founder Dashboard
      </span>

      <h1>
        لوحة إدارة Féminine Mind
      </h1>

      <p>
        مركز إدارة المحتوى والمنتجات والخدمات
        ومصادر الدخل المستقبلية للمشروع.
      </p>

    </div>


    <!-- FOUNDER PROFILE -->

    <div class="section-title">
      <h2>
        👑 ملف المؤسسة
      </h2>
    </div>

    <div class="card">

      <span class="pill premium">
        ${esc(founder.role)}
      </span>

      <h3>
        ${esc(founder.brand)}
      </h3>

      <p>
        العلامة:
        <strong>${esc(founder.brand)}</strong>
      </p>

      <p>
        الصفة:
        <strong>${esc(founder.role)}</strong>
      </p>

      <p>
        رابط المنصة:
        <a
          href="${esc(founder.website)}"
          target="_blank"
          rel="noopener"
        >
          ${esc(founder.website)}
        </a>
      </p>

      ${
        founder.email
          ? `<p>البريد: ${esc(founder.email)}</p>`
          : ""
      }

      ${
        founder.phone
          ? `<p>الهاتف: ${esc(founder.phone)}</p>`
          : ""
      }

      ${
        founder.country
          ? `<p>الموقع: ${esc(founder.country)}</p>`
          : ""
      }

    </div>


    <!-- OVERVIEW -->

    <div class="section-title">
      <h2>
        📊 نظرة عامة
      </h2>
    </div>

    <div class="grid">

      <div class="card">
        <span class="pill">
          المقالات
        </span>

        <h3>
          ${articleCount}
        </h3>

        <p>
          عدد المقالات الحالية
        </p>
      </div>

      <div class="card">
        <span class="pill">
          التوكيدات
        </span>

        <h3>
          ${affirmationCount}
        </h3>

        <p>
          عدد التوكيدات الحالية
        </p>
      </div>

      <div class="card">
        <span class="pill premium">
          المنتجات
        </span>

        <h3>
          ${products.length}
        </h3>

        <p>
          مصادر منتجات رقمية قابلة للتطوير
        </p>
      </div>

      <div class="card">
        <span class="pill">
          الخدمات
        </span>

        <h3>
          ${services.length}
        </h3>

        <p>
          خدمات قابلة للتحويل إلى مصادر دخل
        </p>
      </div>

    </div>


    <!-- DIGITAL PRODUCTS -->

    <div class="section-title">
      <h2>
        💰 المنتجات الرقمية
      </h2>
    </div>

    <div class="list">

      ${products
        .map(
          product => `
            <div class="card">

              <span style="font-size:28px">
                ${product.icon}
              </span>

              <h3>
                ${esc(product.title)}
              </h3>

              <p>
                النوع:
                ${esc(product.type)}
              </p>

              <span class="pill premium">
                ${esc(product.status)}
              </span>

            </div>
          `
        )
        .join("")}

    </div>


    <!-- SERVICES -->

    <div class="section-title">
      <h2>
        💗 الخدمات المدفوعة
      </h2>
    </div>

    <div class="list">

      ${services
        .map(
          service => `
            <div class="card">

              <span style="font-size:28px">
                ${service.icon}
              </span>

              <h3>
                ${esc(service.title)}
              </h3>

              <span class="pill">
                ${esc(service.status)}
              </span>

            </div>
          `
        )
        .join("")}

    </div>


    <!-- REVENUE MODEL -->

    <div class="section-title">
      <h2>
        💎 مصادر الدخل المقترحة
      </h2>
    </div>

    <div class="card">

      <p>
        يمكن تطوير Féminine Mind مستقبلًا حول عدة
        مصادر دخل متكاملة:
      </p>

      <p>
        🎓 الدورات التدريبية
      </p>

      <p>
        📚 الكتب الإلكترونية
      </p>

      <p>
        📄 Workbooks والملفات العلاجية
      </p>

      <p>
        💎 اشتراك Premium
      </p>

      <p>
        💗 الجلسات الفردية
      </p>

      <p>
        💑 جلسات العلاقات
      </p>

      <p>
        👩‍🏫 ورش العمل والبرامج الجماعية
      </p>

      <p>
        🎁 الباقات والعروض
      </p>

      <p>
        🤝 التسويق بالعمولة مستقبلًا
      </p>

    </div>


    <!-- CONTENT MANAGEMENT -->

    <div class="section-title">
      <h2>
        📝 إدارة المحتوى
      </h2>
    </div>


    <!-- ADD ARTICLE -->

    <div class="card">

      <h3>
        إضافة مقال
      </h3>

      <div class="field">

        <label>
          العنوان
        </label>

        <input
          id="title"
          class="input"
          placeholder="عنوان المقال"
        >

      </div>


      <div class="field">

        <label>
          التصنيف
        </label>

        <input
          id="cat"
          class="input"
          value="الوعي الذاتي"
        >

      </div>


      <div class="field">

        <label>
          المحتوى
        </label>

        <textarea
          id="text"
          class="input"
          rows="6"
          placeholder="اكتبي محتوى المقال هنا..."
        ></textarea>

      </div>


      <label>

        <input
          type="checkbox"
          id="free"
          checked
        >

        محتوى مجاني

      </label>


      <button
        class="btn full"
        id="addArticleBtn"
      >
        حفظ المقال
      </button>

    </div>


    <!-- ADD AFFIRMATION -->

    <div class="card">

      <h3>
        إضافة توكيد
      </h3>

      <input
        id="affirm"
        class="input"
        placeholder="اكتبي التوكيد الجديد"
      >

      <button
        class="btn full"
        id="addAffirmBtn"
      >
        حفظ التوكيد
      </button>

    </div>


    <!-- ARTICLES -->

    <div class="section-title">
      <h2>
        📚 المقالات الحالية
      </h2>
    </div>

    <div class="list">

      ${
        state.articles &&
        state.articles.length
          ? state.articles
              .map(
                article => `
                  <div class="card">

                    <span class="pill">
                      ${
                        article.free
                          ? "مجاني"
                          : "Premium"
                      }
                    </span>

                    <h3>
                      ${esc(article.title)}
                    </h3>

                    <p>
                      ${esc(article.text)}
                    </p>

                    <button
                      class="btn secondary deleteArticle"
                      data-id="${article.id}"
                    >
                      حذف المقال
                    </button>

                  </div>
                `
              )
              .join("")
          : `
            <div class="card">
              <p>
                لا توجد مقالات إضافية مضافة من لوحة الإدارة.
              </p>
            </div>
          `
      }

    </div>


    <!-- FUTURE MONETIZATION -->

    <div class="section-title">
      <h2>
        🚀 مراحل تحقيق الدخل
      </h2>
    </div>

    <div class="card">

      <p>
        المرحلة الحالية:
        بناء المحتوى والهوية والمنصة.
      </p>

      <p>
        المرحلة التالية:
        إضافة المنتجات الرقمية والدورات.
      </p>

      <p>
        بعدها:
        نظام الاشتراكات والعضوية Premium.
      </p>

      <p>
        ثم:
        نظام الدفع والحجوزات والفواتير.
      </p>

      <p>
        ثم:
        لوحة المبيعات والإيرادات والتحليلات.
      </p>

      <span class="pill premium">
        قيد التطوير
      </span>

    </div>


    <!-- ACTIONS -->

    <button
      class="btn secondary full"
      id="logoutBtn"
    >
      تسجيل الخروج
    </button>

    <button
      class="btn full"
      id="homeBtn"
    >
      العودة إلى المنصة
    </button>

  `;

  bindDashboard();
}

/* =========================
   DASHBOARD EVENTS
========================= */

function bindDashboard() {

  document
    .querySelector("#addArticleBtn")
    ?.addEventListener(
      "click",
      addArticle
    );

  document
    .querySelector("#addAffirmBtn")
    ?.addEventListener(
      "click",
      addAffirm
    );

  document
    .querySelector("#logoutBtn")
    ?.addEventListener(
      "click",
      () => {
        sessionStorage.removeItem("fm_admin");
        location.reload();
      }
    );

  document
    .querySelector("#homeBtn")
    ?.addEventListener(
      "click",
      () => {
        location.href = "index.html";
      }
    );

  document
    .querySelectorAll(".deleteArticle")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          deleteArticle(id);

        }
      );

    });
}

/* =========================
   ADD ARTICLE
========================= */

function addArticle() {

  const state = get();

  const title =
    document
      .querySelector("#title")
      ?.value
      .trim();

  const cat =
    document
      .querySelector("#cat")
      ?.value
      .trim();

  const text =
    document
      .querySelector("#text")
      ?.value
      .trim();

  const free =
    document
      .querySelector("#free")
      ?.checked;

  if (!title) {
    alert("اكتبي عنوان المقال أولًا.");
    return;
  }

  if (!text) {
    alert("اكتبي محتوى المقال أولًا.");
    return;
  }

  state.articles.unshift({

    id: Date.now(),

    title,

    cat:
      cat ||
      "الوعي الذاتي",

    free,

    date:
      "أضيف من الإدارة",

    text

  });

  save(state);

  dashboard();
}

/* =========================
   ADD AFFIRMATION
========================= */

function addAffirm() {

  const state = get();

  const input =
    document.querySelector("#affirm");

  if (!input) return;

  const value =
    input.value.trim();

  if (!value) {

    alert(
      "اكتبي التوكيد أولًا."
    );

    return;
  }

  state.affirmations.unshift(
    value
  );

  save(state);

  dashboard();
}

/* =========================
   DELETE ARTICLE
========================= */

function deleteArticle(id) {

  const state = get();

  state.articles =
    state.articles.filter(
      article =>
        article.id !== id
    );

  save(state);

  dashboard();
}
