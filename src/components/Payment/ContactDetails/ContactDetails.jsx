import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ContactDetails() {
  return (
    <>
      <Container>
        <Row>
          <Col className='mt-2 px-3 mb-5'>
            <div>
              <h5>Medios de contacto</h5>
              <h6>Dirección: </h6>
              <p>
                Avenida Gonzalo de Sandoval 1245, Colonia la oriental, C.P.
                28046. Colima, México.
              </p>
              <h6>Teléfono: </h6>
              <p>312-230-9242</p>
              <h6>Email: </h6>
              <p>uribe@tucalcetin.com.mx</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
