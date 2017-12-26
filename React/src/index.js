import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import './css/bootstrap.css'; 
import './css/App.css';
import './css/Form.css'; 

import App from './App';  
 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
				(<App />), document.getElementById('root'));
registerServiceWorker();
