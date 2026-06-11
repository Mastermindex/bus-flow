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

// 🔐 Cria usuário no Supabase Auth
const { data: authData, error: authError } =
await supabase.auth.signUp({
email: email,
password: senha
});

if (authError) {
console.log(authError);
msg.innerText = authError.message;
return;
}

// 👤 Salva os dados na tabela
const { error: dbError } = await supabase
.from("usuarios")
.insert([
{
nome,
email,
senha
}
]);

if (dbError) {
console.log(dbError);
msg.innerText = "Conta criada, mas houve erro ao salvar os dados.";
return;
}

msg.innerText = "Conta criada com sucesso 🚍";
form.reset();
});
