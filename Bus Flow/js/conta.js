import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔵 CONEXÃO SUPABASE
const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";
const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔵 ELEMENTOS PRINCIPAIS
const loadingEl = document.getElementById("loading");
const conteudoEl = document.getElementById("conteudo");

const nomeEl = document.getElementById("nome");
const emailEl = document.getElementById("email");
const documentoEl = document.getElementById("documento");

const editNome = document.getElementById("editNome");
const editDocumento = document.getElementById("editDocumento");
const senhaConfirmacao = document.getElementById("senhaConfirmacao");

const salvarBtn = document.getElementById("salvarBtn");
const msg = document.getElementById("msg");

// 🔵 USUÁRIO
let currentUser = null;
let userData = null;

// 🔐 CARREGAR USUÁRIO
async function loadUser() {
  loadingEl.style.display = "block";
  conteudoEl.style.display = "none";

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    window.location.href = "cadastro.html";
    return;
  }

  currentUser = user;

  emailEl.innerText = user.email;

  // 🔵 BUSCAR DADOS
  const { data, error: dbError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError) {
    console.log(dbError);
    msg.innerText = "Erro ao carregar dados.";
    loadingEl.style.display = "none";
    return;
  }

  userData = data;

  nomeEl.innerText = data.nome || "";
  documentoEl.innerText = data.documento || "Não informado";

  // ✅ MOSTRA CONTEÚDO
  loadingEl.style.display = "none";
  conteudoEl.style.display = "block";
}

// 💾 SALVAR ALTERAÇÕES
salvarBtn.addEventListener("click", async () => {
  const novoNome = editNome.value.trim();
  const novoDocumento = editDocumento.value.trim();
  const senha = senhaConfirmacao.value;

  msg.innerText = "";

  if (!senha) {
    msg.innerText = "Digite sua senha para confirmar.";
    return;
  }

  // 🔐 valida senha
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: currentUser.email,
    password: senha
  });

  if (loginError) {
    msg.innerText = "Senha incorreta ❌";
    return;
  }

  // 🔵 update
  const { error } = await supabase
    .from("usuarios")
    .update({
      nome: novoNome || userData.nome,
      documento: novoDocumento || userData.documento
    })
    .eq("id", currentUser.id);

  if (error) {
    console.log(error);
    msg.innerText = "Erro ao atualizar dados.";
    return;
  }

  msg.innerText = "Dados atualizados com sucesso 🚍";

  loadUser();
});

// 🚀 INIT
loadUser();
