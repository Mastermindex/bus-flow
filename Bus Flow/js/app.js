console.log("app.js funcionando 🚍");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


// ==========================
// SUPABASE
// ==========================

const supabaseUrl = "https://bvicnnzaqqnrawzceick.supabase.co";

const supabaseKey = "sb_publishable_ZOhNuZSXGRTdPKnva57VAA_8KU2mPap";


const supabase = createClient(
  supabaseUrl,
  supabaseKey
);



// ==========================
// ELEMENTOS
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
// VERIFICAR LOGIN
// ==========================

async function checkUser(){


const {data:{user}} =
await supabase.auth.getUser();



if(user){


console.log(
"Usuário logado:",
user.email
);



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
`Bem-vindo, ${user.email} 🚍`;

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
