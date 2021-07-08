import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Home from './components/home/index.js';

const Routes = () =>  {
  return (
    <BrowserRouter>

      <Header/>

      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default Routes;