/* ==========================================================================
   MAIN JAVASCRIPT FILE (v1.0)
   Project: APK Gallery Website
   File: script.js
   Description: Handles language switching, live clock, UI interactions, 
                and APK list rendering.
   ========================================================================== */

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
    brand: "Aplikasi Premium Koleksi",
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

  // Update Teks Standar
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

  // (Penting: Ganti explore jadi exploreText untuk menyesuaikan tombol kapsul animasi)
  if (document.getElementById("exploreText")) {
    document.getElementById("exploreText").innerText =
      translations[lang].explore;
  }

  // (Penting: Ganti donate jadi donateText)
  if (document.getElementById("donateText")) {
    document.getElementById("donateText").innerText = translations[lang].donate;
  }

  document.getElementById("listTitle").innerText = translations[lang].listTitle;
  document.getElementById("footerText").innerHTML =
    translations[lang].footerText;

  // Update Teks Tombol Download di Kartu APK
  document.querySelectorAll(".dl-btn").forEach((btn) => {
    const icon = btn.querySelector("svg").outerHTML;
    btn.innerHTML =
      icon +
      ` <span class="group-hover/btn:animate-bounce inline-block">${translations[lang].downloadBtn}</span>`;
  });

  // Update Tampilan Tombol Pilih Bahasa di Dropdown
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

  // Tutup dropdown setelah memilih bahasa
  const langDropdown = document.getElementById("langDropdown");
  if (langDropdown) {
    langDropdown.classList.add("hidden");
  }
}

// ==========================================
// 3. FUNGSI DROPDOWN BAHASA & EVENT LISTENERS
// ==========================================
const langBtn = document.getElementById("langBtn");
const langDropdown = document.getElementById("langDropdown");
const savedLang = localStorage.language || "en";

// Inisialisasi bahasa pertama kali
changeLanguage(savedLang);

// Listener Klik Tombol Bahasa
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("hidden");
});

// Listener Klik di Luar Menu (Untuk Menutup Dropdown)
window.addEventListener("click", () => {
  if (!langDropdown.classList.contains("hidden")) {
    langDropdown.classList.add("hidden");
  }
});

// ==========================================
// 4. TEKS BERGILIR OTOMATIS (5 DETIK)
// ==========================================
const appsListText = [
  "YouTube",
  "YT Music",
  "Facebook",
  "Instagram",
  "Telegram",
  "Twitter",
];
let appTextIndex = 0;
const dynamicTextEl = document.getElementById("dynamicText");

setInterval(() => {
  dynamicTextEl.style.opacity = "0";
  setTimeout(() => {
    appTextIndex = (appTextIndex + 1) % appsListText.length;
    dynamicTextEl.innerText = appsListText[appTextIndex];
    dynamicTextEl.style.opacity = "1";
  }, 500);
}, 5000);

// ==========================================
// 5. DARK MODE TOGGLE (DENGAN LOCALSTORAGE MEMORY)
// ==========================================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Saat tombol diklik: Ganti tema dan simpan ke memori
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
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Logika memunculkan teks "Not Available" sekaligus auto-translate
  if (visibleCount === 0) {
    noResultEl.classList.remove("hidden");

    // Ambil bahasa yang lagi aktif
    const currentLang = document.documentElement.lang || "en";

    // Paksa text berubah sesuai bahasa
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
      // Munculkan kartu (hapus transparan)
      entry.target.classList.remove("opacity-0", "translate-y-6");
    } else {
      // Sembunyikan lagi (bikin transparan) saat di-scroll ke luar layar
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
function jalankanJam() {
  const waktu = new Date();

  const jam = String(waktu.getHours()).padStart(2, "0");
  const menit = String(waktu.getMinutes()).padStart(2, "0");
  const detik = String(waktu.getSeconds()).padStart(2, "0");

  document.getElementById("jamMenit").innerText = `${jam}:${menit}`;
  document.getElementById("detik").innerText = detik;

  // Deteksi bahasa aktif
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

// Jalankan jam pertama kali, lalu update setiap detik
jalankanJam();
setInterval(jalankanJam, 1000);
