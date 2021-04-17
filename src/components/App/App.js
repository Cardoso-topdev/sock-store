import React, { Component, Suspense, lazy } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

import Loader from '../../components/Loader/Loader';

import ReactPixel from 'react-facebook-pixel';
import Navbar from '../Navbar/Navbar';
const Landing = lazy(() => import('../../pages/Landing/Landing.jsx'));
const ItemDetails = lazy(() => import('../../pages/ItemDetails/ItemDetails'));
const Tienda = lazy(() => import('../../pages/Tienda/Tienda'));
const Carrito = lazy(() => import('../../pages/Carrito/Carrito'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));
const Payment = lazy(() => import('../../pages/Payment/Payment'));
const Layout = lazy(() => import('../Layout/Layout'));
const Terminosyaviso = lazy(() =>
  import('../../pages/Terminosyaviso/Terminosyaviso')
);
const Success3DSecure = lazy(() => import('../../pages/Success/Success'));
const SuccessfulPurchase = lazy(() =>
  import('../../pages/SuccessfulPurchase/SuccessfulPurchase')
);
const Contact = lazy(() => import('../../pages/Contact/Contact'));
const WhoAreWe = lazy(() => import('../../pages/WhoAreWe/WhoAreWe'));

export default class App extends Component {
  componentDidMount() {
    this.initFacebookPixel();
  }

  initFacebookPixel() {
    const options = {
      autoConfig: true,
      debug: false,
    };
    ReactPixel.init('443458376536880', null, options);
  }

  render() {
    return (
      <Suspense fallback={<Loader size={30} />}>
        <BrowserRouter>
          <ScrollToTop>
            <Layout>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/tienda/:id' component={Tienda} />
                <Route exact path='/tienda/item/:id' component={ItemDetails} />
                <Route exact path='/tienda' component={Tienda} />
                <Route exact path='/contacto' component={Contact} />
                <Route exact path='/quienes-somos' component={WhoAreWe} />
               
                <Route exact path='/carrito' component={Carrito} />
                <Route
                  exact
                  path='/terminosyaviso'
                  component={Terminosyaviso}
                />
                <Route
                  exact
                  path='/carrito/:carritoid/pedido'
                  component={Payment}
                />
                <Route
                  path='/tienda/pedido/:id/success'
                  component={Success3DSecure}
                />
                <Route
                  path='/tienda/pedido/SuccessfulPurchase'
                  component={SuccessfulPurchase}
                />
   
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </ScrollToTop>
        </BrowserRouter>
      </Suspense>
    );
  }
}
