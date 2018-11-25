import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import firebase from 'firebase/app';

let config = {
      apiKey: "AIzaSyB6tmZ_w1d2vyK4hIGqBEUfMTlNbLjFjFA",
      authDomain: "entertainment-rating-app.firebaseapp.com",
      databaseURL: "https://entertainment-rating-app.firebaseio.com",
      projectId: "entertainment-rating-app",
      storageBucket: "entertainment-rating-app.appspot.com",
      messagingSenderId: "293386828518"
};
firebase.initializeApp(config);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
