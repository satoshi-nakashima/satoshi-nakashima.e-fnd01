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
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("dropdownMenu");
  if (!e.target.closest(".profile-dropdown")) {
    menu.style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn !== "true") {
    alert("ログインしてください");
    window.location.href = "index.html";
  } // ユーザー名を表示（任意）

  const nameSpan = document.querySelector(".profile-name");
  if (nameSpan && username) {
    nameSpan.textContent = username;
  }
});
