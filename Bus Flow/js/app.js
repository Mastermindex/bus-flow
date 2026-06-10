/* ==========================
   BUS FLOW
   APP.JS
========================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Bus Flow iniciado.");

    iniciarPesquisa();
    iniciarFiltro();
    iniciarAtualizacaoTempoReal();

});

/* ==========================
   PESQUISA
========================== */

function iniciarPesquisa() {

    const searchInput =
    document.getElementById("searchInput");

    const busList =
    document.getElementById("busList");

    if (!searchInput || !busList) return;

    searchInput.addEventListener("input", () => {

        const termo =
        searchInput.value.toLowerCase();

        const items =
        busList.querySelectorAll(".bus-item");

        items.forEach(item => {

            const texto =
            item.innerText.toLowerCase();

            if (texto.includes(termo)) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    });

}

/* ==========================
   FILTRO EMPRESAS
========================== */

function iniciarFiltro() {

    const filtro =
    document.getElementById("companyFilter");

    const busList =
    document.getElementById("busList");

    if (!filtro || !busList) return;

    filtro.addEventListener("change", () => {

        const empresa =
        filtro.value;

        const items =
        busList.querySelectorAll(".bus-item");

        items.forEach(item => {

            if (empresa === "all") {

                item.style.display = "flex";
                return;

            }

            const texto =
            item.innerText;

            if (texto.includes(empresa)) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    });

}

/* ==========================
   ATUALIZAÇÃO SIMULADA
========================== */

function iniciarAtualizacaoTempoReal() {

    const tempos =
    document.querySelectorAll(".bus-item p:last-child");

    if (!tempos.length) return;

    setInterval(() => {

        tempos.forEach(item => {

            const valor =
            item.textContent
            .replace(" min","")
            .trim();

            const numero =
            parseInt(valor);

            if (
                !isNaN(numero) &&
                numero > 1
            ) {

                item.textContent =
                (numero - 1) + " min";

            }

        });

    }, 30000);

}

/* ==========================
   ASSISTENTE IA SIMULADO
========================== */

function abrirAssistenteEmpresarial() {

    alert(

`Assistente Virtual Bus Flow

Olá!

Posso ajudar com:

• Gestão de frota
• Horários de linhas
• Relatórios
• Planejamento operacional
• Estatísticas de uso

(versão demonstrativa)`

    );

}

/* ==========================
   CADASTRO
========================== */

function validarDocumento(documento) {

    documento =
    documento.replace(/\D/g,'');

    if (
        documento.length === 11
    ) {

        return "CPF";

    }

    if (
        documento.length === 14
    ) {

        return "CNPJ";

    }

    return "INVÁLIDO";

}

/* ==========================
   DEMONSTRAÇÃO
========================== */

const empresasCadastradas = [

    {
        nome:
        "Cidade Mobilidade",

        plano:
        "Premium"
    },

    {
        nome:
        "Expresso Sul",

        plano:
        "Básico"
    },

    {
        nome:
        "Transporte Alfa",

        plano:
        "Premium"
    },

    {
        nome:
        "UrbanBus",

        plano:
        "Básico"
    }

];

/* ==========================
   API FUTURA
========================== */

const configuracaoAPI = {

    gps: false,

    pagamentos: false,

    assistenteIA: true,

    openStreetMap: true

};

console.log(
"Empresas cadastradas:",
empresasCadastradas
);

console.log(
"Configuração:",
configuracaoAPI
);