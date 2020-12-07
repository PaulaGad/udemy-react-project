import React from 'react';

import StoreProvider, { StoreContext } from './store/StoreProvider'

import './App.scss';

const App = () => {
 return (
  <StoreProvider>
   <header>
    Działa!!
   </header>
  </StoreProvider>
 );
}
 
export default App;
