/* =========================================================
   FÉMININE MIND — ADMIN DASHBOARD
   FIXED CONTENT STORAGE VERSION
========================================================= */

const root = document.querySelector("#admin");

const STATE_KEY = "fm_state";
const PRODUCTS_KEY = "fm_products";
const SERVICES_KEY = "fm_services";
const ADMIN_KEY = "fm_admin";

/* =========================================================
   DEFAULT CONTENT
   هذا المحتوى الأساسي مطابق للمحتوى الموجود في app.js
========================================================= */

const DEFAULT_ARTICLES = [
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
];

const DEFAULT_AFFIRMATIONS = [
  "أستطيع أن أسمع احتياجاتي وأن أتعامل معها باحترام.",
  "قيمتي لا تتحدد بمدى قبول الآخرين لي.",
  "يمكنني أن أضع حدودًا واضحة دون أن أتخلى عن لطفي.",
  "أمنح نفسي وقتًا ومساحة قبل اتخاذ القرار.",
  "أنا أستحق علاقة آمنة ومحترمة.",
  "يمكنني التعبير عن احتياجاتي دون خوف.",
  "لا أحتاج إلى إرضاء الجميع كي أكون جديرة بالحب.",
  "أسمح لنفسي أن أكون صادقة مع مشاعري."
];

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const DEFAULT_PRODUCTS = [
  {
    id: "courses",
    name: "الدورات التدريبية",
    type: "دورة تدريبية",
    description:
      "برامج تدريبية متكاملة في الوعي الذاتي والعلاقات والأنوثة.",
    price: 0,
    oldPrice: 0,
    access: "paid",
    status: "draft",
    visible: true,
    slug: "courses"
  },
  {
    id: "books",
    name: "الكتب الإلكترونية",
    type: "كتاب إلكتروني",
    description:
      "كتب رقمية تساعد المرأة على فهم ذاتها وبناء حياة أكثر وعيًا.",
    price: 0,
    oldPrice: 0,
    access: "paid",
    status: "draft",
    visible: true,
    slug: "books"
  },
  {
    id: "workbooks",
    name: "الملفات والـ Workbooks",
    type: "Workbook",
    description:
      "ملفات وتمارين عملية قابلة للتحميل والاستخدام.",
    price: 0,
    oldPrice: 0,
    access: "paid",
    status: "draft",
    visible: true,
    slug: "workbooks"
  },
  {
    id: "premium",
    name: "عضوية Premium",
    type: "Premium",
    description:
      "محتوى وتجارب متقدمة ومزايا خاصة للمشتركات.",
    price: 0,
    oldPrice: 0,
    access: "premium",
    status: "draft",
    visible: true,
    slug: "premium"
  }
];

/* =========================================================
   DEFAULT SERVICES
========================================================= */

const DEFAULT_SERVICES = [
  {
    id: "individual",
    name: "الجلسات الفردية",
    description:
      "جلسات فردية لدعم الوعي الذاتي والنمو الشخصي.",
    status: "جاهز للتوسع"
  },
  {
    id: "relationships",
    name: "جلسات العلاقات",
    description:
      "جلسات متخصصة لفهم العلاقات والاحتياجات والحدود.",
    status: "جاهز للتوسع"
  },
  {
    id: "workshops",
    name: "ورش العمل",
    description:
      "ورش وبرامج جماعية حول الوعي الذاتي والعلاقات والأنوثة.",
    status: "جاهز للتوسع"
  },
  {
    id: "packages",
    name: "الباقات والبرامج",
    description:
      "برامج متكاملة تجمع بين المحتوى والتدريب والجلسات.",
    status: "جاهز للتوسع"
  }
];

