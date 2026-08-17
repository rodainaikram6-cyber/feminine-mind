const root = document.querySelector("#admin");
const KEY = "fm_state";
const PRODUCTS_KEY = "fm_products";

/* =========================
   FOUNDER PROFILE
========================= */

const founder = {
  role: "Founder / Admin",
  brand: "Féminine Mind",
  website: "https://f-mind.netlify.app/",
  email: "",
  phone: "",
  country: ""
};

/* =========================
   DEFAULT PRODUCTS
========================= */

const defaultProducts = [
  {
    id: 1,
    type: "دورات",
    title: "الدورات التدريبية",
    description: "برامج تدريبية متكاملة في الوعي الذاتي والعلاقات والأنوثة.",
    price: 0,
    oldPrice: 0,
    access: "مدفوع",
    status: "مسودة"
  },
  {
    id: 2,
    type: "كتب",
    title: "الكتب الإلكترونية",
    description: "كتب رقمية تساعد المرأة على فهم ذاتها وبناء حياة أكثر وعيًا.",
    price: 0,
    oldPrice: 0,
    access: "مدفوع",
    status: "مسودة"
  },
  {
    id: 3,
    type: "Workbooks",
    title: "الملفات والـ Workbooks",
    description: "ملفات وتمارين عملية قابلة للتحميل والاستخدام.",
    price: 0,
    oldPrice: 0,
    access: "مدفوع",
    status: "مسودة"
  },
  {
    id: 4,
    type: "Premium",
    title: "عضوية Premium",
    description: "محتوى وتجارب متقدمة ومزايا خاصة للمشتركات.",
    price: 0,
    oldPrice: 0,
    access: "Premium",
    status: "مسودة"
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

function getProducts() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "null"
    );

    if (Array.isArray(saved)) {
      return saved;
    }

    return defaultProducts;
  } catch {
    return defaultProducts;
  }
}

function saveProducts(products) {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
}

