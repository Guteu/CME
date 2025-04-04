import { useEffect } from "react";

const AnoTesteS2 = (props) => {
    
    let materias = {
        port: {calc: "port", nome: "Português"},
        mat: {calc: "normal", nome: "Matemática"},
        bio: {calc: "normal", nome: "Biologia"}
    }

    let materiasArray = Object.keys(materias);

    let notas = {

    }

    for (let i = 0; i < materiasArray.length; i++) {
        notas[materiasArray[i]] = {};
        notas[materiasArray[i]].nota = 0
        notas[materiasArray[i]].nome = materias[materiasArray[i]].nome
    }

    useEffect(() => {
        props.setNotas(notas) 
    }, []);

    function pegarNotas() {

        for (let i = 0; i < materiasArray.length; i++) {
            let provasMateria = document.getElementsByClassName(materiasArray[i]);
            
            for (let j = 0; j < provasMateria.length; j++) {
                if(provasMateria[j].value == ""){
                    materias[materiasArray[i]][provasMateria[j].getAttribute("name")] = 0;
                } else {
                    //console.log(Number(provasMateria[j].value))
                    materias[materiasArray[i]][provasMateria[j].getAttribute("name")] = Number(provasMateria[j].value);
                }
                
            }
        }
        
        calcularNota()
    }

    function calcularNota(){
        let newNotas = {...notas}

        let calcNormal = '(materias[materiasArray[i]]["prova-1"] + materias[materiasArray[i]]["prova-2"] + materias[materiasArray[i]]["prova-3"])/3'
        let calcPort = '(materias[materiasArray[i]]["prova-1"] + materias[materiasArray[i]]["prova-2"] + materias[materiasArray[i]]["prova-3"] + materias[materiasArray[i]]["prova-4"])/4'

        for (let i = 0; i < materiasArray.length; i++) {
            if(materias[materiasArray[i]].calc == "normal"){
                newNotas[materiasArray[i]].nota = eval(calcNormal)
            } else if(materias[materiasArray[i]].calc == "port"){
                newNotas[materiasArray[i]].nota = eval(calcPort)
            }
        }

        props.setNotas(newNotas)
    }

    return (
        <div className="responsiveTable">
            <table>
                <caption>Tabela de Calcular Médias</caption>
                <thead>
                    <tr>
                        <th>Português</th>
                        <th>Matemática</th>
                        <th>Biologia</th>
                    </tr>
                </thead>
                <tbody onChange={pegarNotas}>
                    <tr>
                        <td><div>prova 1:</div><input type="number" className="port" name="prova-1" id="" /></td>
                        <td><div>prova 1:</div> <input type="number" className="mat" name="prova-1" id="" /></td>
                        <td><div>prova 1:</div> <input type="number" className="bio" name="prova-1" id="" /></td>
                    </tr>
                    <tr>
                        <td><div>prova 2:</div> <input type="number" className="port" name="prova-2" id="" /></td>
                        <td><div>prova 2:</div> <input type="number" className="mat" name="prova-2" id="" /></td>
                        <td><div>prova 2:</div> <input type="number" className="bio" name="prova-2" id="" /></td>
                    </tr>
                    <tr>
                        <td><div>prova 3:</div> <input type="number" className="port" name="prova-3" id="" /></td>
                        <td><div>prova 3:</div> <input type="number" className="mat" name="prova-3" id="" /></td>
                        <td><div>prova 3:</div> <input type="number" className="bio" name="prova-3" id="" /></td>
                    </tr>
                    <tr>
                        <td><div>prova 4:</div> <input type="number" className="port" name="prova-4" id="" /></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AnoTesteS2;