import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Home from './components/home/index.js';
import SignIn from './components/sign_in';

const Routes = ({user}) =>  {
  return (
    <BrowserRouter>

      <Header user={user}/>

      <Switch>
        <Route path="/sign_in" component={SignIn}/>
        <Route path="/" exact component={Home} />
      </Switch>

      <ToastContainer/>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default Routes;