/* =========================================================
   HELPERS
========================================================= */

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function money(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function generateSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function accessLabel(value) {
  return {
    paid: "💰 مدفوع",
    free: "🆓 مجاني",
    premium: "💎 Premium"
  }[value] || value;
}

function statusLabel(value) {
  return {
    draft: "مسودة",
    published: "منشور",
    archived: "مؤرشف"
  }[value] || value;
}

/* =========================================================
   STATE
========================================================= */

function getState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STATE_KEY) || "null"
    );

    /*
      إذا لم توجد الحالة أو كانت فارغة،
      نعيد المحتوى الأساسي بدل إظهار 0.
    */

    if (!saved) {
      const initialState = {
        articles: [...DEFAULT_ARTICLES],
        affirmations: [...DEFAULT_AFFIRMATIONS]
      };

      saveState(initialState);
      return initialState;
    }

    const articles =
      Array.isArray(saved.articles) && saved.articles.length
        ? saved.articles
        : [...DEFAULT_ARTICLES];

    const affirmations =
      Array.isArray(saved.affirmations) &&
      saved.affirmations.length
        ? saved.affirmations
        : [...DEFAULT_AFFIRMATIONS];

    const state = {
      articles,
      affirmations
    };

    /*
      مهم جدًا:
      إذا كانت البيانات القديمة فارغة،
      يتم إصلاحها وحفظها فورًا.
    */

    saveState(state);

    return state;

  } catch (error) {

    const state = {
      articles: [...DEFAULT_ARTICLES],
      affirmations: [...DEFAULT_AFFIRMATIONS]
    };

    saveState(state);

    return state;
  }
}

function saveState(state) {
  localStorage.setItem(
    STATE_KEY,
    JSON.stringify({
      articles: state.articles || [],
      affirmations: state.affirmations || []
    })
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function getProducts() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "null"
    );

    if (Array.isArray(saved) && saved.length) {
      return saved;
    }

  } catch (error) {}

  const products = [...DEFAULT_PRODUCTS];

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );

  return products;
}

function saveProducts(products) {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
}

/* =========================================================
   SERVICES
========================================================= */

function getServices() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(SERVICES_KEY) || "null"
    );

    if (Array.isArray(saved) && saved.length) {
      return saved;
    }

  } catch (error) {}

  localStorage.setItem(
    SERVICES_KEY,
    JSON.stringify(DEFAULT_SERVICES)
  );

  return [...DEFAULT_SERVICES];
}

