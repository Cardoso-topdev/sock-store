import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header/Header';
import initFacebookPixel from '../../components/FacebookPixel';

export default () => {
  useEffect(() => {
    initFacebookPixel();
  }, []);

  return (
    <>
      <Header title='Terminos, Condiciones y Aviso de Privacidad' />
      <Container>
        <h1 className='justify-content-center mt-4'>
          Terminos, Condiciones y Aviso de Privacidad
        </h1>
        <h2 className='justify-content-start'>Términos y Condiciones</h2>

        <div className='justify-content-start mb-5'>
          <p>
            Este sitio web es operado por Tu Calcetín. En todo el sitio, los
            términos “nosotros”, “nos” y “nuestro” se refieren a Tu Calcetín. Tu
            Calcetín ofrece este sitio web, incluyendo toda la información,
            herramientas y servicios disponibles para ti en este sitio, el
            usuario, está condicionado a la aceptación de todos los términos,
            condiciones, políticas y notificaciones aquí establecidos.
          </p>
          <p>
            Al visitar nuestro sitio y/o comprar algo de nosotros, paticipas en
            nuestro “Servicio” y aceptas los siguientes términos y condiciones
            (“Términos de Servicio”, “Términos”), incluídos todos los términos y
            condiciones adicionales y las polítias a las que se hace referencia
            en el presente documento y/o disponible a través de hipervínculos.
            Estas Condiciones de Servicio se aplican a todos los usuarios del
            sitio, incluyendo si limitación a usuarios que sean navegadores,
            proveedores, clientes, comerciantes, y/o colaboradores de contenido.
          </p>
          <p>
            Por favor, lee estos Términos de Servicio cuidadosamente antes de
            acceder o utilizar nuestro sitio web. Al acceder o utilizar
            cualquier parte del sitio, estás aceptando los Términos de Servicio.
            Si no estás de acuerdo con todos los términos y condiciones de este
            acuerdo, entonces no deberías acceder a la página web o usar
            cualquiera de los servicios. Si las Términos de Servicio son
            considerados una oferta, la aceptación está expresamente limitada a
            estos Términos de Servicio.
          </p>
          <p>
            Cualquier función nueva o herramienta que se añadan a la tienda
            actual, tambien estarán sujetas a los Términos de Servicio. Puedes
            revisar la versión actualizada de los Términos de Servicio, en
            cualquier momento en esta página. Nos reservamos el derecho de
            actualizar, cambiar o reemplazar cualquier parte de los Términos de
            Servicio mediante la publicación de actualizaciones y/o cambios en
            nuestro sitio web. Es tu responsabilidad chequear esta página
            periódicamente para verificar cambios. Tu uso contínuo o el acceso
            al sitio web después de la publicación de cualquier cambio
            constituye la aceptación de dichos cambios.
          </p>
          <br />
          <h6>SECCIÓN 1 - TÉRMINOS DE LA TIENDA EN LÍNEA</h6>
          <p>
            Al utilizar este sitio, declaras que tienes al menos la mayoría de
            edad en tu estado o provincia de residencia, o que tienes la mayoría
            de edad en tu estado o provincia de residencia y que nos has dado tu
            consentimiento para permitir que cualquiera de tus dependientes
            menores use este sitio.
          </p>
          <p>
            No puedes usar nuestros productos con ningún propósito ilegal o no
            autorizado tampoco puedes, en el uso del Servicio, violar cualquier
            ley en tu jurisdicción (incluyendo pero no limitado a las leyes de
            derecho de autor).
          </p>
          <p>
            No debes transmitir gusanos, virus o cualquier código de naturaleza
            destructiva.
          </p>
          <p>
            El incumplimiento o violación de cualquiera de estos Términos darán
            lugar al cese inmediato de tus Servicios.
          </p>
          <br />
          <h6>SECCIÓN 2 - CONDICIONES GENERALES </h6>
          <p>
            Nos reservamos el derecho de rechazar la prestación de servicio a
            cualquier persona, por cualquier motivo y en cualquier momento.
          </p>
          <p>
            Entiendes que tu contenido (sin incluir la información de tu tarjeta
            de crédito), puede ser transferida sin encriptar e involucrar (a)
            transmisiones a través de varias redes; y (b) cambios para ajustarse
            o adaptarse a los requisitos técnicosde conexión de redes o
            dispositivos. La información de tarjetas de crédito está siempre
            encriptada durante la transferencia a través de las redes.
          </p>
          <p>
            Estás de acuerdo con no reproducir, duplicar, copiar, vender,
            revender o explotar cualquier parte del Servicio, usp del Servicio,
            o acceso al Servicio o cualquier contacto en el sitio web a través
            del cual se presta el servicio, sin el expreso permiso por escrito
            de nuestra parte.
          </p>
          <p>
            Los títulos utilizados en este acuerdo se icluyen solo por
            conveniencia y no limita o afecta a estos Términos.
          </p>
          <br />
          <h6>
            SECCIÓN 3 - EXACTITUD, EXHAUSTVIDAD Y ACTUALIDAD DE LA INFORMACIÓN
          </h6>
          <p>
            No nos hacemos responsables si la información disponible en este
            sitio no es exacta, completa o actual. El material en este sitio es
            provisto solo para información general y no debe confiarse en ella o
            utilizarse como la única base para la toma de decisiones sin
            consultar primeramente, información más precisa, completa u
            oportuna. Cualquier dependencia em el materia de este sitio es bajo
            su propio riesgo.
          </p>
          <p>
            Este sitio puede contener cierta información histórica. La
            información histórica, no es necesriamente actual y es provista
            únicamente para tu referencia. Nos reservamos el derecho de
            modificar los contenidos de este sitio en cualquier momento, pero no
            tenemos obligación de actualizar cualquier información en nuestro
            sitio. Aceptas que es tu responsabilidad de monitorear los cambios
            en nuestro sitio.
          </p>
          <h6>SECTION 4 - MODIFICACIONES AL SERVICIO Y PRECIOS</h6>
          <p>
            Los precios de nuestros productos están sujetos a cambio sin aviso.
          </p>
          <p>
            Nos reservamos el derecho de modificar o discontinuar el Servicio (o
            cualquier parte del contenido) en cualquier momento sin aviso
            previo.
          </p>
          <p>
            No seremos responsables ante ti o alguna tercera parte por cualquier
            modificación, cambio de precio, suspensión o discontinuidad del
            Servicio.
          </p>
          <h6>SECCIÓN 5 - PRODUCTOS O SERVICIOS (si aplicable)</h6>
          <p>
            Ciertos productos o servicios puedene star disponibles
            exclusivamente en línea a través del sitio web. Estos productos o
            servicios pueden tener cantidades limitadas y estar sujetas a
            devolución o cambio de acuerdo a nuestra política de devolución
            solamente.
          </p>
          Hemos hecho el esfuerzo de mostrar los colores y las imágenes de
          nuestros productos, en la tienda, con la mayor precisión de colores
          posible. No podemos garantizar que el monitor de tu computadora
          muestre los colores de manera exacta. Nos reservamos el derecho, pero
          no estamos obligados, para limitar las ventas de nuestros productos o
          servicios a cualquier persona, región geográfica o jurisdicción.
          Podemos ejercer este derecho basados en cada caso. Nos reservamos el
          derecho de limitar las cantidades de los productos o servicios que
          ofrecemos. Todas las descripciones de productos o precios de los
          productos están sujetos a cambios en cualquier momento sin previo
          aviso, a nuestra sola discreción. Nos reservamos el derecho de
          discontinuar cualquier producto en cualquier momento. Cualquier oferta
          de producto o servicio hecho en este sitio es nulo donde esté
          prohibido. No garantizamos que la calidad de los productos, servicios,
          información u otro material comprado u obtenido por ti cumpla con tus
          expectativas, o que cualquier error en el Servicio será corregido.
          <h6>SECCIÓN 6 - EXACTITUD DE FACTURACIÓN E INFORMACIÓN DE CUENTA</h6>
          Nos reservamos el derecho de rechazar cualquier pedido que realice con
          nosotros. Podemos, a nuestra discreción, limitar o cancelar las
          cantidades compradas por persona, por hogar o por pedido. Estas
          restricciones pueden incluir pedidos realizados por o bajo la misma
          cuenta de cliente, la misma tarjeta de crédito, y/o pedidos que
          utilizan la misma facturación y/o dirección de envío. En el caso de
          que hagamos un cambio o cancelemos una orden, podemos intentar
          notificarte poniéndonos en contacto vía correo electrónico y/o
          dirección de facturación / número de teléfono proporcionado en el
          momento que se hizo pedido. Nos reservamos el derecho de limitar o
          prohibir las órdenes que, a nuestro juicio, parecen ser colocado por
          los concesionarios, revendedores o distribuidores. Te comprometes a
          proporcionar información actual, completa y precisa de la compra y
          cuenta utilizada para todas las compras realizadasen nuestra tienda.
          Te comprometes a ctualizar rápidamente tu cuenta y otra información,
          incluyendo tu dirección de correo electrónico y números de tarjetas de
          crédito y fechas de vencimiento, para que podamos completar tus
          transacciones y contactarte cuando sea necesario. Para más detalles,
          por favor revisa nuestra Política de Devoluciones.
          <h6>SECCIÓN 7 - HERRAMIENTAS OPCIONALES</h6>
          Es posible que te proporcionemos aceso a herramientas de terceros a
          los cuales no monitoreamos y sobre los que no tenemos control ni
          entrada. Reconoces y aceptas que proporcionamos acceso a este tipo de
          herramientas "tal cual" y "según disponibilidad" sin garantías,
          representaciones o condiciones de ningún tipo y sin ningún respaldo.
          No tendremos responsabilidad alguna derivada de o relacionada con tu
          uso de herramientas proporcionadas por terceras partes. Cualquier uso
          que hagas de las herramientas opcionales que se ofrecen a través del
          sitio bajo tu propio riesgo y discreción y debes asegurarte de estar
          familiarizado y aprobar los términos bajo los cuales estas
          herramientas son proporcionadas por el o los proveedores de terceros.
          Tambien es posible que, en el futuro, te ofrezcamos nuevos servicios
          y/o características a través del sitio web (incluyendo el lanzamiento
          de nuevas herramientas y recursos). Estas nuevas caraterísticas y/o
          servicios tambien estarán sujetos a estos Términos de Servicio.
          <h6>SECCIÓN 8 - ENLACES DE TERCERAS PARTES</h6>
          Cierto contenido, productos y servicios disponibles vía nuestro
          Servicio puede incluír material de terceras partes. Enlaces de
          terceras partes en este sitio pueden direccionarte a sitios web de
          terceras partes que no están afiliadas con nosotros. No nos
          responsabilizamos de examinar o evaluar el contenido o exactitud y no
          garantizamos ni tendremos ninguna obligación o responsabilidad por
          cualquier material de terceros o siitos web, o de cualquier material,
          productos o servicios de terceros. No nos hacemos responsables de
          cualquier daño o daños relacionados con la adquisición o utilización
          de bienes, servicios, recursos, contenidos, o cualquier otra
          transacción realizadas en conexión con sitios web de terceros. Por
          favor revisa cuidadosamente las políticas y prácticas de terceros y
          asegúrate de entenderlas antes de participar en cualquier transacción.
          Quejas, reclamos, inquietudes o pregutas con respecto a productos de
          terceros deben ser dirigidas a la tercera parte.
          <h6>SECCIÓN 9 - COMENTARIOS DE USUARIO, CAPTACIÓN Y OTROS ENVÍOS</h6>
          Si, a pedido nuestro, envías ciertas presentaciones específicas (por
          ejemplo la participación en concursos) o sin un pedido de nuestra
          parte envías ideas creativas, sugerencias, proposiciones, planes, u
          otros materiales, ya sea en línea, por email, por correo postal, o de
          otra manera (colectivamente, 'comentarios'), aceptas que podamos, en
          cualquier momento, sin restricción, editar, copiar, publicar,
          distribuír, traducir o utilizar por cualquier medio comentarios que
          nos hayas enviado. No tenemos ni tendremos ninguna obligación (1) de
          mantener ningún comentario confidencialmente; (2) de pagar
          compensación por comentarios; o (3) de responder a comentarios.
          Nosotros podemos, pero no tenemos obligación de, monitorear, editar o
          remover contenido que consideremos sea ilegítimo, ofensivo,
          amenazante, calumnioso, difamatorio, pornográfico, obsceno u objetable
          o viole la propiedad intelectual de cualquiera de las partes o los
          Términos de Servicio. Aceptas que tus comentarios no violarán los
          derechos de terceras partes, incluyendo derechos de autor, marca,
          privacidad, personalidad u otro derechos personal o de propiedad.
          Asimismo, aceptas que tus comentarios no contienen material
          difamatorio o ilegal, abusivo u obsceno, o contienen virus
          informáticos u otro malware que pudiera, de alguna manera, afectar el
          funcionamiento del Srvicio o de cualquier sitio web relacionado. No
          puedes utilizar una dirección de correo electrónico falsa, usar otra
          identidad que no sea legítima, o engañar a terceras partes o a
          nosotros en cuanto al origen de tus comentarios. Tu eres el único
          responsable por los comentarios que haces y su precisión. No nos
          hacemos responsables y no asumimos ninguna obligación con respecto a
          los comentarios publicados por ti o cualquier tercer parte.
          <h6>SECCIÓN 10 - INFORMACIÓN PERSONAL</h6>
          Tu presentación de información personal a través del sitio se rige por
          nuestra Política de Privacidad. Para ver nuestra Política de
          Privacidad.
          <h6>SECCIÓN 11 - ERRORES, INEXACTITUDES Y OMISIONES</h6>
          De vez en cuando puede haber información en nuestro sitio o en el
          Servicio que contiene errores tipográficos, inexactitudes u omisiones
          que puedan estar relacionadas con las descripciones de productos,
          precios, promociones, ofertas, gastos de envío del producto, el tiempo
          de tránsito y la disponibilidad. Nos reservamos el derecho de corregir
          los errores, inexactitudes u omisiones y de cambiar o actualizar la
          información o cancelar pedidos si alguna información en el Servicio o
          en cualquier sitio web relacionado es inexacta en cualquier momento
          sin previo aviso (incluso después de que hayas enviado tu orden) . No
          asumimos ninguna obligación de actualizar, corregir o aclarar la
          información en el Servicio o en cualquier sitio web relacionado,
          incluyendo, sin limitación, la información de precios, excepto cuando
          sea requerido por la ley. Ninguna especificación actualizada o fecha
          de actualización aplicada en el Servicio o en cualquier sitio web
          relacionado, debe ser tomada para indicar que toda la información en
          el Servicio o en cualquier sitio web relacionado ha sido modificado o
          actualizado.
          <h6> SECCIÓN 12 - USOS PROHIBIDOS</h6>
          En adición a otras prohibiciones como se establece en los Términos de
          Servicio, se prohibe el uso del sitio o su contenido: (a) para ningún
          propósito ilegal; (b) para pedirle a otros que realicen o partiicpen
          en actos ilícitos; (c) para violar cualquier regulación, reglas, leyes
          internacionales, federales, provinciales o estatales, u ordenanzas
          locales; (d) para infringir o violar el derecho de propiedad
          intelectual nuestro o de terceras partes; (e) para acosar, abusar,
          insultar, dañar, difamar, calumniar, desprestigiar, intimidar o
          discriminar por razones de género, orientación sexual, religión, tnia,
          raza, edad, nacionalidad o discapacidad; (f) para presentar
          información falsa o engañosa; (g) para cargar o transmitir virus o
          cualquier otro tipo de código malicioso que sea o pueda ser utilizado
          en cualquier forma que pueda comprometer la funcionalidad o el
          funcionamientodel Servicio o de cualquier sitio web relacionado, otros
          sitios o Internet; (h) para recopilar o rastrear información personal
          de otros; (i) para generar spam, phish, pharm, pretext, spider, crawl,
          or scrape; (j) para cualquier propósito obsceno o inmoral; o (k) para
          interferir con o burlar los elementos de seguridad del Servicio o
          cualquier sitio web relacionado¿ otros sitios o Internet. Nos
          reservamos el derecho de suspender el uso del Servicio o de cualquier
          sitio web relacionado por violar cualquiera de los ítems de los usos
          prohibidos.
          <h6>
            SECCIÓN 13 - EXCLUSIÓN DE GARANTÍAS; LIMITACIÓN DE RESPONSABILIDAD
          </h6>
          No garantizamos ni aseguramos que el uso de nuestro servicio será
          ininterrumpido, puntual, seguro o libre de errores. No garantizamos
          que los resultados que se puedan obtener del uso del servicio serán
          exactos o confiables. Aceptas que de vez en cuando podemos quitar el
          servicio por períodos de tiempo indefinidos o cancelar el servicio en
          cualquier momento sin previo aviso. Aceptas expresamenteque el uso de,
          o la posibilidad de utilizar, el servicio es bajo tu propio riesgo. El
          servicio y todos los productos y servicios proporcionados a través del
          servicio son (salvo lo expresamente manifestado por nosotros)
          proporcionados "tal cual" y "según esté disponible" para su uso, sin
          ningún tipo de representación, garantías o condiciones de ningún tipo,
          ya sea expresa o implícita, incluídas todas las garantías o
          condiciones.
          <h5 className='mt-4'>Pago</h5>
          <div>
            El pago de los pedidos podrá realizarse a través de las siguientes
            modalidades:
            <ul>
              <li>
                Tarjeta de débito o crédito aceptadas por Openpay (Para
                consultar todas las tarjetas aceptadas visita{' '}
                <a
                  href='https://www.openpay.mx/tarjetas.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  tarjetas aceptadas por Openpay
                </a>
                ).
              </li>
              <li>
                Tiendas de conveniencia afiliadas a Paynet y aceptadas por
                Openpay (Para conocer todas las tiendas afiliadas visita{' '}
                <a
                  href='https://www.openpay.mx/tiendas/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tiendas afiliadas a Paynet
                </a>
                )
              </li>
              <li>PayPal</li>
            </ul>
          </div>
          <p>
            Nos reservamos el derecho de modificar, añadir o eliminar
            modalidades de pago, sin que el usuario pueda realizar reclamaciones
            por este motivo. En caso de querer comprar y no encontrar una
            modalidad de pago ajustada a tu interés, haznos llegar un email a
            contacto@tucalcetin.com.mx para que podamos estudiar una manera de
            realizar el cobro.
          </p>
          <p>
            El cargo en la tarjeta se realiza en tiempo real a través de nuestra
            pasarela de pago, una vez se hayan comprobado la veracidad de los
            datos por parte de la entidad financiera correspondiente. No nos
            haremos responsables en caso de que la entidad emisora de tu tarjeta
            de crédito o débito no autorice el pago, así como no nos hacemos
            responsables de los posibles fallos informáticos que tengan su causa
            en las entidades financieras o en sus plataformas de pago.
          </p>
          <p>
            Igualmente, nos reservamos el derecho a tomar las medidas que
            consideremos oportunas, incluyendo la cancelación del pedido, el
            cobro de algún recargo adicional o el bloqueo de cualquier usuario.
            En caso de observar actividades sospechosas o fraudulentas.
          </p>
          <h5 className='mt-4' id='cambiosYDevoluciones'>
            Políticas de Cambios, Devoluciones y Reembolso
          </h5>
          <p>
            NO APLICA NINGÚN TIPO DE CAMBIO NI DEVOLUCIÓN EN PRODUCTOS QUE HAYAS
            COMPRADO CON DESCUENTO, REBAJA O EN PROMOCIÓN O LAS DENOMINADAS
            MYSTERY BOX O PAQUETES SIN EXCEPCIÓN.
          </p>
          <p>
            Sólo tienes 24 horas desde la recepción de tu pedido para pedir la
            devolución de este, la devolución se realiza al momento de que el
            paquete sea retornado a almacén y se hayan revisado condiciones, el
            reembolso puede tardar hasta 30 días hábiles dependiendo de la
            paquetería y está sujeto a que el cliente llevé a la paquetería el
            paquete recibido.
          </p>
          <ol>
            <li>
              Por higiene, los productos de contacto directo con la no son
              susceptibles a cambios ni devoluciones, por lo que no deben de
              estar con el empaque o etiqueta removido y/o dañado.
            </li>
            <li>No aplica para cambio ni devolución para paquetes.</li>
            <li>
              Debe tener su empaque y etiquetas originales, así como el ticket
              de compra electrónico.
            </li>
            <li>
              Cualquier cambio está sujeto a disponibilidad de inventario,
              tallas y colores.
            </li>
            <li>
              Tu Calcetín se reserva el derecho de aceptar o rechazar una
              solicitud de cambio o devolución en todo caso que la mercancía
              presente indicios de que ha sido usada, maltratada, o dañada por
              el cliente o bien, sea un producto que el cliente compró en
              descuento, rebaja o en promoción.
            </li>
          </ol>
          <h5 className='mt-4'>CAMBIOS</h5>
          <ol>
            <li>
              No se realizan cambios en productos que hayas comprado en
              descuento, rebaja o promoción, así como productos con contacto
              directo con la piel en partes bajas.
            </li>
            <li>
              Tienes hasta 24 horas para tramitar una solicitud de cambio
              después de haber recibido tu pedido, después de este tiempo no se
              aceptan ningún tipo de solicitud, sin excepción alguna.
            </li>
            <li>
              Si ya cubres con los puntos anteriores, manda un correo a
              uribe@tucalcetin.com.mx con el título SOLICITUD D DEVOLUCIÓN.
            </li>
            <li>
              Todos los productos Tu Calcetín están sujetos a disponibilidad de
              inventario, tallas y colores.
            </li>
            <li>
              Si tu solicitud fue aprobada te haremos llegar una guía para que
              nos envíes de regreso la prenda, esta guía deberá ir pegada a una
              caja totalmente sellada.
            </li>
            <li>
              Una vez que recibamos y validemos tu paquete, se te emitirá un
              vale con un código por el valor del cambio, con el cual deberás
              ingresar a{' '}
              <a
                href='https://www.tucalcetin.com.mx/'
                target='_blank'
                rel='noopener noreferrer'
              >
                nuestra página oficial
              </a>{' '}
              y comprar el modelo en la talla deseada y aplicar este código en
              la sección de checkout; este saldo a favor no incluye el gasto de
              envío, el cual el cliente se compromete a pagar.
            </li>
            <li>
              Considera que, aunque tu solicitud haya sido aceptada, Tu Calcetín
              se reserva el derecho de aprobación hasta haber recibido y
              validado el producto en cuestión. En todos los casos donde el
              producto no corresponda con la evidencia en la solicitud, el costo
              del envío no será reembolsable y será responsabilidad del cliente
              recuperar su paquete pagando un nuevo gasto de envío.
            </li>
          </ol>
          <h5 className='mt-4'>DEVOLUCIONES</h5>
          <ol>
            <li>
              No se realizan devoluciones en productos que hayas comprado en
              descuento, rebaja o promoción, así como productos en paquete y los
              accesorios de contacto directo con la piel.
            </li>
            <li>
              Tienes hasta 24 horas para tramitar una solicitud de devolución
              después de haber recibido tu pedido, después de este tiempo no se
              aceptan ningún tipo de solicitud, sin excepción alguna.
            </li>
            <li>
              Si ya cubres con los puntos anteriores, manda un correo a
              uribe@tucalcetin.com.mx para tramitar tu devolución.
            </li>
            <li>
              Si tu solicitud fue aprobada te haremos llegar una guía para que
              nos envíes de regreso la prenda, esta guía deberá ir pegada a una
              caja totalmente sellada.
            </li>
            <li>
              Una vez que recibamos y validemos tu paquete, se te emitirá un
              vale con un código por el valor de la devolución, con el cual
              deberás ingresar a{' '}
              <a
                href='https://www.tucalcetin.com.mx/'
                target='_blank'
                rel='noopener noreferrer'
              >
                nuestra página oficial
              </a>{' '}
              y comprar el modelo en la talla deseada y aplicar este código en
              la sección de checkout.
            </li>
            <li>
              Considera que, aunque tu solicitud haya sido aceptada, Tu Calcetin
              se reserva el derecho de aprobación hasta haber recibido y
              validado el producto en cuestión. En todos los casos donde el
              producto no corresponda con la evidencia en la solicitud, el costo
              del envío no será reembolsable y será responsabilidad del cliente
              recuperar su paquete pagando un nuevo gasto de envío.
            </li>
            <li>
              Si requieres solicitar tu reembolso, debes cubrir los puntos
              anteriores y posteriormente envíanos un e-mail a
              uribe@tucalcetin.com indicando tu número de pedido.
            </li>
            <li>
              No existen reembolsos por concepto de paquetería o envío de la
              mercancía.
            </li>
            <li>
              El proceso de reembolso puede tardar de 15 a 30 días hábiles a
              partir de la aprobación de la solicitud de devolución.
            </li>
            <li>
              Los reembolsos se tramitan de forma automática a la tarjeta con la
              que se realizó el pago de la compra en cuestión, este proceso de
              reembolso puede tardar de 15 a 20 días hábiles a partir de la
              aprobación de la solicitud de devolución; sin embargo, pueden
              existir ocasiones en donde necesitaremos que nos envíes a
              uribe@tucalcetin.com.mx una imagen escaneada de tu estado de
              cuenta donde sólo aparezca, esto sólo si te lo solicitamos: a)
              Banco, b) Sucursal, c) Número de cuenta, d) Clabe interbancaria y
              e) Nombre completo.
            </li>
          </ol>
        </div>

        <h2 className='justify-content-start'>Aviso de Privacidad</h2>

        <div className='justify-content-start text-dark mb-5'>
          <p>
            De acuerdo a lo Previsto en la “Ley Federal de Protección de Datos
            Personales”, declara Rodrigo Uribe Zavala ser un ciudadano y
            comerciante con capacidad jurídica cumpliendo con los requisitos que
            la ley marca, con domicilio en Avenida Gonzalo de Sandoval 1245,
            Colonia la oriental, C.P. 28046.; y como responsable del tratamiento
            de sus datos personales, hace de su conocimiento que la información
            de nuestros clientes es tratada de forma estrictamente confidencial
            por lo que al proporcionar sus datos personales, tales como:
          </p>
          <ol>
            <li>Nombre Completo</li>
            <li>Dirección</li>
            <li>Teléfono Móvil</li>
            <li>Correo Electrónico</li>
          </ol>
          <h6>
            Estos serán utilizados única y exclusivamente para los siguientes
            fines:
          </h6>
          <ol>
            <li>Información y Prestación de Servicios</li>
            <li>Actualización de la Base de Datos</li>
            <li>Cualquier finalidad análoga o compatible con las anteriores</li>
            <li>Hacer llegar notificaciones, actualizaciones y promociones</li>
          </ol>
          <h6>En el caso de Datos sensibles, tales como:</h6>
          <br />
          <ol>
            <li>
              Datos Bancarios son manejados directamente por Open Pay
              exclusivamente nombre o nombres del tarjetahabiente, número de
              tarjeta, mes y año de expiración y el cvv los cuales no se envían
              o comparten de manera directa si no por medio de tokenización de
              los datos, dejando a disposición de Open Pay el token generado.
            </li>
          </ol>
          <h6>
            Estos serán utilizados única y exclusivamente para los siguientes
            fines:
          </h6>
          <ol>
            <li>
              Prestación de Servicios, cobro del pedido efectuado por el
              cliente.
            </li>
          </ol>
          <p>
            Para prevenir el acceso no autorizado a sus datos personales y con
            el fin de asegurar que la información sea utilizada para los fines
            establecidos en este aviso de privacidad, hemos establecido diversos
            procedimientos con la finalidad de evitar el uso o divulgación no
            autorizados de sus datos, permitiéndonos tratarlos debidamente.
            <br /> <br />
            Así mismo, le informamos que sus datos personales pueden ser
            Transmitidos para ser tratados por personas distintas a esta
            empresa. <br />
            Todos sus datos personales son tratados de acuerdo a la legislación
            aplicable y vigente en el país, por ello le informamos que usted
            tiene en todo momento los derechos (ARCO) de acceder, rectificar,
            cancelar u oponerse al tratamiento que le damos a sus datos
            personales; derecho que podrá hacer valer a través del Área de
            Privacidad encargada de la seguridad de datos personales en correo
            electrónico: uribe@tucalcetin.com.mx. <br /> <br />A través de estos
            canales usted podrá actualizar sus datos y especificar el medio por
            el cual desea recibir información, ya que, en caso de no contar con
            esta especificación de su parte, Tú Calcetín. establecerá libremente
            el canal que considere pertinente para enviarle información.
          </p>
          <h5 className='mt-4'>Tu Calcetín</h5>
          <p>
            Comercializa, diseña, maquila y hace distintas actividades
            lucrativas y sin fines de lucro con los productos de su tienda, nos
            reservamos el derecho de brindar información sensible de proveedores
            o demás auxiliares para la obtención del producto final, esta
            información será tratada como secretos industriales.
          </p>
        </div>
      </Container>
    </>
  );
};
