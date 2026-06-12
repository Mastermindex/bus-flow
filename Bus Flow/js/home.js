console.log("home.js rodando");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔵 CONEXÃO SUPABASE
const supabase = createClient(
  "https://bvicnnzaqqnrawzceick.supabase.co",
  "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap"
);

// 🔵 ELEMENTOS
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");

// 🔍 VERIFICAR USUÁRIO
const { data } = await supabase.auth.getUser();

if (!data.user) {
  // se não estiver logado, volta pro cadastro
  window.location.href = "cadastro.html";
} else {
  console.log("Usuário logado:", data.user.email);

  if (welcome) {
    welcome.innerText = `Bem-vindo, ${data.user.email}`;
  }
}

// 🚪 LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "cadastro.html";
  });
}