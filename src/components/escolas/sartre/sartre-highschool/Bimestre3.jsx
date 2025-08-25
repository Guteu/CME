import React, { useEffect } from 'react';

const Bimestre3 = (props) => {

    const provasInfo = {
        pe: { minimo: 0, maximo: 24, nome: "Produção Escrita (24)" },
        ne: { minimo: 0, maximo: 100, nome: "Nota Escrita" },
        no: { minimo: 0, maximo: 10, nome: "Nota Oral" }
    }

    let materias = {
        hist: { calc: "USHistory", nome: "US History" }
    };

    let materiasArray = Object.keys(materias);

    let notas = {

    }
    //preenche o lugar de notas para colocar 0 e os nomes
    for (let i = 0; i < materiasArray.length; i++) {
        notas[materiasArray[i]] = {};
        notas[materiasArray[i]].nota = 0
        notas[materiasArray[i]].nome = materias[materiasArray[i]].nome
    }

    useEffect(() => {
        props.setNotas(notas)
    }, [])

    function pegarNotas() {
        for (let i = 0; i < materiasArray.length; i++) {
            let provasMateria = document.getElementsByClassName(materiasArray[i]);

            //caso tenha uma ad q muda entre matérias, só criar um adPort por exemplo
            //seria assim: provasMateria[j].getAttribute("name") + materiasArray[i]

            //fazer o sistema de olhar se o input é maior ou menor que o permitido
            //se provasMateria[j].getAttribute("name") maior que limiteNotas[provasMateria[j].getAttribute("name")].maximo
            //ou
            //se provasMateria[j].getAttribute("name") menor que limiteNotas[provasMateria[j].getAttribute("name")].minimo
            //se sim, fazer algo
            
            for (let j = 0; j < provasMateria.length; j++) {
                if (provasMateria[j].value == "") {
                    materias[materiasArray[i]][provasMateria[j].getAttribute("name")] = 0;
                } else if(provasMateria[j].value > provasInfo[provasMateria[j].getAttribute("name")].maximo) {
                    notaAcimaDoMaximo(provasMateria[j], provasMateria[j].getAttribute("name"), materiasArray[i], provasInfo[provasMateria[j].getAttribute("name")].maximo);
                } else if(provasMateria[j].value < provasInfo[provasMateria[j].getAttribute("name")].minimo) {
                    notaAbaixoDoMinimo(provasMateria[j], provasMateria[j].getAttribute("name"), materiasArray[i], provasInfo[provasMateria[j].getAttribute("name")].minimo);
                } else {
                    materias[materiasArray[i]][provasMateria[j].getAttribute("name")] = Number(provasMateria[j].value);
                }

                if (provasMateria[j].value <= provasInfo[provasMateria[j].getAttribute("name")].maximo && provasMateria[j].value >= provasInfo[provasMateria[j].getAttribute("name")].minimo && document.querySelector(`input.${materiasArray[i]}[name="${provasMateria[j].getAttribute("name")}"]`).previousSibling.innerText != provasInfo[provasMateria[j].getAttribute("name")].nome) {
                    
                    notaPermitida(provasMateria[j].getAttribute("name"), materiasArray[i]);
                }
                
            }
        }

        calcularNota()
    }

    function calcularNota() {
        let newNotas = { ...notas }

        let calcUSHistory = '((materias[materiasArray[i]]["pe"] / 2.4 * 3) + ((materias[materiasArray[i]]["ne"] / 10) * 5) + materias[materiasArray[i]]["no"] * 2) / 10';

        for (let i = 0; i < materiasArray.length; i++) {
            if (materias[materiasArray[i]].calc == "USHistory") {
                newNotas[materiasArray[i]].nota = eval(calcUSHistory);
            }
        }

        props.setNotas(newNotas)
    
    }

    function notaPermitida(provaNome, materiaNome) {

        //isso aqui ta um shitty code, tenho q concertar depois
        if((materiaNome == "fil" || materiaNome == "soc") && provaNome == "ad") {
            document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.innerText = "AP";
        } else {
            document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.innerText = provasInfo[provaNome].nome;
        }


        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.style.fontSize = "1em"; // reduz o tamanho da fonte
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).style.backgroundColor = ""; // limpa o fundo vermelho
    }

    function notaAcimaDoMaximo(inputHTML, provaNome, materiaNome, notaMaxima) {
        const NOTA = Number(inputHTML.value);

        //console.log(`Nota acima do máximo permitido: ${inputHTML.value} para ${provaNome} de ${materiaNome}. Máximo permitido: ${notaMaxima}`);

        materias[materiaNome][provaNome] = Number(notaMaxima);
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.innerText = `${NOTA} está acima do máximo (${notaMaxima})`;
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.style.fontSize = "0.6em"; // reduz o tamanho da fonte
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).style.backgroundColor = "#ffcccc"; // vermelho claro
    }

    function notaAbaixoDoMinimo(inputHTML, provaNome, materiaNome, notaMinima) {
        const NOTA = Number(inputHTML.value);

        materias[materiaNome][provaNome] = Number(notaMinima);
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.innerText = `${NOTA} está abaixo do mínimo (${notaMinima})`;
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).previousSibling.style.fontSize = "0.6em"; // reduz o tamanho da fonte
        document.querySelector(`input.${materiaNome}[name="${provaNome}"]`).style.backgroundColor = "#ffcccc"; // vermelho claro
    }

    //limpa os inputs quando o componente é montado ou quando o resetSignal muda (botão de reiniciar está no componente pai)
    useEffect(() => {
        limparInputs();
    }, [props.resetSignal]);

    function limparInputs() {
        let inputs = document.querySelectorAll('input[type="number"]');

        inputs.forEach((input) => {
            input.value = "";
        });

        pegarNotas();
    }

    return (
        <>
            <div className='responsiveTable'>
                <table>
                    <caption>Informação sobre as provas</caption>
                    <tbody>
                        <tr>
                            <th>Produção Escrita:</th>
                            <td>número de assignaments que valem nota que você fez (discussion, unit test, quiz etc)</td>
                        </tr>
                        <tr>
                            <th>Nota Escrita:</th>
                            <td>nota de 0 a 100 que fica do lado do seu curso no site do keystone</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="responsiveTable">
                <table>
                    <caption>Tabela de Calcular Médias</caption>
                    <thead>
                        <tr>
                            <th>US History</th>
                        </tr>
                    </thead>
                    <tbody onChange={pegarNotas}>
                        
                        <tr>
                            <td><div>Produção Escrita (24) </div><input type="number" className="hist" name="pe" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>Nota Escrita </div><input type="number" className="hist" name="ne" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>Nota Oral </div><input type="number" className="hist" name="no" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>

    );
}

export default Bimestre3;