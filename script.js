/* ==========================================================================
   MAIN JAVASCRIPT FILE (v2.0 - Dynamic Cards)
   Project: APK Gallery Website
   File: script.js
   Description: Handles dynamic APK cards, language switching, live clock, 
                and UI interactions.
   ========================================================================== */

// ==========================================
// 0. DATA KOLEKSI APLIKASI (EDIT / TAMBAH APK DI SINI)
// ==========================================
const daftarAplikasi = [
  {
    nama: "DopamineTV PC",
    versi: "v1.0.6 Trial-30D",
    size: "10MB",
    os: "Windows 10-x64",
    gambar: "dopaminetv.jpg",
    link: "https://sfl.gl/SJbUzcG",
  },
  {
    nama: "DopamineTV",
    versi: "v1.0.8 Build 12-Try",
    size: "10MB",
    os: "Android 6.0+",
    gambar: "dopaminetv.jpg",
    link: "https://sfl.gl/d1J7",
  },
  {
    nama: "KltraTV Hikari",
    versi: "v3.1.1 Pro",
    size: "15MB",
    os: "Android 6.0+",
    gambar: "kltratv.jpg",
    link: "https://sfl.gl/f02go",
  },
  {
    nama: "TivoraTV",
    versi: "v1.2 Premium",
    size: "25MB",
    os: "Android 6.0+",
    gambar: "tivoratv.jpg",
    link: "https://sfl.gl/YFpxd",
  },
  {
    nama: "YouTube Premium",
    versi: "v21.30.216 Premium",
    size: "290MB",
    os: "Android 9.0+",
    gambar: "youtube.jpg",
    link: "https://sfl.gl/F10oT",
  },
];

