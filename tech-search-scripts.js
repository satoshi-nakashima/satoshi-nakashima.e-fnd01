function search(site) {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("検索キーワードを入力してください");

  let url = "";
  switch (site) {
    case "zenn":
      url = `https://zenn.dev/search?q=${encodeURIComponent(query)}`;
      break;
    case "qiita":
      url = `https://qiita.com/search?q=${encodeURIComponent(query)}`;
      break;
  }
  window.open(url, "_blank");
}

function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  const body = document.body;

  const isOpen = menu.style.display === "block";
  menu.style.display = isOpen ? "none" : "block";

  // 背景色の切り替え（オプション）
  body.style.backgroundColor = isOpen ? "#f2f2f2" : "#e0e0e0";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("dropdownMenu");

  if (!e.target.closest(".profile-dropdown")) {
    menu.style.display = "none"; // ダークモードかどうかを確認して背景色を維持

    const isDarkMode = document.body.classList.contains("dark-mode");
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#f2f2f2";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn !== "true") {
    alert("ログインしてください");
    window.location.href = "index.html";
  }

  const nameSpan = document.querySelector(".profile-name");
  if (nameSpan && username) {
    nameSpan.textContent = username;
  }

  // ダークモードの状態を反映
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", isDarkMode);
});

function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
  body.style.backgroundColor = isDarkMode ? "#121212" : "#f2f2f2";
}
