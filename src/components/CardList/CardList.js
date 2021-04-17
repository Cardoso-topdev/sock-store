import React, { Component } from 'react';
import CardC from '../Card/CardC';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import imgCrazySock from './img/CrazySocks.jpg';
import arrowDown from './img/chevron-down-solid.svg';
import arrowUp from './img/chevron-up-solid.svg';

// import arrowUp from './img/chevron-up-solid.svg';

import Webapi from '../../api/Webapi';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colecciones: [],
      idSelectedCard: this.props.urlColectionId || 0,
      showSections: true,
    };
    this.webapi = new Webapi();
  }

  componentDidMount() {
    this.fetchColecciones();
    this.mounted = true;
  }

  moveObjInArray = (items, id) => {
    let array = items;
    const index = items.findIndex(item => item.id === id)
    if (index)  array.unshift(array.splice(index, 1)[0])
    return array
  }

  fetchColecciones = async () => {
    const response = await this.webapi.obtenerColecciones();

    if (this.mounted) {
      let items = response;
      items = this.moveObjInArray(items, 24)
      items = this.moveObjInArray(items, 18)
      this.setState({
        colecciones: response,
      });
    }
  };

  handleClick = (e) => {
    this.props.onClick(e.target.children[0]);
    this.setState({
      idSelectedCard: e.target.children[0] && e.target.children[0].id,
      showSections: true
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { showSections } = this.state;
    return (
      <Container fluid='true'>
        <Row className='listContainer'>
          <Col
            md
            sm={12}
            className="categories-dropdown"
            onClick={() => this.setState({ showSections: !showSections})}
          >
            <h5>
              Categorías
              <img src={showSections ? arrowDown : arrowUp} alt="dropdown-icon" className="dropdown-icon" />
            </h5>
          </Col>
          {this.state.colecciones.map((el) => {
            return (
              <Col
                md
                sm={12}
                key={el.id}
                className={`cardContainerWrapper
                ${showSections ? 'categories-hide' : 'categories-show'}`}
              >
                <CardC
                  cardTitle={el.nombre}
                  onClick={this.handleClick}
                  id={el.id}
                  isSelected={parseInt(this.state.idSelectedCard) === el.id}
                  imgBackground={
                    el.imagenes.length > 0
                      ? this.webapi.resolverUrlImagen(
                          el.imagenes[0].nombreImagen
                        )
                      : imgCrazySock
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
