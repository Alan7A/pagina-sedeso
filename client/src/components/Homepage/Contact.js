import React from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
/*Aqui esta un formulario, faltan mas cosas esteticas por agregar entre ellas iconos y Posiblemente animaciones*/
function Contact() {
    return (
        <div>
            <h2 className="subtitulo" href="https://www.mozilla.org/es-ES/">Contactanos</h2>
            <div className="contacto">
            <Form>
                
      <FormGroup row>
       <Label for="exampleSelectMulti" sm={2}>¿Que necesitas?</Label>
        <Col sm={10}>
        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
            <option>1. Informacion Centros Contigo</option>
            <option>2. Dejar queja o Sugerencia</option>
            <option>3. Informacion de Tramite </option>
            <option>4. Lorem</option>
            <option>5. Lorem</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="Email">Correo Electronico:</Label>
        <Col sm={10}>
          <right><Input type="email" name="email" id="Email" placeholder="Escribe tu correo de contacto" /></right>
        </Col>
      </FormGroup>
      <FormGroup row>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={2}>Informacion adicional:</Label>
        <Col sm={10}>
          <Input type="textarea" name="text" id="exampleText" placeholder="Escribe aqui tus dudas, sugerencias o informacion adicional" />
        </Col>
      </FormGroup>
     
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
        <input type="submit" name="enviar" value="Enviar Informacion"/>
        </Col>
      </FormGroup>
    </Form>
            </div>
        </div>
    )
}
                /* <center>Oficinas SEDESO</center>
                <center>Telefono (Conmutador)</center>
                <center>449 910 21 21</center>
                <center>Ubicación</center>
                <center>Blvd. José María Chávez No.3205,</center>
                <center>Cd. Industrial C.P. 20290</center> */

export default Contact;
               