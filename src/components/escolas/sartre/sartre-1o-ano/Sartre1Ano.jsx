import { useState } from "react";
import { useResetSignal } from "../../utils/hooks/useResetSignal.js";

import '../../escolas.css'
import backgroundImg from '../../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

import HomeButton from "../../utils/components/homebutton/HomeButton.jsx";
import RefreshInputsButton from "../../utils/components/refreshInputsButton/RefreshInputsButton.jsx";
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

    //resetSignal é usado para reiniciar os inputs dos bimestres (ativado ao clicar no botão de reiniciar)
    const { resetSignal, reiniciarInputs } = useResetSignal();
    //estado para controlar o bimestre selecionado
    //0 = bimestre 1, 1 = bimestre 2, 2 = bimestre 3
    const [semesterIndex, setSemesterIndex] = useState(0);
    
    //array com os bimestres
    const semestersArray = [
        <Bimestre1 setNotas={setNotas} key={0} resetSignal={resetSignal} />,
        <Bimestre2 setNotas={setNotas} key={1} resetSignal={resetSignal} />,
        <Bimestre3 setNotas={setNotas} key={2} resetSignal={resetSignal} />,
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
                        <option value="0">bimestre 1</option>
                        <option value="1">bimestre 2</option>
                        <option value="2">bimestre 3</option>
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

export default Sartre1Ano;