/* =========================================================
   FÉMININE MIND — ADMIN DASHBOARD
   Founder / Admin
   إدارة المحتوى + المنتجات + الخدمات
========================================================= */

const root = document.querySelector("#admin");

const KEY = "fm_state";
const PRODUCTS_KEY = "fm_products";
const SERVICES_KEY = "fm_services";

/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultProducts = [
  {
    id: "courses",
    name: "الدورات التدريبية",
    type: "دورة تدريبية",
    description:
      "برامج تدريبية متكاملة في الوعي الذاتي والعلاقات والأنوثة.",
    price: 0,
    oldPrice: 0,
    access: "paid",
    status: "draft"
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
    status: "draft"
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
    status: "draft"
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
    status: "draft"
  }
];

const defaultServices = [
  {
    id: "individual",
    name: "الجلسات الفردية",
    description: "جلسات فردية لدعم الوعي الذاتي والنمو الشخصي.",
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
   STORAGE
========================================================= */

function getState() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(KEY)
      ) || {
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

function saveState(data) {
  localStorage.setItem(
    KEY,
    JSON.stringify(data)
  );
}

function getProducts() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY)
    );

    if (
      Array.isArray(saved) &&
      saved.length
    ) {
      return saved;
    }
  } catch {}

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(defaultProducts)
  );

  return [...defaultProducts];
}

function saveProducts(products) {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
}

function getServices() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(SERVICES_KEY)
    );

    if (
      Array.isArray(saved) &&
      saved.length
    ) {
      return saved;
    }
  } catch {}

  localStorage.setItem(
    SERVICES_KEY,
    JSON.stringify(defaultServices)
  );

  return [...defaultServices];
}

/* =========================================================
   HELPERS
========================================================= */

function esc(value) {
  return String(value || "")
    .replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m]));
}

function money(value) {
  const number = Number(value || 0);

  return number.toLocaleString(
    "fr-FR"
  );
}

/* =========================================================
   LOGIN
========================================================= */