// CETAK OTOMATIS KE DALAM #appGrid (1 CETAKAN DESAIN KARTU 1)
function renderApps() {
  const appGrid = document.getElementById("appGrid");
  if (!appGrid) return;

  const cardsHTML = daftarAplikasi
    .map(
      (app) => `
      <div
        class="app-card group relative bg-white/40 dark:bg-[#0f172a]/40 backdrop-blur-md rounded-2xl border border-white/50 dark:border-white/10 shadow-lg shadow-slate-200/10 dark:shadow-black/20 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      >
        <!-- LAYER CAHAYA GLOW HALUS & DENYUT PELAN -->
        <div
          class="absolute -inset-1 z-0 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-cyan-500/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-hover:animate-smooth-glow transition-all duration-1000 pointer-events-none"
        ></div>

        <!-- LAYER PENUTUP TENGAH KARTU -->
        <div
          class="relative z-10 bg-white/80 dark:bg-[#0f172a]/85 h-full w-full rounded-[14px] flex flex-col overflow-hidden"
        >
          <!-- BAGIAN ATAS KARTU (Logo, Judul, Size) -->
          <div class="p-5 flex-grow">
            <div class="flex items-start justify-between mb-3">
              <img
                src="${app.gambar}"
                alt="logo ${app.nama}"
                loading="lazy"
                decoding="async"
                class="w-12 h-12 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <span
                class="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-500/30"
              >${app.versi}</span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">
              ${app.nama}
            </h3>

            <div
              class="flex gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              <span class="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md"
                >Size: ${app.size}</span
              >
              <span class="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md"
                >${app.os}</span
              >
            </div>
          </div>

          <!-- BAGIAN TOMBOL DOWNLOAD & EFEK LONCAT -->
          <div
            class="p-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50"
          >
            <a
              href="${app.link}"
              target="_blank"
              onclick="showToast('Menyiapkan file APK...')"
              class="dl-btn w-full bg-slate-200 hover:bg-indigo-600 dark:bg-slate-700 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white font-medium py-2.5 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 group/btn shadow-sm hover:shadow-indigo-500/30 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform group-hover/btn:animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span class="group-hover/btn:animate-bounce inline-block"
                >Download APK</span
              >
            </a>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  // Sisipkan kartu tepat di bawah #noResult
  appGrid.insertAdjacentHTML("beforeend", cardsHTML);
}

// Render semua kartu lebih dulu sebelum fitur bahasa, search, & observer berjalan
renderApps();

// ==========================================
// 1. DATA TERJEMAHAN BAHASA
// ==========================================
const translations = {
  en: {
    brand: "Premium Apps",
    donate: "Support Me",
    contact: "Contact",
    heroTitle:
      'Premium Apps <br /><span class="text-indigo-500 dark:text-indigo-400">Collections</span>',
    heroDesc:
      "Curated collection of VIP and premium apps. Secure, clean, and updated daily for all your Android devices and PC.",
    searchPlaceholder: "Search Apps",
    explore: "Explore All Apps",
    listTitle: "List Applications",
    downloadBtn: "Download APK",
    notAvailable: "Not Available",
    notAvailableDesc:
      "The application you are looking for was not found or is not yet available.",
    footerText:
      '&copy; 2026 Premium Apps. All rights reserved.<br /><span class="text-xs mt-2 block">Disclaimer: This website only shares third-party APK files for educational, testing, and review purposes. All copyrights and trademarks belong to their respective developers.</span>',
  },
  id: {
    brand: "Aplikasi Premium",
    donate: "Dukung Saya",
    contact: "Kontak",
    heroTitle:
      'Koleksi Aplikasi <br /><span class="text-indigo-500 dark:text-indigo-400">Premium</span>',
    heroDesc:
      "Koleksi pilihan aplikasi VIP dan premium. Aman, bersih, dan diperbarui setiap hari untuk semua perangkat Android serta PC.",
    searchPlaceholder: "Cari Aplikasi",
    explore: "Jelajahi Semua APK",
    listTitle: "Daftar Aplikasi",
    downloadBtn: "Download APK",
    notAvailable: "Tidak Tersedia",
    notAvailableDesc:
      "Aplikasi yang kamu cari tidak ditemukan atau belum tersedia.",
    footerText:
      '&copy; 2026 Aplikasi Premium Koleksi. Hak cipta dilindungi.<br /><span class="text-xs mt-2 block">Disclaimer: Web ini hanya membagikan ulang file APK pihak ketiga untuk tujuan edukasi, pengujian, dan ulasan aplikasi. Seluruh hak cipta dan merek dagang aplikasi tetap milik developer masing-masing.</span>',
  },
};

// ==========================================
// 2. FUNGSI GANTI BAHASA
// ==========================================
function changeLanguage(lang) {
  localStorage.language = lang;

  document.getElementById("notAvailableText").innerText =
    translations[lang].notAvailable;
  document.getElementById("notAvailableDesc").innerText =
    translations[lang].notAvailableDesc;
  document.documentElement.lang = lang;
  document.getElementById("brandTitle").innerHTML = translations[lang].brand;
  document.getElementById("heroTitle").innerHTML = translations[lang].heroTitle;
  document.getElementById("heroDesc").innerText = translations[lang].heroDesc;
  document.getElementById("searchInput").placeholder =
    translations[lang].searchPlaceholder;

  if (document.getElementById("exploreText")) {
    document.getElementById("exploreText").innerText =
      translations[lang].explore;
  }

  if (document.getElementById("donateText")) {
    document.getElementById("donateText").innerText = translations[lang].donate;
  }

  document.getElementById("listTitle").innerText = translations[lang].listTitle;
  document.getElementById("footerText").innerHTML =
    translations[lang].footerText;

  document.querySelectorAll(".dl-btn").forEach((btn) => {
    const icon = btn.querySelector("svg").outerHTML;
    btn.innerHTML =
      icon +
      ` <span class="group-hover/btn:animate-bounce inline-block">${translations[lang].downloadBtn}</span>`;
  });

  const enEl = document.getElementById("btnEn");
  const idEl = document.getElementById("btnId");

  if (lang === "en") {
    enEl.className =
      "w-full text-left flex items-center justify-between px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold bg-slate-100 dark:bg-slate-700/50";
    idEl.className =
      "w-full text-left flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
    document.getElementById("checkEn").classList.remove("hidden");
    document.getElementById("checkId").classList.add("hidden");
  } else {
    idEl.className =
      "w-full text-left flex items-center justify-between px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold bg-slate-100 dark:bg-slate-700/50";
    enEl.className =
      "w-full text-left flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
    document.getElementById("checkId").classList.remove("hidden");
    document.getElementById("checkEn").classList.add("hidden");
  }

  const langDropdown = document.getElementById("langDropdown");
  if (langDropdown) {
    langDropdown.classList.add("hidden");
  }
  document.body.classList.remove("lang-loading");
}

// ==========================================
// 3. FUNGSI DROPDOWN BAHASA & EVENT LISTENERS
// ==========================================
const langBtn = document.getElementById("langBtn");
const langDropdown = document.getElementById("langDropdown");
const savedLang = localStorage.language || "en";

changeLanguage(savedLang);

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("hidden");
});

window.addEventListener("click", () => {
  if (!langDropdown.classList.contains("hidden")) {
    langDropdown.classList.add("hidden");
  }
});

// ==========================================
// 4. TEKS BERGILIR OTOMATIS (BARENGAN 4 DETIK)
// ==========================================
const appsListText = [
  "YouTube",
  "YT Music",
  "Facebook",
  "Instagram",
  "Telegram",
  "Twitter",
];
const greetings = [
  "Halo",
  "Hello",
  "こんにちは",
  "안녕하세요",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "你好",
  "مرحبا",
  "Olá",
  "Привет",
  "नमस्ते",
  "สวัสดี",
  "Xin chào",
];

let appTextIndex = 0;
let helloIndex = 0;
const dynamicTextEl = document.getElementById("dynamicText");
const helloEl = document.getElementById("iosHello");

if (dynamicTextEl || helloEl) {
  setInterval(() => {
    [dynamicTextEl, helloEl].forEach((el) => {
      if (!el) return;
      el.classList.remove("opacity-100", "translate-y-0");
      el.classList.add("opacity-0", "-translate-y-3");
    });

    setTimeout(() => {
      if (dynamicTextEl) {
        appTextIndex = (appTextIndex + 1) % appsListText.length;
        dynamicTextEl.innerText = appsListText[appTextIndex];
      }
      if (helloEl) {
        helloIndex = (helloIndex + 1) % greetings.length;
        helloEl.textContent = greetings[helloIndex];
      }

      [dynamicTextEl, helloEl].forEach((el) => {
        if (!el) return;
        el.classList.remove("-translate-y-3");
        el.classList.add("translate-y-3");
        void el.offsetWidth;

        el.classList.remove("opacity-0", "translate-y-3");
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 650);
  }, 4000);
}

// ==========================================
// 5. DARK MODE TOGGLE (DENGAN LOCALSTORAGE MEMORY)
// ==========================================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

themeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.theme = "light";
  } else {
    htmlElement.classList.add("dark");
    localStorage.theme = "dark";
  }
});

// ==========================================
// 6. FITUR PENCARIAN REAL-TIME & AUTO TRANSLATE NOT AVAILABLE
// ==========================================
const searchInput = document.getElementById("searchInput");
const appCards = document.querySelectorAll(".app-card");
const noResultEl = document.getElementById("noResult");

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  let visibleCount = 0;

  appCards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    if (text.includes(term)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (visibleCount === 0) {
    noResultEl.classList.remove("hidden");

    const currentLang = document.documentElement.lang || "en";

    document.getElementById("notAvailableText").innerText =
      translations[currentLang].notAvailable;
    document.getElementById("notAvailableDesc").innerText =
      translations[currentLang].notAvailableDesc;
  } else {
    noResultEl.classList.add("hidden");
  }
});

// ==========================================
// 7. EFEK MUNCUL SAAT DI-SCROLL (BERULANG / RE-ANIMATE)
// ==========================================
const scrollObserverOptions = {
  threshold: 0.1,
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-6");
    } else {
      entry.target.classList.add("opacity-0", "translate-y-6");
    }
  });
}, scrollObserverOptions);

document.querySelectorAll(".app-card").forEach((card) => {
  scrollObserver.observe(card);
});

// ==========================================
// 8. WIDGET JAM DIGITAL & TANGGAL MULTI-LANGUAGE
// ==========================================
const GRADIENT_JAM =
  "bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-800 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent";

function animasikanDigit(slot, angkaBaru, extraClass = "") {
  const angkaLama = slot.dataset.val;
  if (angkaLama === angkaBaru) return;
  slot.dataset.val = angkaBaru;

  if (angkaLama === undefined) {
    slot.innerHTML = `<span class="block leading-none ${extraClass}">${angkaBaru}</span>`;
    return;
  }

  slot.innerHTML = `
    <span class="old-digit block leading-none transition-all duration-300 ease-out translate-y-0 opacity-100 ${extraClass}">${angkaLama}</span>
    <span class="new-digit block leading-none absolute inset-0 transition-all duration-300 ease-out translate-y-full opacity-0 ${extraClass}">${angkaBaru}</span>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const oldEl = slot.querySelector(".old-digit");
      const newEl = slot.querySelector(".new-digit");
      if (oldEl) {
        oldEl.classList.remove("translate-y-0", "opacity-100");
        oldEl.classList.add("-translate-y-full", "opacity-0");
      }
      if (newEl) {
        newEl.classList.remove("translate-y-full", "opacity-0");
        newEl.classList.add("translate-y-0", "opacity-100");
      }
    });
  });

  setTimeout(() => {
    if (slot.dataset.val === angkaBaru) {
      slot.innerHTML = `<span class="block leading-none ${extraClass}">${angkaBaru}</span>`;
    }
  }, 320);
}

