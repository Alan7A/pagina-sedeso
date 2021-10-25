import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
function Contact() {
    return (
        <div>
            <h2 className="subtitulo" href="https://www.mozilla.org/es-ES/">Contactanos</h2>
            <div className="contacto">
                {/* <div className='contenedor-Contact-derecha' >
                    <img src={Phone} width="60" height="30" />
                    <p>Telefono (Conmutador)</p>
                    <p>449 910 21 21</p>
                    <p>Oficinas SEDESO</p>
                    <div className='contenedor-Contact-izquierda' >
                        <img src={Location} width="60" height="30" />
                        <p>UBICACIÓN</p>
                        <p>Blvd. José María Chávez No.3205
                        Cd. Industrial C.P. 20290
                    </div> */}
                    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div class="row mb-5">
                    <div class="col-md-3">
                        <div class="dbox w-100 text-center">
                            <div class="icon d-flex align-items-center justify-content-center">
                                <span class="fa fa-map-marker"></span>
                            </div>
                            <div class="text">
                                <p><span>Dirección:</span> Blvd. José María Chávez No.3205
                        Cd. Industrial C.P. 20290</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="dbox w-100 text-center">
                            <div class="icon d-flex align-items-center justify-content-center">
                                <span class="fa fa-phone"></span>
                            </div>
                            <div class="text">
                                <p><span>Telefono:</span> <a href="tel://449 910 21 21">449 910 21 218 </a> Ext.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="dbox w-100 text-center">
                            <div class="icon d-flex align-items-center justify-content-center">
                                <span class="fa fa-paper-plane"></span>
                            </div>
                            <div class="text">
                                <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
   
            </div>
        </div>
    )
}


export default Contact;
