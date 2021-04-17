import React, { Component } from 'react';
import Item from '../Item/Item';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from '../Loader/Loader';

import imgItem from './images/roro3.png';
import imgElCracFirma from './images/elcrac_firma.png';

import imgCustomBoxBanner from './images/customBoxBanner.png';
import Image from 'react-bootstrap/Image';

import Webapi from '../../api/Webapi';

export default class ItemList extends Component {
  state = {
    cargando: true,
    calcetines: [],
    colectionId: this.props.coleccionId,
    stockAvailableOfCracs: false,
    cracsSocks: [],
  };

  api = new Webapi();

  componentDidMount() {
    this.mounted = true;
    this.setState({ cargando: true });

    if (this.props.urlColectionId) {
      this.handleFetchCalcetines(this.props.urlColectionId);
      this.setState({
        colectionId: this.props.urlColectionId,
      });
    } else {
      this.fetchAllSocks();
    }
  }

  fetchAllSocks = () => {
    this.api.obtenerTodosLosCalcetines().then((calcetines) => {
      if (this.mounted) {
        let productsWithAvailableStock = calcetines.filter((producto) => {
          let variantsWithStock = producto.variantes.filter((variante) =>
            variante.stock > 0 ? variante : null
          );
          return variantsWithStock.length > 0 ? producto : null;
        });
        this.setState({
          calcetines: productsWithAvailableStock,
          cargando: false,
        });
      }
    });
  };

  fetchColection = (colectionId) => {
    this.setState({
      cargando: true,
    });

    this.api
      .obtenerCalcetionesPorColeccion(colectionId)
      .then((calcetines) => {
        if (this.mounted) {
          let productsWithAvailableStock = calcetines.filter((producto) => {
            let variantsWithStock = producto.variantes.filter((variante) =>
              variante.stock > 0 ? variante : null
            );
            return variantsWithStock.length > 0 ? producto : null;
          });

          let cracsSocks = productsWithAvailableStock.filter((el) =>
            el.variantes[0].sku.toUpperCase().includes('CRAC') ? el : null
          );

          let stockAvailableOfCracs = cracsSocks.length > 0;

          this.setState({
            calcetines: productsWithAvailableStock,
            cargando: false,
            stockAvailableOfCracs,
            cracsSocks,
          });

          let GTMimpressionsProducts = productsWithAvailableStock.map(
            (c, indx) => {
              return {
                name: c.nombre,
                id: c.id,
                price: c.precio,
                brand: 'Tu Calcetin',
                category: c.coleccionId,
                variant: c.variantes[0].talla,
                list: 'Colección seleccionada',
                position: indx + 1,
              };
            }
          );

          window.dataLayer.push({
            ecommerce: {
              currencyCode: 'MXN',
              impressions: GTMimpressionsProducts,
            },
          });
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 404) {
          this.fetchAllSocks();
        }
      });
  };

  handleFetchCalcetines(colectionId) {
    this.fetchColection(colectionId);
    this.setState({
      colectionId: colectionId,
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Container fluid={true} className='containerItemList'>
        {this.state.cargando ? (
          <Loader />
        ) : (
          <React.Fragment key={3}>
            {this.state.colectionId &&
              this.state.colectionId === '22' &&
              this.state.stockAvailableOfCracs && (
                <Row>
                  <Container>
                    <img
                      src={imgElCracFirma}
                      alt='somos arte'
                      className='imgSomosArteTienda'
                    />
                  </Container>
                </Row>
              )}
            <Row className='row-center'>
              {this.state.calcetines &&
                this.state.calcetines.map((c) => {
                  let variante = null;
                  if(c.variantes.length > 0) {
                    variante = c.variantes.find(element => element.stock > 0)
                  } else {
                    return null
                  }
                  if (variante === null) return null
                  if (c.variantes[0].sku.toUpperCase().includes('CRAC')) {
                    return (
                      <Col xs={12} md={6} lg={4} xl={3} key={c.id}>
                        <Item
                          itemId={c.id}
                          itemDiscount={c.descuento}
                          itemName={c.nombre}
                          itemPrice={c.precio}
                          itemImage={
                            c.imagenes.length > 0
                              ? this.api.resolverUrlImagen(
                                  c.imagenes[0].nombreImagen
                                )
                              : imgItem
                          }
                          is2x1={c.is2x1}
                          is3x2={c.is3x2}
                          is4x3={c.is4x3}
                          variante={variante}
                          coleccionId={c.coleccionId}
                          isCustom={c.customboxid}
                        />
                      </Col>
                    );
                  } else if (
                    (c.coleccionId !== 18 || this.state.colectionId === '18') &&
                    c.customboxid === null
                  ) {
                    return (
                      <Col xs={12} md={6} lg={4} xl={3} key={c.id}>
                        <Item
                          itemId={c.id}
                          itemDiscount={c.descuento}
                          itemName={c.nombre}
                          itemPrice={c.precio}
                          itemImage={
                            c.imagenes.length > 0
                              ? this.api.resolverUrlImagen(
                                  c.imagenes[0].nombreImagen
                                )
                              : imgItem
                          }
                          is2x1={c.is2x1}
                          is3x2={c.is3x2}
                          is4x3={c.is4x3}
                          variante={variante}
                          coleccionId={c.coleccionId}
                          isCustom={c.customboxid}
                        />
                      </Col>
                    );
                  } else return null;
                })}
            </Row>

            {this.state.colectionId && this.state.colectionId === '18' && (
              <Row>
                <Col className='mx-2'>
                  <Image
                    src={imgCustomBoxBanner}
                    alt='banner paquetes a la medida'
                    className='imgCustomBoxBanner'
                    fluid
                  />
                </Col>
              </Row>
            )}
            <Row className={'row-center'}>
              {this.state.calcetines &&
                this.state.calcetines.map((c) => {
                  let variante = null;
                  if (c.variantes.length > 0) {
                    variante = c.variantes.find(element => element.stock > 0)
                  } else {
                    return
                  }
                  if (variante === null) return
                  if (
                    c.customboxid &&
                    (this.state.colectionId && this.state.colectionId === '18')
                  ) {
                    return (
                      <Col xs={12} md={6} lg={4} xl={3} key={c.id}>
                        <Item
                          itemId={c.id}
                          itemDiscount={c.descuento}
                          itemName={c.nombre}
                          itemPrice={c.precio}
                          itemImage={
                            c.imagenes.length > 0
                              ? this.api.resolverUrlImagen(
                                  c.imagenes[0].nombreImagen
                                )
                              : imgItem
                          }
                          is2x1={c.is2x1}
                          is3x2={c.is3x2}
                          is4x3={c.is4x3}
                          variante={variante}
                          coleccionId={c.coleccionId}
                          isCustom={c.customboxid}
                        />
                      </Col>
                    );
                  }
                })}
            </Row>
          </React.Fragment>
        )}
      </Container>
    );
  }
}
