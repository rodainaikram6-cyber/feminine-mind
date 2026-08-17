/* =========================================================
   FÉMININE MIND — ADMIN DASHBOARD
   Founder / Admin
   إدارة المحتوى + المنتجات + الخدمات
   Version Store Ready
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

const defaultServices = [
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

    if (Array.isArray(saved)) {
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

    if (Array.isArray(saved)) {
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
  return String(value ?? "")
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

  return number.toLocaleString("fr-FR");
}

function accessLabel(access) {
  const labels = {
    paid: "💰 مدفوع",
    free: "🆓 مجاني",
    premium: "💎 Premium"
  };

  return labels[access] || access;
}

function statusLabel(status) {
  const labels = {
    draft: "مسودة",
    published: "منشور",
    archived: "مؤرشف"
  };

  return labels[status] || status;
}

function generateSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* =========================================================
   LOGIN
========================================================= */

if (
  sessionStorage.getItem("fm_admin") !== "1"
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

  document.querySelector("#loginBtn").onclick = login;

  document.querySelector("#backPlatform").onclick = () => {
    location.href = "index.html";
  };

  document.querySelector("#pass").addEventListener(
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
    document.querySelector("#pass")?.value;

  if (password === "FEMININE") {

    sessionStorage.setItem(
      "fm_admin",
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
        التي سيتم عرضها وبيعها داخل المنصة.
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
        <label>اسم المنتج</label>

        <input
          id="productName"
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
        <label>حالة المنتج</label>

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


      <div class="field">
        <label>
          رابط المنتج / Slug
        </label>

        <input
          id="productSlug"
          class="input"
          placeholder="مثال: self-love-course"
        >
      </div>


      <label>
        <input
          type="checkbox"
          id="productVisible"
          checked
        >
        إظهار المنتج في المتجر
      </label>


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
        products.length
          ? products.map(
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
                    <strong>السعر:</strong>
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
                    <strong>الوصول:</strong>
                    ${esc(
                      accessLabel(product.access)
                    )}
                  </p>

                  <p>
                    <strong>الحالة:</strong>
                    ${esc(
                      statusLabel(product.status)
                    )}
                  </p>

                  <p>
                    <strong>الظهور:</strong>
                    ${
                      product.visible
                        ? "👁️ ظاهر في المتجر"
                        : "🙈 مخفي"
                    }
                  </p>

                  <p>
                    <strong>Slug:</strong>
                    ${esc(product.slug)}
                  </p>

                  <button
                    class="btn full editProduct"
                    data-id="${esc(product.id)}"
                  >
                    ✏️ تعديل المنتج
                  </button>

                  <button
                    class="btn secondary full deleteProduct"
                    data-id="${esc(product.id)}"
                  >
                    🗑️ حذف المنتج
                  </button>

                </div>
              `
            ).join("")
          : `
              <div class="card">
                <p>
                  لا توجد منتجات حاليًا.
                </p>
              </div>
            `
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
        services.map(
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
        ).join("")
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
          ? state.articles.map(
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
            ).join("")
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

  document.querySelector("#saveProduct").onclick =
    addProduct;

  document.querySelectorAll(".editProduct")
    .forEach((btn) => {

      btn.onclick = () => {
        editProduct(btn.dataset.id);
      };

    });

  document.querySelectorAll(".deleteProduct")
    .forEach((btn) => {

      btn.onclick = () => {
        deleteProduct(btn.dataset.id);
      };

    });

  document.querySelector("#saveArticle").onclick =
    addArticle;

  document.querySelector("#saveAffirm").onclick =
    addAffirm;

  document.querySelectorAll(".deleteArticle")
    .forEach((btn) => {

      btn.onclick = () => {
        deleteArticle(
          Number(btn.dataset.id)
        );
      };

    });

  document.querySelector("#logout").onclick =
    () => {

      sessionStorage.removeItem(
        "fm_admin"
      );

      showLogin();

    };

  document.querySelector("#backHome").onclick =
    () => {

      location.href = "index.html";

    };
}


/* =========================================================
   PRODUCTS — ADD
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

  const products = getProducts();

  let slug =
    document
      .querySelector("#productSlug")
      ?.value
      .trim();

  if (!slug) {
    slug = generateSlug(name);
  }

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
      "draft",

    visible:
      document
        .querySelector(
          "#productVisible"
        )
        ?.checked ??
      true,

    slug

  });

  saveProducts(products);

  alert(
    "تم حفظ المنتج بنجاح 🌷"
  );

  dashboard();
}


/* =========================================================
   PRODUCTS — EDIT
========================================================= */

function editProduct(id) {

  const products = getProducts();

  const product =
    products.find(
      (item) =>
        String(item.id) ===
        String(id)
    );

  if (!product) {
    alert(
      "لم يتم العثور على المنتج."
    );
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
        تعديل بيانات:
        ${esc(product.name)}
      </p>

    </div>


    <div class="card">

      <div class="field">

        <label>
          اسم المنتج
        </label>

        <input
          id="editName"
          class="input"
          value="${esc(product.name)}"
        >

      </div>


      <div class="field">

        <label>
          نوع المنتج
        </label>

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

        <label>
          وصف المنتج
        </label>

        <textarea
          id="editDescription"
          class="input"
          rows="5"
        >${esc(product.description)}</textarea>

      </div>


      <div class="field">

        <label>
          السعر
        </label>

        <input
          id="editPrice"
          class="input"
          type="number"
          min="0"
          value="${Number(product.price || 0)}"
        >

      </div>


      <div class="field">

        <label>
          السعر قبل الخصم
        </label>

        <input
          id="editOldPrice"
          class="input"
          type="number"
          min="0"
          value="${Number(product.oldPrice || 0)}"
        >

      </div>


      <div class="field">

        <label>
          نوع الوصول
        </label>

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

        <label>
          حالة المنتج
        </label>

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

        <label>
          رابط المنتج / Slug
        </label>

        <input
          id="editSlug"
          class="input"
          value="${esc(product.slug || "")}"
          placeholder="مثال: self-love-course"
        >

      </div>


      <label>

        <input
          type="checkbox"
          id="editVisible"
          ${product.visible !== false ? "checked" : ""}
        >

        إظهار المنتج في المتجر

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
        ← العودة إلى لوحة الإدارة
      </button>

    </div>

  `;


  document.querySelector("#updateProduct").onclick =
    () => {

      const index =
        products.findIndex(
          (item) =>
            String(item.id) ===
            String(id)
        );

      if (index === -1) return;

      const newName =
        document
          .querySelector("#editName")
          ?.value
          .trim();

      if (!newName) {

        alert(
          "اسم المنتج مطلوب."
        );

        return;
      }

      let slug =
        document
          .querySelector("#editSlug")
          ?.value
          .trim();

      if (!slug) {
        slug = generateSlug(newName);
      }

      products[index] = {

        ...products[index],

        name:
          newName,

        type:
          document
            .querySelector("#editType")
            ?.value,

        description:
          document
            .querySelector(
              "#editDescription"
            )
            ?.value
            .trim(),

        price:
          Number(
            document
              .querySelector(
                "#editPrice"
              )
              ?.value || 0
          ),

        oldPrice:
          Number(
            document
              .querySelector(
                "#editOldPrice"
              )
              ?.value || 0
          ),

        access:
          document
            .querySelector(
              "#editAccess"
            )
            ?.value,

        status:
          document
            .querySelector(
              "#editStatus"
            )
            ?.value,

        slug,

        visible:
          document
            .querySelector(
              "#editVisible"
            )
            ?.checked

      };

      saveProducts(products);

      alert(
        "تم تحديث المنتج بنجاح 🌷"
      );

      dashboard();

    };


  document.querySelector("#cancelEdit").onclick =
    () => dashboard();

}


/* =========================================================
   PRODUCTS — DELETE
========================================================= */

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

  const state = getState();

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


  if (!title || !text) {

    alert(
      "أضيفي عنوان المقال ومحتواه أولًا."
    );

    return;
  }


  state.articles.unshift({

    id:
      Date.now(),

    title,

    cat:
      cat ||
      "الوعي الذاتي",

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
