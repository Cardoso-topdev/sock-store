import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import config from './config/config.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = config.baseURL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
