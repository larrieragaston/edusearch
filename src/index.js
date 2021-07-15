import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Routes from './routes'
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/globalStyles.css'
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Routes />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);