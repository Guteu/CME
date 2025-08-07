import { useState } from "react";

import '../../escolas.css'
import backgroundImg from '../../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

import Notas from '../Notas.jsx'
import Contacts from '../../../Contacts.jsx';
import Bimestre2 from './Bimestre2.jsx';
import Bimestre3 from "./Bimestre3.jsx";


const SartreHS = () => {
    
    const background = {
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh"
        }

    const [notas, setNotas] = useState({});
    
    //state com o bimestre ativo
    const [semester, setSemester] = useState(<Bimestre2 setNotas={setNotas} key={1} />);
    //array com os bimestres
    const semestersArray = [
        <p>sou bimestre 1</p>,
        <Bimestre2 setNotas={setNotas} key={1} />,
        <Bimestre3 setNotas={setNotas} key={2} />
    ];

    function changeSemester(e) {
        setSemester(semestersArray[Number(e.target.value)])
    }

    return (
        <div style={background}>
            <main>
                <section className="semesterBox">
                    <h1>Escolha a Unidade</h1>
                    <select name="" id="semesterSelect" onChange={changeSemester}>
                        <option value="1">semestre 1 bimestre 2</option>
                        <option value="2">semestre 2 bimestre 1</option>
                    </select>
                </section>
                

                {semester}

                { Object.keys(notas).length != 0 ? <Notas notas={notas} /> : null}
            </main>
            
            

            <Contacts />
        </div>
    );
}

export default SartreHS;