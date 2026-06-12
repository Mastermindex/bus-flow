console.log("app.js está rodando");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔵 CONEXÃO COM SUPABASE
const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";
const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔵 ELEMENTOS
const cadastroForm = document.getElementById("cadastroForm");
const loginForm = document.getElementById("loginForm");

const cadastroTab = document.getElementById("cadastroTab");
const loginTab = document.getElementById("loginTab");

const msg = document.getElementById("msg");
const loginMsg = document.getElementById("loginMsg");

// 🔄 TROCAR ABAS
loginTab.addEventListener("click", () => {
  cadastroForm.style.display = "none";
  loginForm.style.display = "block";

  cadastroTab.classList.remove("active");
  loginTab.classList.add("active");
});

cadastroTab.addEventListener("click", () => {
  cadastroForm.style.display = "block";
  loginForm.style.display = "none";

  loginTab.classList.remove("active");
  cadastroTab.classList.add("active");
});

// 🔵 CADASTRO
cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { error: authError } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (authError) {
    console.log(authError);
    msg.innerText = authError.message;
    return;
  }

  const { error: dbError } = await supabase
    .from("usuarios")
    .insert([{ nome, email, senha }]);

  if (dbError) {
    console.log(dbError);
    msg.innerText = "Conta criada, mas erro no banco.";
    return;
  }

 if (!authData.session) {
  msg.innerText = "📩 Enviamos um e-mail de confirmação. Verifique sua caixa de entrada!";
} else {
  msg.innerText = "Conta criada e login realizado com sucesso 🚍";
}
  cadastroForm.reset();
});

// 🔐 LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    console.log(error);
    loginMsg.innerText = "Erro no login ❌";
    return;
  }

  loginMsg.innerText = "Login realizado com sucesso 🚍";
});
