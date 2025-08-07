import React, { useEffect } from 'react';

const Teste = (props) => {

    const provasInfo = {
        ad: { minimo: 0, maximo: 10, nome: "AD" },
        ap: { minimo: 0, maximo: 10, nome: "AP" },
        az: { minimo: 0, maximo: 10, nome: "Folha Az" }
    }

    let materias = {
        port: { calc: "normal", nome: "Português" },
        mat: { calc: "normal", nome: "Matematica" },
        bio: { calc: "bio", nome: "Biologia" }
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

        let calcNormal = '(materias[materiasArray[i]]["ad"] + materias[materiasArray[i]]["ap"]) / 2';
        let calcBio = '(materias[materiasArray[i]]["ad"] + materias[materiasArray[i]]["ap"] + materias[materiasArray[i]]["az"]) / 3';

        for (let i = 0; i < materiasArray.length; i++) {
            if (materias[materiasArray[i]].calc == "normal") {
                newNotas[materiasArray[i]].nota = eval(calcNormal);
            } else if (materias[materiasArray[i]].calc == "bio") {
                newNotas[materiasArray[i]].nota = eval(calcBio);
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

    return (
        <>
            <div className="responsiveTable">
                <table>
                    <caption>Tabela de Calcular Médias</caption>
                    <thead>
                        <tr>
                            <th>Português</th>
                            <th>Matematica</th>
                            <th>Biologia</th>
                        </tr>
                    </thead>
                    <tbody onChange={pegarNotas}>
                        
                        <tr>
                            <td><div>AD </div><input type="number" class="port" name="ad" /></td>
                            <td><div>AD </div><input type="number" class="mat" name="ad" /></td>
                            <td><div>AD </div><input type="number" class="bio" name="ad" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>AP </div><input type="number" class="port" name="ap" /></td>
                            <td><div>AP </div><input type="number" class="mat" name="ap" /></td>
                            <td><div>AP </div><input type="number" class="bio" name="ap" /></td>
                        </tr>
                            
                        <tr>
                            <td></td>
                            <td></td>
                            <td><div>Folha Az </div><input type="number" class="bio" name="az" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>

    );
}

export default Teste;