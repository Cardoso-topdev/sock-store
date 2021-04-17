import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import arrowDownIcon from './assets/arrow.png';

import info from './info.svg';
import iconLocalShipping from './assets/IconLocalShipment.png';
import iconNationalShipping from './assets/IconNationalShipment.png';

import './Shipping.css';

export default function Shipping({ shippingOptions, handleChangeRadio }) {
  return (
    <Col className='justify-content-start padding-right-2rem' xs={12}>
      <Form.Group as={Row} onChange={handleChangeRadio} xs={12}>
        <h5 className='ml-4'>Envíos Disponibles</h5>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip>
              Si la localidad es de difícil acceso se cobra extra (contacto por
              correo)
            </Tooltip>
          }
        >
          <img
            className='infoIcon'
            src={info}
            alt='Icono de información para las tallas'
          />
        </OverlayTrigger>

        <Form.Row className='justify-content-start ml-4 w-100'>
          <Accordion className='w-100'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                <h6 className='bold'>
                  <img
                    className='mr-2'
                    src={iconLocalShipping}
                    alt='icono de envio local'
                  />
                  Envio Local (Estado de Colima)
                  <img
                    src={arrowDownIcon}
                    alt='flecha apuntando hacia abajo'
                    className='arrowDownIcon'
                  />
                </h6>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0' key={1}>
                <Card.Body>
                  {shippingOptions.map((el) => {
                    return el.nombre.split(' ')[0] === 'Local' ? (
                      <Col
                        sm={12}
                        className='justify-content-start ml-1'
                        key={el.id}
                      >
                        <Form.Check.Input
                          custom='true'
                          type='radio'
                          name='shippingMethod'
                          id={`shipping${el.id}`}
                          value={el.id}
                          required
                        />
                        <Form.Check.Label htmlFor={`shipping${el.id}`}>
                          {`(${el.alcance}) $${el.precio}MXN `}
                          <span className='labelShippingTime'>
                            — {`${el.tiempo}`}
                          </span>
                        </Form.Check.Label>
                      </Col>
                    ) : null;
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form.Row>

        <Form.Row className='justify-content-start ml-4 w-100'>
          <Accordion className='w-100' defaultActiveKey='1'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                <h6 className='bold'>
                  <img
                    className='mr-2'
                    src={iconNationalShipping}
                    alt='icono de envio nacional'
                  />
                  Envio Nacional
                  <img
                    src={arrowDownIcon}
                    alt='flecha apuntando hacia abajo'
                    className='arrowDownIcon'
                  />
                </h6>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1' key={2}>
                <Card.Body>
                  {shippingOptions.map((el) => {
                    return el.alcance === 'Todo México' ? (
                      <Col
                        sm={12}
                        className='justify-content-start ml-1'
                        key={el.id}
                      >
                        <Form.Check.Input
                          custom='true'
                          type='radio'
                          name='shippingMethod'
                          id={`shipping${el.id}`}
                          value={el.id}
                          required
                        />
                        <Form.Check.Label htmlFor={`shipping${el.id}`}>
                          {`${el.nombre} $${el.precio}MXN `}
                          <span className='labelShippingTime'>
                            — {`${el.tiempo}`}
                          </span>
                        </Form.Check.Label>
                      </Col>
                    ) : null;
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form.Row>
      </Form.Group>
    </Col>
  );
}