if (
  sessionStorage.getItem(
    "fm_admin"
  ) !== "1"
) {
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
        هذه المساحة مخصصة لإدارة محتوى
        ومنتجات وخدمات Féminine Mind.
      </p>

      <div class="field">

        <label>
          رمز الدخول التجريبي
        </label>

        <input
          class="input"
          id="pass"
          type="password"
          placeholder="أدخلي رمز الدخول"
        >

      </div>

      <button
        class="btn full"
        id="loginBtn"
      >
        دخول إلى لوحة الإدارة
      </button>

      <button
        class="btn secondary full"
        id="backPlatform"
      >
        العودة إلى المنصة
      </button>

    </div>
  `;

  document
    .querySelector("#loginBtn")
    .onclick = login;

  document
    .querySelector("#backPlatform")
    .onclick = () => {
      location.href = "index.html";
    };

  document
    .querySelector("#pass")
    .addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Enter") {
          login();
        }
      }
    );
}

function login() {

  const password =
    document.querySelector("#pass")
      ?.value;

  if (
    password === "FEMININE"
  ) {

    sessionStorage.setItem(
      "fm_admin",
      "1"
    );

    dashboard();

  } else {

    alert(
      "رمز الدخول غير صحيح."
    );
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
        ملف المؤسسة
      </h1>

      <p>
        مساحة الإدارة الرئيسية لـ
        Féminine Mind.
      </p>

    </div>


    <!-- PROFILE -->

    <div class="section-title">
      <h2>
        👑 معلومات المؤسسة
      </h2>
    </div>

    <div class="card">

      <span class="pill premium">
        Founder / Admin
      </span>

      <h3>
        Féminine Mind
      </h3>

      <p>
        <strong>العلامة:</strong>
        Féminine Mind
      </p>

      <p>
        <strong>الصفة:</strong>
        Founder / Admin
      </p>

      <p>
        <strong>رابط المنصة:</strong>
        f-mind.netlify.app
      </p>

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

        <h2>
          ${state.articles.length}
        </h2>

        <p>
          عدد المقالات الحالية
        </p>
      </div>

      <div class="card">
        <span class="pill">
          التوكيدات
        </span>

        <h2>
          ${state.affirmations.length}
        </h2>

        <p>
          عدد التوكيدات الحالية
        </p>
      </div>

      <div class="card">
        <span class="pill">
          المنتجات
        </span>

        <h2>
          ${products.length}
        </h2>

        <p>
          عدد المنتجات في المتجر
        </p>
      </div>

      <div class="card">
        <span class="pill">
          الخدمات
        </span>

        <h2>
          ${services.length}
        </h2>

        <p>
          خدمات قابلة للتحويل إلى مصادر دخل
        </p>
      </div>

    </div>


    <!-- STORE -->

    <div class="section-title">
      <h2>
        🛍️ متجر Féminine Mind
      </h2>
    </div>

    <div class="card">

      <p>
        من هنا يمكنكِ إدارة المنتجات الرقمية
        التي سيتم عرضها وبيعها مستقبلًا داخل المنصة.
      </p>

      <span class="pill">
        متجر جاهز للتطوير
      </span>

    </div>


    <!-- ADD PRODUCT -->

    <div class="section-title">
      <h2>
        ➕ إضافة منتج
      </h2>
    </div>

    <div class="card">

      <div class="field">

        <label>
          اسم المنتج
        </label>

        <input
          id="productName"
          class="input"
          placeholder="مثال: دورة حب الذات"
        >

      </div>


      <div class="field">

        <label>
          نوع المنتج
        </label>

        <select
          id="productType"
          class="input"
        >

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

        <label>
          وصف المنتج
        </label>

        <textarea
          id="productDescription"
          class="input"
          rows="4"
          placeholder="اكتبي وصفًا مختصرًا للمنتج..."
        ></textarea>

      </div>


      <div class="field">

        <label>
          السعر
        </label>

        <input
          id="productPrice"
          class="input"
          type="number"
          min="0"
          placeholder="مثال: 2500"
        >

      </div>


      <div class="field">

        <label>
          السعر قبل الخصم
        </label>

        <input
          id="productOldPrice"
          class="input"
          type="number"
          min="0"
          placeholder="اختياري"
        >

      </div>


      <div class="field">

        <label>
          نوع الوصول
        </label>

        <select
          id="productAccess"
          class="input"
        >

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

        <label>
          حالة المنتج
        </label>

        <select
          id="productStatus"
          class="input"
        >

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


      <button
        class="btn full"
        id="saveProduct"
      >
        حفظ المنتج
      </button>

    </div>


    <!-- PRODUCTS -->

    <div class="section-title">
      <h2>
        📦 المنتجات الحالية
      </h2>
    </div>

    <div class="list">

      ${
        products
          .map(
            (product) => `
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
                  <strong>
                    السعر:
                  </strong>
                  ${money(product.price)}
                </p>

                ${
                  Number(product.oldPrice) > 0
                    ? `
                      <p>
                        <strong>
                          السعر قبل الخصم:
                        </strong>
                        ${money(product.oldPrice)}
                      </p>
                    `
                    : ""
                }

                <p>
                  <strong>
                    الوصول:
                  </strong>
                  ${esc(product.access)}
                </p>

                <p>
                  <strong>
                    الحالة:
                  </strong>
                  ${esc(product.status)}
                </p>

                <button
                  class="btn secondary full deleteProduct"
                  data-id="${esc(product.id)}"
                >
                  🗑️ حذف المنتج
                </button>

              </div>
            `
          )
          .join("")
      }

    </div>


    <!-- SERVICES -->

    <div class="section-title">
      <h2>
        💗 الخدمات المدفوعة
      </h2>
    </div>

    <div class="grid">

      ${
        services
          .map(
            (service) => `
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
            `
          )
          .join("")
      }

    </div>


    <!-- INCOME -->

    <div class="section-title">
      <h2>
        💎 مصادر الدخل المقترحة
      </h2>
    </div>

    <div class="card">

      <p>🎓 الدورات التدريبية</p>
      <p>📚 الكتب الإلكترونية</p>
      <p>📄 Workbooks والملفات</p>
      <p>💎 اشتراك Premium</p>
      <p>💗 الجلسات الفردية</p>
      <p>💑 جلسات العلاقات</p>
      <p>👩‍🏫 ورش العمل والبرامج الجماعية</p>
      <p>🎁 الباقات والعروض</p>
      <p>🤝 التسويق بالعمولة مستقبلًا</p>

    </div>


    <!-- ARTICLES -->

    <div class="section-title">
      <h2>
        📝 إدارة المحتوى
      </h2>
    </div>


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
        id="saveArticle"
      >
        حفظ المقال
      </button>

    </div>


    <!-- AFFIRMATIONS -->

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
        id="saveAffirm"
      >
        حفظ التوكيد
      </button>

    </div>


    <!-- CURRENT ARTICLES -->

    <div class="section-title">
      <h2>
        📚 المقالات الحالية
      </h2>
    </div>

    <div class="list">

      ${
        state.articles.length
          ? state.articles
              .map(
                (article) => `
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
                      data-id="${article.id}"
                    >
                      🗑️ حذف المقال
                    </button>

                  </div>
                `
              )
              .join("")
          : `
              <div class="card">

                <p>
                  لا توجد مقالات إضافية مضافة
                  من لوحة الإدارة.
                </p>

              </div>
            `
      }

    </div>


    <!-- ROADMAP -->

    <div class="section-title">
      <h2>
        🚀 مراحل تحقيق الدخل
      </h2>
    </div>

    <div class="card">

      <p>
        ✅ المرحلة الحالية:
        بناء المحتوى والهوية والمنصة.
      </p>

      <p>
        🔜 المرحلة التالية:
        بناء متجر المنتجات الرقمية.
      </p>

      <p>
        🔜 بعدها:
        صفحات بيع الدورات والكتب والـWorkbooks.
      </p>

      <p>
        🔜 بعدها:
        نظام الاشتراكات والعضوية Premium.
      </p>

      <p>
        🔜 ثم:
        نظام الدفع والحجوزات والفواتير.
      </p>

      <p>
        🔜 ثم:
        لوحة المبيعات والإيرادات والتحليلات.
      </p>

      <div class="banner">
        قيد التطوير
      </div>

    </div>


    <!-- ACTIONS -->

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


  /* =======================================================
     EVENTS
  ======================================================= */

  document
    .querySelector("#saveProduct")
    .onclick = addProduct;

  document
    .querySelectorAll(".deleteProduct")
    .forEach((btn) => {

      btn.onclick = () => {

        deleteProduct(
          btn.dataset.id
        );

      };

    });


  document
    .querySelector("#saveArticle")
    .onclick = addArticle;

  document
    .querySelector("#saveAffirm")
    .onclick = addAffirm;


  document
    .querySelectorAll(".deleteArticle")
    .forEach((btn) => {

      btn.onclick = () => {

        deleteArticle(
          Number(
            btn.dataset.id
          )
        );

      };

    });


  document
    .querySelector("#logout")
    .onclick = () => {

      sessionStorage.removeItem(
        "fm_admin"
      );

      showLogin();

    };


  document
    .querySelector("#backHome")
    .onclick = () => {

      location.href =
        "index.html";

    };
}


/* =========================================================
   PRODUCTS
========================================================= */

function addProduct() {

  const name =
    document
      .querySelector("#productName")
      ?.value
      .trim();

  if (!name) {

    alert(
      "اكتبي اسم المنتج أولًا."
    );

    return;
  }

  const products =
    getProducts();

  products.unshift({

    id:
      "product-" +
      Date.now(),

    name,

    type:
      document
        .querySelector("#productType")
        ?.value ||
      "منتج رقمي",

    description:
      document
        .querySelector(
          "#productDescription"
        )
        ?.value
        .trim() ||
      "منتج رقمي من Féminine Mind.",

    price:
      Number(
        document
          .querySelector(
            "#productPrice"
          )
          ?.value || 0
      ),

    oldPrice:
      Number(
        document
          .querySelector(
            "#productOldPrice"
          )
          ?.value || 0
      ),

    access:
      document
        .querySelector(
          "#productAccess"
        )
        ?.value ||
      "paid",

    status:
      document
        .querySelector(
          "#productStatus"
        )
        ?.value ||
      "draft"

  });

  saveProducts(products);

  alert(
    "تم حفظ المنتج بنجاح 🌷"
  );

  dashboard();
}


function deleteProduct(id) {

  if (
    !confirm(
      "هل تريدين حذف هذا المنتج؟"
    )
  ) {
    return;
  }

  const products =
    getProducts().filter(
      (product) =>
        String(product.id) !==
        String(id)
    );

  saveProducts(products);

  dashboard();
}


/* =========================================================
   ARTICLES
========================================================= */

function addArticle() {

  const state =
    getState();

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


  state.articles.unshift({

    id:
      Date.now(),

    title:
      title ||
      "مقال جديد",

    cat:
      cat ||
      "الوعي الذاتي",

    free:
      Boolean(free),

    date:
      "أضيف من الإدارة",

    text:
      text ||
      "اكتبي المحتوى هنا."

  });


  saveState(state);

  alert(
    "تم حفظ المقال بنجاح 🌷"
  );

  dashboard();
}


function deleteArticle(id) {

  if (
    !confirm(
      "هل تريدين حذف هذا المقال؟"
    )
  ) {
    return;
  }

  const state =
    getState();

  state.articles =
    state.articles.filter(
      (article) =>
        Number(article.id) !==
        Number(id)
    );

  saveState(state);

  dashboard();
}


/* =========================================================
   AFFIRMATIONS
========================================================= */

function addAffirm() {

  const state =
    getState();

  const input =
    document.querySelector(
      "#affirm"
    );

  const value =
    input?.value.trim();

  if (!value) {

    alert(
      "اكتبي التوكيد أولًا."
    );

    return;
  }

  state.affirmations.unshift(
    value
  );

  saveState(state);

  alert(
    "تم حفظ التوكيد بنجاح 🌷"
  );

  dashboard();
}
