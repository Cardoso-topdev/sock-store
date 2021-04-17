import React, { Fragment } from "react";
import './MessageError.css'

const MessageError = () => {
  return (
    <Fragment>
        <div className="error">
          <p>Error al procesar el pago!!</p>
        </div>
    </Fragment>
  );
};

export default MessageError;
