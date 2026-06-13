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
// ELEMENTOS DASHBOARD
// ==========================

const paginaInicial =
document.getElementById("paginaInicial");


const dashboardUsuario =
document.getElementById("dashboardUsuario");


const welcome =
document.getElementById("welcome");


const logoutBtn =
document.getElementById("logoutBtn");




// ==========================
// ELEMENTOS LOGIN
// ==========================

const loginForm =
document.getElementById("loginForm");


const loginEmail =
document.getElementById("loginEmail");


const loginSenha =
document.getElementById("loginSenha");


const loginMsg =
document.getElementById("loginMsg");




// ==========================
// LOGIN
// ==========================


loginForm?.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
loginEmail.value;


const senha =
loginSenha.value;



const {data,error} =
await supabase.auth.signInWithPassword({

email,

password:senha

});




if(error){


console.log(error);


if(loginMsg){

loginMsg.innerText =
"Login inválido ❌";

}


return;

}




if(loginMsg){

loginMsg.innerText =
"Login realizado 🚍";

}



mostrarDashboard(data.user);



});








// ==========================
// VERIFICAR LOGIN EXISTENTE
// ==========================


async function checkUser(){


const {

data:{user}

} =
await supabase.auth.getUser();




if(user){


mostrarDashboard(user);



}else{


mostrarInicio();


}



}







// ==========================
// MOSTRAR DASHBOARD
// ==========================


function mostrarDashboard(user){



if(paginaInicial){

paginaInicial.style.display =
"none";

}



if(dashboardUsuario){

dashboardUsuario.style.display =
"block";

}




if(welcome){


welcome.innerText =
`Bem-vindo ao Bus Flow, ${user.email} 🚍`;

}



}







// ==========================
// MOSTRAR INÍCIO
// ==========================


function mostrarInicio(){



if(paginaInicial){

paginaInicial.style.display =
"block";

}




if(dashboardUsuario){

dashboardUsuario.style.display =
"none";

}


}







// ==========================
// LOGOUT
// ==========================


logoutBtn?.addEventListener(

"click",

async()=>{


await supabase.auth.signOut();


mostrarInicio();


}

);







// ==========================
// INICIAR
// ==========================

checkUser();
