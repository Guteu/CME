import AnoTesteS1 from "./AnoTesteS1";
import AnoTesteS2 from "./AnoTesteS2";
import Notas from "./Notas";
import Contacts from "../../Contacts";

import { useState } from "react";

import '../escolas.css'
import backgroundImg from '../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

const EscolaTeste = () => {
    
    const background = {
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            backgroundAttachment: "scroll",
            minHeight: "100vh"
        }

    const [notas, setNotas] = useState({});

    const [semester, setSemester] = useState(<AnoTesteS1 setNotas={setNotas} />);
    const semestersArray = [
        <AnoTesteS1 setNotas={setNotas} key={0} />,
        <AnoTesteS2 setNotas={setNotas} key={1}/>
    ];

    function changeSemester(e) {
        setSemester(semestersArray[Number(e.target.value)])
    }

    return (
        <div style={background}>
            <main>
                <section className="semesterBox">
                    <h1>Escolha a Unidade</h1>
                    <select name="" id="" onChange={changeSemester}>
                        <option value="0">semestre 1</option>
                        <option value="1">semestre 2</option>
                    </select>
                </section>
                

                {semester}

                { Object.keys(notas).length != 0 ? <Notas notas={notas} /> : null}
            </main>
            
            

            <Contacts />
        </div>
    );
}

export default EscolaTeste;