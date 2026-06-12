console.log("home.js rodando");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bvicnnzaqqnrawzceick.supabase.co",
  "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap"
);

const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");

// 🔍 checar usuário
const { data } = await supabase.auth.getUser();

if (!data.user) {
  window.location.href = "cadastro.html";
} else {
  welcome.innerText = `Bem-vindo, ${data.user.email}`;
}

// 🚪 logout
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "cadastro.html";
});