/* =========================================================
   LOGIN
========================================================= */

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
        إدارة المحتوى والمنتجات والخدمات.
      </p>

      <div class="field">
        <label>رمز الدخول</label>

        <input
          id="adminPassword"
          class="input"
          type="password"
          placeholder="أدخلي رمز الدخول"
        >
      </div>

      <button
        class="btn full"
        id="loginButton"
      >
        دخول إلى لوحة الإدارة
      </button>

      <button
        class="btn secondary full"
        id="homeButton"
      >
        العودة إلى المنصة
      </button>

    </div>
  `;

  document.querySelector("#loginButton").onclick = login;

  document.querySelector("#homeButton").onclick = () => {
    location.href = "index.html";
  };

  document
    .querySelector("#adminPassword")
    .addEventListener("keydown", event => {

      if (event.key === "Enter") {
        login();
      }

    });
}

function login() {

  const password =
    document.querySelector("#adminPassword")?.value || "";

  if (password === "FEMININE") {

    sessionStorage.setItem(
      ADMIN_KEY,
      "1"
    );

    dashboard();

  } else {

    alert("رمز الدخول غير صحيح.");

  }
}

/* =========================================================
   DASHBOARD
========================================================= */

function dashboard() {

  const state = getState();
  const products = getProducts();
  const services = getServices();

  root.innerHTML = `

    <div class="hero">

      <span class="eyebrow">
        Founder Dashboard
      </span>

      <h1>
        لوحة إدارة Féminine Mind
      </h1>

      <p>
        إدارة المحتوى والمنتجات والخدمات من مكان واحد.
      </p>

    </div>

    <div class="section-title">
      <h2>👑 المؤسسة</h2>
    </div>

    <div class="card">

      <span class="pill premium">
        Founder / Admin
      </span>

      <h3>
        Féminine Mind
      </h3>

      <p>
        <strong>المنصة:</strong>
        f-mind.netlify.app
      </p>

    </div>

    <div class="section-title">
      <h2>📊 نظرة عامة</h2>
    </div>

    <div class="grid">

      <div class="card">
        <span class="pill">المقالات</span>
        <h2>${state.articles.length}</h2>
        <p>عدد المقالات</p>
      </div>

      <div class="card">
        <span class="pill">التوكيدات</span>
        <h2>${state.affirmations.length}</h2>
        <p>عدد التوكيدات</p>
      </div>

      <div class="card">
        <span class="pill">المنتجات</span>
        <h2>${products.length}</h2>
        <p>عدد المنتجات</p>
      </div>

      <div class="card">
        <span class="pill">الخدمات</span>
        <h2>${services.length}</h2>
        <p>عدد الخدمات</p>
      </div>

    </div>

    <!-- PRODUCTS -->

    <div class="section-title">
      <h2>🛍️ إضافة منتج</h2>
    </div>

    <div class="card">

      <div class="field">
        <label>اسم المنتج</label>

        <input
          id="productName"
          class="input"
          placeholder="مثال: دورة حب الذات"
        >
      </div>

      <div class="field">
        <label>نوع المنتج</label>

        <select id="productType" class="input">

          <option value="دورة تدريبية">
            🎓 دورة تدريبية
          </option>

          <option value="كتاب إلكتروني">
            📚 كتاب إلكتروني
          </option>

          <option value="Workbook">
            📄 Workbook
          </option>

          <option value="Premium">
            💎 Premium
          </option>

        </select>
      </div>

      <div class="field">
        <label>الوصف</label>

        <textarea
          id="productDescription"
          class="input"
          rows="4"
        ></textarea>
      </div>

      <div class="field">
        <label>السعر</label>

        <input
          id="productPrice"
          class="input"
          type="number"
          min="0"
        >
      </div>

      <div class="field">
        <label>السعر قبل الخصم</label>

        <input
          id="productOldPrice"
          class="input"
          type="number"
          min="0"
        >
      </div>

      <div class="field">
        <label>نوع الوصول</label>

        <select id="productAccess" class="input">

          <option value="paid">
            💰 مدفوع
          </option>

          <option value="free">
            🆓 مجاني
          </option>

          <option value="premium">
            💎 Premium
          </option>

        </select>
      </div>

      <div class="field">
        <label>الحالة</label>

        <select id="productStatus" class="input">

          <option value="draft">
            مسودة
          </option>

          <option value="published">
            منشور
          </option>

          <option value="archived">
            مؤرشف
          </option>

        </select>
      </div>

      <div class="field">
        <label>Slug</label>

        <input
          id="productSlug"
          class="input"
          placeholder="self-love-course"
        >
      </div>

      <label>

        <input
          id="productVisible"
          type="checkbox"
          checked
        >

        إظهار المنتج

      </label>

      <button
        class="btn full"
        id="saveProduct"
      >
        💾 حفظ المنتج
      </button>

    </div>

    <!-- CURRENT PRODUCTS -->

    <div class="section-title">
      <h2>📦 المنتجات الحالية</h2>
    </div>

    <div class="list">

      ${
        products.length

          ? products.map(product => `

            <div class="card">

              <span class="pill">
                ${esc(product.type)}
              </span>

              <h3>
                ${esc(product.name)}
              </h3>

              <p>
                ${esc(product.description)}
              </p>

              <p>
                <strong>السعر:</strong>
                ${money(product.price)}
              </p>

              <p>
                <strong>الوصول:</strong>
                ${esc(accessLabel(product.access))}
              </p>

              <p>
                <strong>الحالة:</strong>
                ${esc(statusLabel(product.status))}
              </p>

              <p>
                <strong>الظهور:</strong>
                ${
                  product.visible !== false
                    ? "👁️ ظاهر"
                    : "🙈 مخفي"
                }
              </p>

              <button
                class="btn full editProduct"
                data-id="${esc(product.id)}"
              >
                ✏️ تعديل
              </button>

              <button
                class="btn secondary full deleteProduct"
                data-id="${esc(product.id)}"
              >
                🗑️ حذف
              </button>

            </div>

          `).join("")

          : `

            <div class="card">
              لا توجد منتجات.
            </div>

          `
      }

    </div>

    <!-- ADD ARTICLE -->

    <div class="section-title">
      <h2>📝 إضافة مقال</h2>
    </div>

    <div class="card">

      <div class="field">

        <label>العنوان</label>

        <input
          id="title"
          class="input"
          placeholder="عنوان المقال"
        >

      </div>

      <div class="field">

        <label>التصنيف</label>

        <input
          id="cat"
          class="input"
          value="الوعي الذاتي"
        >

      </div>

      <div class="field">

        <label>المحتوى</label>

        <textarea
          id="text"
          class="input"
          rows="7"
        ></textarea>

      </div>

      <label>

        <input
          id="free"
          type="checkbox"
          checked
        >

        محتوى مجاني

      </label>

      <button
        class="btn full"
        id="saveArticle"
      >
        💾 حفظ المقال
      </button>

    </div>

    <!-- ADD AFFIRMATION -->

    <div class="section-title">
      <h2>🌷 إضافة توكيد</h2>
    </div>

    <div class="card">

      <input
        id="affirm"
        class="input"
        placeholder="اكتبي التوكيد"
      >

      <button
        class="btn full"
        id="saveAffirm"
      >
        💾 حفظ التوكيد
      </button>

    </div>

    <!-- CURRENT ARTICLES -->

    <div class="section-title">
      <h2>📚 المقالات الحالية</h2>
    </div>

    <div class="list">

      ${
        state.articles.length

          ? state.articles.map(article => `

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
                class="btn secondary full deleteArticle"
                data-id="${esc(article.id)}"
              >
                🗑️ حذف المقال
              </button>

            </div>

          `).join("")

          : `

            <div class="card">
              لا توجد مقالات.
            </div>

          `
      }

    </div>

    <!-- AFFIRMATIONS -->

    <div class="section-title">
      <h2>🌷 التوكيدات الحالية</h2>
    </div>

    <div class="list">

      ${
        state.affirmations.length

          ? state.affirmations.map((affirmation, index) => `

            <div class="card">

              <span class="pill">
                توكيد ${index + 1}
              </span>

              <p class="quote">
                ${esc(affirmation)}
              </p>

              <button
                class="btn secondary full deleteAffirm"
                data-index="${index}"
              >
                🗑️ حذف التوكيد
              </button>

            </div>

          `).join("")

          : `

            <div class="card">
              لا توجد توكيدات.
            </div>

          `
      }

    </div>

    <!-- SERVICES -->

    <div class="section-title">
      <h2>💗 الخدمات</h2>
    </div>

    <div class="grid">

      ${services.map(service => `

        <div class="card">

          <span class="pill">
            💗 خدمة
          </span>

          <h3>
            ${esc(service.name)}
          </h3>

          <p>
            ${esc(service.description)}
          </p>

          <span class="pill">
            ${esc(service.status)}
          </span>

        </div>

      `).join("")}

    </div>

    <!-- INCOME -->

    <div class="section-title">
      <h2>🚀 مصادر الدخل</h2>
    </div>

    <div class="card">

      <p>🎓 الدورات التدريبية</p>
      <p>📚 الكتب الإلكترونية</p>
      <p>📄 Workbooks</p>
      <p>💎 Premium</p>
      <p>💗 الجلسات الفردية</p>
      <p>💑 جلسات العلاقات</p>
      <p>👩‍🏫 ورش العمل</p>
      <p>🎁 الباقات</p>

    </div>

    <button
      class="btn secondary full"
      id="logout"
    >
      تسجيل الخروج
    </button>

    <button
      class="btn full"
      id="backHome"
    >
      العودة إلى المنصة
    </button>

  `;

  bindDashboardEvents();
}

/* =========================================================
   EVENTS
========================================================= */

function bindDashboardEvents() {

  document
    .querySelector("#saveProduct")
    ?.addEventListener("click", addProduct);

  document
    .querySelector("#saveArticle")
    ?.addEventListener("click", addArticle);

  document
    .querySelector("#saveAffirm")
    ?.addEventListener("click", addAffirm);

  document
    .querySelectorAll(".editProduct")
    .forEach(button => {

      button.onclick = () =>
        editProduct(button.dataset.id);

    });

  document
    .querySelectorAll(".deleteProduct")
    .forEach(button => {

      button.onclick = () =>
        deleteProduct(button.dataset.id);

    });

  document
    .querySelectorAll(".deleteArticle")
    .forEach(button => {

      button.onclick = () =>
        deleteArticle(button.dataset.id);

    });

  document
    .querySelectorAll(".deleteAffirm")
    .forEach(button => {

      button.onclick = () =>
        deleteAffirm(button.dataset.index);

    });

  document
    .querySelector("#logout")
    ?.addEventListener("click", () => {

      sessionStorage.removeItem(ADMIN_KEY);

      showLogin();

    });

  document
    .querySelector("#backHome")
    ?.addEventListener("click", () => {

      location.href = "index.html";

    });
}

/* =========================================================
   ADD PRODUCT
========================================================= */

function addProduct() {

  const name =
    document
      .querySelector("#productName")
      ?.value.trim();

  if (!name) {

    alert("اكتبي اسم المنتج أولًا.");

    return;
  }

  const products = getProducts();

  let slug =
    document
      .querySelector("#productSlug")
      ?.value.trim();

  if (!slug) {
    slug = generateSlug(name);
  }

  products.unshift({

    id: "product-" + Date.now(),

    name,

    type:
      document
        .querySelector("#productType")
        ?.value || "منتج رقمي",

    description:
      document
        .querySelector("#productDescription")
        ?.value.trim() ||
      "منتج رقمي من Féminine Mind.",

    price:
      Number(
        document
          .querySelector("#productPrice")
          ?.value || 0
      ),

    oldPrice:
      Number(
        document
          .querySelector("#productOldPrice")
          ?.value || 0
      ),

    access:
      document
        .querySelector("#productAccess")
        ?.value || "paid",

    status:
      document
        .querySelector("#productStatus")
        ?.value || "draft",

    visible:
      document
        .querySelector("#productVisible")
        ?.checked !== false,

    slug

  });

  saveProducts(products);

  alert("تم حفظ المنتج بنجاح 🌷");

  dashboard();
}

/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(id) {

  const products = getProducts();

  const product =
    products.find(
      item =>
        String(item.id) === String(id)
    );

  if (!product) {

    alert("لم يتم العثور على المنتج.");

    return;
  }

  root.innerHTML = `

    <div class="hero">

      <span class="eyebrow">
        Founder Admin
      </span>

      <h1>
        ✏️ تعديل المنتج
      </h1>

      <p>
        ${esc(product.name)}
      </p>

    </div>

    <div class="card">

      <div class="field">

        <label>اسم المنتج</label>

        <input
          id="editName"
          class="input"
          value="${esc(product.name)}"
        >

      </div>

      <div class="field">

        <label>نوع المنتج</label>

        <select
          id="editType"
          class="input"
        >

          <option
            value="دورة تدريبية"
            ${product.type === "دورة تدريبية" ? "selected" : ""}
          >
            🎓 دورة تدريبية
          </option>

          <option
            value="كتاب إلكتروني"
            ${product.type === "كتاب إلكتروني" ? "selected" : ""}
          >
            📚 كتاب إلكتروني
          </option>

          <option
            value="Workbook"
            ${product.type === "Workbook" ? "selected" : ""}
          >
            📄 Workbook
          </option>

          <option
            value="Premium"
            ${product.type === "Premium" ? "selected" : ""}
          >
            💎 Premium
          </option>

        </select>

      </div>

      <div class="field">

        <label>الوصف</label>

        <textarea
          id="editDescription"
          class="input"
          rows="6"
        >${esc(product.description)}</textarea>

      </div>

      <div class="field">

        <label>السعر</label>

        <input
          id="editPrice"
          class="input"
          type="number"
          min="0"
          value="${Number(product.price || 0)}"
        >

      </div>

      <div class="field">

        <label>السعر قبل الخصم</label>

        <input
          id="editOldPrice"
          class="input"
          type="number"
          min="0"
          value="${Number(product.oldPrice || 0)}"
        >

      </div>

      <div class="field">

        <label>الوصول</label>

        <select
          id="editAccess"
          class="input"
        >

          <option
            value="paid"
            ${product.access === "paid" ? "selected" : ""}
          >
            💰 مدفوع
          </option>

          <option
            value="free"
            ${product.access === "free" ? "selected" : ""}
          >
            🆓 مجاني
          </option>

          <option
            value="premium"
            ${product.access === "premium" ? "selected" : ""}
          >
            💎 Premium
          </option>

        </select>

      </div>

      <div class="field">

        <label>الحالة</label>

        <select
          id="editStatus"
          class="input"
        >

          <option
            value="draft"
            ${product.status === "draft" ? "selected" : ""}
          >
            مسودة
          </option>

          <option
            value="published"
            ${product.status === "published" ? "selected" : ""}
          >
            منشور
          </option>

          <option
            value="archived"
            ${product.status === "archived" ? "selected" : ""}
          >
            مؤرشف
          </option>

        </select>

      </div>

      <div class="field">

        <label>Slug</label>

        <input
          id="editSlug"
          class="input"
          value="${esc(product.slug || "")}"
        >

      </div>

      <label>

        <input
          id="editVisible"
          type="checkbox"
          ${product.visible !== false ? "checked" : ""}
        >

        إظهار المنتج

      </label>

      <button
        class="btn full"
        id="updateProduct"
      >
        💾 حفظ التعديلات
      </button>

      <button
        class="btn secondary full"
        id="cancelEdit"
      >
        ← العودة
      </button>

    </div>

  `;

  document
    .querySelector("#updateProduct")
    .onclick = () => {

      const index =
        products.findIndex(
          item =>
            String(item.id) === String(id)
        );

      if (index === -1) return;

      const name =
        document
          .querySelector("#editName")
          ?.value.trim();

      if (!name) {

        alert("اسم المنتج مطلوب.");

        return;
      }

      let slug =
        document
          .querySelector("#editSlug")
          ?.value.trim();

      if (!slug) {
        slug = generateSlug(name);
      }

      products[index] = {

        ...products[index],

        name,

        type:
          document
            .querySelector("#editType")
            ?.value,

        description:
          document
            .querySelector("#editDescription")
            ?.value.trim(),

        price:
          Number(
            document
              .querySelector("#editPrice")
              ?.value || 0
          ),

        oldPrice:
          Number(
            document
              .querySelector("#editOldPrice")
              ?.value || 0
          ),

        access:
          document
            .querySelector("#editAccess")
            ?.value,

        status:
          document
            .querySelector("#editStatus")
            ?.value,

        slug,

        visible:
          document
            .querySelector("#editVisible")
            ?.checked

      };

      saveProducts(products);

      alert("تم تحديث المنتج بنجاح 🌷");

      dashboard();
    };

  document
    .querySelector("#cancelEdit")
    .onclick = dashboard;
}

/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {

  if (!confirm("هل تريدين حذف هذا المنتج؟")) {
    return;
  }

  const products =
    getProducts().filter(
      product =>
        String(product.id) !== String(id)
    );

  saveProducts(products);

  dashboard();
}

/* =========================================================
   ADD ARTICLE
========================================================= */

function addArticle() {

  const state = getState();

  const title =
    document
      .querySelector("#title")
      ?.value.trim();

  const cat =
    document
      .querySelector("#cat")
      ?.value.trim();

  const text =
    document
      .querySelector("#text")
      ?.value.trim();

  const free =
    document
      .querySelector("#free")
      ?.checked;

  if (!title || !text) {

    alert(
      "أضيفي عنوان المقال ومحتواه أولًا."
    );

    return;
  }

  state.articles.unshift({

    id: Date.now(),

    title,

    cat:
      cat || "الوعي الذاتي",

    free:
      Boolean(free),

    date:
      "أضيف من الإدارة",

    text

  });

  saveState(state);

  alert(
    "تم حفظ المقال بنجاح 🌷"
  );

  dashboard();
}

/* =========================================================
   DELETE ARTICLE
========================================================= */

function deleteArticle(id) {

  if (!confirm("هل تريدين حذف هذا المقال؟")) {
    return;
  }

  const state = getState();

  state.articles =
    state.articles.filter(
      article =>
        String(article.id) !== String(id)
    );

  saveState(state);

  dashboard();
}

/* =========================================================
   ADD AFFIRMATION
========================================================= */

function addAffirm() {

  const state = getState();

  const value =
    document
      .querySelector("#affirm")
      ?.value.trim();

  if (!value) {

    alert(
      "اكتبي التوكيد أولًا."
    );

    return;
  }

  state.affirmations.unshift(value);

  saveState(state);

  alert(
    "تم حفظ التوكيد بنجاح 🌷"
  );

  dashboard();
}

/* =========================================================
   DELETE AFFIRMATION
========================================================= */

function deleteAffirm(index) {

  if (!confirm("هل تريدين حذف هذا التوكيد؟")) {
    return;
  }

  const state = getState();

  state.affirmations.splice(
    Number(index),
    1
  );

  /*
    إذا تم حذف جميع التوكيدات،
    نعيد التوكيدات الأساسية حتى لا تصبح المنصة فارغة.
  */

  if (!state.affirmations.length) {
    state.affirmations = [...DEFAULT_AFFIRMATIONS];
  }

  saveState(state);

  dashboard();
}

/* =========================================================
   START
========================================================= */

if (
  sessionStorage.getItem(ADMIN_KEY) === "1"
) {

  dashboard();

} else {

  showLogin();

}
