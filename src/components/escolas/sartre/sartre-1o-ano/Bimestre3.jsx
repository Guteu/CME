import React, { useEffect } from 'react';

const Bimestre3 = (props) => {

    const provasInfo = {
        ad: { minimo: 0, maximo: 10, nome: "AD" },
        ao: { minimo: 0, maximo: 10, nome: "AO" },
        avEnem: { minimo: 0, maximo: 10, nome: "Av. Enem" },
        flAZ: { minimo: 0, maximo: 10, nome: "Folha Az" },
        hum: { minimo: 0, maximo: 10, nome: "Humanidades" },
        av1: { minimo: 0, maximo: 10, nome: "AV1" },
        av2: { minimo: 0, maximo: 10, nome: "AV2" }
    }

    let materias = {
        port: { calc: "normal", nome: "Português" },
        hist: { calc: "normal", nome: "História" },
        geo: { calc: "normal", nome: "Geografia" },
        mat: { calc: "normalSH", nome: "Matemática" },
        fis: { calc: "normalSH", nome: "Física" },
        qui: { calc: "normalSH", nome: "Química" },
        bio: { calc: "normalSH", nome: "Biologia" },
        fil: { calc: "normal", nome: "Filosofia" },
        soc: { calc: "normal", nome: "Sociologia" },
        red: { calc: "red", nome: "Redação" },
        hum: { calc: "hum", nome: "Projeto Humanidades" }
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

        let calcNormal = '((materias[materiasArray[i]]["ad"] + materias.hum.hum)/2 * 4 + (materias[materiasArray[i]]["ao"] * 4) + materias[materiasArray[i]]["avEnem"] + materias[materiasArray[i]]["flAZ"]) / 10';
        let calcSemHumanidades = '((materias[materiasArray[i]]["ad"] * 4) + (materias[materiasArray[i]]["ao"] * 4) + materias[materiasArray[i]]["avEnem"] + materias[materiasArray[i]]["flAZ"]) / 10';
        let calcRedacao = '((materias[materiasArray[i]]["av1"] + materias.hum.hum)/2 + materias[materiasArray[i]]["av2"]) / 2';
        

        for (let i = 0; i < materiasArray.length; i++) {
            if (materias[materiasArray[i]].calc == "normal") {
                newNotas[materiasArray[i]].nota = eval(calcNormal);
            } else if (materias[materiasArray[i]].calc == "normalSH") {
                newNotas[materiasArray[i]].nota = eval(calcSemHumanidades);
            } else if (materias[materiasArray[i]].calc == "red") {
                newNotas[materiasArray[i]].nota = eval(calcRedacao);
            } else if (materias[materiasArray[i]].calc == "hum") {
                newNotas[materiasArray[i]].nota = materias[materiasArray[i]]["hum"];
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
            <div className="responsiveTable">
                <table>
                    <caption>Tabela de Calcular Médias</caption>
                    <thead>
                        <tr>
                            <th>Português</th>
                            <th>História</th>
                            <th>Geografia</th>
                            <th>Matemática</th>
                            <th>Física</th>
                            <th>Química</th>
                            <th>Biologia</th>
                        </tr>
                    </thead>
                    <tbody onChange={pegarNotas}>
                        
                        <tr>
                            <td><div>AD </div><input type="number" className="port" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="hist" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="geo" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="mat" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="fis" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="qui" name="ad" /></td>
                            <td><div>AD </div><input type="number" className="bio" name="ad" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>AO </div><input type="number" className="port" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="hist" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="geo" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="mat" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="fis" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="qui" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="bio" name="ao" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>Av. Enem </div><input type="number" className="port" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="hist" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="geo" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="mat" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="fis" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="qui" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="bio" name="avEnem" /></td>
                        </tr>
                            
                        <tr>
                            <td><div>Folha Az </div><input type="number" className="port" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="hist" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="geo" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="mat" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="fis" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="qui" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="bio" name="flAZ" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='responsiveTable'>
                <table>
                    <caption>Tabela de Calcular Médias</caption>
                    <thead>
                        <tr>
                            <th>Filosofia</th>
                            <th>Sociologia</th>
                            <th>Redação</th>
                            <th>Projeto Humanidades</th>
                        </tr>
                    </thead>
                    <tbody onChange={pegarNotas}>
                        <tr>
                            <td><div>AP </div><input type="number" className="fil" name="ad" /></td>
                            <td><div>AP </div><input type="number" className="soc" name="ad" /></td>
                            <td><div>AV1 </div><input type="number" className="red" name="av1" /></td>
                            <td><div>Humanidades </div><input type="number" className="hum" name="hum" /></td>
                        </tr>
                        <tr>
                            <td><div>AO </div><input type="number" className="fil" name="ao" /></td>
                            <td><div>AO </div><input type="number" className="soc" name="ao" /></td>
                            <td><div>AV2 </div><input type="number" className="red" name="av2" /></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><div>Av. Enem </div><input type="number" className="fil" name="avEnem" /></td>
                            <td><div>Av. Enem </div><input type="number" className="soc" name="avEnem" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><div>Folha Az </div><input type="number" className="fil" name="flAZ" /></td>
                            <td><div>Folha Az </div><input type="number" className="soc" name="flAZ" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Bimestre3;