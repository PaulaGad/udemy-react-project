import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import './App.scss';
import Header from './components/Header/Header';
import StoreProvider from './store/StoreProvider'

import './App.scss';
import AsideMenu from './components/AsideMenu/AsideMenu';

const App = () => {
 return (
  <StoreProvider>
   <Header/>
   <Router>
    <div className="content-wrapper">
     <AsideMenu/>
    </div>
   </Router>
  </StoreProvider>
 );
}
export default App;
