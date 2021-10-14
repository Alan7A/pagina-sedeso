import React from 'react';
import llam from './Ags.png'
function Contact() {
    return (
        <div>
            <h2 className="subtitulo" href="https://www.mozilla.org/es-ES/">Contactanos</h2>
            <div className="contacto">
                <div className='contenedor-image'>
                <center><img src={llam} align="right" width="150" height="150"/></center>

                </div>
                <div className='contenedor-Contact'>
                    <center>Telefono (Conmutador)</center>
                    <center>449 910 21 21</center>
                    <center>Oficinas SEDESO</center>
                    <center>UBICACIÓN</center>
                    <center>Blvd. José María Chávez No.3205,</center>
                    <center>Cd. Industrial C.P. 20290</center>
                </div>
                
            </div>
        </div >
    )
}


export default Contact;
