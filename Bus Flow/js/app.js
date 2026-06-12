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

const userInfo = document.getElementById("userInfo");

// navbar (opcional)
const navEmail = document.getElementById("navEmail");
const navLogout = document.getElementById("navLogout");

// 🔄 VERIFICA LOGIN VISUAL
function isLoggedIn() {
  return navLogout && navLogout.style.display === "block";
}

// 🔄 TROCAR ABAS
loginTab?.addEventListener("click", () => {
  if (isLoggedIn()) return;

  cadastroForm.style.display = "none";
  loginForm.style.display = "block";

  cadastroTab.classList.remove("active");
  loginTab.classList.add("active");
});

cadastroTab?.addEventListener("click", () => {
  if (isLoggedIn()) return;

  cadastroForm.style.display = "block";
  loginForm.style.display = "none";

  loginTab.classList.remove("active");
  cadastroTab.classList.add("active");
});

// 🔵 CADASTRO
cadastroForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipoDocumento")?.value || "cpf";

  msg.innerText = "";

  // 🔐 cria usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
      msg.innerText = "Esse e-mail já está cadastrado.";
    } else {
      msg.innerText = authError.message;
    }
    return;
  }

  const user = authData?.user;

  if (!user) {
    msg.innerText = "Erro ao criar usuário.";
    return;
  }

  // 📩 mensagem de verificação
  if (!authData.session) {
    msg.innerText = "📩 Verifique seu e-mail para confirmar a conta!";
  } else {
    msg.innerText = "Conta criada com sucesso 🚍";
  }

  // 👤 salva perfil (SEM senha) com UPSERT
  const { error: dbError } = await supabase
    .from("usuarios")
    .upsert([
      {
        id: user.id,
        nome,
        email,
        tipo
      }
    ]);

  if (dbError) {
    console.log(dbError);
    msg.innerText = "Conta criada, mas erro ao salvar no banco.";
  }

  cadastroForm.reset();
  checkUser();
});

// 🔐 LOGIN
loginForm?.addEventListener("submit", async (e) => {
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

  loginForm.reset();

  window.location.href = "home.html";
});

// 🔍 VERIFICAR USUÁRIO LOGADO
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();

  const tabs = document.querySelector(".tabs");

  if (user) {
    console.log("Usuário logado:", user.email);

    if (userInfo) {
      userInfo.innerText = `Logado como: ${user.email}`;
    }

    cadastroForm.style.display = "none";
    loginForm.style.display = "none";

    if (tabs) tabs.style.display = "none";

    if (navEmail) navEmail.innerText = user.email;
    if (navLogout) navLogout.style.display = "block";

  } else {
    console.log("Nenhum usuário logado");

    if (userInfo) {
      userInfo.innerText = "Não logado";
    }

    cadastroForm.style.display = "block";
    loginForm.style.display = "none";

    if (tabs) tabs.style.display = "flex";

    if (navEmail) navEmail.innerText = "";
    if (navLogout) navLogout.style.display = "none";
  }
}

// 🚪 LOGOUT
navLogout?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "cadastro.html";
});

// 🔁 INICIAR
checkUser();
