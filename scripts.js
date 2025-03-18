const key = "fbce605c30bf7451ea0549d7670c0179";

function DadosNaTela(dados) {
    console.log(dados);

    document.getElementById("cidade").innerHTML = "Tempo em " + dados.city.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + " °C";
    document.querySelector(".text-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = `Umidade: ${dados.main.humidity} %`;
    document.querySelector(".temp-min").innerHTML = `Min: ${Math.floor(dados.temp_min)} `;
    document.querySelector(".temp-max").innerHTML = `Max: ${Math.floor(dados.temp_max)} `;
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
    const dados = await resposta.json();

    const hoje = new Date().toISOString().split('T')[0];

    const previsoesHoje = dados.list.filter(item => item.dt_txt.startsWith(hoje));

    if (previsoesHoje.length === 0) {
        console.error("Nenhuma previsão disponível para hoje.");
        return;
    }

    const tempMin = Math.min(...previsoesHoje.map(item => item.main.temp_min));
    const tempMax = Math.max(...previsoesHoje.map(item => item.main.temp_max));

    console.log(`Mínima: ${tempMin}°C e Máxima: ${tempMax}°C`);

    const dadosHoje = {
        city: dados.city,
        main: previsoesHoje[0].main,
        weather: previsoesHoje[0].weather,
        temp_min: tempMin,
        temp_max: tempMax
    };

    DadosNaTela(dadosHoje);
}

function cliqueiNobotao() {
    const cidade = document.getElementById('input-cidade').value;
    buscarCidade(cidade);
}

document.getElementById("input-cidade").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        cliqueiNobotao(); 
    }
});