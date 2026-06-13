import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// 🔵 SUPABASE

const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";

const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";


const supabase = createClient(
  supabaseUrl,
  supabaseKey
);



// 🔵 ELEMENTOS

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



// 🔵 VARIÁVEIS

let currentUser = null;

let userData = null;



// 🔐 CARREGAR CONTA

async function loadUser(){


loadingEl.style.display = "block";

conteudoEl.style.display = "none";



const {data:{user}} = await supabase.auth.getUser();



if(!user){

window.location.href="cadastro.html";

return;

}



currentUser = user;



emailEl.innerText = user.email;



// 🔎 BUSCAR POR ID

let {data,error} = await supabase

.from("usuarios")

.select("*")

.eq("id", user.id)

.single();




// 🔁 SE NÃO ACHOU, BUSCA POR EMAIL

if(error){


const result = await supabase

.from("usuarios")

.select("*")

.eq("email", user.email)

.single();



data = result.data;

error = result.error;


}




if(error || !data){


loadingEl.innerHTML =
"❌ Não encontramos seus dados cadastrados.";


return;


}




userData = data;



nomeEl.innerText = data.nome || "Não informado";


documentoEl.innerText =
data.documento || "Não informado";



loadingEl.style.display="none";


conteudoEl.style.display="block";



}



// 💾 SALVAR

salvarBtn.addEventListener("click", async()=>{


msg.innerText="";



const senha = senhaConfirmacao.value;


if(!senha){


msg.innerText =
"Digite sua senha para confirmar.";


return;


}




// 🔐 confirmar senha

const {error:loginError}=

await supabase.auth.signInWithPassword({

email:currentUser.email,

password:senha

});



if(loginError){


msg.innerText="Senha incorreta ❌";

return;


}




const novoNome =
editNome.value.trim();


const novoDocumento =
editDocumento.value.trim();




// 🔵 atualizar


const {error}=

await supabase

.from("usuarios")

.update({

nome: novoNome || userData.nome,

documento:
novoDocumento || userData.documento

})

.eq("email", currentUser.email);





if(error){


console.log(error);


msg.innerText=
"Erro ao atualizar dados.";


return;


}




msg.innerText =
"Dados atualizados com sucesso 🚍";



loadUser();



});




// 🚀 INICIAR

loadUser();
