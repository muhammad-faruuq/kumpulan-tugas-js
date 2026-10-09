// ===== 1. VARIABEL & ELEMEN =====
const API_URL = "https://dummyjson.com/recipes?limit=0"; // limit=0 -> ambil semua resep
const KUNCI_FAVORIT = "recipeFavorites";

let semuaResep = [];              // semua data dari API
let favorit = ambilFavorit();     // array berisi id resep favorit
let tampilFavoritSaja = false;    // true saat tombol Favorites ditekan

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const cuisineFilter = document.getElementById("cuisine-filter");
const difficultyFilter = document.getElementById("difficulty-filter");
const favoriteButton = document.getElementById("favorite-button");
const favoriteCount = document.getElementById("favorite-count");
const sectionTitle = document.getElementById("section-title");
const recipeCount = document.getElementById("recipe-count");
const resetButton = document.getElementById("reset-filter-button");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const emptyState = document.getElementById("empty-state");
const recipeGrid = document.getElementById("recipe-grid");
const recipeDialog = document.getElementById("recipe-dialog");
const closeDialog = document.getElementById("close-dialog");
const dialogContent = document.getElementById("dialog-content");

// ===== 2. LOCALSTORAGE (FAVORIT) =====
function ambilFavorit() {
  // getItem mengembalikan teks (string), atau null kalau belum pernah disimpan
  const data = localStorage.getItem(KUNCI_FAVORIT);
  return data ? JSON.parse(data) : [];
}

function simpanFavorit() {
  // localStorage hanya bisa menyimpan teks, jadi array diubah dulu ke JSON
  localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(favorit));
}

function toggleFavorit(id) {
  if (favorit.includes(id)) {
    favorit = favorit.filter(f => f !== id); // hapus dari favorit
  } else {
    favorit.push(id);                        // tambah ke favorit
  }
  simpanFavorit();
  perbaruiJumlahFavorit();
  terapkanFilter(); // gambar ulang supaya ikon hati ikut berubah
}

function perbaruiJumlahFavorit() {
  favoriteCount.textContent = favorit.length;
}

// ===== 3. MENGATUR STATE (loading / error / kosong / daftar) =====
function tampilkanState(nama) {
  // nama: "loading", "error", "empty", atau "grid"
  loadingState.hidden = nama !== "loading";
  errorState.hidden = nama !== "error";
  emptyState.hidden = nama !== "empty";
  recipeGrid.hidden = nama !== "grid";
}

// ===== 4. FETCH DATA =====
async function ambilResep() {
  tampilkanState("loading");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Status " + response.status);
    const data = await response.json();
    semuaResep = data.recipes; // daftar resep ada di properti "recipes"
    isiFilterCuisine();
    terapkanFilter();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    tampilkanState("error");
  }
}

// ===== 5. ISI DROPDOWN CUISINE =====
function isiFilterCuisine() {
  // Set membuang nilai kembar, sort mengurutkan A-Z
  const daftarCuisine = [...new Set(semuaResep.map(r => r.cuisine))].sort();
  daftarCuisine.forEach(c => {
    const opsi = document.createElement("option");
    opsi.value = c;
    opsi.textContent = c;
    cuisineFilter.appendChild(opsi);
  });
}

// ===== 6. TAMPILKAN KARTU =====
function tampilkanResep(daftar) {
  recipeCount.textContent = daftar.length + (daftar.length === 1 ? " recipe" : " recipes");

  if (daftar.length === 0) {
    tampilkanState("empty");
    return;
  }

  recipeGrid.innerHTML = daftar.map(resep => {
    const suka = favorit.includes(resep.id);
    return `
      <article class="recipe-card">
        <img class="recipe-image" src="${resep.image}" alt="${resep.name}" loading="lazy">
        <div class="recipe-body">
          <span class="recipe-cuisine">${resep.cuisine}</span>
          <h3 class="recipe-title">${resep.name}</h3>
          <div class="recipe-meta">
            <span>⭐ ${resep.rating}</span>
            <span>⏱️ ${resep.prepTimeMinutes + resep.cookTimeMinutes} min</span>
            <span>${resep.difficulty}</span>
          </div>
          <div class="recipe-actions">
            <button type="button" class="detail-button" data-action="detail" data-id="${resep.id}">View Recipe</button>
            <button type="button" class="like-button" data-action="favorite" data-id="${resep.id}"
              aria-label="${suka ? "Remove from favorites" : "Add to favorites"}">${suka ? "❤️" : "🤍"}</button>
          </div>
        </div>
      </article>`;
  }).join("");

  tampilkanState("grid");
}

