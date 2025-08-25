import { useState } from "react";
import { useResetSignal } from "../../utils/hooks/useResetSignal.js";

import '../../escolas.css'
import backgroundImg from '../../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

import HomeButton from "../../utils/components/homebutton/HomeButton.jsx";
import RefreshInputsButton from "../../utils/components/refreshInputsButton/RefreshInputsButton.jsx";
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
    
    //resetSignal é usado para reiniciar os inputs dos bimestres (ativado ao clicar no botão de reiniciar)
    const { resetSignal, reiniciarInputs } = useResetSignal();
    //estado para controlar o bimestre selecionado
    //0 = bimestre 1, 1 = bimestre 2, 2 = bimestre 3
    const [semesterIndex, setSemesterIndex] = useState(1);

    //array com os bimestres
    const semestersArray = [
        <p>sou bimestre 1</p>,
        <Bimestre2 setNotas={setNotas} key={1} resetSignal={resetSignal} />,
        <Bimestre3 setNotas={setNotas} key={2} resetSignal={resetSignal} />
    ];

    function changeSemester(e) {
        setSemesterIndex(Number(e.target.value));
    }

    return (
        <div style={background}>
            <HomeButton />
            <main>
                <section className="semesterBox">
                    <h1>Escolha a Unidade</h1>
                    <select name="" id="semesterSelect" onChange={changeSemester}>
                        <option value="1">semestre 1 bimestre 2</option>
                        <option value="2">semestre 2 bimestre 1</option>
                    </select>
                </section>
                
                <RefreshInputsButton onClick={reiniciarInputs} />

                {semestersArray[semesterIndex]}

                { Object.keys(notas).length != 0 ? <Notas notas={notas} /> : null}
            </main>
            
            

            <Contacts />
        </div>
    );
}

export default SartreHS;