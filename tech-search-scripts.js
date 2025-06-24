function search(site) {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("検索キーワードを入力してください");

  saveSearchHistory(query); // 履歴保存

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

function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  history = history.filter((item) => item !== query); // 重複削除
  history.unshift(query); // 先頭に追加
  history = history.slice(0, 5); // 最大5件まで
  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderSearchHistory();
}

function renderSearchHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  const historyListElement = document.getElementById("historyItems");

  if (!historyListElement) return;

  historyListElement.innerHTML = history
    .map(
      (keyword) =>
        `<div onclick="document.getElementById('searchInput').value='${keyword}'">${keyword}</div>`
    )
    .join("");
}

function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  const overlay = document.getElementById("overlay");
  const body = document.body;
  const isOpen = menu.style.display === "block";
  const isDarkMode = body.classList.contains("dark-mode");

  menu.style.display = isOpen ? "none" : "block"; // ダークモードかどうかで背景色を分岐
  overlay.style.display = isOpen ? "none" : "block";

  if (isDarkMode) {
    body.style.backgroundColor = "#121212"; // ダークモードの背景色を維持
  } else {
    body.style.backgroundColor = isOpen ? "#121212" : "#f2f2f2"; // ライトモード時のみ変更
  }
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

  const switchInput = document.getElementById("darkModeSwitch");
  if (switchInput) {
    switchInput.checked = isDarkMode;
  }

  // オーバーレイクリックでメニューを閉じる
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      document.getElementById("dropdownMenu").style.display = "none";
      overlay.style.display = "none";
    });
  }

  // 検索履歴
  renderSearchHistory();
});

function toggleDarkMode() {
  const body = document.body;
  const switchInput = document.getElementById("darkModeSwitch");
  const isDarkMode = switchInput.checked;

  body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("darkMode", isDarkMode);
  body.style.backgroundColor = isDarkMode ? "#121212" : "#f2f2f2";
}

// 検索履歴の削除
function clearSearchHistory() {
  localStorage.removeItem("searchHistory");
  renderSearchHistory();
}
