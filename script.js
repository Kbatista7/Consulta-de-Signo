
const signosXML = `  
    <signos>  
        <signo>  
            <nome>Áries</nome>  
            <data_inicio>21/03</data_inicio>  
            <data_fim>20/04</data_fim>  
        </signo>  
        <signo>  
            <nome>Touro</nome>  
            <data_inicio>21/04</data_inicio>  
            <data_fim>20/05</data_fim>  
        </signo>  
        <signo>  
            <nome>Gêmeos</nome>  
            <data_inicio>21/05</data_inicio>  
            <data_fim>20/06</data_fim>  
        </signo>  
        <signo>  
            <nome>Câncer</nome>  
            <data_inicio>21/06</data_inicio>  
            <data_fim>22/07</data_fim>  
        </signo>  
        <signo>  
            <nome>Leão</nome>  
            <data_inicio>23/07</data_inicio>  
            <data_fim>22/08</data_fim>  
        </signo>  
        <signo>  
            <nome>Virgem</nome>  
            <data_inicio>23/08</data_inicio>  
            <data_fim>22/09</data_fim>  
        </signo>  
        <signo>  
            <nome>Libra</nome>  
            <data_inicio>23/09</data_inicio>  
            <data_fim>22/10</data_fim>  
        </signo>  
        <signo>  
            <nome>Escorpião</nome>  
            <data_inicio>23/10</data_inicio>  
            <data_fim>21/11</data_fim>  
        </signo>  
        <signo>  
            <nome>Sagitário</nome>  
            <data_inicio>22/11</data_inicio>  
            <data_fim>21/12</data_fim>  
        </signo>  
        <signo>  
            <nome>Capricórnio</nome>  
            <data_inicio>22/12</data_inicio>  
            <data_fim>20/01</data_fim>  
        </signo>  
        <signo>  
            <nome>Aquário</nome>  
            <data_inicio>21/01</data_inicio>  
            <data_fim>19/02</data_fim>  
        </signo>  
        <signo>  
            <nome>Peixes</nome>  
            <data_inicio>20/02</data_inicio>  
            <data_fim>20/03</data_fim>  
        </signo>  
    </signos>  
`;  

document.getElementById('formulario').addEventListener('submit', function(e) {  
    e.preventDefault();  
    const dataNascimento = document.getElementById('data-nascimento').value;  
    const resultado = getSigno(dataNascimento);  
    mostrarResultado(resultado);  
});  

function getSigno(nasc) {  
    const parser = new DOMParser();  
    const xmlDoc = parser.parseFromString(signosXML, "text/xml");  
    const signos = xmlDoc.getElementsByTagName('signo');  

    for (let i = 0; i < signos.length; i++) {  
        const nome = signos[i].getElementsByTagName('nome')[0].childNodes[0].nodeValue;  
        const dataInicio = signos[i].getElementsByTagName('data_inicio')[0].childNodes[0].nodeValue;  
        const dataFim = signos[i].getElementsByTagName('data_fim')[0].childNodes[0].nodeValue;  

        if (isWithinDate(nasc, dataInicio, dataFim)) {  
            return nome;  
        }  
    }  
    return "Desconhecido";  
}  

function isWithinDate(nasc, inicio, fim) {  
    const [diaNasc, mesNasc] = nasc.split('-').reverse();  
    const [diaInicio, mesInicio] = inicio.split('/');  
    const [diaFim, mesFim] = fim.split('/');  

    const dataNascimento = new Date(2023, mesNasc - 1, diaNasc);  
    const dataInicioSigno = new Date(2023, mesInicio - 1, diaInicio);  
    const dataFimSigno = new Date(2023, mesFim - 1, diaFim);  

    return dataNascimento >= dataInicioSigno && dataNascimento <= dataFimSigno;  
}  

function mostrarResultado(signo) {  
    const conteudo = document.getElementById('conteudo');  
    const resultadoDiv = document.getElementById('resultado');  
    conteudo.style.display = 'none';  
    resultadoDiv.innerHTML = `<h1>Seu Signo</h1><p>Seu signo é: ${signo}</p><button onclick="voltar()">Voltar</button>`;  
}  

function voltar() {  
    document.getElementById('conteudo').style.display = 'block';  
    document.getElementById('resultado').innerHTML = '';  
    document.getElementById('data-nascimento').value = '';  
}  

