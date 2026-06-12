import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔵 CONEXÃO SUPABASE
const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";
const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔵 ELEMENTOS
const nomeEl = document.getElementById("nome");
const emailEl = document.getElementById("email");
const documentoEl = document.getElementById("documento");

const editNome = document.getElementById("editNome");
const editDocumento = document.getElementById("editDocumento");
const senhaConfirmacao = document.getElementById("senhaConfirmacao");

const salvarBtn = document.getElementById("salvarBtn");
const msg = document.getElementById("msg");

// 🔵 USUÁRIO ATUAL
let currentUser = null;
let userData = null;

// 🔐 CARREGAR USUÁRIO
async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "cadastro.html";
    return;
  }

  currentUser = user;

  emailEl.innerText = user.email;

  // 🔵 BUSCAR DADOS NA TABELA
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error) {
    console.log(error);
    msg.innerText = "Erro ao carregar dados.";
    return;
  }

  userData = data;

  nomeEl.innerText = data.nome;
  documentoEl.innerText = data.documento || "Não informado";
}

// 🔵 SALVAR ALTERAÇÕES
salvarBtn.addEventListener("click", async () => {
  const novoNome = editNome.value;
  const novoDocumento = editDocumento.value;
  const senha = senhaConfirmacao.value;

  if (!senha) {
    msg.innerText = "Digite sua senha para confirmar.";
    return;
  }

  // 🔐 validar senha
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: currentUser.email,
    password: senha
  });

  if (loginError) {
    msg.innerText = "Senha incorreta ❌";
    return;
  }

  // 🔵 atualizar dados
  const { error } = await supabase
    .from("usuarios")
    .update({
      nome: novoNome || userData.nome,
      documento: novoDocumento || userData.documento
    })
    .eq("email", currentUser.email);

  if (error) {
    console.log(error);
    msg.innerText = "Erro ao atualizar dados.";
    return;
  }

  msg.innerText = "Dados atualizados com sucesso 🚍";

  loadUser();
});

// 🔵 INIT
loadUser();