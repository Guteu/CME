import '../App.css'

const Contacts = () => {
    return (
        <footer>
            <section className='contactsBox'>
                <h1>Contatos</h1>

                <div className='contactsBoxListsBox'>
                    <div>
                        <h2>Guteu / Daniel Guerra</h2>
                        <ul>
                            <li>Discord: <a href="https://discord.com" target='_blank'>guteu_</a> </li>
                            <li>Instagram: <a href="https://www.instagram.com/guteu_daniel/" target='_blank'>@guteu_daniel</a></li>
                            <li>YouTube: <a href="https://www.youtube.com/channel/UCbprvYrUFBp2rOdwORzqHzQ" target='_blank'>Guteu</a></li>
                            <li>Github: <a href="https://github.com/Guteu" target='_blank'>Guteu</a></li>
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <h2>Alan Wang</h2>
                        <ul>
                            <li>Instagram: <a href="https://www.instagram.com/alanwangdsf/" target='_blank'>@alanwangdsf</a></li>
                            <li>YouTube: <a href="https://www.youtube.com/@2TheCodeYT" target='_blank'>2TheCodeYT</a></li>
                            <li>Github: <a href="https://github.com/AlanWang2313/" target='_blank'>AlanWang2313</a></li>
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <h2>Nos ajude com o seu feedback!</h2>
                        <ul>
                            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfmA8Ec71YCPRu_HOM6nWmLY_Z0PdgBUeDwtEOQe71OIcqebQ/viewform?usp=dialog" target='_blank'>Nos avalie!</a></li>
                            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScc66qcZXw8IKcJQg1Vf6tmMK5m3WMdYPInS78IN56fNPmsyw/viewform?usp=dialog" target='_blank'>Reporte Erros/Problemas</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            
        </footer>
    );
}
 
export default Contacts;