function jalankanJam() {
  const waktu = new Date();

  const jam = String(waktu.getHours()).padStart(2, "0");
  const menit = String(waktu.getMinutes()).padStart(2, "0");
  const detik = String(waktu.getSeconds()).padStart(2, "0");

  const jamMenitEl = document.getElementById("jamMenit");
  const detikEl = document.getElementById("detik");

  if (jamMenitEl && !jamMenitEl.dataset.ready) {
    jamMenitEl.dataset.ready = "true";
    jamMenitEl.className =
      "text-6xl md:text-7xl tracking-tight inline-flex items-center tabular-nums";
    jamMenitEl.innerHTML = `
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
      <span class="inline-block leading-none mx-0.5 ${GRADIENT_JAM}">:</span>
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
    `;
  }

  if (detikEl && !detikEl.dataset.ready) {
    detikEl.dataset.ready = "true";
    detikEl.className =
      "text-2xl md:text-3xl text-indigo-500 dark:text-indigo-400 font-semibold mb-1 inline-flex items-center tabular-nums";
    detikEl.innerHTML = `
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
      <span class="digit-slot inline-block overflow-hidden relative h-[1.05em]"></span>
    `;
  }

  const digitsJM = [jam[0], jam[1], menit[0], menit[1]];
  jamMenitEl?.querySelectorAll(".digit-slot").forEach((slot, i) => {
    animasikanDigit(slot, digitsJM[i], GRADIENT_JAM);
  });

  const digitsDetik = [detik[0], detik[1]];
  detikEl?.querySelectorAll(".digit-slot").forEach((slot, i) => {
    animasikanDigit(slot, digitsDetik[i]);
  });

  const currentLang = document.documentElement.lang || "en";

  let namaHari, namaBulan;

  if (currentLang === "id") {
    namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    namaBulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
  } else {
    namaHari = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    namaBulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }

  const hari = namaHari[waktu.getDay()];
  const tanggal = waktu.getDate();
  const bulan = namaBulan[waktu.getMonth()];
  const tahun = waktu.getFullYear();

  document.getElementById("tanggalan").innerText =
    `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

jalankanJam();
setInterval(jalankanJam, 1000);

function scrollToApps() {
  const targetElement = document.getElementById("apk-list");
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
