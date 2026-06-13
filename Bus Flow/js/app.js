console.log("app.js funcionando 🚍");


import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// ==========================
// SUPABASE
// ==========================


const supabaseUrl =
"https://bvicnnzaqqnrawzceick.supabase.co";


const supabaseKey =
"sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";


const supabase =
createClient(
supabaseUrl,
supabaseKey
);




// ==========================
// ELEMENTOS
// ==========================


// cadastro/login

const cadastroForm =
document.getElementById("cadastroForm");


const loginForm =
document.getElementById("loginForm");


const cadastroTab =
document.getElementById("cadastroTab");


const loginTab =
document.getElementById("loginTab");


const msg =
document.getElementById("msg");


const loginMsg =
document.getElementById("loginMsg");




// dashboard

const paginaInicial =
document.getElementById("paginaInicial");


const dashboardUsuario =
document.getElementById("dashboardUsuario");


const welcome =
document.getElementById("welcome");


const logoutBtn =
document.getElementById("logoutBtn");




// navbar

const navEmail =
document.getElementById("navEmail");


const navLogout =
document.getElementById("navLogout");





// ==========================
// ABAS LOGIN/CADASTRO
// ==========================


loginTab?.addEventListener(
"click",
()=>{


cadastroForm.style.display="none";

loginForm.style.display="block";


cadastroTab.classList.remove("active");

loginTab.classList.add("active");


});





cadastroTab?.addEventListener(
"click",
()=>{


cadastroForm.style.display="block";

loginForm.style.display="none";


loginTab.classList.remove("active");

cadastroTab.classList.add("active");


});








// ==========================
// CADASTRO
// ==========================


cadastroForm?.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const nome =
document.getElementById("nome").value;


const documento =
document.getElementById("documento").value;


const email =
document.getElementById("email").value;


const senha =
document.getElementById("senha").value;



const tipo =
document.getElementById("tipoDocumento").value;




const {data,error} =
await supabase.auth.signUp({

email,

password:senha

});




if(error){

msg.innerText =
error.message;

return;

}




const {error:dbError}=

await supabase

.from("usuarios")

.insert([

{

id:data.user.id,

nome,

documento,

email,

tipo

}

]);





if(dbError){

console.log(dbError);

msg.innerText =
"Erro ao salvar dados ❌";

return;

}



msg.innerText =
"Conta criada com sucesso 🚍";



cadastroForm.reset();



});









// ==========================
// LOGIN
// ==========================


loginForm?.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
document.getElementById("loginEmail").value;


const senha =
document.getElementById("loginSenha").value;





const {data,error}=

await supabase.auth.signInWithPassword({

email,

password:senha

});





if(error){


loginMsg.innerText =
"Email ou senha incorretos ❌";


return;

}




loginMsg.innerText =
"Login realizado 🚍";



setTimeout(()=>{

window.location.href="index.html";

},500);



});









// ==========================
// MOSTRAR DASHBOARD
// ==========================


async function mostrarDashboard(user){



if(paginaInicial){

paginaInicial.style.display="none";

}




if(dashboardUsuario){

dashboardUsuario.style.display="block";

}





const {data}=

await supabase

.from("usuarios")

.select("nome")

.eq("id",user.id)

.single();





const nome =

data?.nome || "Usuário";







if(welcome){

welcome.innerHTML =

`

Bem-vindo, ${nome} 🚍

`;

}





if(navEmail){

navEmail.innerText = nome;

}



if(navLogout){

navLogout.style.display="block";

}



}









// ==========================
// MOSTRAR INÍCIO
// ==========================


function mostrarInicio(){


if(paginaInicial){

paginaInicial.style.display="block";

}



if(dashboardUsuario){

dashboardUsuario.style.display="none";

}



}









// ==========================
// LOGOUT
// ==========================


async function logout(){


await supabase.auth.signOut();


window.location.href="index.html";


}




logoutBtn?.addEventListener(
"click",
logout
);



navLogout?.addEventListener(
"click",
logout
);









// ==========================
// VERIFICAR LOGIN
// ==========================


async function checkUser(){


const {

data:{user}

}=

await supabase.auth.getUser();





if(user){


mostrarDashboard(user);


}else{


mostrarInicio();


}



}






checkUser();