// ===== 7. CARI + FILTER (digabung dalam satu fungsi) =====
function terapkanFilter() {
  const kataKunci = searchInput.value.trim().toLowerCase();
  const cuisine = cuisineFilter.value;
  const difficulty = difficultyFilter.value;

  const hasil = semuaResep.filter(resep => {
    const cocokNama = resep.name.toLowerCase().includes(kataKunci);
    const cocokCuisine = cuisine === "" || resep.cuisine === cuisine;
    const cocokDifficulty = difficulty === "" || resep.difficulty === difficulty;
    const cocokFavorit = !tampilFavoritSaja || favorit.includes(resep.id);
    return cocokNama && cocokCuisine && cocokDifficulty && cocokFavorit;
  });

  sectionTitle.textContent = tampilFavoritSaja ? "My Favorites" : "Explore Recipes";

  // Tombol reset hanya muncul kalau ada pencarian/filter yang aktif
  const adaFilter = kataKunci !== "" || cuisine !== "" || difficulty !== "" || tampilFavoritSaja;
  resetButton.hidden = !adaFilter;

  tampilkanResep(hasil);
}

function resetFilter() {
  searchInput.value = "";
  cuisineFilter.value = "";
  difficultyFilter.value = "";
  tampilFavoritSaja = false;
  terapkanFilter();
}

// ===== 8. DETAIL RESEP (DIALOG) =====
function bukaDetail(id) {
  const resep = semuaResep.find(r => r.id === id); // find: ambil 1 resep dengan id yang sama
  if (!resep) return;

  dialogContent.innerHTML = `
    <img class="dialog-image" src="${resep.image}" alt="${resep.name}">
    <div class="dialog-body">
      <span class="recipe-cuisine">${resep.cuisine}</span>
      <h2>${resep.name}</h2>
      <div class="dialog-meta">
        <span>⭐ ${resep.rating}</span>
        <span>${resep.difficulty}</span>
        <span>🍽️ ${resep.servings} servings</span>
        <span>🔥 ${resep.caloriesPerServing} cal/serving</span>
        <span>🥣 Prep ${resep.prepTimeMinutes} min</span>
        <span>🍳 Cook ${resep.cookTimeMinutes} min</span>
      </div>
      <h3>Ingredients</h3>
      <ul class="ingredients">${resep.ingredients.map(b => `<li>${b}</li>`).join("")}</ul>
      <h3>Instructions</h3>
      <div class="instructions">${resep.instructions.map(l => `<p>${l}</p>`).join("")}</div>
    </div>
  `;
  recipeDialog.showModal(); // showModal() membuka <dialog>, Esc otomatis menutup
}

// ===== 9. EVENT LISTENER =====
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // cegah halaman reload
  terapkanFilter();
});
searchInput.addEventListener("input", terapkanFilter); // cari langsung saat mengetik
cuisineFilter.addEventListener("change", terapkanFilter);
difficultyFilter.addEventListener("change", terapkanFilter);
resetButton.addEventListener("click", resetFilter);

favoriteButton.addEventListener("click", () => {
  tampilFavoritSaja = !tampilFavoritSaja; // nyalakan/matikan tampilan favorit
  terapkanFilter();
});

// Event delegation: satu listener di grid untuk semua tombol di dalam kartu
recipeGrid.addEventListener("click", (e) => {
  const tombol = e.target.closest("button");
  if (!tombol) return;
  const id = Number(tombol.dataset.id); // data-id berupa teks, ubah ke angka

  if (tombol.dataset.action === "detail") bukaDetail(id);
  if (tombol.dataset.action === "favorite") toggleFavorit(id);
});

closeDialog.addEventListener("click", () => recipeDialog.close());
recipeDialog.addEventListener("click", (e) => {
  if (e.target === recipeDialog) recipeDialog.close(); // klik area gelap di luar
});

// ===== 10. JALANKAN =====
perbaruiJumlahFavorit();
ambilResep();