/* =========================
   ESCAPE HTML
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

  document.querySelector("#loginBtn").onclick = login;

  document.querySelector("#backHome").onclick = () => {
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
  const products = getProducts();

  const articleCount = Array.isArray(state.articles)
    ? state.articles.length
    : 0;

  const affirmationCount = Array.isArray(state.affirmations)
    ? state.affirmations.length
    : 0;

  root.innerHTML = `

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
      <h2>👑 ملف المؤسسة</h2>
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

    </div>


    <!-- OVERVIEW -->

    <div class="section-title">
      <h2>📊 نظرة عامة</h2>
    </div>

    <div class="grid">

      <div class="card">
        <span class="pill">المقالات</span>
        <h3>${articleCount}</h3>
        <p>عدد المقالات الحالية</p>
      </div>

      <div class="card">
        <span class="pill">التوكيدات</span>
        <h3>${affirmationCount}</h3>
        <p>عدد التوكيدات الحالية</p>
      </div>

      <div class="card">
        <span class="pill premium">المنتجات</span>
        <h3>${products.length}</h3>
        <p>عدد المنتجات في المتجر</p>
      </div>

      <div class="card">
        <span class="pill">الخدمات</span>
        <h3>4</h3>
        <p>خدمات قابلة للتحويل إلى مصادر دخل</p>
      </div>

    </div>


    <!-- STORE -->

    <div class="section-title">
      <h2>🛍️ متجر Féminine Mind</h2>
    </div>

    <div class="card">

      <p>
        من هنا يمكنكِ إدارة المنتجات الرقمية التي
        سيتم عرضها وبيعها مستقبلًا داخل المنصة.
      </p>

      <span class="pill premium">
        متجر جاهز للتطوير
      </span>

    </div>


    <!-- ADD PRODUCT -->

    <div class="section-title">
      <h2>➕ إضافة منتج</h2>
    </div>

    <div class="card">

      <div class="field">
        <label>اسم المنتج</label>

        <input
          id="productTitle"
          class="input"
          placeholder="مثال: دورة حب الذات"
        >
      </div>


      <div class="field">
        <label>نوع المنتج</label>

        <select
          id="productType"
          class="input"
        >
          <option value="دورات">🎓 دورة تدريبية</option>
          <option value="كتب">📚 كتاب إلكتروني</option>
          <option value="Workbooks">📄 Workbook</option>
          <option value="Premium">💎 Premium</option>
          <option value="باقات">🎁 باقة</option>
        </select>
      </div>


      <div class="field">
        <label>وصف المنتج</label>

        <textarea
          id="productDescription"
          class="input"
          rows="4"
          placeholder="اكتبي وصفًا مختصرًا للمنتج..."
        ></textarea>
      </div>


      <div class="field">
        <label>السعر</label>

        <input
          id="productPrice"
          class="input"
          type="number"
          min="0"
          placeholder="مثال: 2500"
        >
      </div>


      <div class="field">
        <label>السعر قبل الخصم</label>

        <input
          id="productOldPrice"
          class="input"
          type="number"
          min="0"
          placeholder="اختياري"
        >
      </div>


      <div class="field">
        <label>نوع الوصول</label>

        <select
          id="productAccess"
          class="input"
        >
          <option value="مدفوع">💰 مدفوع</option>
          <option value="مجاني">🆓 مجاني</option>
          <option value="Premium">💎 Premium</option>
        </select>
      </div>


      <div class="field">
        <label>حالة المنتج</label>

        <select
          id="productStatus"
          class="input"
        >
          <option value="مسودة">مسودة</option>
          <option value="منشور">منشور</option>
        </select>
      </div>


      <button
        class="btn full"
        id="addProductBtn"
      >
        حفظ المنتج
      </button>

    </div>


    <!-- PRODUCTS -->

    <div class="section-title">
      <h2>📦 المنتجات الحالية</h2>
    </div>

    <div class="list">

      ${
        products.length
          ? products
              .map(
                product => `
                  <div class="card">

                    <span class="pill">
                      ${esc(product.type)}
                    </span>

                    <h3>
                      ${esc(product.title)}
                    </h3>

                    <p>
                      ${esc(product.description)}
                    </p>

                    <p>
                      السعر:
                      <strong>
                        ${Number(product.price || 0)}
                      </strong>
                    </p>

                    ${
                      Number(product.oldPrice || 0) > 0
                        ? `
                          <p>
                            السعر السابق:
                            <del>
                              ${Number(product.oldPrice)}
                            </del>
                          </p>
                        `
                        : ""
                    }

                    <p>
                      الوصول:
                      ${esc(product.access)}
                    </p>

                    <span class="pill ${
                      product.status === "منشور"
                        ? ""
                        : "premium"
                    }">
                      ${esc(product.status)}
                    </span>

                    <button
                      class="btn secondary full deleteProduct"
                      data-id="${product.id}"
                    >
                      🗑️ حذف المنتج
                    </button>

                  </div>
                `
              )
              .join("")
          : `
            <div class="card">
              <p>
                لا توجد منتجات.
              </p>
            </div>
          `
      }

    </div>


    <!-- SERVICES -->

    <div class="section-title">
      <h2>💗 الخدمات المدفوعة</h2>
    </div>

    <div class="list">

      <div class="card">
        <h3>💗 الجلسات الفردية</h3>
        <span class="pill">جاهز للتوسع</span>
      </div>

      <div class="card">
        <h3>💑 جلسات العلاقات</h3>
        <span class="pill">جاهز للتوسع</span>
      </div>

      <div class="card">
        <h3>👩‍🏫 ورش العمل</h3>
        <span class="pill">جاهز للتوسع</span>
      </div>

      <div class="card">
        <h3>🎁 الباقات والبرامج</h3>
        <span class="pill">جاهز للتوسع</span>
      </div>

    </div>


    <!-- REVENUE -->

    <div class="section-title">
      <h2>💎 مصادر الدخل المقترحة</h2>
    </div>

    <div class="card">

      <p>
        🎓 الدورات التدريبية
      </p>

      <p>
        📚 الكتب الإلكترونية
      </p>

      <p>
        📄 Workbooks والملفات
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


    <!-- CONTENT -->

    <div class="section-title">
      <h2>📝 إدارة المحتوى</h2>
    </div>


    <div class="card">

      <h3>إضافة مقال</h3>

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


    <div class="card">

      <h3>إضافة توكيد</h3>

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
      <h2>📚 المقالات الحالية</h2>
    </div>

    <div class="list">

      ${
        state.articles && state.articles.length
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


    <!-- FUTURE -->

    <div class="section-title">
      <h2>🚀 مراحل تحقيق الدخل</h2>
    </div>

    <div class="card">

      <p>
        ✅ المرحلة الحالية: بناء المحتوى والهوية والمنصة.
      </p>

      <p>
        🔜 المرحلة التالية: بناء متجر المنتجات الرقمية.
      </p>

      <p>
        🔜 بعدها: صفحات بيع الدورات والكتب والـWorkbooks.
      </p>

      <p>
        🔜 بعدها: نظام الاشتراكات والعضوية Premium.
      </p>

      <p>
        🔜 ثم: نظام الدفع والحجوزات والفواتير.
      </p>

      <p>
        🔜 ثم: لوحة المبيعات والإيرادات والتحليلات.
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
   EVENTS
========================= */

function bindDashboard() {

  document
    .querySelector("#addProductBtn")
    ?.addEventListener(
      "click",
      addProduct
    );

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
    .querySelectorAll(".deleteProduct")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          deleteProduct(id);

        }
      );

    });


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
   ADD PRODUCT
========================= */

function addProduct() {

  const title =
    document
      .querySelector("#productTitle")
      ?.value
      .trim();

  const type =
    document
      .querySelector("#productType")
      ?.value;

  const description =
    document
      .querySelector("#productDescription")
      ?.value
      .trim();

  const price =
    Number(
      document
        .querySelector("#productPrice")
        ?.value || 0
    );

  const oldPrice =
    Number(
      document
        .querySelector("#productOldPrice")
        ?.value || 0
    );

  const access =
    document
      .querySelector("#productAccess")
      ?.value;

  const status =
    document
      .querySelector("#productStatus")
      ?.value;


  if (!title) {
    alert("اكتبي اسم المنتج أولًا.");
    return;
  }

  if (!description) {
    alert("اكتبي وصف المنتج أولًا.");
    return;
  }


  const products = getProducts();

  products.unshift({

    id: Date.now(),

    type,

    title,

    description,

    price,

    oldPrice,

    access,

    status

  });


  saveProducts(products);

  dashboard();
}

/* =========================
   DELETE PRODUCT
========================= */

function deleteProduct(id) {

  const products =
    getProducts();

  const updated =
    products.filter(
      product =>
        product.id !== id
    );

  saveProducts(updated);

  dashboard();
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
