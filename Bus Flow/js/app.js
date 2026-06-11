console.log("app.js está rodando");
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔵 CONEXÃO COM SUPABASE
const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";
const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔵 ELEMENTOS DO HTML
const form = document.getElementById("cadastroForm");
const msg = document.getElementById("msg");

// 🔵 CADASTRO
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { data, error } = await supabase
    .from("usuarios")
    .insert([
      { nome, email, senha }
    ]);

  if (error) {
    console.log(error);
    msg.innerText = "Erro ao cadastrar ❌";
    return;
  }

  msg.innerText = "Cadastro realizado com sucesso 🚍";
  form.reset();
});
