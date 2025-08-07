import { useState } from "react";

import '../../escolas.css'
import backgroundImg from '../../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

import Notas from '../Notas.jsx'
import Contacts from '../../../Contacts.jsx';
import Bimestre1 from './Bimestre1.jsx';
import Bimestre2 from "./Bimestre2.jsx";
import Bimestre3 from './Bimestre3.jsx';

const Sartre1Ano = () => {
    
    const background = {
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh"
        }

    const [notas, setNotas] = useState({});
    
    //state com o bimestre ativo
    const [semester, setSemester] = useState(<Bimestre1 setNotas={setNotas} />);
    //array com os bimestres
    const semestersArray = [
        <Bimestre1 setNotas={setNotas} key={0} />,
        <Bimestre2 setNotas={setNotas} key={1} />,
        <Bimestre3 setNotas={setNotas} key={2} />,
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
                        <option value="0">bimestre 1</option>
                        <option value="1">bimestre 2</option>
                        <option value="2">bimestre 3</option>
                    </select>
                </section>
                

                {semester}

                { Object.keys(notas).length != 0 ? <Notas notas={notas} /> : null}
            </main>
            
            

            <Contacts />
        </div>
    );
}

export default Sartre1Ano;