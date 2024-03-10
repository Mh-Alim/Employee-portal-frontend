import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store} from "./app/store.ts";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './utility.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store} >
  <ScrollToTop />

    <App />
  </Provider>,
  </BrowserRouter>
)
