import React from 'react';
import { ColorModeScript } from "@chakra-ui/react"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, theme  } from "@chakra-ui/react"
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';

// let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript/>
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
      </Router>
      {/* </PersistGate> */}
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
