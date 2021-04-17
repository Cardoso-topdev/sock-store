import axios from 'axios';
import config from '../config/config.json';

export default class Webapi {
  static colecciones;
  static calcetines;
  static ultimaColeccion;
  carritoId = null;

  constructor() {
    const carritoId = localStorage.getItem('carritoId');
    this.carritoId = carritoId;
  }

  resolverUrlImagen(nombre) {
    return `${config.baseURL}/public/img/${nombre}`;
  }

  async obtenerColecciones() {
    if (!Webapi.colecciones) {
      Webapi.colecciones = (await axios.get('/colecciones')).data;
    }
    return Webapi.colecciones;
  }

  async obtenerCalcetionesPorColeccion(id) {
    if (Webapi.ultimaColeccion !== id) {
      Webapi.calcetines = (await axios.get(
        `/colecciones/${id}/calcetines?page=1&perPage=20000`
      )).data;
      Webapi.ultimaColeccion = id;
    }
    return Webapi.calcetines;
  }

  async obtenerCalcetin(id) {
    return (await axios.get(`/calcetines/${id}`)).data;
  }

  async obtenerTodosLosCalcetines() {
    try {
      return (await axios.get('/calcetines?perPage=10000&page=1')).data;
    } catch (err) {}
  }

  async crearCarrito() {
    const response = await axios.post('/carrito');
    this.carritoId = response.data.id;

    localStorage.setItem('carritoId', response.data.id);
  }

  async obtenerCarrito(carritoId = this.carritoId) {
    try {
      const carrito = await axios.get(`carrito/${carritoId}`);
      return carrito.data;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          localStorage.removeItem('carritoId');
        }
      }
      return undefined;
    }
  }

  async isCarritoSetted() {
    return localStorage.getItem('carritoId') ? true : false;
  }

  async establecerElementoCarrito(calcetinId, varianteId, cantidad = 1) {
    try {
      if (!await this.isCarritoSetted()) {
        await this.crearCarrito();

        return (await axios.put(`/carrito/${this.carritoId}/calcetines`, {
          calcetinId,
          varianteId,
          cantidad,
        })).data;
      } else {
        const carritoId = localStorage.getItem('carritoId');
        return (await axios.put(`/carrito/${carritoId}/calcetines`, {
          calcetinId,
          varianteId,
          cantidad,
        })).data;
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          localStorage.removeItem('carritoId');
          await this.crearCarrito();

          return (await axios.put(`/carrito/${this.carritoId}/calcetines`, {
            calcetinId,
            varianteId,
            cantidad,
          })).data;
        }
      }
    }
  }
  async establecerCustomBoxCarrito(customBoxProduct) {
    try {
      if (!this.carritoId) {
        await this.crearCarrito();

        return (await axios.put(
          `/carrito/${this.carritoId}/calcetines`,
          customBoxProduct
        )).data;
      } else {
        return (await axios.put(
          `/carrito/${this.carritoId}/calcetines`,
          customBoxProduct
        )).data;
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          localStorage.removeItem('carritoId');
          await this.crearCarrito();

          return (await axios.put(
            `/carrito/${this.carritoId}/calcetines`,
            customBoxProduct
          )).data;
        }
      }
    }
  }

  async eliminarElementoCarrito(id) {
    await axios.delete(`/carrito/${this.carritoId}/elementos/${id}`);
    let carrito = await this.obtenerCarrito();
    if (carrito) {
      if (carrito.calcetines.length === 0) {
        localStorage.removeItem('carritoId');
        this.carritoId = null;
      }
    }
  }
  async getShippingByCart(cartId) {
    try {
      const data = (await axios.get(`/carrito/${cartId}/envios`)).data;
      return data;
    } catch (err) {}
  }

  async crearPedido(cartId = this.carritoId, data, shippingMethodId) {
    try {
      await axios.put(`/carrito/${cartId}/envios`, {
        tipoEnvioId: shippingMethodId,
      });
      return await axios.post(`/carrito/${cartId}/pedido`, {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        estado: data.estado,
        municipio: data.municipio,
        codigoPostal: data.codigoPostal,
        colonia: data.colonia,
        calle: data.calle,
        noExterno: data.noExterno,
        referencia: data.referencia,
        latitud: 0,
        longitud: 0,
        token: data.token,
        device: data.device,
      });
    } catch (err) {
      throw err;
    }
  }

  async crearPedidoPaypal(
    cartId = this.carritoId,
    data,
    shippingMethodId,
    pagoId
  ) {
    try {
      await axios.put(`/carrito/${cartId}/envios`, {
        tipoEnvioId: shippingMethodId,
      });
      return await axios.post(`/carrito/${cartId}/pedidoPaypal`, {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        estado: data.estado,
        municipio: data.municipio,
        codigoPostal: data.codigoPostal,
        colonia: data.colonia,
        calle: data.calle,
        noExterno: data.noExterno,
        referencia: data.referencia,
        pagoId: pagoId,
      });
    } catch (err) {
      throw err;
    }
  }

  async crearPedidoPaynet(cartId = this.carritoId, data, shippingMethodId) {
    try {
      await axios.put(`/carrito/${cartId}/envios`, {
        tipoEnvioId: shippingMethodId,
      });
      return await axios.post(`/carrito/${cartId}/pedidoPaynet`, {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        estado: data.estado,
        municipio: data.municipio,
        codigoPostal: data.codigoPostal,
        colonia: data.colonia,
        calle: data.calle,
        noExterno: data.noExterno,
        referencia: data.referencia,
      });
    } catch (err) {
      throw err;
    }
  }

  async obtenerPedido(idPedido, token) {
    try {
      const pedido = (await axios.get(`/pedidos/${idPedido}?token=${token}`))
        .data;

      return pedido;
    } catch (err) {
      return null;
    }
  }

  async sendMessage(name, email, cellphone, message, captcha) {
    return await axios.post(`/contacto`, {
      nombre: name,
      email: email,
      telefono: cellphone,
      mensaje: message,
      captcha: captcha,
    });
  }

  async obtenerBannerDiscount() {
    return (await axios.get(`/pageConfiguration/bannerText`)).data;
  }

  async applyDiscountCode(discountCode, cartId = this.carritoId) {
    return await axios.post(`/carrito/${cartId}/codigosDescuento`, {
      codigoDescuento: discountCode,
    });
  }

  async removeDiscountCode(cartId = this.carritoId) {
    return await axios.delete(`/carrito/${cartId}/codigosDescuento`);
  }

  async registrarVistaDeProducto(productId) {
    try {
      return (await axios.post(
        '/inventarioYReportes/registrarVistaDeProducto',
        {
          id: productId,
        }
      )).status;
    } catch (err) {
      //console.log(err);
    }
  }

  async getCustomBoxProducts() {
    try {
      return (await axios.get('/calcetines/productsCustomBox')).data;
    } catch (err) {
      console.log(err);
    }
  }
}
