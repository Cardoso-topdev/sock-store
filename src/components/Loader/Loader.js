import React from 'react';

import SyncLoader from 'react-spinners/SyncLoader';
import './Loader.css';

export default function Loader() {
  return (
    <div className='LoaderWrapper'>
      <SyncLoader
        sizeUnit={'px'}
        size={20}
        margin='20px'
        color={'#000000'}
        loading={true}
      />
      <h4>Cargando</h4>
    </div>
  );
}
