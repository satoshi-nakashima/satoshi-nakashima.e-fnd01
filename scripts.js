function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("ユーザー名とパスワードを入力してください");
    return;
  } // デモ用：ログイン成功とみなす

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", user); // ユーザー名を保存（tech-search.htmlで表示可能）
  window.location.href = "tech-search.html";
}
