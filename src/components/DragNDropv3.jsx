import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { InputNumber } from 'antd';
import Swal from 'sweetalert2';

import Webapi from '../api/Webapi';

import imgProductPlaceholder from './assets/borreguitos.jpg';

import Image from 'react-bootstrap/Image';

import imgUpArrow from './assets/up_arrow.png';
import imgDownArrow from './assets/down_arrow.png';
import imgCustomBox from './assets/customBox.png';
import btnDelete from './assets/btnDelete.svg';

import { Radio } from 'antd';

let api = new Webapi();

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, ind) => ({
  userSelect: 'none',

  padding: '0',
  margin: ind === 1 ? '0.25rem' : `0 0 ${grid}px 0`,
  borderRadius: '5px',

  background: isDragging ? 'lightgrey' : '#ffffff',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

  ...draggableStyle,
});
const getListStyle = (isDraggingOver, ind) => ({
  background: isDraggingOver ? 'lightblue' : '#ffffff',

  padding: 0,
  width: ind === 0 ? '25%' : '75%',
  textAlign: 'center',
});

export default function DragNDropv3({
  customBoxProducts,
  handleClickAgregarCarrito,
  handleClickComprarAhora,
  outOfStock,
  c,
}) {
  const getCustomBoxProducts = (customBoxProducts) => {
    let result = customBoxProducts.map((product, ind) => ({
      id: `item-${ind}-${new Date().getTime()}`,
      content: {
        text: `item ${ind}`,
        product: product,
        quantity: 0,
        variantId: null,
      },
    }));

    return result;
  };

  const [state, setState] = useState([
    getCustomBoxProducts(customBoxProducts),
    [],
  ]);

  const [limitProducts, setLimitProducts] = useState({
    selectedProducts: 0,
    limitProducts: c.id === 168 ? 3 : c.id === 169 ? 5 : c.id === 170 ? 7 : 3,
  });

  const sliderRef = useRef(null);
  const elementCustomBox = useRef(null);

  useEffect(() => {
    setState([getCustomBoxProducts(customBoxProducts), []]);
  }, [customBoxProducts]);

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      if (dInd === 1) {
        newState[dInd][destination.index].content.quantity = 1;
        getTotalOfselectedProducts(newState[1]);
      }

      setState(newState.filter((group) => group.length));
      elementCustomBox.current.classList.remove('upDownEffect');

      void elementCustomBox.current.offsetWidth;

      elementCustomBox.current.classList.add('upDownEffect');
    }
    window.navigator.vibrate(50);
  }

  const handleSliderArrowClick = (direction) => {
    const scroll = direction === 'up' ? -300 : 300;
    sliderRef.current.scrollBy({ top: scroll, left: 0, behavior: 'smooth' });
  };

  function onChange(value, index) {
    const newState = [...state];
    newState[1][index].content.quantity = value;
    setState(newState);
    getTotalOfselectedProducts(newState[1]);
  }

  const onChangeRdb = (e, index) => {
    const newState = [...state];
    newState[1][index].content.variantId = e.target.value;
    setState(newState);
  };

  const getTotalOfselectedProducts = (products) => {
    let quantityTotal = products.reduce((a, b) => a + b.content.quantity, 0);
    setLimitProducts((prev) => ({ ...prev, selectedProducts: quantityTotal }));
  };

  const handleClickAgregarCarritoCustom = (event) => {
    let variantsNull = state[1].some(
      (element) => element.content.variantId === null
    );

    let customBoxProduct = {
      calcetinId: c.id,
      varianteId: c.variantes[0].id,
      cantidad: 1,
      productos: state[1].map((el) => ({
        calcetinId: el.content.product.id,
        varianteId: el.content.variantId,
        cantidad: el.content.quantity,
      })),
    };

    if (limitProducts.selectedProducts > limitProducts.limitProducts) {
      Swal.fire({
        icon: 'warning',
        title: 'Máximo alcanzado...',
        text:
          'Has sobrepasado la cantidad de pares que puedes elegir para este paquete. Disminuye la cantidad de los productos seleccionados para continuar o puedes buscar si hay otro producto con mayor cantidad de productos elegibles',
      });
    } else if (limitProducts.selectedProducts < limitProducts.limitProducts) {
      Swal.fire({
        icon: 'warning',
        title: 'Productos por seleccionar faltantes...',
        text: `Selecciona la cantidad de productos correspondientes (${limitProducts.limitProducts}) para este paquete para poder continuar`,
      });
    } else if (variantsNull) {
      Swal.fire({
        icon: 'warning',
        title: 'Selección de tallas faltantes',
        text: `Debes seleccionar la talla de todos los productos seleccionados`,
      });
    } else {
      handleClickAgregarCarrito(event, customBoxProduct);
    }
  };

  const handleClickComprarAhoraCustom = (event) => {
    let variantsNull = state[1].some(
      (element) => element.content.variantId === null
    );

    let customBoxProduct = {
      calcetinId: c.id,
      varianteId: c.variantes[0].id,
      cantidad: 1,
      productos: state[1].map((el) => ({
        calcetinId: el.content.product.id,
        varianteId: el.content.variantId,
        cantidad: el.content.quantity,
      })),
    };

    if (limitProducts.selectedProducts > limitProducts.limitProducts) {
      Swal.fire({
        icon: 'warning',
        title: 'Máximo alcanzado...',
        text:
          'Has sobrepasado la cantidad de pares que puedes elegir para este paquete. Disminuye la cantidad de los productos seleccionados para continuar o puedes buscar si hay otro producto con mayor cantidad de productos elegibles',
      });
    } else if (limitProducts.selectedProducts < limitProducts.limitProducts) {
      Swal.fire({
        icon: 'warning',
        title: 'Productos por seleccionar faltantes...',
        text: `Selecciona la cantidad de productos correspondientes (${limitProducts.limitProducts}) para este paquete para poder continuar`,
      });
    } else if (variantsNull) {
      Swal.fire({
        icon: 'warning',
        title: 'Selección de tallas faltantes',
        text: `Debes seleccionar la talla de todos los productos seleccionados`,
      });
    } else {
      handleClickComprarAhora(event, customBoxProduct);
    }
  };

  return (
    <>
      <section>
        <div>
          <div style={{ display: 'flex', backgroundColor: '#fff' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              {state.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver, ind)}
                      {...provided.droppableProps}
                    >
                      {ind === 0 && (
                        <Image
                          alt='product'
                          style={{ marginBottom: '1rem' }}
                          loading='lazy'
                          src={imgUpArrow}
                          fluid
                          rounded
                          onClick={(e) => {
                            handleSliderArrowClick('up');
                          }}
                        />
                      )}

                      {ind === 1 && (
                        <div className='flex flex-column mb-4 mt-5'>
                          <div>
                            <Image
                              alt='product'
                              loading='lazy'
                              src={imgCustomBox}
                              ref={elementCustomBox}
                              style={{ width: '80%', marginLeft: '1rem' }}
                              fluid
                              rounded
                            />
                          </div>
                          <span className='text-center'>
                            <strong>Pares elejidos: </strong>
                            <span
                              className='txtSelectedSocks'
                              style={{
                                background:
                                  limitProducts.selectedProducts >
                                  limitProducts.limitProducts
                                    ? 'red'
                                    : 'limegreen',
                              }}
                            >
                              {' '}
                              {limitProducts.selectedProducts} /{' '}
                              {limitProducts.limitProducts}
                            </span>
                          </span>
                        </div>
                      )}

                      <div
                        style={{
                          maxHeight: '430px',
                          overflowY: 'auto',
                          display: 'flex',
                          flexWrap: 'wrap',
                          marginLeft: ind === 1 ? '1rem' : '0',
                          justifyContent:
                            ind === 1 ? 'space-around' : 'inherit',
                        }}
                        ref={ind === 0 ? sliderRef : null}
                      >
                        {el.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                  ind
                                )}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: 'column',
                                    width: ind === 1 ? '105px' : 'auto',
                                  }}
                                >
                                  <Image
                                    alt='product'
                                    className='customBoxProductSlider'
                                    loading='lazy'
                                    src={
                                      item.content.product.imagen
                                        ? api.resolverUrlImagen(
                                            item.content.product.imagen
                                          )
                                        : imgProductPlaceholder
                                    }
                                    fluid
                                    rounded
                                  />
                                  <span
                                    style={{
                                      padding: '0.25rem',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {item.content.product.nombre}
                                  </span>
                                  {ind === 1 && (
                                    <div className='flex flex-column'>
                                      <div>
                                        <span>Cantidad:</span>
                                        <InputNumber
                                          min={1}
                                          max={
                                            item.content.product.variantes[0]
                                              .stock
                                          }
                                          defaultValue={1}
                                          onChange={(value) =>
                                            onChange(value, index)
                                          }
                                          size='small'
                                        />
                                      </div>
                                      <div className='d-flex flex-column'>
                                        <span style={{ marginRight: '0.5rem' }}>
                                          Talla:
                                        </span>
                                        <Radio.Group
                                          onChange={(e) =>
                                            onChangeRdb(e, index)
                                          }
                                        >
                                          {item.content.product.variantes.map(
                                            (el, ind) => (
                                              <Radio
                                                key={el.id}
                                                value={el.id}
                                                defaultChecked={ind === 0}
                                              >
                                                {el.talla}
                                              </Radio>
                                            )
                                          )}
                                        </Radio.Group>
                                      </div>

                                      <div>
                                        <img
                                          src={btnDelete}
                                          alt='btnDelete'
                                          className='btnDelete'
                                          style={{
                                            width: '25px',
                                            margin: '0.5rem',
                                          }}
                                          onClick={() => {
                                            const source = {
                                              droppableId: '1',
                                              index: index,
                                            };
                                            const destination = {
                                              droppableId: '0',
                                              index: state[0].length,
                                            };

                                            const result = move(
                                              state[1],
                                              state[0],
                                              source,
                                              destination
                                            );

                                            const newState = [...state];
                                            newState[1] = result[1];
                                            newState[0] = result[0];
                                            getTotalOfselectedProducts(
                                              newState[1]
                                            );
                                            setState(newState);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {ind === 0 && (
                        <Image
                          alt='product'
                          style={{ marginTop: '1rem' }}
                          loading='lazy'
                          src={imgDownArrow}
                          fluid
                          rounded
                          onClick={(e) => {
                            handleSliderArrowClick('down');
                          }}
                        />
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </div>
      </section>

      <div className='cartControllers'>
        <div>
          <div className='btnsContainer box'>
            {outOfStock && (
              <p className='text-center lead text-danger'>
                No disponible por el momento
              </p>
            )}
            <button
              onClick={handleClickAgregarCarritoCustom}
              className='btnAddToCart btn-rounded'
              disabled={outOfStock}
            >
              Agregar al Carrito
            </button>
            <button
              onClick={handleClickComprarAhoraCustom}
              className='btnBuyNow btn-rounded'
              disabled={outOfStock}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
